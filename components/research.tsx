import TerminalCommandLink from "./terminal-command-link";
import Link from "next/link";
import { buildResearchSection } from "@/lib/site-content";

export default function Research() {
  const research = buildResearchSection();

  return (
    <>
      <h2
        id="research-heading"
        className="flex items-center"
      >
        <TerminalCommandLink command="research" />
      </h2>

      <div className="space-y-6 -mt-2">
        {research.entries.map((paper) => (
          <div
            key={`${paper.title}-${paper.year}`}
            className="flex flex-col sm:flex-row gap-4 sm:items-start"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                {paper.links?.[0] ?
                  <Link
                    href={paper.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h3 className="font-bold leading-tight text-primary underline decoration-primary/20 hover:decoration-primary transition-all">
                      {paper.title}
                    </h3>
                  </Link>
                : <h3 className="font-bold leading-tight text-primary">
                    {paper.title}
                  </h3>
                }
                <span className="text-xs text-foreground font-mono bg-term-border/20 px-2 py-0.5 rounded">
                  {paper.year}
                </span>
              </div>

              {paper.citationAuthors && (
                <div className="text-sm text-secondary">
                  {paper.citationAuthors}
                </div>
              )}

              <p className="text-sm text-foreground leading-relaxed">
                {paper.summary}
              </p>

              {paper.contribution && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {paper.contribution}
                </p>
              )}

              {paper.links && paper.links.length > 0 && (
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-primary underline decoration-primary/30">
                  {paper.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:decoration-primary transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
