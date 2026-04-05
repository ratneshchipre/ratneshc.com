"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CollectionFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function CollectionFilter({
  genres,
  selectedGenre,
  onGenreChange,
}: CollectionFilterProps) {
  return (
    <ToggleGroup
      value={[selectedGenre]}
      onValueChange={(value) => {
        if (value.length > 0) onGenreChange(value[0]);
      }}
      variant="outline"
      size="sm"
      spacing={2}
      className="flex-wrap justify-start font-geist-sans"
    >
      <ToggleGroupItem
        value="all"
        aria-label="Toggle All"
        className="cursor-pointer px-2"
      >
        All
      </ToggleGroupItem>
      {genres.map((genre) => (
        <ToggleGroupItem
          key={genre}
          value={genre}
          aria-label={`Toggle ${genre}`}
          className="cursor-pointer px-2"
        >
          {genre}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
