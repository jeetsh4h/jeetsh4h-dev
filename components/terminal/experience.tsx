import ExperienceDescription from "../experience-description";
import { buildExperienceSection } from "@/lib/site-content";

export default function Experience() {
  const experience = buildExperienceSection();

  return (
    <div className="flex flex-col gap-8 mt-2">
      {experience.featuredEntries.map((job) => {
        return (
          <div
            key={`${job.company}-${job.role}-${job.period}`}
            className={`relative ${job.description ? "" : "opacity-80"}`}
          >
            <div
              className={`absolute -left-5.75 top-1.75 size-3 bg-accent rounded-full border-2 border-card ring-1 ring-input/50`}
            />

            <div className="flex justify-between items-baseline flex-wrap">
              <span className="text-primary font-bold text-base">
                {job.company}
              </span>
              <span className="text-xs text-muted-foreground bg-input/20 px-2 py-0.5 rounded w-fit">
                {job.period}
              </span>
            </div>
            <div className="mb-2 text-sm font-semibold text-secondary">
              {job.role}
            </div>

            {job.description && (
              <ul className="list-disc list-outside marker:text-accent text-foreground text-xs space-y-1 ml-4">
                {job.description.map((desc) => (
                  <li key={`${job.company}-${desc}`}>
                    <ExperienceDescription
                      text={desc}
                      links={job.textLinks}
                      linkClassName="decoration-primary/50"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {experience.compactEntries.length > 0 && (
        <div className="relative">
          <div className="text-muted-foreground text-xs space-y-3">
            {experience.compactEntries.map((job) => (
              <div
                key={`${job.company}-${job.role}-${job.period}`}
                className="relative"
              >
                <div className="absolute -left-5.75 top-0.75 size-3 bg-accent rounded-full border-2 border-card ring-1 ring-input/50" />

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-primary">
                      {job.company}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-input/20 px-2 py-0.5 rounded w-fit">
                      {job.period}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-secondary">
                    {job.role}
                  </div>
                  <div className="ml-2 mt-0.5 text-xs text-foreground">
                    {job.description?.[0] && (
                      <ExperienceDescription
                        text={job.description[0]}
                        links={job.textLinks}
                        linkClassName="decoration-primary/50"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
