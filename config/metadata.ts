import type { Metadata } from "next";

export const defaultWebsiteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Ratnesh \u2013 Developer",
  description:
    "I'm Ratnesh, a Full-Stack Web Developer. I love to build products.",
  keywords: [
    "Ratnesh",
    "Ratnesh Chipre",
    "ratnesh chipre",
    "ratnesh dev",
    "ratnesh full stack developer",
    "ratnesh dev portfolio",
    "ratnesh portfolio",
    "ratnesh developer portfolio",
  ],
};

export const websiteMetadata: Metadata = {
  ...defaultWebsiteMetadata,
  keywords: [
    ...(defaultWebsiteMetadata.keywords || []),
    "portfolio",
    "dev portfolio",
    "web developer",
    "full-stack developer",
    "typescript",
    "react",
    "next.js",
  ],
  authors: [
    {
      name: "Ratnesh",
      url: "https://ratneshc.com",
    },
  ],
  creator: "Ratnesh",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: "Ratnesh \u2013 Developer",
    description:
      "I'm Ratnesh, a Full-Stack Web Developer. I love to build products.",
    siteName: "Ratnesh",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Ratnesh \u2013 Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratnesh \u2013 Developer",
    description:
      "I'm Ratnesh, a Full-Stack Web Developer. I love to build products.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.png`],
    creator: "@ratneshchipre",
  },
  icons: {
    icon: "/images/avatar.png",
  },
};

interface GenerateWebsiteMetadataParams {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}

export const generateWebsiteMetadata = ({
  title,
  description,
  image,
  keywords,
}: GenerateWebsiteMetadataParams): Metadata => {
  const baseTitle = title || "Ratnesh \u2013 Developer";
  const finalTitle = baseTitle.includes("|")
    ? baseTitle
    : `${baseTitle} | Ratnesh`;
  const finalDescription = description || websiteMetadata.description!;

  const defaultOgImage = `${process.env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.png`;
  const finalImage = image
    ? `${process.env.NEXT_PUBLIC_APP_URL}/images/${image}`
    : Array.isArray(websiteMetadata.openGraph?.images)
      ? (websiteMetadata.openGraph.images[0] as any).url
      : defaultOgImage;

  return {
    ...websiteMetadata,
    title: finalTitle,
    description: finalDescription,
    keywords: Array.from(
      new Set([
        ...((websiteMetadata.keywords as string[]) || []),
        ...(keywords || []),
      ])
    ),
    openGraph: {
      ...websiteMetadata.openGraph,
      title: finalTitle,
      description: finalDescription,
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
      ...websiteMetadata.twitter,
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
  };
};
