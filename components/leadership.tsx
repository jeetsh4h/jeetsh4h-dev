import { Badge } from "./ui/badge";
import { SectionHeading } from "./ui/section";
import { buildLeadershipSection } from "@/lib/site-content";
import type { LeadershipEntryModel } from "@/lib/site-content";

// Multi-role periods already name each role ("President 2023-2024 ·
// Treasurer 2024-2025"), so they replace the separate role line.
function periodNamesRoles(entry: LeadershipEntryModel) {
  return entry.roles.some((role) => entry.period.includes(role));
}

export default function Leadership() {
  const leadership = buildLeadershipSection();

  return (
    <>
      <SectionHeading
        id="leadership-heading"
        command="leadership"
      />

      <div className="-mt-2 grid grid-cols-1 gap-x-10 gap-y-6 pl-1 sm:pl-6 md:grid-cols-2">
        {leadership.entries.map((entry) => (
          <div
            key={`${entry.organization}-${entry.period}`}
            className="space-y-2"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="-ml-2 font-bold leading-tight text-primary sm:-ml-3">
                {entry.organization}
              </h3>
              {!periodNamesRoles(entry) && (
                <Badge className="shrink-0">{entry.period}</Badge>
              )}
            </div>

            <div className="text-sm text-secondary">
              {periodNamesRoles(entry) ? entry.period : entry.roles.join(", ")}
            </div>

            {entry.description && (
              <p className="text-sm text-foreground leading-relaxed">
                {entry.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
