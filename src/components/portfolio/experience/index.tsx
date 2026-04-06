import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import { Separator } from "@/components/ui/separator";

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
      <div>
        {EXPERIENCES.map((experience, index) => (
          <div key={experience.id}>
            <ExperienceCard experience={experience} />
            {index < EXPERIENCES.length - 1 && <Separator className="my-5" />}
          </div>
        ))}
      </div>
    </section>
  );
}
