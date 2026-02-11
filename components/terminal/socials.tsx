import { SOCIALS } from "@/lib/data";

const LINK_STYLE =
  "text-term-path underline decoration-term-path/30 hover:decoration-term-path transition-all";

export default function Socials() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <a
        href={`https://${SOCIALS.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group"
      >
        <span className="text-term-host w-24">GitHub</span>
        <span className={LINK_STYLE}>{SOCIALS.github}</span>
      </a>
      <a
        href={`https://${SOCIALS.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group"
      >
        <span className="text-term-host w-24">LinkedIn</span>
        <span className={LINK_STYLE}>{SOCIALS.linkedin}</span>
      </a>
      <a
        href={`mailto:${SOCIALS.email}`}
        className="flex items-center gap-2 group"
      >
        <span className="text-term-host w-24">Email</span>
        <span className={LINK_STYLE}>{SOCIALS.email}</span>
      </a>
    </div>
  );
}
