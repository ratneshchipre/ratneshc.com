"use client";

import { usePathname } from "next/navigation";

import type { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";

function NavItem({ title, href, className }: NavItem & { className?: string }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <a
      href={href}
      className={cn(
        "font-geist-pixel-square text-sm font-medium transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
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
    <nav className={cn("flex items-center gap-5", className)}>
      {items.map(({ title, href }) => {
        return <NavItem key={href} title={title} href={href} />;
      })}
    </nav>
  );
}
