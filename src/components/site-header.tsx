import { NAV_ITEMS } from "@/config/site";
import { getAllDocs } from "@/features/doc/data/documents";

import { CommandMenu } from "./command-menu";
import DesktopNav from "./layout/desktop-nav";
import MobileNav from "./layout/mobile-nav";
import NavItemGitHub from "./nav-item-github";
import SiteHeaderWrapper from "./site-header-wrapper";
import ThemeToggle from "./theme-toggle";
import { Separator } from "./ui/separator";

export default function SiteHeader() {
  const docs = getAllDocs();

  return (
    <SiteHeaderWrapper className="sticky top-0 z-50 flex h-16 items-center overflow-hidden bg-background px-5 max-md:px-5 sm:py-10">
      <div className="flex w-full items-center justify-end gap-3 sm:justify-between">
        <DesktopNav items={NAV_ITEMS} />
        <div className="flex items-center">
          <CommandMenu docs={docs} />
          <NavItemGitHub />
          <div className="flex flex-col items-center justify-center max-sm:hidden">
            <Separator orientation="vertical" className="mx-3 h-4" />
          </div>
          <ThemeToggle />
          <div className="flex flex-col items-center justify-center sm:hidden">
            <Separator orientation="vertical" className="ml-2.5 h-4" />
          </div>
        </div>
        <MobileNav items={NAV_ITEMS} />
      </div>
    </SiteHeaderWrapper>
  );
}
