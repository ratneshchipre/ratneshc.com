export type BaseCollectionItem = {
  id: string;
  title: string;
  year: number;
  genre: string[];
};

export type MediaItem = BaseCollectionItem & {
  director: string;
};

export type BookItem = BaseCollectionItem & {
  author: string;
};

export type CollectionItem = MediaItem | BookItem;

export type Collection = {
  moviesAndShows: MediaItem[];
  books: BookItem[];
};
