"use client";

import * as React from "react";

import { Separator } from "@/components/ui/separator";
import CollectionFilter from "@/components/collection/collection-filter";
import CollectionSection from "@/components/collection/collection-section";
import { COLLECTION } from "@/features/portfolio/data/collection";

const allGenres = Array.from(
  new Set(COLLECTION.moviesAndShows.flatMap((item) => item.genre))
).sort();

export default function CollectionContainer() {
  const [selectedGenre, setSelectedGenre] = React.useState("all");

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
