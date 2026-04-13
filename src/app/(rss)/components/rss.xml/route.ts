import { SITE_CONFIG } from "@/config/site";
import { getDocsByCategory } from "@/features/doc/data/documents";

export const revalidate = false;
export const dynamic = "force-static";

const FEED_URL = `${SITE_CONFIG.url}/components/rss.xml`;

export function GET() {
  const components = getDocsByCategory("components");

  const items = components
    .map(
      (doc) =>
        `    <item>
      <title><![CDATA[${doc.metadata.title}]]></title>
      <link>${SITE_CONFIG.url}/components/${doc.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/components/${doc.slug}</guid>
      <description><![CDATA[${doc.metadata.description || ""}]]></description>
      <pubDate>${new Date(doc.metadata.createdAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Components | ${SITE_CONFIG.name}]]></title>
    <link>${SITE_CONFIG.url}/components</link>
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
