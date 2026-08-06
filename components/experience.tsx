import ExperienceDescription from "./experience-description";
import { Badge } from "./ui/badge";
import { SectionHeading } from "./ui/section";
import { buildExperienceSection } from "@/lib/site-content";

export default function Experience() {
  const experience = buildExperienceSection();

  return (
    <>
      <SectionHeading
        id="experience-heading"
        command="experience"
      />

      <div className="relative ml-2 space-y-10 border-l-2 border-input/50 pl-8">
        {experience.featuredEntries.map((job) => (
          <div
            key={`${job.company}-${job.role}-${job.period}`}
            className="relative"
          >
            <div className="absolute -left-10.75 top-3.5 z-10 size-5 -translate-y-1/2 rounded-full bg-card before:absolute before:inset-1 before:rounded-full before:border-2 before:border-accent before:bg-card before:content-['']" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-lg font-bold text-primary">{job.company}</h3>
              <Badge>{job.period}</Badge>
            </div>
            <div className="mb-3 text-sm font-medium text-secondary">
              {job.role}
            </div>

            {job.description && (
              <ul className="list-disc list-outside marker:text-accent ml-4 space-y-1.5 text-foreground text-sm leading-relaxed">
                {job.description.map((ach) => (
                  <li key={`${job.company}-${ach}`}>
                    <ExperienceDescription
                      text={ach}
                      links={job.textLinks}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
