export type PostMetadata = {
  title: string;
  description: string;
  image?: string;
  category?: string;
  icon?: string;
  new?: boolean;
  readingTime?: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

export type PostPreview = {
  slug: string;
  title: string;
  category?: string;
  icon?: string;
};
