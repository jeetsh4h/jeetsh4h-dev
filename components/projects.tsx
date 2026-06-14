import { Badge } from "./ui/badge";
import { Card, CardHeader } from "./ui/card";
import { SectionHeading } from "./ui/section";
import Link from "next/link";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";

function ProjectCard({ project }: { project: ProjectEntryModel }) {
  return (
    <Card
      variant={project.link ? "interactive" : "content"}
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
          <Badge
            variant="status"
            className="text-[10px]"
          >
            {project.status}
          </Badge>
        )}
      </CardHeader>
      <p className="text-sm text-foreground leading-relaxed">
        {project.description}
      </p>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc list-outside marker:text-accent ml-4 space-y-1 text-xs text-foreground leading-relaxed">
          {project.highlights.map((highlight) => (
            <li key={`${project.title}-${highlight}`}>{highlight}</li>
          ))}
        </ul>
      )}
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Badge
              key={`${project.title}-${item}`}
              size="xs"
            >
              {item}
            </Badge>
          ))}
        </div>
      )}
      {project.confidentialityNote && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.confidentialityNote}
        </p>
      )}
    </Card>
  );
}

function ProjectCardItem({
  project,
  order,
}: {
  project: ProjectEntryModel;
  order: number;
}) {
  const card = <ProjectCard project={project} />;
  const itemProps = {
    className: "block",
    style: { order },
  };

  return project.link ?
      <Link
        href={project.link}
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
      .map((project, index) => ({ project, index }))
      .filter(({ index }) => index % 2 === columnIndex),
  );

  return (
    <>
      <SectionHeading
        id="projects-heading"
        command="projects"
      />

      <div className="grid grid-cols-1 gap-4 -mt-2 md:grid-cols-2 md:items-start">
        {projectColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="contents md:flex md:flex-col md:gap-4"
          >
            {column.map(({ project, index }) => (
              <ProjectCardItem
                key={project.title}
                project={project}
                order={index}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
