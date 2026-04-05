"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export default function UnmountingDemo() {
  const [isSlowed, setIsSlowed] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border font-geist-sans">
      <div className="grid grid-cols-2 divide-x border-b transition-colors">
        <div className="flex flex-col items-center justify-center gap-6 p-12 py-20">
          <div className="flex size-7 items-center justify-center rounded-full bg-red-500/20">
            <div className="flex size-4 items-center justify-center rounded-full bg-red-500 text-background">
              <HugeiconsIcon
                icon={Cancel01Icon}
                strokeWidth={3}
                className="size-3"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "cursor-pointer px-4"
              )}
            >
              Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className={cn(
                "w-auto font-geist-sans shadow-sm",
                isSlowed && "duration-2000! fill-mode-[none]!"
              )}
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 p-12 py-20">
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500/20">
            <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-background">
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={3}
                className="size-3"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "cursor-pointer px-4"
              )}
            >
              Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className={cn(
                "discrete-menu-content w-auto font-geist-sans shadow-sm",
                isSlowed && "duration-2000!"
              )}
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center justify-center bg-card p-4">
        <Button
          onClick={() => setIsSlowed(!isSlowed)}
          className="cursor-pointer border border-border bg-background px-3 py-4 font-geist-mono font-medium text-foreground"
        >
          Animation: {isSlowed ? "Slow" : "Fast"}
        </Button>
      </div>
    </div>
  );
}
