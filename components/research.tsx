import { RESEARCH } from "@/lib/data";
import { IconTerminal2 } from "@tabler/icons-react";

export default function Research() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
          <span className="text-term-muted">::</span> Research
        </h2>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
          <IconTerminal2 className="w-3 h-3" />
          <span>research</span>
        </div>
      </div>

      <div className="space-y-6">
        {RESEARCH.map((paper, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-4 sm:items-start group"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-foreground leading-tight group-hover:text-term-user transition-colors">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {paper.title}
                  </a>
                </h3>
                <span className="text-xs font-mono text-term-muted whitespace-nowrap border border-term-border px-2 py-0.5 rounded">
                  {paper.year}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {paper.authors}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
