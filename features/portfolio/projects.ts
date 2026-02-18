import { Project } from "@/types/projects";

export const PROJECTS: Project[] = [
  {
    id: "draftlogo",
    title: "draftlogo - Generate professional logos in seconds",
    link: "https://www.draftlogo.com",
    skills: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Prisma",
      "PostgreSQL",
      "Better-Auth",
    ],
    description:
      "draftlogo is an AI-powered logo generator built for founders and startups to create professional, modern logos in seconds without designers, long revisions, or expensive tools.",
    logo: "/images/project-logos/draftlogo.svg",
    isExpanded: true,
  },
];
