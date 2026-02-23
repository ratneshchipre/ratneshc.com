import { TECH_STACK } from "@/features/portfolio/data/tech-stack";
import Image from "next/image";

export default function TechStack() {
  if (!TECH_STACK || TECH_STACK.length === 0) {
    return (
      <section
        className="mt-15 space-y-5 font-geist-sans"
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
        <p className="text-sm text-muted-foreground">
          No tech stack items available.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-15 space-y-5" aria-labelledby="tech-stack-heading">
      <header>
        <h2
          id="tech-stack-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          Tech Stack
        </h2>
      </header>
      <div>
        <ul
          className="flex flex-wrap gap-3 select-none"
          aria-describedby="tech-stack-description"
        >
          {TECH_STACK.map((tech) => (
            <li key={tech.id}>
              <a
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border bg-muted px-2.5 py-1 font-geist-mono text-muted-foreground transition-colors duration-300 hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {tech.theme ? (
                  <>
                    <Image
                      src={`/images/tech-stack-icons/${tech.id}-light.svg`}
                      alt={`${tech.title} logo`}
                      width={16}
                      height={16}
                      className="hidden [html.light_&]:block"
                      unoptimized
                      aria-hidden="true"
                    />
                    <Image
                      src={`/images/tech-stack-icons/${tech.id}-dark.svg`}
                      alt={`${tech.title} logo`}
                      width={16}
                      height={16}
                      className="hidden [html.dark_&]:block"
                      unoptimized
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <Image
                    src={`/images/tech-stack-icons/${tech.id}.svg`}
                    alt={`${tech.title} logo`}
                    width={16}
                    height={16}
                    unoptimized
                    aria-hidden="true"
                  />
                )}
                <span className="text-sm">{tech.title}</span>
                {tech.categories?.length ? (
                  <span className="sr-only">
                    {" "}
                    ({tech.categories.join(", ")})
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
