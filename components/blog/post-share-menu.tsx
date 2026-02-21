"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link04Icon,
  Linkedin01Icon,
  NewTwitterIcon,
  Share03Icon,
} from "@hugeicons/core-free-icons";

export default function PostShareMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="secondary"
            className="cursor-pointer font-geist-sans"
          />
        }
      >
        <HugeiconsIcon icon={Share03Icon} strokeWidth={2} className="size-4" />
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 font-geist-sans" align="center">
        <DropdownMenuItem className="cursor-pointer">
          <HugeiconsIcon icon={Link04Icon} strokeWidth={2} className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HugeiconsIcon
            icon={NewTwitterIcon}
            strokeWidth={2}
            className="size-4"
          />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HugeiconsIcon
            icon={Linkedin01Icon}
            strokeWidth={2}
            className="size-4"
          />
          Share on LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
