"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { copyText } from "@/utils/copy";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { Button } from "./ui/button";

export default function CopyButton({
  value,
  className,
  variant = "ghost",
  size = "icon-xs",
  event,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  event?: string;
}) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      variant={variant}
      size={size}
      className={cn(
        "mb-0.5 inline-flex cursor-pointer p-0! align-middle hover:bg-transparent!",
        className
      )}
      onClick={() => {
        copyText(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      <HugeiconsIcon
        icon={hasCopied ? Tick02Icon : Copy01Icon}
        strokeWidth={2}
        className="size-3.5"
      />
    </Button>
  );
}
