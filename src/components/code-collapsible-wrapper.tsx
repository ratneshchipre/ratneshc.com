"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={cn(
        "group not-prose relative my-[1.25em] overflow-hidden rounded-xl",
        className
      )}
      {...props}
    >
      <div className="absolute top-2 right-9 z-10 flex items-center max-sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-md px-2 text-muted-foreground"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <div className="flex items-center">
          <Separator orientation="vertical" className="mr-3 ml-1 h-4!" />
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 *:data-rehype-pretty-code-figure:my-0 **:data-rehype-pretty-code-figure:rounded-xl",
          expanded
            ? "max-h-none [&_pre]:pointer-events-auto [&_pre]:overflow-x-auto"
            : "max-h-80 [&_pre]:pointer-events-none [&_pre]:overflow-hidden"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-linear-to-t from-code from-50% to-transparent pb-4",
          expanded && "hidden"
        )}
      >
        <Button variant="outline" size="sm" onClick={() => setExpanded(true)}>
          Expand
        </Button>
      </div>
    </div>
  );
}
