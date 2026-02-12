import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  const featuredExp = EXPERIENCE.filter((job) => !job.compact);
  const compactExp = EXPERIENCE.filter((job) => job.compact);

  return (
    <div className="flex flex-col gap-8 mt-2">
      {featuredExp.map((job, idx) => {
        return (
          <div
            key={idx}
            className={`relative ${job.description ? "" : "opacity-80"}`}
          >
            <div
              className={`absolute -left-5.75 top-1.75 size-3 bg-accent rounded-full border-2 border-card ring-1 ring-term-border/50`}
            />

            <div className="flex justify-between items-baseline flex-wrap">
              <span className="text-primary font-bold text-base">
                {job.company}
              </span>
              <span className="text-xs text-muted-foreground bg-term-border/20 px-2 py-0.5 rounded w-fit">
                {job.period}
              </span>
            </div>
            <div className="text-secondary text-sm mb-2 font-semibold">
              {job.role}
            </div>

            {job.description && (
              <ul className="list-disc list-outside marker:text-accent text-foreground text-xs space-y-1 ml-4">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {compactExp.length > 0 && (
        <div className="relative">
          <div className="text-muted-foreground text-xs space-y-3">
            {compactExp.map((job, idx) => (
              <div
                key={idx}
                className="relative"
              >
                <div className="absolute -left-5.75 top-0.75 size-3 bg-accent rounded-full border-2 border-card ring-1 ring-term-border/50" />

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semi-bold text-primary text-sm">
                      {job.company}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-term-border/20 px-2 py-0.5 rounded w-fit">
                      {job.period}
                    </span>
                  </div>
                  <div className="ml-2 mt-0.5 text-sx text-foreground">
                    {job.description}
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
