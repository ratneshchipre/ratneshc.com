import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTableOfContents } from "fumadocs-core/content/toc";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import {
  findNeighbour,
  getAllDocs,
  getDocBySlug,
  getDocsByCategory,
  getDocUrl,
} from "@/features/doc/data/documents";
import { MDX } from "@/components/mdx";
import { Doc } from "@/features/doc/types/document";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG } from "@/config/site";
import { generateWebsiteMetadata } from "@/config/metadata";
import DocsTOC from "@/components/docs-toc";
import { toIsoDate } from "@/utils/date";
import { Kbd } from "@/components/ui/kbd";
import DocsKeyboardShortcuts from "@/components/docs/docs-keyboard-shortcuts";

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
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

export default async function BlogPostPage({
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

  const toc = getTableOfContents(doc.content);

  const allDocs = getDocsByCategory("blogs");
  const { previous, next } = findNeighbour(allDocs, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(doc)).replace(/</g, "\\u003c"),
        }}
      />
      <DocsKeyboardShortcuts
        previous={previous ? `/blog/${previous.slug}` : null}
        next={next ? `/blog/${next.slug}` : null}
      />
      <div className="flex flex-col space-y-12 pt-10">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-geist-pixel-square text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon
              icon={ArrowMoveUpLeftIcon}
              strokeWidth={2}
              className="size-4"
            />
            Blog
          </Link>
          <div className="flex items-center gap-2">
            <LLMCopyButtonWithViewOptions
              markdownUrl={`/blog/${doc.slug}.mdx`}
            />
            <PostShareMenu url={getDocUrl(doc)} />
            {previous && (
              <Tooltip>
                <TooltipTrigger
                  render={<Link href={`/blog/${previous.slug}`} />}
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
                </TooltipTrigger>
                <TooltipContent
                  className="py-2 pr-2 pl-3 text-[0.85rem]"
                  sideOffset={10}
                >
                  <div className="flex items-center gap-2">
                    Previous Post
                    <Kbd>
                      <HugeiconsIcon icon={ArrowLeft02Icon} />
                    </Kbd>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
            {next && (
              <Tooltip>
                <TooltipTrigger
                  render={<Link href={`/blog/${next.slug}`} />}
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
                </TooltipTrigger>
                <TooltipContent
                  className="py-2 pr-2 pl-3 text-[0.85rem]"
                  sideOffset={10}
                >
                  <div className="flex items-center gap-2">
                    Next Post
                    <Kbd>
                      <HugeiconsIcon icon={ArrowRight02Icon} />
                    </Kbd>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <Prose className="font-geist-sans">
          <h1 className="mb-1 text-3xl font-semibold tracking-tight">
            {doc.metadata.title.includes("|")
              ? doc.metadata.title.split("|")[0].trim()
              : doc.metadata.title}
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <p>
              {doc.metadata.createdAt
                ? new Date(doc.metadata.createdAt)
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    .toLowerCase()
                : ""}
            </p>
            <span>|</span>
            <p>{doc.metadata.readingTime}</p>
          </div>
          <Separator className="mt-5 mb-10 xl:-mb-2" />
          <DocsTOC items={toc} />
          <Separator className="mt-10 -mb-2 xl:hidden" />
          <div>
            <MDX code={doc.content} />
          </div>
        </Prose>
      </div>
    </>
  );
}
