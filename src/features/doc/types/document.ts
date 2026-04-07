export type DocMetadata = {
  title: string;
  description: string;
  image?: string;
  category?: string;
  icon?: string;
  new?: boolean;
  updated?: boolean;
  readingTime?: string;
  createdAt: string;
  updatedAt: string;
};

export type Doc = {
  metadata: DocMetadata;
  slug: string;
  content: string;
};

export type DocPreview = {
  slug: string;
  title: string;
  category?: string;
  icon?: string;
};
