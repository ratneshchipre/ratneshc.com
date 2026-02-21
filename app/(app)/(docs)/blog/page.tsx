import { getAllPosts } from "@/features/blog/data/posts";
import Link from "next/link";

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <section className="space-y-10 pt-8" aria-labelledby="blog-heading">
      <header>
        <h2 id="blog-heading" className="font-geist-pixel-square text-muted-foreground text-lg">
          Blog
        </h2>
      </header>
      <div className="group divide-y divide-border font-geist-sans *:py-3 first:*:pt-0">
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex w-full cursor-pointer items-center justify-between gap-4 text-foreground group-hover:text-muted-foreground hover:text-foreground"
          >
            <h3>{post.metadata.title}</h3>
            <span className="text-[0.9rem] text-inherit">
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
