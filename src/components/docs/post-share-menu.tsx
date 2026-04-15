"use client";

import Link from "next/link";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link04Icon,
  Linkedin01Icon,
  NewTwitterIcon,
  Share03Icon,
} from "@hugeicons/core-free-icons";
import { copyText } from "@/utils/copy";
import { cn } from "@/lib/utils";

export default function PostShareMenu({ url }: { url: string }) {
  const getAbsoluteUrl = () => {
    if (url.startsWith("http")) return url;
    if (typeof window === "undefined") return url;
    try {
      return new URL(url, window.location.origin).toString();
    } catch {
      return url;
    }
  };

  const handleCopy = () => {
    copyText(getAbsoluteUrl());
    toast.success("Link copied");
  };

  const absoluteUrl = typeof window !== "undefined" ? getAbsoluteUrl() : url;
  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "size-8.5 cursor-pointer font-geist-sans"
        )}
      >
        <HugeiconsIcon icon={Share03Icon} strokeWidth={2} className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="discrete-menu-content w-40 font-geist-sans"
        align="end"
      >
        <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
          <HugeiconsIcon icon={Link04Icon} strokeWidth={2} className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          render={
            <Link
              href={`https://x.com/intent/tweet?url=${urlEncoded}`}
              target="_blank"
              rel="noopener"
            />
          }
        >
          <HugeiconsIcon
            icon={NewTwitterIcon}
            strokeWidth={2}
            className="size-4"
          />
          Share on X
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          render={
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
              target="_blank"
              rel="noopener"
            />
          }
        >
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
