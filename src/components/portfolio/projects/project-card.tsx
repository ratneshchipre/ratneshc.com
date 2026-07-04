import Image from "next/image";

import { Icons } from "@/components/icons";
import type { Project } from "@/features/portfolio/types/projects";

const starFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

interface ProjectCardProps {
  project: Project;
  stargazersCount?: number;
}

export default function ProjectCard({
  project,
  stargazersCount,
}: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title}`}
      className="group/post relative flex h-full flex-col border border-dashed transition-colors hover:border-accent-foreground/20 hover:bg-accent-muted/80"
    >
      <article itemScope itemType="https://schema.org/SoftwareApplication">
        <div className="absolute -top-px -left-px h-2 w-2 border-t border-l border-foreground/90" />
        <div className="absolute -top-px -right-px h-2 w-2 border-t border-r border-foreground/90" />
        <div className="absolute -right-px -bottom-px h-2 w-2 border-r border-b border-foreground/90" />
        <div className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-foreground/90" />
        <div className="relative p-2 select-none">
          <Image
            className="aspect-1200/630 rounded-xs grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/post:grayscale-0"
            src={project.coverImage}
            alt={`${project.title} cover`}
            width={1200}
            height={630}
            quality={100}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-2 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="shrink-0 select-none">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="h-4 w-4 grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/post:grayscale-0"
                itemProp="image"
              />
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <h3
                className="truncate font-geist-sans text-sm font-medium text-foreground"
                itemProp="name"
              >
                {project.title}
              </h3>
              {project.githubRepo && stargazersCount !== undefined && (
                <p className="flex items-center gap-1.5">
                  <Icons.github className="size-3" />
                  <span className="font-geist-sans text-[12px] tabular-nums">
                    {starFormatter.format(stargazersCount).toLowerCase()}
                  </span>
                  <span className="sr-only">
                    {stargazersCount} stars on GitHub
                  </span>
                </p>
              )}
            </div>
          </div>
          <p
            className="font-geist-mono text-[13px] font-light text-muted-foreground"
            itemProp="description"
          >
            {project.description}
          </p>
        </div>
      </article>
    </a>
  );
}
