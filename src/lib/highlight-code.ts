import { createHash } from "crypto";
import { LRUCache } from "lru-cache";
import type { ShikiTransformer } from "shiki";
import { codeToHtml } from "shiki";

const isDev = process.env.NODE_ENV === "development";

// LRU cache for cross-request caching of highlighted code.
// Shiki highlighting is CPU-intensive and deterministic, so caching is safe.
const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour.
});

import { getNpmCommands } from "./code-commands";

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties["__raw__"] = raw;

        const commands = getNpmCommands(raw);
        if (commands) {
          Object.assign(node.properties, commands);
        }
      }
    },
  },
] as ShikiTransformer[];

export async function highlightCode(code: string, language: string = "tsx") {
  // Create cache key from code content and language.
  const cacheKey = createHash("sha256")
    .update(`${language}:${code}`)
    .digest("hex");

  // Check cache first.
  if (!isDev) {
    const cached = highlightCache.get(cacheKey);
    if (cached) return cached;
  }

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          node.properties["style"] = "";
        },
        code(node) {
          node.properties["data-line-numbers"] = "";
          node.properties["style"] = "display: grid";
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });

  // Cache the result only when not in development mode.
  if (!isDev) {
    highlightCache.set(cacheKey, html);
  }

  return html;
}
