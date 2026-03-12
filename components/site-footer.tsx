"use client";

import * as React from "react";
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
    <div className="flex items-center justify-center gap-3 font-geist-sans text-sm leading-none text-muted-foreground">
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
        <TooltipContent className="font-geist-sans" sideOffset={10}>
          {timeZone}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-10 w-full px-5">
      <div className="flex flex-col gap-4 border-t py-8">
        <FooterDateTime />
        <div>
          <p className="text-center font-geist-mono text-sm text-balance text-muted-foreground">
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
