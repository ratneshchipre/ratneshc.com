"use client";

import * as React from "react";
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Kbd } from "./ui/kbd";

export default function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const handleToggle = React.useCallback(() => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, theme, setTheme]);

  useHotkeys("d", handleToggle);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8.5 rounded-md hover:bg-accent",
          className
        )}
        onClick={handleToggle}
        aria-label="Toggle Mode"
      >
        <HugeiconsIcon
          icon={Sun01Icon}
          strokeWidth={2}
          className="block size-4 dark:hidden"
        />
        <HugeiconsIcon
          icon={MoonIcon}
          strokeWidth={2}
          className="hidden size-4 dark:block"
        />
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
