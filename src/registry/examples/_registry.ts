import type { Registry } from "shadcn/schema";

import { getRegistryItemUrl } from "@/utils/registry";

export const examples: Registry["items"] = [
  {
    name: "stars-travel-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("stars-travel")],
    files: [
      {
        path: "examples/stars-travel-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "stars-travel-duration-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("stars-travel")],
    files: [
      {
        path: "examples/stars-travel-duration-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "perspective-tilt-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("perspective-tilt")],
    files: [
      {
        path: "examples/perspective-tilt-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
