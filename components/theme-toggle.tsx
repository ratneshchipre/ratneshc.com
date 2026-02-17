"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerIcon, MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeOption = "system" | "light" | "dark";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const currentTheme = (theme ?? "system") as ThemeOption;
  const effectiveTheme = (resolvedTheme ?? "light") as Exclude<
    ThemeOption,
    "system"
  >;

  const Icon = !mounted
    ? ComputerIcon
    : currentTheme === "system"
      ? ComputerIcon
      : effectiveTheme === "dark"
        ? MoonIcon
        : Sun01Icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(className, "cursor-pointer")}
          />
        }
      >
        <HugeiconsIcon icon={Icon} strokeWidth={2} />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-35 font-geist-sans">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={currentTheme}
            onValueChange={(value) => setTheme(value as ThemeOption)}
          >
            <DropdownMenuRadioItem value="system" className="cursor-pointer">
              <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} />
              System
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light" className="cursor-pointer">
              <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer">
              <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
              Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
