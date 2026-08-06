import Link from "next/link";
import { buildResearchSection } from "@/lib/site-content";

export default function Research({ kind }: { kind?: string }) {
  const research = buildResearchSection();
  const entries =
    kind ?
      research.entries.filter((entry) => entry.kind === kind)
    : research.entries;

  if (entries.length === 0) {
    return (
      <p className="mt-2 text-xs text-muted-foreground">
        No research entries match <span className="text-secondary">{kind}</span>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      {entries.map((paper) => {
        const primaryLink = paper.links?.[0];
        const secondaryLinks = paper.links?.slice(1) ?? [];

        return (
          <div key={`${paper.title}-${paper.year}`}>
            {primaryLink ?
              <Link
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold block mb-1 text-primary underline decoration-primary/50 hover:decoration-primary transition-all"
              >
                {paper.title}
              </Link>
            : <div className="font-bold mb-1 text-primary">{paper.title}</div>}
            <div className="text-xs text-foreground">
              {paper.citationAuthors && (
                <span className="text-secondary">{paper.citationAuthors} </span>
              )}
              <span className="text-subtext">{paper.year}</span>
            </div>
            <p className="mt-1 text-xs text-foreground">{paper.summary}</p>
            {secondaryLinks.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-accent underline decoration-accent/40">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:decoration-accent transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
