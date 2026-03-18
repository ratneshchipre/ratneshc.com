import { Metadata } from "next";
import { generateWebsiteMetadata } from "@/config/metadata";
import CollectionContainer from "@/components/collection/collection-container";

export const metadata: Metadata = generateWebsiteMetadata({
  title: "Collection | Ratnesh",
  description: "A curated list of my favorite movies, shows, books, and more.",
  keywords: [
    "collection",
    "Ratnesh collection",
    "movies and shows",
    "books collection",
  ],
  image: "collection/collection.png",
});

export default function CollectionPage() {
  return (
    <section className="space-y-12 pt-8" aria-labelledby="collection-heading">
      <header className="flex flex-col gap-3">
        <h2 id="collection-heading" className="font-geist-pixel-square text-xl">
          Collection
        </h2>
        <p className="font-geist-sans text-muted-foreground">
          A curated list of my favorite movies, shows, books, and more.
        </p>
      </header>
      <CollectionContainer />
    </section>
  );
}
