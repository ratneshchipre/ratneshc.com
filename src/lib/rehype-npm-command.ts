import { visit } from "unist-util-visit";
import type { UnistNode, UnistTree } from "@/types/unist";
import { getNpmCommands } from "./code-commands";

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }

      const rawString = node.properties?.["__rawString__"];
      if (typeof rawString !== "string") {
        return;
      }

      const commands = getNpmCommands(rawString);
      if (commands) {
        node.properties = {
          ...node.properties,
          ...commands,
        };
      }
    });
  };
}
