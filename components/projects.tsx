import { Badge } from "./ui/badge";
import { Card, CardHeader } from "./ui/card";
import { SectionGrid, SectionHeading } from "./ui/section";
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
      <SectionHeading
        id="projects-heading"
        command="projects"
      />

      <SectionGrid>
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
      </SectionGrid>
    </>
  );
}
