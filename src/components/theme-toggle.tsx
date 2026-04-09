"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Skeleton } from "./ui/skeleton";
import { Kbd } from "./ui/kbd";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useHotkeys("d", handleToggle);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="size-8.5 rounded-md" />;
  }

  const Icon = resolvedTheme === "dark" ? MoonIcon : Sun01Icon;

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8.5 cursor-pointer rounded-md hover:bg-accent",
          className
        )}
        onClick={handleToggle}
        aria-label="Toggle Mode"
      >
        <HugeiconsIcon icon={Icon} strokeWidth={2} className="size-4" />
        <span className="sr-only">Toggle Theme</span>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={10}
        className="py-2 pr-2 pl-3 text-[0.85rem]"
      >
        <div className="flex items-center gap-2.5">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
