import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import {
  SectionHeading,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import { ABOUT } from "@/lib/content/about";
import { buildResearchSection } from "@/lib/site-content";
import type { ResearchEntryModel } from "@/lib/site-content";

const KIND_LABELS: Record<ResearchEntryModel["kind"], string> = {
  preprint: "preprint",
  thesis: "thesis",
  presentation: "talk",
  interest: "interest",
};

function Authors({ authors }: { authors: string }) {
  return authors.split(ABOUT.name).map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && (
        <span className="font-semibold text-foreground">{ABOUT.name}</span>
      )}
      {part}
    </span>
  ));
}

function ResearchEntry({ paper }: { paper: ResearchEntryModel }) {
  return (
    <li className={sectionRowClassName}>
      <div className="min-w-0 max-w-[72ch] space-y-2">
        <h3 className="text-[0.9375rem] font-bold leading-snug text-primary-readable">
          {paper.title}
        </h3>

        {paper.citationAuthors && (
          <p className="text-sm text-subtext">
            <Authors authors={paper.citationAuthors} />
          </p>
        )}

        <p className="text-sm leading-relaxed text-foreground">
          {paper.summary}
        </p>

        {paper.links && paper.links.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-0.5 text-xs font-semibold">
            {paper.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm text-accent-readable underline decoration-accent-readable/30 underline-offset-4 transition-colors hover:decoration-accent-readable"
                >
                  {link.label}
                  <IconArrowUpRight
                    className="size-3.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={`${sectionMetaClassName} flex gap-3 lg:flex-col lg:gap-0`}>
        <span>{paper.year}</span>
        <span>{KIND_LABELS[paper.kind]}</span>
      </p>
    </li>
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

      <ol className="space-y-9">
        {research.entries.map((paper) => (
          <ResearchEntry
            key={`${paper.kind}-${paper.title}-${paper.year}`}
            paper={paper}
          />
        ))}
      </ol>
    </>
  );
}
