import { CollectionItem } from "@/features/portfolio/types/collection";

import CollectionCard from "./collection-card";

interface CollectionSectionProps {
  title: string;
  items: CollectionItem[];
  children?: React.ReactNode;
  emptyMsg?: string;
}

export default function CollectionSection({
  title,
  items,
  children,
  emptyMsg,
}: CollectionSectionProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <h3 className="font-geist-sans text-lg">{title}</h3>
        {children}
      </div>
      <div className="flex flex-col gap-5">
        {isEmpty ? (
          <div className="font-geist-mono text-sm text-muted-foreground/60">
            <p>{emptyMsg || "Nothing here yet."}</p>
          </div>
        ) : (
          items.map((item) => <CollectionCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
