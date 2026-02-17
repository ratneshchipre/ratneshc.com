import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

function NavItem({ title, href, className }: NavItem & { className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "font-geist-pixel-square text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      {title}
    </a>
  );
}

export default function Nav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {items.map(({ title, href }) => {
        return <NavItem key={href} title={title} href={href} />;
      })}
    </nav>
  );
}
