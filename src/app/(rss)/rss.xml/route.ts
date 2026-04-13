import { SITE_CONFIG } from "@/config/site";
import { getDocsByCategory } from "@/features/doc/data/documents";

export const revalidate = false;
export const dynamic = "force-static";

const FEED_URL = `${SITE_CONFIG.url}/rss.xml`;

export function GET() {
  const blogs = getDocsByCategory("blogs");
  const components = getDocsByCategory("components");

  const allItems = [
    ...blogs.map((doc) => ({
      title: doc.metadata.title,
      link: `${SITE_CONFIG.url}/blog/${doc.slug}`,
      description: doc.metadata.description || "",
      date: new Date(doc.metadata.createdAt),
    })),
    ...components.map((doc) => ({
      title: doc.metadata.title,
      link: `${SITE_CONFIG.url}/components/${doc.slug}`,
      description: doc.metadata.description || "",
      date: new Date(doc.metadata.createdAt),
    })),
  ];

  allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  const items = allItems
    .map(
      (item) =>
        `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.date.toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_CONFIG.name}]]></title>
    <link>${SITE_CONFIG.url}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description><![CDATA[${SITE_CONFIG.description}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
