import { NavItem } from "@/types/nav";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const SITE_CONFIG = {
  name: "Ratnesh",
  description:
    "I'm Ratnesh, a Full-Stack Web Developer. I love to build products.",
  url: baseUrl,
  ogImage: `${baseUrl}/images/opengraph-image.png`,
  links: {
    twitter: "https://x.com/ratneshchipre",
    github: "https://github.com/ratneshchipre",
  },
  keywords: [
    "Ratnesh",
    "Ratnesh Chipre",
    "ratnesh chipre",
    "ratnesh dev",
    "ratnesh full stack developer",
    "ratnesh dev portfolio",
    "ratnesh portfolio",
    "ratnesh developer portfolio",
    "web developer",
    "typescript",
    "react",
    "next.js",
  ],
  author: "Ratnesh",
};

export type SiteConfig = typeof SITE_CONFIG;

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Collection",
    href: "/collection",
  },
];

export const X_USERNAME = "@ratneshchipre";
export const GITHUB_USERNAME = "ratneshchipre";
export const SOURCE_CODE_GITHUB_REPO = "ratneshchipre/ratneshc.com";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/ratneshchipre/ratneshc.com";

export const UTM_PARAMS = {
  utm_source: "ratneshc.com",
};
