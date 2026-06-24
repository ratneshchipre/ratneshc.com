"use client";

import * as React from "react";
import { addQueryParams } from "@/utils/url";
import { LinkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const [isOpen, setIsOpen] = React.useState(project.isExpanded ?? false);

  return (
    <article
      className="font-geist-sans"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="w-full text-left">
          <header className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {project.logo && (
                <div className="shrink-0 select-none">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="h-6 w-6"
                    itemProp="image"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3
                  className="truncate font-medium text-foreground"
                  itemProp="name"
                >
                  {project.title}
                </h3>
              </div>
            </div>
            <div
              className={cn(
                "flex shrink-0 items-center",
                project.githubRepo && stargazersCount !== undefined && "gap-4"
              )}
            >
              {project.githubRepo && stargazersCount !== undefined && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        className="relative flex shrink-0 items-center justify-center gap-1.5 text-muted-foreground transition-colors after:absolute after:-inset-2 hover:text-foreground"
                        href={addQueryParams(
                          `https://github.com/${project.githubRepo}`,
                          UTM_PARAMS
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} on GitHub, ${stargazersCount} stars`}
                      >
                        <Icons.github className="size-4" />
                        <span className="font-geist-sans text-[0.85rem] tabular-nums">
                          {starFormatter.format(stargazersCount).toLowerCase()}
                        </span>
                        <span className="sr-only">
                          {stargazersCount} stars on GitHub
                        </span>
                      </a>
                    }
                  />
                  <TooltipContent sideOffset={10}>
                    Open GitHub Repo
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors after:absolute after:-inset-2 hover:text-foreground"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open ${project.title} project link`}
                      itemProp="url"
                    >
                      <HugeiconsIcon
                        icon={LinkCircle02Icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                      <span className="sr-only">Open Project Link</span>
                    </a>
                  }
                />
                <TooltipContent sideOffset={10}>
                  <p>Open Project Link</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </header>
        </CollapsibleTrigger>
        <CollapsibleContent
          keepMounted
          className="group h-(--collapsible-panel-height) overflow-hidden duration-300 data-ending-style:h-0 data-ending-style:animate-fade-out data-starting-style:h-0 data-starting-style:animate-fade-in"
        >
          <div className="my-3 space-y-4 duration-300">
            {project.description && (
              <p
                className="text-sm leading-relaxed text-muted-foreground"
                itemProp="description"
              >
                {project.description}
              </p>
            )}
            {project.features && project.features.length > 0 && (
              <ul
                className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground"
                aria-label="Features"
              >
                {project.features.map((feature, index) => (
                  <li key={index} itemProp="applicationCategory">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {project.skills && project.skills.length > 0 && (
              <ul
                className="flex flex-wrap gap-2"
                aria-label="Technologies and skills used"
              >
                {project.skills.map((skill) => (
                  <li
                    key={skill}
                    className={cn(
                      "inline-flex items-center rounded-lg px-2 py-0.5 font-geist-mono text-xs",
                      "bg-muted text-muted-foreground ring-1 ring-border/80",
                      "cursor-default transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
                    )}
                    itemProp="applicationCategory"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </article>
  );
}
