import type { Registry } from "shadcn/schema";

export const hook: Registry["items"] = [
  {
    name: "use-copy-to-clipboard",
    type: "registry:hook",
    title: "useCopyToClipboard",
    files: [
      {
        path: "hooks/use-copy-to-clipboard/use-copy-to-clipboard.ts",
        type: "registry:hook",
        target: "@hooks/use-copy-to-clipboard.ts",
      },
    ],
  },
];
