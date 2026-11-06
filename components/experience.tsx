import ExperienceDescription from "./experience-description";
import {
  SectionDisclosure,
  SectionHeading,
  formatPeriod,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import { buildExperienceSection } from "@/lib/site-content";
import type { ExperienceEntryModel } from "@/lib/site-content";
import { cn } from "@/lib/utils";

function ExperienceEntry({
  job,
  compact = false,
}: {
  job: ExperienceEntryModel;
  compact?: boolean;
}) {
  return (
    <li className={sectionRowClassName}>
      <div className="min-w-0">
        <h3
          className={cn(
            "font-bold leading-snug text-primary-readable",
            compact ? "text-base" : "text-base sm:text-lg",
          )}
        >
          {job.company}
        </h3>
        <p className="text-sm leading-6 text-subtext">{job.role}</p>

        {job.description.length > 0 && (
          <ul
            className={cn(
              "mt-3 max-w-[72ch] list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed text-foreground marker:text-muted-foreground",
              !compact && "md:text-[0.9375rem]",
            )}
          >
            {job.description.map((item) => (
              <li key={`${job.company}-${item}`}>
                <ExperienceDescription
                  text={item}
                  links={job.textLinks}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={cn(sectionMetaClassName, !compact && "lg:pt-1")}>
        {formatPeriod(job.period)}
      </p>
    </li>
  );
}

export default function Experience() {
  const experience = buildExperienceSection();
  const earlierCount = experience.compactEntries.length;

  return (
    <>
      <SectionHeading
        id="experience-heading"
        command="experience"
      />

      <ol className="space-y-10">
        {experience.featuredEntries.map((job) => (
          <ExperienceEntry
            key={`${job.company}-${job.role}-${job.period}`}
            job={job}
          />
        ))}
      </ol>

      {earlierCount > 0 && (
        <SectionDisclosure
          className="lg:pl-[13.5rem]"
          closedLabel={`${earlierCount} earlier roles`}
          openLabel="hide earlier roles"
        >
          <ol className="space-y-8 lg:-ml-[13.5rem]">
            {experience.compactEntries.map((job) => (
              <ExperienceEntry
                key={`${job.company}-${job.role}-${job.period}`}
                job={job}
                compact
              />
            ))}
          </ol>
        </SectionDisclosure>
      )}
    </>
  );
}
