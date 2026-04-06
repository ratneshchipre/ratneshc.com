import type { MetadataRoute } from "next";

import { getAllDocs, getDocsByCategory } from "@/features/doc/data/documents";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const docs = getAllDocs();

  const blogs = docs.map((doc) => ({
    url: `${baseUrl}/blog/${doc.slug}`,
    lastModified: new Date(doc.metadata.updatedAt || doc.metadata.createdAt),
  }));

  const components = getDocsByCategory("components").map((doc) => ({
    url: `${baseUrl}/components/${doc.slug}`,
    lastModified: new Date(doc.metadata.updatedAt).toISOString(),
  }));

  const routes = ["", "/blog", "/components", "/collection"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogs, ...components];
}
