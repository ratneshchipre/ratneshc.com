import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/features/blog/data/posts";
import { generateWebsiteMetadata } from "@/config/metadata";

export const metadata: Metadata = generateWebsiteMetadata({
  title: "Blog | Ratnesh",
  description:
    "Raw thoughts and real insights on tech, life, and the entrepreneurial journey.",
  keywords: ["blogs", "Ratnesh blog", "Ratnesh blog posts"],
  image: "blog/blog.png",
});

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <section
      className="h-[calc(100svh-16rem)] space-y-12 pt-8"
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
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex w-full cursor-pointer items-center justify-between gap-5 text-foreground group-hover:text-ring hover:text-foreground [&_span]:text-muted-foreground [&_span]:group-hover:text-ring hover:[&_span]:text-muted-foreground"
          >
            <h3 className="truncate">
              {post.metadata.title.includes("|")
                ? post.metadata.title.split("|")[0].trim()
                : post.metadata.title}
            </h3>
            <span className="shrink-0 text-[0.9rem]">
              {post.metadata.createdAt
                ? new Date(post.metadata.createdAt)
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
