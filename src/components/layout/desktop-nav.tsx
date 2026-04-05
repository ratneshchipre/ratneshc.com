import { NavItem } from "@/types/nav";
import Nav from "./nav";

export default function DesktopNav({ items }: { items: NavItem[] }) {
  return <Nav items={items} className="max-sm:hidden" />;
}
