import { Badge } from "./ui/badge";
import { Card, CardHeader } from "./ui/card";
import { SectionHeading } from "./ui/section";
import Link from "next/link";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";

function ProjectCard({
  project,
  interactive = false,
}: {
  project: ProjectEntryModel;
  interactive?: boolean;
}) {
  return (
    <Card variant={interactive ? "interactive" : "content"}>
      <CardHeader className="flex justify-between items-start p-0 gap-3">
        <h3
          className={`text-lg font-bold text-primary transition-all ${
            interactive ?
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
      {!interactive && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-accent underline decoration-accent/30">
          {project.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hover:decoration-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}

function ProjectCardItem({ project }: { project: ProjectEntryModel }) {
  const primaryLink = project.links[0];
  const itemClassName = "block h-full [&>[data-slot=card]]:h-full";

  if (project.links.length === 1 && primaryLink) {
    return (
      <Link
        href={primaryLink.href}
        target="_blank"
        rel="noreferrer"
        className={itemClassName}
      >
        <ProjectCard
          project={project}
          interactive
        />
      </Link>
    );
  }

  return (
    <div className={itemClassName}>
      <ProjectCard project={project} />
    </div>
  );
}

export default function Projects() {
  const projects = buildProjectsSection();
  const featuredProjects = projects.entries.filter(
    (project) => project.featured,
  );

  return (
    <>
      <SectionHeading
        id="featured-work-heading"
        command="projects"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCardItem
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </>
  );
}
