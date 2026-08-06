import Link from "next/link";

import { buildAwardsSection } from "@/lib/site-content";

export default function Awards() {
  const awards = buildAwardsSection();

  return (
    <div className="mt-2 flex flex-col gap-4">
      {awards.entries.map((award) => (
        <div key={`${award.title}-${award.year}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-bold text-primary">{award.title}</span>
            <span className="rounded bg-input/20 px-2 py-0.5 text-xs text-muted-foreground">
              {award.year}
            </span>
          </div>
          <p className="mt-1 text-xs text-foreground">{award.result}</p>
          {award.link && (
            <Link
              href={award.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xs text-accent underline decoration-accent/40 hover:decoration-accent"
            >
              {award.link.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
