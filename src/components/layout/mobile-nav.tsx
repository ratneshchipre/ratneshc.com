"use client";

import * as React from "react";
import Link from "next/link";

import { NavItem } from "@/types/nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cancel01Icon, Menu09Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="group relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:hidden"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        <HugeiconsIcon
          icon={Menu09Icon}
          strokeWidth={2}
          className="size-4.5 transition-all duration-300 ease-in-out group-data-popup-open:opacity-0 group-data-popup-open:blur-xs"
        />
        <HugeiconsIcon
          icon={Cancel01Icon}
          strokeWidth={2}
          className="absolute size-4.5 rotate-90 opacity-0 transition-all duration-300 ease-in-out group-data-popup-open:opacity-100 group-data-popup-open:blur-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="discrete-menu-content">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.href} onSelect={() => setOpen(false)}>
              <Link
                href={item.href ?? "#"}
                className="w-full font-geist-pixel-square text-sm font-medium text-muted-foreground transition-colors group-data-highlighted:text-foreground"
              >
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
