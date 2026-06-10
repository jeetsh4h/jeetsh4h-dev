import Link from "next/link";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";

function ProjectCard({ proj }: { proj: ProjectEntryModel }) {
  return (
    <div
      className={`border border-border p-4 rounded-lg bg-card group ${
        proj.link ? "cursor-pointer hover:border-accent" : ""
      }`}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <div
          className={`text-primary text-md transition-all ${
            proj.link ?
              "underline decoration-primary/50 group-hover:decoration-primary"
            : ""
          }`}
        >
          {proj.title}
        </div>
        {proj.status && (
          <span className="shrink-0 text-[10px] uppercase tracking-wide text-foreground bg-input/20 px-2 py-0.5 rounded">
            {proj.status}
          </span>
        )}
      </div>
      <div className="text-xs text-foreground">{proj.description}</div>
      {proj.stack && proj.stack.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {proj.stack.map((item) => (
            <span
              key={`${proj.title}-${item}`}
              className="text-[10px] bg-input/20 px-1.5 py-0.5 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      )}
      {proj.highlights && proj.highlights.length > 0 && (
        <ul className="mt-2 list-disc list-outside marker:text-accent ml-4 space-y-1 text-xs text-foreground">
          {proj.highlights.map((highlight) => (
            <li key={`${proj.title}-${highlight}`}>{highlight}</li>
          ))}
        </ul>
      )}
      {proj.confidentialityNote && (
        <div className="mt-2 text-xs text-muted-foreground">
          {proj.confidentialityNote}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const projects = buildProjectsSection();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {projects.entries.map((proj) =>
        proj.link ?
          <Link
            key={proj.title}
            href={proj.link}
            target="_blank"
            rel="noreferrer"
          >
            <ProjectCard proj={proj} />
          </Link>
        : <ProjectCard
            key={proj.title}
            proj={proj}
          />,
      )}
    </div>
  );
}
