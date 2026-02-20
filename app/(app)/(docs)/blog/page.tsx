export default function BlogPage() {
  return (
    <section className="space-y-10 pt-8" aria-labelledby="blog-heading">
      <header>
        <h2 id="blog-heading" className="font-geist-pixel-square text-lg">
          Blog
        </h2>
      </header>
      <div className="font-geist-sans">
        <div className="flex w-full cursor-pointer items-center justify-between gap-4">
          <h3>Make your first dollar as a developer</h3>
          <span className="text-[0.9rem] text-muted-foreground">
            Jan 15, 2026
          </span>
        </div>
      </div>
    </section>
  );
}
