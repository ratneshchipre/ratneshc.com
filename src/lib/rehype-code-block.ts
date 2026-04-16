import type { LineElement } from "rehype-pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeCodeRawString() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const codeEl = node.children?.[0];
        if (codeEl?.tagName !== "code") return;

        // Capture metadata from the code element
        node.__meta__ = codeEl.data?.meta;

        const raw = codeEl.children?.[0]?.value;
        if (!raw) return;

        // Attach to node for later retrieval by rehype-pretty-code
        node.__rawString__ = raw;
      }
    });
  };
}

export function rehypeHighlightCode() {
  return rehypePrettyCode({
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
    keepBackground: false,
    onVisitLine(node: LineElement) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node: LineElement) {
      node.properties.className = [
        ...((node.properties.className as string[]) || []),
        "highlighted",
      ];
    },
    onVisitHighlightedChars(node: LineElement) {
      node.properties.className = ["word"];
    },
  });
}

export function rehypeHighlightCodeRawString() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // rehype-pretty-code wraps pre in figure
      if (node?.type === "element" && node?.tagName === "figure") {
        if (!node.children) return;
        const preElement = node.children.find(
          (child) => child.tagName === "pre"
        );
        if (!preElement) return;

        // Try to find raw string from properties or carry-over
        const rawString =
          preElement.properties?.["__rawString__"] || node.__rawString__;

        const meta = (node.__meta__ as string) || "";
        const hideLineNumbers =
          meta.includes("hideLineNumbers") ||
          preElement.properties?.["data-language"] === "text";

        preElement.properties = {
          ...(preElement.properties || {}),
          __withMeta__: node.children?.[0]?.tagName === "figcaption",
          __rawString__: rawString,
          ...(hideLineNumbers ? {} : { "data-line-numbers": "" }),
        };
      }
    });
  };
}
