import { EDUCATION } from "@/lib/data";
import { IconTerminal2 } from "@tabler/icons-react";

export default function Education() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
          <span className="text-term-muted">::</span> Education
        </h2>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
          <IconTerminal2 className="w-3 h-3" />
          <span>education</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-term-border bg-card/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground">{edu.institution}</h3>
                <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded">
                  {edu.period}
                </span>
              </div>
              <div className="text-sm text-term-host font-medium mb-4">
                {edu.degree}
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-term-border/50">
              {edu.details.map((detail, j) => (
                <div
                  key={j}
                  className="text-xs text-muted-foreground flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-term-path" />
                  {detail}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
