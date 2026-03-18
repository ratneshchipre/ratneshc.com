import { CollectionItem } from "@/features/portfolio/types/collection";

export default function CollectionCard({ item }: { item: CollectionItem }) {
  const meta = "director" in item ? item.director : item.author;

  return (
    <div className="flex flex-col gap-1">
      <p className="font-geist-sans">{item.title}</p>
      <div className="flex items-center gap-1.5 font-geist-mono text-sm text-muted-foreground">
        <p>{meta}</p>•<p>{item.year}</p>
      </div>
    </div>
  );
}
