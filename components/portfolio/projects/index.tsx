import ProjectCard from "./project-card";
import { PROJECTS } from "@/features/portfolio/data/projects";
import { Separator } from "@/components/ui/separator";

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
    <section className="mt-15 space-y-5" aria-labelledby="projects-heading">
      <header>
        <h2
          id="projects-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          Projects
        </h2>
      </header>
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} />
            {index < PROJECTS.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </section>
  );
}
