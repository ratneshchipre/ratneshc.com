import type { HugeiconsIconProps } from "@hugeicons/react";

export type SocialLink = {
  icon: HugeiconsIconProps["icon"];
  title: string;
  subtitle?: string;
  href: string;
};
