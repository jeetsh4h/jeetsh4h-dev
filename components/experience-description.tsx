import Link from "next/link";

import type { ExperienceTextLink } from "@/lib/data";
import { cn } from "@/lib/utils";

type ExperienceDescriptionProps = {
  text: string;
  links?: ExperienceTextLink[];
  linkClassName?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function ExperienceDescription({
  text,
  links,
  linkClassName,
}: ExperienceDescriptionProps) {
  if (!links?.length) {
    return text;
  }

  const linkMap = new Map(links.map((link) => [link.label, link]));
  const pattern = new RegExp(
    `(${links.map((link) => escapeRegExp(link.label)).join("|")})`,
    "g",
  );

  const segments = text.split(pattern);

  return segments.map((segment, index) => {
    const match = linkMap.get(segment);

    if (!match) {
      return <span key={`${segment}-${index}`}>{segment}</span>;
    }

    return (
      <Link
        key={`${match.label}-${index}`}
        href={match.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-primary underline decoration-primary/30 transition-colors hover:decoration-primary",
          linkClassName,
        )}
      >
        {match.label}
      </Link>
    );
  });
}
