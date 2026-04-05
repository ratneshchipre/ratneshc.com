import type { Metadata } from "next";
import { SITE_CONFIG, X_USERNAME } from "./site";

export const defaultWebsiteMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} \u2013 Developer`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [
    {
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
  ],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} \u2013 Developer`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} \u2013 Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} \u2013 Developer`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: X_USERNAME,
  },
  icons: {
    icon: "/images/avatar.png",
  },
};

interface GenerateMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateWebsiteMetadata({
  title,
  description,
  image,
  url,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: GenerateMetadataParams = {}): Metadata {
  const finalTitle = title || `${SITE_CONFIG.name} \u2013 Developer`;
  const finalDescription = description || SITE_CONFIG.description;
  const finalImage = image || SITE_CONFIG.ogImage;
  const finalKeywords = keywords
    ? [...new Set([...SITE_CONFIG.keywords, ...keywords])]
    : SITE_CONFIG.keywords;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      url,
      type,
      title: finalTitle,
      description: finalDescription,
      publishedTime,
      modifiedTime,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
  };
}
