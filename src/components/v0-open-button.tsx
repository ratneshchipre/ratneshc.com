import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

export default function OpenInV0Button({
  url,
  className,
  ...props
}: React.ComponentProps<"a"> & { url: string }) {
  return (
    <a
      href={`https://v0.app/chat/api/open?url=${url}`}
      target="_blank"
      rel="noopener"
      aria-label="Open in v0"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "not-prose border-none",
        className
      )}
      {...props}
    >
      <Icons.v0 className="size-4.5" />
    </a>
  );
}
