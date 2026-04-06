import { PROJECTS } from "@/features/portfolio/data/projects";
import { Separator } from "@/components/ui/separator";

import ProjectCard from "./project-card";

export default function Projects() {
  if (!PROJECTS || PROJECTS.length === 0) {
    return (
      <section
        className="mt-15 space-y-5 font-geist-sans"
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
        <p className="text-sm text-muted-foreground">No projects available.</p>
      </section>
    );
  }

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
      <div className="space-y-5">
        {PROJECTS.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} />
            {index < PROJECTS.length - 1 && <Separator className="my-3" />}
          </div>
        ))}
      </div>
    </section>
  );
}
