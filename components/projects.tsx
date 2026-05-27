import TerminalCommandLink from "./terminal-command-link";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";

function ProjectCard({ project }: { project: ProjectEntryModel }) {
  return (
    <Card
      className={`p-5 rounded-md border-term-border/50 group transition-colors ${
        project.link ? "hover:ring-accent cursor-pointer" : ""
      }`}
    >
      <CardHeader className="flex justify-between items-start p-0 gap-3">
        <h3
          className={`text-lg font-bold text-primary transition-all ${
            project.link ?
              "underline decoration-primary/30 group-hover:decoration-primary"
            : ""
          }`}
        >
          {project.title}
        </h3>
        {project.status && (
          <span className="shrink-0 text-[10px] uppercase tracking-wide text-foreground bg-term-border/20 px-2 py-0.5 rounded">
            {project.status}
          </span>
        )}
      </CardHeader>
      <p className="text-sm text-foreground leading-relaxed">
        {project.description}
      </p>
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={`${project.title}-${item}`}
              className="text-[11px] bg-term-border/20 px-2 py-0.5 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      )}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc list-outside marker:text-accent ml-4 space-y-1 text-xs text-foreground leading-relaxed">
          {project.highlights.map((highlight) => (
            <li key={`${project.title}-${highlight}`}>{highlight}</li>
          ))}
        </ul>
      )}
      {project.confidentialityNote && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.confidentialityNote}
        </p>
      )}
    </Card>
  );
}

export default function Projects() {
  const projects = buildProjectsSection();

  return (
    <>
      <h2
        id="projects-heading"
        className="flex items-center"
      >
        <TerminalCommandLink command="projects" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {projects.entries.map((project) =>
          project.link ?
            <Link
              href={project.link}
              target="_blank"
              rel="noreferrer"
              key={project.title}
            >
              <ProjectCard project={project} />
            </Link>
          : <ProjectCard
              key={project.title}
              project={project}
            />,
        )}
      </div>
    </>
  );
}
