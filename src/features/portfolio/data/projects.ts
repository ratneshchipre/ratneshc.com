import { Project } from "@/features/portfolio/types/projects";

export const PROJECTS: Project[] = [
  {
    id: "page-views-api",
    title: "Page Views API",
    logo: "/images/project-logos/page-views-api.svg",
    coverImage: "/images/project-covers/page-views-api.webp",
    description:
      "An open-source API to count visitors on any page. Simple, no setup, no dashboard.",
    link: "https://page-views-api.ratneshc.com",
    githubRepo: "ratneshchipre/page-views-api",
  },
  {
    id: "ratneshc.com",
    title: "ratneshc.com",
    logo: "/images/project-logos/ratneshc-com.svg",
    coverImage: "/images/project-covers/ratneshc-com.webp",
    description:
      "A clean and minimal portfolio featuring my work, writing, and shadcn registry.",
    link: "https://ratneshc.com",
    githubRepo: "ratneshchipre/ratneshc.com",
  },
  {
    id: "draftlogo",
    title: "draftlogo",
    logo: "/images/project-logos/draftlogo.svg",
    coverImage: "/images/project-covers/draftlogo.webp",
    description:
      "An AI logo generator built for founders to create professional, modern logos in seconds.",
    link: "https://www.draftlogo.com",
  },
];
