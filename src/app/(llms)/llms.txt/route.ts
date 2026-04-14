import { format } from "date-fns";

import { Doc } from "@/features/doc/types/document";
import { getDocsByCategory, getDocUrl } from "@/features/doc/data/documents";
import { getLLMText } from "@/features/doc/lib/get-llm-text";
import { SITE_CONFIG } from "@/config/site";
import { PROJECTS } from "@/features/portfolio/data/projects";
import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import { TECH_STACK } from "@/features/portfolio/data/tech-stack";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";

const blogs = getDocsByCategory("blogs");
const components = getDocsByCategory("components");

const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.join(", ") || "N/A";
      const description = position.description?.join("\n") || "N/A";
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}\n\n${description}`;
    })
    .join("\n\n")
).join("\n\n")}
`;

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`;
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  return `### ${item.title}\n\nProject URL: ${item.link}${skills}${description}`;
}).join("\n\n")}
`;

async function getDocsContent(docs: Doc[]) {
  const text = await Promise.all(
    docs.map(
      async (item) =>
        `---\ntitle: "${item.metadata.title}"\ndescription: "${item.metadata.description}"\nlast_updated: "${format(new Date(item.metadata.updatedAt), "MMMM d, yyyy")}"\nsource: "${SITE_CONFIG.url}${getDocUrl(item)}"\n---\n\n${await getLLMText(item)}`
    )
  );
  return text.join("\n\n");
}

async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as a ${USER.jobTitle}.</SYSTEM>

# ratneshc.com

> A clean and minimal portfolio featuring my work, writing, and shadcn registry.

${aboutText}
${experienceText}
${projectsText}

## Blog

${await getDocsContent(blogs)}

## Components

${await getDocsContent(components)}`;
}

export const revalidate = false;
export const dynamic = "force-static";

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
