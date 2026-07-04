import Image from "next/image";

import { TECH_STACK } from "@/features/portfolio/data/tech-stack";
import type { TechStack as TechStackItem } from "@/features/portfolio/types/tech-stack";

function TechIcon({
  id,
  title,
  theme,
}: Pick<TechStackItem, "id" | "title" | "theme">) {
  if (theme) {
    return (
      <>
        <Image
          src={`/images/tech-stack-icons/${id}-light.svg`}
          alt={`${title} logo`}
          width={16}
          height={16}
          className="hidden [html.light_&]:block"
          unoptimized
          aria-hidden="true"
        />
        <Image
          src={`/images/tech-stack-icons/${id}-dark.svg`}
          alt={`${title} logo`}
          width={16}
          height={16}
          className="hidden [html.dark_&]:block"
          unoptimized
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <Image
      src={`/images/tech-stack-icons/${id}.svg`}
      alt={`${title} logo`}
      width={16}
      height={16}
      unoptimized
      aria-hidden="true"
    />
  );
}

export default function TechStack() {
  return (
    <section
      id="stack"
      className="mt-15 scroll-mt-20 space-y-5"
      aria-labelledby="tech-stack-heading"
    >
      <header>
        <h2
          id="tech-stack-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          Tech Stack
        </h2>
      </header>
      <ul className="flex flex-wrap gap-3 select-none">
        {TECH_STACK.map((tech) => (
          <li key={tech.id}>
            <a
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1 font-geist-mono text-muted-foreground shadow-[inset_0_0.7px_0_0_rgba(255,255,255,0.8)] ring-1 ring-border/80 transition-colors duration-300 hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none dark:shadow-[inset_0_0.7px_0_0_rgba(255,255,255,0.2)]"
            >
              <TechIcon id={tech.id} title={tech.title} theme={tech.theme} />
              <span className="text-sm">{tech.title}</span>
              {tech.categories?.length ? (
                <span className="sr-only"> ({tech.categories.join(", ")})</span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
