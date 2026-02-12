import { EXPERIENCE } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";

export default function Experience() {
  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="experience" />
      </div>

      <div className="border-l-2 border-term-border/50 ml-2 space-y-10 pl-8 relative -mt-2">
        {EXPERIENCE.filter((e) => !e.compact).map((job, i) => (
          <div
            key={i}
            className="relative"
          >
            <div className="absolute -left-9.75 top-1.5 w-3 h-3 rounded-full bg-term-bg border-2 border-term-user ring-2 ring-term-bg" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h3 className="text-lg font-bold text-foreground pb-1.5">
                {job.company}
              </h3>
              <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded w-fit">
                {job.period}
              </span>
            </div>
            <div className="text-sm text-term-host font-medium mb-3">
              {job.role}
            </div>

            {job.description && (
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                {job.description.map((ach, j) => (
                  <li key={j}>{ach}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="-mt-2 space-y-4">
          {EXPERIENCE.filter((e) => e.compact).map((job, i) => (
            <div
              key={i}
              className="relative group"
            >
              <div className="absolute -left-9.75 top-1.5 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

              <div className="text-sm">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-foreground">
                    {job.company}
                  </span>
                  <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded">
                    {job.period}
                  </span>
                </div>
                <div className="text-muted-foreground text-xs mt-1 ml-2">
                  {job.description && job.description[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
