import type { Registry } from "shadcn/schema";

import { getRegistryItemUrl } from "@/utils/registry";

export const components: Registry["items"] = [
  {
    name: "stars-travel",
    type: "registry:component",
    title: "Stars Travel",
    description:
      "A motion-driven SVG background with an animated 'infinite travel' effect.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/stars-travel/stars-travel.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ratneshc.com/components/stars-travel",
  },
  {
    name: "perspective-tilt",
    type: "registry:component",
    title: "Perspective Tilt",
    description: "A 3D card with perspective tilt and blur transitions.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/perspective-tilt/perspective-tilt.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ratneshc.com/components/perspective-tilt",
  },
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description: "A copy button with direction-aware icon transitions.",
    dependencies: ["motion"],
    registryDependencies: [getRegistryItemUrl("use-copy-to-clipboard")],
    files: [
      {
        path: "components/copy-button/copy-button.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ratneshc.com/components/copy-button",
  },
  {
    name: "blur-shimmer-text",
    type: "registry:component",
    title: "Blur Shimmer Text",
    description:
      "A text component that loops phrases with a horizontal blur shimmer.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/blur-shimmer-text/blur-shimmer-text.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ratneshc.com/components/blur-shimmer-text",
  },
];
