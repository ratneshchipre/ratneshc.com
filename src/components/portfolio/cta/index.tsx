"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BackgroundStars } from "@/components/background-stars";

export default function CTA() {
  return (
    <section
      id="cta"
      className="mt-20 mb-5 scroll-mt-20"
      aria-labelledby="cta-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border">
        <BackgroundStars
          className="pointer-events-none absolute inset-0 h-full"
          svgOptions={{ duration: 2 }}
        />
        <div className="relative z-10 flex h-60 flex-col items-center justify-center gap-5 p-6 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="font-geist-pixel-square text-3xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="font-geist-sans text-sm text-muted-foreground sm:text-base">
              What&apos;s the best way to start? <br /> A quick call to
              understand your idea and see if we click.
            </p>
          </div>
          <div className="flex">
            <Link
              href="https://cal.com/ratneshchipre/30min"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mx-auto w-fit cursor-pointer bg-foreground font-geist-sans transition-colors hover:bg-foreground/90! active:scale-98"
              )}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
