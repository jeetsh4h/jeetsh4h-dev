import TerminalCommandLink from "./terminal-command-link";
import Link from "next/link";
import { buildResearchSection } from "@/lib/site-content";

export default function Research() {
  const research = buildResearchSection();

  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="research" />
      </div>

      <div className="space-y-6 -mt-2">
        {research.entries.map((paper) => (
          <div
            key={paper.link}
            className="flex flex-col sm:flex-row gap-4 sm:items-start"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3 className="font-bold leading-tight text-primary underline decoration-primary/20 hover:decoration-primary transition-all">
                    {paper.title}
                  </h3>
                </Link>
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
