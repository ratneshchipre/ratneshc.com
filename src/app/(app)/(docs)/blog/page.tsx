import { Metadata } from "next";
import Link from "next/link";

import { generateWebsiteMetadata } from "@/config/metadata";
import { getAllDocs } from "@/features/doc/data/documents";
import { Doc } from "@/features/doc/types/document";

export const metadata: Metadata = generateWebsiteMetadata({
  title: "Blog",
  description:
    "Raw thoughts and real insights on tech, life, and the entrepreneurial journey.",
  keywords: ["blogs", "Ratnesh blog", "Ratnesh blog posts"],
  image: "blogs/blogs.png",
});

export default function BlogPage() {
  const blogs = getAllDocs().filter((doc) => doc.metadata.category === "blogs");

  return (
    <section
      className="h-[calc(100svh-17.5rem)] space-y-12 pt-8"
      aria-labelledby="blog-heading"
    >
      <header className="flex flex-col gap-3">
        <h2 id="blog-heading" className="font-geist-pixel-square text-xl">
          Blog
        </h2>
        <p className="font-geist-sans text-muted-foreground">
          Raw thoughts and real insights on tech, life, and the entrepreneurial
          journey.
        </p>
      </header>
      <div className="group divide-y divide-border font-geist-sans *:py-3 first:*:pt-0">
        {blogs.map((doc: Doc) => (
          <Link
            key={doc.slug}
            href={`/blog/${doc.slug}`}
            className="flex w-full cursor-pointer items-center justify-between gap-5 text-foreground group-hover:text-ring hover:text-foreground [&_span]:text-muted-foreground [&_span]:group-hover:text-ring hover:[&_span]:text-muted-foreground"
          >
            <h3 className="truncate">
              {doc.metadata.title.includes("|")
                ? doc.metadata.title.split("|")[0].trim()
                : doc.metadata.title}
            </h3>
            <span className="shrink-0 text-[0.9rem]">
              {doc.metadata.createdAt
                ? new Date(doc.metadata.createdAt)
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    .toLowerCase()
                : ""}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
