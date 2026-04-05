"use client";

import * as React from "react";
import { COLLECTION } from "@/features/portfolio/data/collection";
import CollectionSection from "@/components/collection/collection-section";
import CollectionFilter from "@/components/collection/collection-filter";
import { Separator } from "@/components/ui/separator";

export default function CollectionContainer() {
  const [selectedGenre, setSelectedGenre] = React.useState("all");

  const allGenres = React.useMemo(() => {
    const genres = new Set<string>();
    COLLECTION.moviesAndShows.forEach((item) => {
      item.genre.forEach((g) => genres.add(g));
    });
    return Array.from(genres).sort();
  }, []);

  const filteredItems = React.useMemo(() => {
    let items = COLLECTION.moviesAndShows;
    if (selectedGenre !== "all") {
      items = items.filter((item) => item.genre.includes(selectedGenre));
    }
    return [...items].sort((a, b) => b.year - a.year);
  }, [selectedGenre]);

  return (
    <div className="flex flex-col gap-8">
      <CollectionSection
        title="Movies & Shows"
        items={filteredItems}
        emptyMsg="No matches found for this genre."
      >
        <CollectionFilter
          genres={allGenres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </CollectionSection>
      <Separator />
      <CollectionSection
        title="Books"
        items={COLLECTION.books}
        emptyMsg="Building the shelf, slowly but surely :)"
      />
    </div>
  );
}
