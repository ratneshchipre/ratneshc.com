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
    description:
      "A 3D card with perspective-driven tilt and cinematic focus-blur transitions for smooth card entry and exit animations.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/perspective-tilt/perspective-tilt.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ratneshc.com/components/perspective-tilt",
  },
];
