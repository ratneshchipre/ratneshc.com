"use client";

import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";
import { UTM_PARAMS } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Icons } from "./icons";

type GitHubStarsProps = {
  repo: string;
  stargazersCount: number;
};

export default function GithubStars({
  repo,
  stargazersCount,
}: GitHubStarsProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "cursor-pointer rounded-md py-4 hover:bg-muted"
        )}
      >
        <a
          href={addQueryParams(`https://github.com/${repo}`, UTM_PARAMS)}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center gap-2"
        >
          <Icons.github className="size-4" />
          <span className="text-[0.85rem] text-muted-foreground tabular-nums">
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            })
              .format(stargazersCount)
              .toLowerCase()}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={6}
        className="py-2 text-[0.85rem]"
      >
        {new Intl.NumberFormat("en-US").format(stargazersCount)} stars
      </TooltipContent>
    </Tooltip>
  );
}
