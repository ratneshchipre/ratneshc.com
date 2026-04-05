import type { MetadataRoute } from "next";
import { getAllPosts } from "@/features/blog/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}${
      post.metadata.category === "components"
        ? `/components/${post.slug}`
        : `/blog/${post.slug}`
    }`,
    lastModified: new Date(post.metadata.updatedAt || post.metadata.createdAt),
  }));

  const routes = ["", "/blog", "/collection"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogPosts];
}
