"use client";

import {
  PerspectiveTilt,
  PerspectiveTiltContent,
  PerspectiveTiltTrigger,
} from "@/registry/components/perspective-tilt";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export default function PerspectiveTiltDemo() {
  return (
    <div className="flex items-center justify-center p-5">
      <PerspectiveTilt>
        <PerspectiveTiltTrigger asChild>
          <Button className="cursor-pointer bg-foreground px-3 transition-colors hover:bg-foreground/85">
            Manage Members
          </Button>
        </PerspectiveTiltTrigger>
        <PerspectiveTiltContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="w-full border-b border-border px-5 py-4">
              <h2 className="text-base font-medium text-foreground">
                Team Members
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your team and their permissions.
              </p>
            </div>
            <div className="flex flex-col items-center gap-5 px-5 py-7">
              <AvatarGroup className="grayscale">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <div className="space-y-4 text-center">
                <div>
                  <h3 className="font-medium text-foreground">
                    No Team Members
                  </h3>
                  <p className="text-muted-foreground">
                    Invite your team to collaborate on this project.
                  </p>
                </div>
                <Button className="mx-auto w-fit cursor-pointer bg-foreground px-3 transition-colors hover:bg-foreground/85">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                  Invite Members
                </Button>
              </div>
            </div>
          </div>
        </PerspectiveTiltContent>
      </PerspectiveTilt>
    </div>
  );
}
