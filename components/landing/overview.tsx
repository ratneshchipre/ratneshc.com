import Link from "next/link";
import { IconLogo } from "@/components/logo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";

export default function Overview() {
  return (
    <div className="font-geist-sans">
      <div>
        <p className="text-muted-foreground">
          I&apos;m a 20yo Full-Stack Developer focused on building clean,
          scalable web products. <br /> Currently, I&apos;m building{" "}
          <Link
            href="https://www.draftlogo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
            aria-label="Visit draftlogo"
          >
            <IconLogo className="mr-1.5 ml-0.5 h-4 w-4 rounded-sm" />
            draftlogo
          </Link>{" "}
          — a SaaS that helps founders generate professional, minimal logos in
          seconds. I love crafting elegant web experiences, shipping fast, and
          turning ideas into real products. <br />
          <br />
          Previously, I&apos;ve worked with startups and shipped multiple
          projects. You can find more of my work on{" "}
          <Link
            href="https://x.com/ratneshchipre"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
            aria-label="Visit twitter"
          >
            <HugeiconsIcon
              icon={NewTwitterIcon}
              strokeWidth={2}
              className="mr-1.5 ml-0.5 inline-flex h-4 w-4"
            />
            @ratneshchipre
          </Link>
          , explore my code on{" "}
          <Link
            href="https://github.com/ratneshchipre"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
            aria-label="Visit github"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              strokeWidth={2}
              className="mr-1.5 ml-0.5 inline-flex h-4 w-4"
            />
            GitHub
          </Link>
          , or reach out via{" "}
          <Link
            href="mailto:ratneshchipre@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
            aria-label="Mail to ratneshchipre"
          >
            <HugeiconsIcon
              icon={Mail01Icon}
              strokeWidth={2}
              className="mr-1.5 ml-0.5 inline-flex h-4 w-4"
            />
            email.
          </Link>
        </p>
      </div>
    </div>
  );
}
