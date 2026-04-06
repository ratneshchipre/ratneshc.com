"use client";

import * as React from "react";

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
import { LinkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Project } from "@/features/portfolio/types/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = React.useState(project.isExpanded ?? false);

  return (
    <article
      className="font-geist-sans"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="w-full cursor-pointer text-left">
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
            <div className="shrink-0">
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
                <TooltipContent>
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
              <div>
                <h4 className="sr-only">Features</h4>
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
              </div>
            )}
            {project.skills && project.skills.length > 0 && (
              <div>
                <h4 className="sr-only">Technologies and Skills</h4>
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label="Technologies and skills used"
                >
                  {project.skills.map((skill) => (
                    <li
                      key={skill}
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 font-geist-mono text-xs",
                        "border bg-muted text-muted-foreground",
                        "cursor-default transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
                      )}
                      itemProp="applicationCategory"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </article>
  );
}
