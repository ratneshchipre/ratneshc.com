import { EXPERIENCES } from "@/features/portfolio/data/experiences";

import ExperienceCard from "./experience-card";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mt-15 scroll-mt-20 space-y-5"
      aria-labelledby="experience-heading"
    >
      <header>
        <h2
          id="experience-heading"
          className="font-geist-pixel-square text-muted-foreground"
        >
          Experience
        </h2>
      </header>
      <div className="divide-y divide-border">
        {EXPERIENCES.map((experience) => (
          <div key={experience.id} className="py-3.5 first:pt-0 last:pb-0">
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
}
