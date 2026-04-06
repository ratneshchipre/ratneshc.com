"use client";

import * as React from "react";
import Image from "next/image";

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
import { Separator } from "@/components/ui/separator";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  LinkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import {
  Experience,
  ExperiencePosition,
} from "@/features/portfolio/types/experiences";

interface ExperienceCardProps {
  experience: Experience;
}

interface PositionContentProps {
  position: ExperiencePosition;
  isCurrent: boolean;
}

function formatEmploymentPeriod(start: string, end?: string): string {
  return `${start} - ${end ?? "Present"}`;
}

function buildDateTimeAttr(start: string, end?: string): string {
  return end ? `${start}/${end}` : start;
}

function TimelineIconCell() {
  return (
    <div className="flex justify-center pt-2" aria-hidden>
      <span className="size-2 rounded-full bg-muted-foreground" />
    </div>
  );
}

function CurrentEmployerBadge() {
  return (
    <span
      className="relative flex items-center justify-center"
      role="img"
      aria-label="Current employer"
    >
      <span className="absolute inline-flex size-3 animate-ping rounded-full bg-sky-500/30" />
      <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
    </span>
  );
}

function PositionContent({ position }: PositionContentProps) {
  const hasDescription =
    Array.isArray(position.description) && position.description.length > 0;
  const hasSkills =
    Array.isArray(position.skills) && position.skills.length > 0;

  const [open, setOpen] = React.useState(position.isExpanded ?? false);

  const { start, end } = position.employmentPeriod;

  return (
    <Collapsible open={open} onOpenChange={setOpen} disabled={!hasDescription}>
      <div className="relative">
        <CollapsibleTrigger
          className={cn(
            "relative block w-full cursor-pointer text-left outline-none select-none focus-visible:outline-none",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-10 mb-1 flex min-w-0 items-center gap-3">
            <h4
              className="min-w-0 flex-1 text-base font-medium text-foreground"
              itemProp="jobTitle"
            >
              {position.title}
            </h4>
            {hasDescription && (
              <span
                className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <HugeiconsIcon
                  icon={open ? ArrowUp01Icon : ArrowDown01Icon}
                  strokeWidth={2}
                />
              </span>
            )}
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {position.employmentType && (
              <>
                <span>{position.employmentType}</span>
                <div className="flex items-center">
                  <Separator orientation="vertical" className="h-4" />
                </div>
              </>
            )}
            <time dateTime={buildDateTimeAttr(start, end)} itemProp="startDate">
              {formatEmploymentPeriod(start, end)}
            </time>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent
          keepMounted
          className="h-(--collapsible-panel-height) overflow-hidden duration-300 data-ending-style:h-0 data-ending-style:animate-fade-out data-starting-style:h-0 data-starting-style:animate-fade-in"
        >
          {hasDescription && (
            <div className="pt-4" itemProp="description">
              <ul className="ml-4 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                {position.description!.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {hasSkills && (
            <ul
              className="not-prose flex flex-wrap gap-1.5 pt-4"
              aria-label="Skills and technologies used"
            >
              {position.skills!.map((skill) => (
                <li key={skill}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-0.5 font-geist-mono text-xs",
                      "border bg-muted text-muted-foreground",
                      "cursor-default transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
                    )}
                    itemProp="skills"
                  >
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const {
    companyName,
    companyLogo,
    companyWebsite,
    positions,
    isCurrentEmployer,
  } = experience;

  return (
    <article
      className="font-geist-sans"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <header className="not-prose mb-4 flex items-center gap-3">
        <div
          className="flex size-6 shrink-0 items-center justify-center select-none"
          aria-hidden
        >
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              width={24}
              height={24}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <span className="flex size-6 rounded-full bg-muted-foreground/40" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-3 text-lg leading-snug font-medium text-foreground">
            <span className="truncate" itemProp="name">
              {companyName}
            </span>
            {isCurrentEmployer && <CurrentEmployerBadge />}
          </h3>
        </div>
        {companyWebsite && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-1 hover:text-foreground"
                  href={companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${companyName} website`}
                  itemProp="url"
                >
                  <HugeiconsIcon
                    icon={LinkCircle02Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </a>
              }
            />
            <TooltipContent>
              <p>Open company website</p>
            </TooltipContent>
          </Tooltip>
        )}
      </header>
      <div
        className={cn(
          "grid gap-x-3 gap-y-4",
          positions.length > 1 ? "grid-cols-[24px_1fr]" : "grid-cols-1"
        )}
        style={{ gridTemplateRows: `repeat(${positions.length}, auto)` }}
      >
        {positions.length > 1 && (
          <span
            aria-hidden
            className="col-start-1 flex justify-center pt-2"
            style={{ gridRow: "1 / -1" }}
          >
            <span className="min-h-full w-px bg-border" />
          </span>
        )}
        {positions.map((position, index) => {
          const isLast = index === positions.length - 1;
          const isCurrent = !!(isCurrentEmployer && index === 0);

          return (
            <React.Fragment key={position.id}>
              {positions.length > 1 && (
                <div
                  className="col-start-1 flex flex-col"
                  style={{ gridRow: index + 1 }}
                >
                  <TimelineIconCell />
                  {isLast && (
                    <div className="min-h-4 flex-1 bg-background" aria-hidden />
                  )}
                </div>
              )}
              <div
                className={cn(
                  "min-w-0",
                  positions.length > 1 ? "col-start-2" : "col-start-1"
                )}
                style={{ gridRow: index + 1 }}
              >
                <PositionContent position={position} isCurrent={isCurrent} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </article>
  );
}
