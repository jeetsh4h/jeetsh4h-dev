import ExperienceDescription from "../experience-description";
import { buildExperienceSection } from "@/lib/site-content";
import type { ExperienceEntryModel } from "@/lib/site-content";

export type ExperienceCategory =
  | "all"
  | "engineering"
  | "research"
  | "teaching-writing";

const CATEGORY_LABELS: Record<Exclude<ExperienceCategory, "all">, string> = {
  engineering: "Engineering",
  research: "Research",
  "teaching-writing": "Teaching & Writing",
};

function ExperienceEntry({ job }: { job: ExperienceEntryModel }) {
  return (
    <div className="relative">
      <div className="absolute -left-5.75 top-1.75 size-3 rounded-full border-2 border-card bg-accent ring-1 ring-input/50" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-base font-bold text-primary">{job.company}</span>
        <span className="w-fit rounded bg-input/20 px-2 py-0.5 text-xs text-muted-foreground">
          {job.period}
        </span>
      </div>
      <div className="mb-2 text-sm font-semibold text-secondary">
        {job.role}
      </div>

      <ul className="ml-4 list-disc list-outside space-y-1 text-xs text-foreground marker:text-accent">
        {job.description.map((description) => (
          <li key={`${job.company}-${description}`}>
            <ExperienceDescription
              text={description}
              links={job.textLinks}
              linkClassName="decoration-primary/50"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceGroup({
  category,
  entries,
  showHeading,
}: {
  category: Exclude<ExperienceCategory, "all">;
  entries: ExperienceEntryModel[];
  showHeading: boolean;
}) {
  if (entries.length === 0) return null;

  return (
    <section>
      {showHeading && (
        <h3 className="mb-4 border-b border-input/50 pb-1 text-xs font-bold uppercase tracking-wider text-accent">
          {CATEGORY_LABELS[category]}
        </h3>
      )}
      <div className="flex flex-col gap-7">
        {entries.map((job) => (
          <ExperienceEntry
            key={`${job.company}-${job.role}-${job.period}`}
            job={job}
          />
        ))}
      </div>
    </section>
  );
}

export default function Experience({
  category = "all",
}: {
  category?: ExperienceCategory;
}) {
  const experience = buildExperienceSection();
  const entries = [...experience.featuredEntries, ...experience.compactEntries];
  const categories = (
    category === "all" ?
      ["engineering", "research", "teaching-writing"]
    : [category]) satisfies Exclude<ExperienceCategory, "all">[];

  return (
    <div className="mt-2 flex flex-col gap-7">
      {categories.map((currentCategory) => (
        <ExperienceGroup
          key={currentCategory}
          category={currentCategory}
          entries={entries.filter(
            (entry) => entry.category === currentCategory,
          )}
          showHeading={category === "all"}
        />
      ))}
    </div>
  );
}
