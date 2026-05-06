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
      <ScrollToTop />
    </>
  );
}
