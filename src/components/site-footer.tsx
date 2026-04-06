"use client";

import * as React from "react";
import useSWR from "swr";

import { getPageViews } from "@/features/portfolio/data/page-views";

import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Skeleton } from "./ui/skeleton";

function FooterDateTime() {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!now) {
    return (
      <div className="flex items-center justify-center gap-3">
        <Skeleton className="h-3.5 w-32 rounded-sm" />
        <Separator
          orientation="vertical"
          className="h-4 self-center"
          aria-hidden="true"
        />
        <Skeleton className="h-3.5 w-32 rounded-sm" />
      </div>
    );
  }

  const timeZone = "Asia/Kolkata";
  const isoString = now.toISOString();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone,
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  });

  const dateLabel = dateFormatter.format(now);
  const timeLabel = timeFormatter.format(now);

  return (
    <div className="flex items-center justify-center gap-3 text-center font-geist-mono text-sm tracking-tight text-muted-foreground">
      <time
        dateTime={isoString}
        aria-label={dateLabel}
        className="leading-none"
      >
        {dateLabel}
      </time>
      <Separator
        orientation="vertical"
        className="h-4 self-center"
        aria-hidden="true"
      />
      <Tooltip>
        <TooltipTrigger
          render={
            <time
              dateTime={isoString}
              className="cursor-default"
              aria-label={`${timeLabel} ${timeZone}`}
            />
          }
        >
          {timeLabel} GMT+5:30
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>{timeZone}</TooltipContent>
      </Tooltip>
    </div>
  );
}

function VisitorCount() {
  const {
    data: views,
    isLoading,
    error,
  } = useSWR("page-views", getPageViews, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Reuse the data for 60 seconds
  });

  if (isLoading || error || views === undefined) {
    return <Skeleton className="inline-block h-6 w-7 align-middle" />;
  }

  const getOrdinal = (n: number) => {
    const remainder10 = n % 10;
    const remainder100 = n % 100;
    if (remainder10 === 1 && remainder100 !== 11) return "st";
    if (remainder10 === 2 && remainder100 !== 12) return "nd";
    if (remainder10 === 3 && remainder100 !== 13) return "rd";
    return "th";
  };

  return (
    <>
      {new Intl.NumberFormat().format(views)}
      <sup>{getOrdinal(views)}</sup>
    </>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-10 w-full px-5">
      <div className="flex flex-col items-center gap-3 border-t py-8">
        <div className="flex items-center text-center text-sm">
          <span className="font-geist-mono tracking-tight text-muted-foreground">
            You&apos;re the{" "}
            <span className="text-foreground">
              <VisitorCount />
            </span>{" "}
            visitor
          </span>
        </div>
        <FooterDateTime />
        <div>
          <p className="text-center font-geist-mono text-sm tracking-tight text-balance text-muted-foreground">
            Built by{" "}
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href="https://x.com/ratneshchipre"
              target="_blank"
              rel="noopener"
            >
              Ratnesh
            </a>
            . The source code is available on{" "}
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href="https://github.com/ratneshchipre/ratneshc.com"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
