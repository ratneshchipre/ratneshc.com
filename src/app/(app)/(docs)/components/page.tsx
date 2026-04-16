import { Metadata } from "next";
import Link from "next/link";

import { getDocsByCategory } from "@/features/doc/data/documents";
import { generateWebsiteMetadata } from "@/config/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateWebsiteMetadata({
  title: "Components",
  description:
    "A curated component registry built on shadcn/ui. More coming soon.",
  keywords: [
    "components",
    "ui",
    "ui components library",
    "shadcn",
    "shadcn/ui",
    "ui components",
    "react",
    "Ratnesh components",
  ],
  image: "components/components.png",
});

export default function ComponentsPage() {
  const docs = getDocsByCategory("components");

  return (
    <section
      className="h-[calc(100svh-17.5rem)] space-y-12 pt-8"
      aria-labelledby="components-heading"
    >
      <header className="flex flex-col gap-3">
        <h2 id="components-heading" className="font-geist-pixel-square text-xl">
          Components
        </h2>
        <p className="font-geist-sans text-muted-foreground">
          A curated component registry built on shadcn/ui. More coming soon.
        </p>
      </header>
      <div className="group grid grid-cols-1 gap-2 font-geist-sans sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {docs
          .slice()
          .sort((a, b) =>
            a.metadata.title.localeCompare(b.metadata.title, "en", {
              sensitivity: "base",
            })
          )
          .map((doc) => (
            <ComponentItem key={doc.slug} href={`/components/${doc.slug}`}>
              <ComponentItemTitle as="h3">
                {doc.metadata.title}
              </ComponentItemTitle>
              {(doc.metadata.new || doc.metadata.updated) && (
                <ComponentItemDot
                  aria-label={doc.metadata.new ? "New" : "Updated"}
                />
              )}
            </ComponentItem>
          ))}
      </div>
    </section>
  );
}

export function ComponentItem({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 py-3 text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function ComponentItemDot({
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children">) {
  return (
    <span
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <span className="flex size-2 rounded-sm bg-info ring-1 ring-background" />
    </span>
  );
}

type HeadingTypes = "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends HeadingTypes> = React.ComponentProps<T> & {
  as?: T;
};

export function ComponentItemTitle<T extends HeadingTypes = "h2">({
  as,
  className,
  ...props
}: HeadingProps<T>) {
  const Comp = as ?? "h2";

  return (
    <Comp
      className={cn(
        "line-clamp-1 leading-snug font-medium text-balance",
        className
      )}
      {...props}
    />
  );
}
