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

      <div className="border-l-2 border-input/50 ml-2 space-y-10 pl-8 relative -mt-2">
        {experience.featuredEntries.map((job) => (
          <div
            key={`${job.company}-${job.role}-${job.period}`}
            className="relative"
          >
            <div className="absolute -left-9.75 top-1.5 size-3 rounded-full bg-card border-2 border-accent ring-2 ring-card" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-lg font-bold text-primary">{job.company}</h3>
              <Badge>{job.period}</Badge>
            </div>
            <div className="text-sm text-secondary font-medium mb-3">
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

        <div className="-mt-2 space-y-4">
          {experience.compactEntries.map((job) => (
            <div
              key={`${job.company}-${job.role}-${job.period}`}
              className="relative group"
            >
              <div className="absolute -left-9.75 top-1.5 size-3 rounded-full bg-card border-2 border-accent ring-2 ring-card" />

              <div className="text-sm">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-primary">{job.company}</span>
                  <Badge>{job.period}</Badge>
                </div>
                <div className="text-foreground text-xs mt-1 ml-2">
                  {job.description && (
                    <ExperienceDescription
                      text={job.description[0]}
                      links={job.textLinks}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
