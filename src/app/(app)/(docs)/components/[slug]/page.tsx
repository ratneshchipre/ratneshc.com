import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTableOfContents } from "fumadocs-core/content/toc";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import {
  findNeighbour,
  getDocBySlug,
  getDocsByCategory,
  getDocUrl,
} from "@/features/doc/data/documents";
import { MDX } from "@/components/mdx";
import { Doc } from "@/features/doc/types/document";
import { buttonVariants } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowMoveUpLeftIcon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { LLMCopyButtonWithViewOptions } from "@/components/docs/page-actions";
import PostShareMenu from "@/components/docs/post-share-menu";
import { SITE_CONFIG } from "@/config/site";
import { generateWebsiteMetadata } from "@/config/metadata";
import DocsTOC from "@/components/docs-toc";
import { toIsoDate } from "@/utils/date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc || doc.metadata.category !== "components") {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = doc.metadata;

  const docUrl = getDocUrl(doc);
  const ogImage = image || "/images/opengraph-image.png";

  return generateWebsiteMetadata({
    title,
    description,
    image: ogImage,
    url: docUrl,
    type: "article",
    publishedTime: toIsoDate(createdAt),
    modifiedTime: toIsoDate(updatedAt),
  });
}

function getPageJsonLd(doc: Doc): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: doc.metadata.title,
    description: doc.metadata.description,
    image: doc.metadata.image
      ? `${SITE_CONFIG.url}${doc.metadata.image}`
      : SITE_CONFIG.ogImage,
    url: `${SITE_CONFIG.url}${getDocUrl(doc)}`,
    datePublished: toIsoDate(doc.metadata.createdAt),
    dateModified: toIsoDate(doc.metadata.updatedAt),
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
      image: `${SITE_CONFIG.url}/images/avatar.png`,
    },
  };
}

export default async function ComponentSlugPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  if (doc.metadata.category !== "components") {
    notFound();
  }

  const toc = getTableOfContents(doc.content);

  const allDocs = getDocsByCategory("components")
    .slice()
    .sort((a, b) =>
      a.metadata.title.localeCompare(b.metadata.title, "en", {
        sensitivity: "base",
      })
    );

  const { previous, next } = findNeighbour(allDocs, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(doc)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex flex-col space-y-12 pt-10">
        <div className="flex items-center justify-between">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 font-geist-pixel-square text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon
              icon={ArrowMoveUpLeftIcon}
              strokeWidth={2}
              className="size-4"
            />
            Components
          </Link>
          <div className="flex items-center gap-2">
            <LLMCopyButtonWithViewOptions
              markdownUrl={`/components/${doc.slug}.mdx`}
              isComponent
            />
            <PostShareMenu url={getDocUrl(doc)} />
            {previous && (
              <Link
                href={`/components/${previous.slug}`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "cursor-pointer border-none"
                )}
              >
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                <span className="sr-only">Previous</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/components/${next.slug}`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "cursor-pointer border-none"
                )}
              >
                <span className="sr-only">Next</span>
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </Link>
            )}
          </div>
        </div>
        <Prose className="font-geist-sans">
          <div>
            <h1 className="mb-1 text-3xl font-semibold tracking-tight">
              {doc.metadata.title.includes("|")
                ? doc.metadata.title.split("|")[0].trim()
                : doc.metadata.title}
            </h1>
            <p className="text-muted-foreground">{doc.metadata.description}</p>
          </div>
          <DocsTOC items={toc} />
          <div className="mt-10">
            <MDX code={doc.content} />
          </div>
        </Prose>
      </div>
    </>
  );
}
