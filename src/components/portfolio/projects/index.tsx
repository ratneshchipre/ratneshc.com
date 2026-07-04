import { getGitHubStargazerCountByRepo } from "@/features/portfolio/data/github-stargazers";
import { PROJECTS } from "@/features/portfolio/data/projects";

import ProjectCard from "./project-card";

export default async function Projects() {
  const repos = PROJECTS.flatMap((project) =>
    project.githubRepo ? [project.githubRepo] : []
  );
  const stargazerCounts = await getGitHubStargazerCountByRepo(repos);

  return (
    <section
      id="projects"
      className="mt-15 scroll-mt-20 space-y-5"
      aria-labelledby="projects-heading"
    >
      <header>
        <h2
          id="projects-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          Projects
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            stargazersCount={
              project.githubRepo
                ? stargazerCounts[project.githubRepo]
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
