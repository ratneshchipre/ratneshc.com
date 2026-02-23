import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";
import Link from "next/link";
import {
  findNeighbour,
  getAllPosts,
  getPostBySlug,
} from "@/features/blog/data/posts";
import { MDX } from "@/components/mdx";
import { Post } from "@/features/blog/types/post";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowMoveUpLeftIcon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import PostShareMenu from "@/components/blog/post-share-menu";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = post.metadata;

  const postUrl = getPostUrl(post);
  const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: toIsoDate(createdAt),
      modifiedTime: toIsoDate(updatedAt),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    // url: `${SITE_INFO.url}${getPostUrl(post)}`,
    datePublished: toIsoDate(post.metadata.createdAt),
    dateModified: toIsoDate(post.metadata.updatedAt),
    author: {
      "@type": "Person",
      //   name: USER.displayName,
      //   identifier: USER.username,
      //   image: USER.avatar,
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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const { previous, next } = findNeighbour(allPosts, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex flex-col space-y-12 pt-8">
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
            <PostShareMenu url={getPostUrl(post)} />
            {previous && (
              <Link href={`/blog/${previous.slug}`}>
                <Button variant="secondary" className="cursor-pointer px-2">
                  <HugeiconsIcon
                    icon={ArrowLeft02Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  <span className="sr-only">Previous</span>
                </Button>
              </Link>
            )}
            {next && (
              <Link href={`/blog/${next.slug}`}>
                <Button variant="secondary" className="cursor-pointer px-2">
                  <span className="sr-only">Next</span>
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </Button>
              </Link>
            )}
          </div>
        </div>
        <Prose className="font-geist-sans">
          <h1 className="mb-1 text-3xl font-semibold tracking-tight">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <p>
              {post.metadata.createdAt
                ? new Date(post.metadata.createdAt)
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    .toLowerCase()
                : ""}
            </p>
            <span>|</span>
            <p>{post.metadata.readingTime}</p>
          </div>
          <Separator className="mt-5 -mb-2" />
          <div>
            <MDX code={post.content} />
          </div>
        </Prose>
      </div>
    </>
  );
}

function getPostUrl(post: Post) {
  const isComponent = post.metadata.category === "components";
  return isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`;
}

function toIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}
