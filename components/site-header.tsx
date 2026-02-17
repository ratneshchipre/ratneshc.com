import { NAV_ITEMS } from "@/config/site";
import DesktopNav from "./layout/desktop-nav";
import SiteHeaderWrapper from "./site-header-wrapper";
import ThemeToggle from "./theme-toggle";
import { Separator } from "./ui/separator";
import MobileNav from "./layout/mobile-nav";

export default function SiteHeader() {
  return (
    <SiteHeaderWrapper className="sticky top-0 z-50 flex h-16 items-center overflow-hidden bg-background max-md:px-5 sm:py-10">
      <div className="flex w-full items-center justify-end gap-3">
        <DesktopNav items={NAV_ITEMS} />
        <div className="flex flex-col items-center justify-center max-sm:hidden">
          <Separator orientation="vertical" className="ml-2 h-4" />
        </div>
        <ThemeToggle />
        <div className="flex flex-col items-center justify-center sm:hidden">
          <Separator orientation="vertical" className="h-4" />
        </div>
        <MobileNav items={NAV_ITEMS} />
      </div>
    </SiteHeaderWrapper>
  );
}
