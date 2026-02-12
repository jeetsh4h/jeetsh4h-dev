import { RESEARCH } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";

export default function Research() {
  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="research" />
      </div>

      <div className="space-y-6 -mt-2">
        {RESEARCH.map((paper, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-4 sm:items-start group"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold leading-tight text-primary underline decoration-primary/20 group-hover:decoration-primary transition-all">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {paper.title}
                  </a>
                </h3>
                <span className="text-xs text-foreground font-mono bg-term-border/20 px-2 py-0.5 rounded">
                  {paper.year}
                </span>
              </div>
              <div className="text-sm text-foreground">{paper.authors}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
