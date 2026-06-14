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
      {proj.highlights && proj.highlights.length > 0 && (
        <ul className="mt-2 list-disc list-outside marker:text-accent ml-4 space-y-1 text-xs text-foreground">
          {proj.highlights.map((highlight) => (
            <li key={`${proj.title}-${highlight}`}>{highlight}</li>
          ))}
        </ul>
      )}
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
      {proj.confidentialityNote && (
        <div className="mt-2 text-xs text-muted-foreground">
          {proj.confidentialityNote}
        </div>
      )}
    </div>
  );
}

function ProjectCardItem({
  proj,
  order,
}: {
  proj: ProjectEntryModel;
  order: number;
}) {
  const card = <ProjectCard proj={proj} />;
  const itemProps = {
    className: "block",
    style: { order },
  };

  return proj.link ?
      <Link
        href={proj.link}
        target="_blank"
        rel="noreferrer"
        {...itemProps}
      >
        {card}
      </Link>
    : <div {...itemProps}>{card}</div>;
}

export default function Projects() {
  const projects = buildProjectsSection();
  const projectColumns = [0, 1].map((columnIndex) =>
    projects.entries
      .map((proj, index) => ({ proj, index }))
      .filter(({ index }) => index % 2 === columnIndex),
  );

  return (
    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 md:items-start">
      {projectColumns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="contents md:flex md:flex-col md:gap-4"
        >
          {column.map(({ proj, index }) => (
            <ProjectCardItem
              key={proj.title}
              proj={proj}
              order={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
