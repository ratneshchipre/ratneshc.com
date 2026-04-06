"use client";

import * as React from "react";
import { format } from "date-fns";

import {
  Activity,
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GITHUB_USERNAME } from "@/config/site";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

export default function GitHubGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = React.use(contributions);

  return (
    <ContributionGraph
      className="mx-auto py-2 font-geist-sans"
      data={data}
      blockSize={11}
      blockMargin={3}
      blockRadius={1}
    >
      <ContributionGraphCalendar
        className="no-scrollbar"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger
              render={
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              }
            />
            <TooltipContent>
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <a
                className="font-medium underline underline-offset-4"
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubGraphFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <HugeiconsIcon
        icon={Loading03Icon}
        className="animate-spin text-muted-foreground"
      />
    </div>
  );
}
