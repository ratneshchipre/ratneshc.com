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
import { cn } from "@/lib/utils";
import { Experience, ExperiencePosition } from "@/types/experiences";

interface ExperienceCardProps {
  experience: Experience;
}

interface PositionCardProps {
  position: ExperiencePosition;
  isCurrent: boolean;
  isLast: boolean;
}

function formatEmploymentPeriod(
  start: string,
  end?: string,
  isCurrent?: boolean
): string {
  if (!end && isCurrent) {
    return `${start} - Present`;
  }

  if (end) {
    return `${start} - ${end}`;
  }

  return `${start} - Present`;
}

function PositionCard({ position, isCurrent, isLast }: PositionCardProps) {
  const [isOpen, setIsOpen] = React.useState(position.isExpanded ?? false);

  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="w-full cursor-pointer text-left">
          <div className="flex w-full items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h4 className="text-foreground" itemProp="jobTitle">
                {position.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {position.employmentType && (
                  <>
                    <span className="inline-flex items-center">
                      {position.employmentType}
                    </span>
                    <span
                      className="text-muted-foreground/50"
                      aria-hidden="true"
                    >
                      |
                    </span>
                  </>
                )}
                <time
                  dateTime={`${position.employmentPeriod.start}${position.employmentPeriod.end ? `/${position.employmentPeriod.end}` : ""}`}
                  itemProp="datePosted"
                >
                  {formatEmploymentPeriod(
                    position.employmentPeriod.start,
                    position.employmentPeriod.end,
                    isCurrent
                  )}
                </time>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="group h-(--collapsible-panel-height) overflow-hidden duration-300 data-ending-style:h-0 data-ending-style:animate-fade-out data-starting-style:h-0 data-starting-style:animate-fade-in">
          <div className="my-4 space-y-4 duration-300">
            {position.description && position.description.length > 0 && (
              <div itemProp="description">
                <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {position.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-muted-foreground">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {position.skills && position.skills.length > 0 && (
              <div>
                <h5 className="sr-only">Skills and Technologies</h5>
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label="Skills and technologies used"
                >
                  {position.skills.map((skill) => (
                    <li
                      key={skill}
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 font-geist-mono text-xs",
                        "border bg-muted text-muted-foreground",
                        "transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
                      )}
                      itemProp="skills"
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
      {!isLast && <div className="my-4 h-px bg-border" aria-hidden="true" />}
    </div>
  );
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article
      className="font-geist-sans"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <header className="mb-3 flex items-center gap-3">
        {experience.companyLogo && (
          <div className="shrink-0">
            <img
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              className="h-6 w-6"
              itemProp="logo"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {experience.companyWebsite ? (
            <h3 className="truncate text-foreground">
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
                itemProp="name"
              >
                {experience.companyName}
              </a>
            </h3>
          ) : (
            <h3
              className="truncate font-medium text-foreground"
              itemProp="name"
            >
              {experience.companyName}
            </h3>
          )}
        </div>
        {experience.companyWebsite && (
          <div className="shrink-0">
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors after:absolute after:-inset-2 hover:text-foreground"
                    href={experience.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${experience.companyName} website`}
                    itemProp="url"
                  >
                    <HugeiconsIcon
                      icon={LinkCircle02Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    <span className="sr-only">Open Company Website</span>
                  </a>
                }
              />
              <TooltipContent className="font-geist-sans">
                <p>Open Company Website</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </header>
      <div className="space-y-4">
        {experience.positions.map((position, index) => (
          <PositionCard
            key={position.id}
            position={position}
            isCurrent={!!(experience.isCurrentEmployer && index === 0)}
            isLast={index === experience.positions.length - 1}
          />
        ))}
      </div>
    </article>
  );
}
