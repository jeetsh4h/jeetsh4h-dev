import { Badge } from "./ui/badge";
import { SectionHeading } from "./ui/section";
import Link from "next/link";
import { buildResearchSection } from "@/lib/site-content";
import type { ResearchEntryModel } from "@/lib/site-content";

function ResearchEntry({ paper }: { paper: ResearchEntryModel }) {
  const primaryLink = paper.links?.[0];
  const secondaryLinks = paper.links?.slice(1) ?? [];

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-4">
          {primaryLink ?
            <Link
              href={primaryLink.href}
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
          <Badge>{paper.year}</Badge>
        </div>

        {paper.citationAuthors && (
          <div className="text-sm text-secondary">{paper.citationAuthors}</div>
        )}

        <p className="text-sm text-foreground leading-relaxed">
          {paper.summary}
        </p>

        {secondaryLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-accent underline decoration-accent/30">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:decoration-accent transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Research() {
  const research = buildResearchSection();

  return (
    <>
      <SectionHeading
        id="research-heading"
        command="research"
      />

      <div className="space-y-6 -mt-2">
        {research.entries.map((paper) => (
          <ResearchEntry
            key={`${paper.title}-${paper.year}`}
            paper={paper}
          />
        ))}
      </div>
    </>
  );
}
