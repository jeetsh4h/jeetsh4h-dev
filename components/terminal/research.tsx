import Link from "next/link";
import { buildResearchSection } from "@/lib/site-content";

export default function Research() {
  const research = buildResearchSection();

  return (
    <div className="flex flex-col gap-4 mt-2">
      {research.entries.map((paper) => (
        <div
          key={`${paper.title}-${paper.year}`}
          className="border-l-2 border-accent pl-3"
        >
          {paper.links?.[0] ?
            <Link
              href={paper.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold block mb-1 text-primary underline decoration-primary/50 hover:decoration-primary transition-all"
            >
              {paper.title}
            </Link>
          : <div className="font-bold mb-1 text-primary">{paper.title}</div>
          }
          <div className="text-xs text-foreground">
            {paper.citationAuthors && <span>{paper.citationAuthors} </span>}
            <span className="text-secondary">{paper.year}</span>
          </div>
          <p className="mt-1 text-xs text-foreground">{paper.summary}</p>
          {paper.contribution && (
            <p className="mt-1 text-xs text-muted-foreground">
              {paper.contribution}
            </p>
          )}
          {paper.links && paper.links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-primary underline decoration-primary/40">
              {paper.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:decoration-primary transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
