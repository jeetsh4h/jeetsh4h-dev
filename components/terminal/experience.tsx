import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  const featuredExp = EXPERIENCE.filter((job) => !job.compact);
  const compactExp = EXPERIENCE.filter((job) => job.compact);

  return (
    <div className="flex flex-col gap-8 mt-2">
      {featuredExp.map((job, idx) => {
        const dotColor = idx % 2 === 0 ? "bg-term-user" : "bg-term-host";

        return (
          <div
            key={idx}
            className={`relative ${job.description ? "" : "opacity-80"}`}
          >
            <div
              className={`absolute -left-5.75 top-1.5 w-3 h-3 ${dotColor} rounded-full border-2 border-term-bg ring-1 ring-term-border/50`}
            />

            <div className="flex justify-between items-baseline flex-wrap">
              <span className="text-term-user font-bold text-base">
                {job.company}
              </span>
              <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded w-fit">
                {job.period}
              </span>
            </div>
            <div className="text-term-host text-sm mb-2 font-semibold">
              {job.role}
            </div>

            {job.description && (
              <ul className="list-disc list-outside text-muted-foreground text-xs space-y-1 ml-4">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {compactExp.length > 0 && (
        <div className="relative opacity-80">
          <div className="text-muted-foreground text-xs space-y-3">
            {compactExp.map((job, idx) => (
              <div
                key={idx}
                className="relative"
              >
                <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-term-user">
                      {job.company}
                    </span>
                    <span className="text-term-muted text-xs">
                      {job.period}
                    </span>
                  </div>
                  <div className="ml-2 mt-0.5">{job.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
