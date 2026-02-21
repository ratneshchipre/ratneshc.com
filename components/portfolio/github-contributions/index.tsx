import * as React from "react";
import { getGitHubContributions } from "@/features/portfolio/data/github-contributions";
import GitHubGraph, { GitHubGraphFallback } from "./github-graph";

export default function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <section
      className="mt-15 space-y-5"
      aria-labelledby="github-contributions-heading"
    >
      <header>
        <h2
          id="github-contributions-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          GitHub Contributions
        </h2>
      </header>
      <div>
        <React.Suspense fallback={<GitHubGraphFallback />}>
          <GitHubGraph contributions={contributions} />
        </React.Suspense>
      </div>
    </section>
  );
}
