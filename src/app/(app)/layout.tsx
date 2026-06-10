import dynamic from "next/dynamic";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
);

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden px-5">{children}</main>
      <SiteFooter />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
        aria-hidden
      >
        <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[3px]" />
        <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
      </div>
      <ScrollToTop />
    </>
  );
}
