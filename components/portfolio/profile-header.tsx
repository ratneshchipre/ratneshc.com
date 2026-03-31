"use client";

import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { getPageViews } from "@/features/portfolio/data/page-views";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";

export default function ProfileHeader() {
  const [views, setViews] = React.useState<number | null>(null);

  React.useEffect(() => {
    getPageViews()
      .then(setViews)
      .catch((error) => {
        console.error("Failed to fetch views:", error);
      });
  }, []);

  return (
    <div className="flex items-start justify-between gap-4 py-8">
      <div className="flex items-center gap-3">
        <div className="select-none">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            width={45}
            height={45}
            quality={90}
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <h2 className="font-geist-sans text-lg font-medium">
            Ratnesh Chipre
          </h2>
          <p className="font-geist-pixel-square text-muted-foreground">
            Full-Stack Web Developer
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-geist-mono text-sm text-muted-foreground">
        <HugeiconsIcon icon={ViewIcon} strokeWidth={2} className="size-4" />
        {views !== null ? (
          <span>{new Intl.NumberFormat().format(views)}</span>
        ) : (
          <Skeleton className="h-4 w-6" />
        )}
      </div>
    </div>
  );
}
