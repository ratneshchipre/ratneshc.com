import Link from "next/link";

import { CopyButton } from "@/components/copy-button";

const linkClassName =
  "font-medium text-foreground underline-offset-4 hover:underline";

export default function Overview() {
  return (
    <section className="font-geist-sans">
      <p className="text-muted-foreground">
        I&apos;m a 20yo Design Engineer focused on building clean, scalable web
        products. <br /> <br /> Currently, I&apos;m building{" "}
        <Link
          href="https://www.draftlogo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="Visit draftlogo"
        >
          draftlogo
        </Link>{" "}
        &ndash; a SaaS that helps founders generate professional, minimal logos
        in seconds. I love crafting elegant web experiences, shipping fast, and
        turning ideas into real products. <br />
        <br />
        Previously, I&apos;ve worked with startups and shipped multiple
        projects. You can find more of my work on{" "}
        <Link
          href="https://x.com/ratneshchipre"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="Visit twitter"
        >
          @ratneshchipre
        </Link>
        , explore my code on{" "}
        <Link
          href="https://github.com/ratneshchipre"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="Visit github"
        >
          GitHub
        </Link>
        , or reach out via{" "}
        <Link
          href="mailto:ratneshchipre@gmail.com"
          className={linkClassName}
          aria-label="Mail to ratneshchipre"
        >
          email
        </Link>
        <CopyButton
          size="icon-sm"
          variant="ghost"
          text="ratneshchipre@gmail.com"
          className="ml-1.5 size-5 translate-y-[2px] hover:bg-transparent!"
        />
      </p>
    </section>
  );
}
