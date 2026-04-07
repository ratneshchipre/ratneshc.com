"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Index } from "@/__registry__/index";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { RepeatIcon } from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "./ui/button";
import { Code as CodeInline } from "./ui/typography";
import OpenInV0Button from "./v0-open-button";

export default function ComponentPreview({
  className,
  name,
  openInV0Url,
  canReplay = false,
  prose = false,
  remountOnThemeChange = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
  openInV0Url?: string;
  canReplay?: boolean;
  prose?: boolean;
  codeCollapsible?: boolean;
  remountOnThemeChange?: boolean;
}) {
  const { resolvedTheme } = useTheme();

  const [replay, setReplay] = React.useState(0);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      return (
        <p className="font-geist-sans text-sm text-muted-foreground">
          Component <CodeInline>{name}</CodeInline> not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, replay, remountOnThemeChange, resolvedTheme]);

  return (
    <div
      className={cn("my-[1.25em]", prose === false && "not-prose", className)}
      {...props}
    >
      <div data-slot="preview" className="rounded-t-xl border p-2">
        {(canReplay || openInV0Url) && (
          <div data-slot="buttons" className="mb-2 flex justify-end">
            {canReplay && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      className="cursor-pointer border-none"
                      variant="ghost"
                      size="icon-lg"
                      onClick={() => setReplay((v) => v + 1)}
                    >
                      <HugeiconsIcon
                        icon={RepeatIcon}
                        strokeWidth={2}
                        className="size-4.5"
                      />
                    </Button>
                  }
                />
                <TooltipContent>
                  <p>Replay</p>
                </TooltipContent>
              </Tooltip>
            )}
            {openInV0Url && <OpenInV0Button url={openInV0Url} />}
          </div>
        )}
        <div
          key={`${replay}-${remountOnThemeChange ? (resolvedTheme ?? "system") : "static"}`}
          data-slot="component-preview"
          className="flex min-h-72 items-center justify-center font-geist-sans"
        >
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                Loading...
              </div>
            }
          >
            {Preview}
          </React.Suspense>
        </div>
        {(canReplay || openInV0Url) && <div className="mt-2 h-2" />}
      </div>
      <div
        className={cn(
          "*:data-rehype-pretty-code-figure:m-0 *:data-rehype-pretty-code-figure:rounded-t-none *:data-rehype-pretty-code-figure:border-x *:data-rehype-pretty-code-figure:border-b [&_pre]:max-h-80 [&_pre]:rounded-b-2xl",
          "**:data-fade-overlay:size-28 **:data-fade-overlay:rounded-tr-none **:data-fade-overlay:[--fade-background:var(--fade-radial-gradient)]"
        )}
      >
        {Code}
      </div>
    </div>
  );
}
