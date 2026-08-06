import Link from "next/link";

import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";

function DiaryEntry({ entry }: { entry: PublishedDiaryEntrySummary }) {
  return (
    <Link
      href={`/diary/${entry.slug}`}
      className="group block"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-bold text-primary underline decoration-primary/40 transition-all group-hover:decoration-2 group-hover:decoration-primary">
          {entry.title}
        </span>
        <span className="w-fit rounded bg-input/20 px-2 py-0.5 text-[10px] text-foreground">
          {entry.publishedAt}
        </span>
      </div>
      <p className="mt-1 text-xs text-foreground">{entry.description}</p>
      {entry.tags.length > 0 && (
        <div className="mt-1 text-[10px] text-secondary">
          {entry.tags.map((tag) => `#${tag}`).join(" ")}
        </div>
      )}
    </Link>
  );
}

function filterEntries(entries: PublishedDiaryEntrySummary[], args: string[]) {
  const [action = "list", ...rest] = args;
  const query = rest.join(" ").toLowerCase();

  if (action === "read") {
    return entries.filter((entry) => entry.slug === rest[0]);
  }

  if (action === "search") {
    return entries.filter((entry) =>
      [entry.title, entry.description, entry.slug, ...entry.tags].some(
        (value) => value.toLowerCase().includes(query),
      ),
    );
  }

  if (action === "tag") {
    return entries.filter((entry) =>
      entry.tags.some((tag) => tag.toLowerCase() === query),
    );
  }

  return entries;
}

export default function Diary({
  args,
  entries,
}: {
  args: string[];
  entries: PublishedDiaryEntrySummary[];
}) {
  const filteredEntries = filterEntries(entries, args);

  if (filteredEntries.length === 0) {
    return (
      <p className="mt-2 text-xs text-muted-foreground">
        No diary entries matched.
      </p>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-4">
      {filteredEntries.map((entry) => (
        <DiaryEntry
          key={entry.slug}
          entry={entry}
        />
      ))}
    </div>
  );
}
