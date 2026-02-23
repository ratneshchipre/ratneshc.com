"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link04Icon,
  Linkedin01Icon,
  NewTwitterIcon,
  Share03Icon,
} from "@hugeicons/core-free-icons";
import { copyText } from "@/utils/copy";
import Link from "next/link";

export default function PostShareMenu({ url }: { url: string }) {
  const absoluteUrl = url.startsWith("http")
    ? url
    : typeof window !== "undefined"
      ? new URL(url, window.location.origin).toString()
      : url;

  const urlEncoded = encodeURIComponent(absoluteUrl);

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
        <DropdownMenuItem
          className="cursor-pointer hover:bg-muted!"
          onClick={() => {
            copyText(absoluteUrl);
            toast.success("Link copied");
          }}
        >
          <HugeiconsIcon icon={Link04Icon} strokeWidth={2} className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-muted!"
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
          className="cursor-pointer hover:bg-muted!"
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
