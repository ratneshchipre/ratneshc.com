import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden max-sm:px-5">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
