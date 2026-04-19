import TerminalCommandLink from "./terminal-command-link";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";
import { buildProjectsSection } from "@/lib/site-content";

export default function Projects() {
  const projects = buildProjectsSection();

  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="projects" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {projects.entries.map((project) => (
          <Link
            href={project.link}
            target="_blank"
            key={project.link}
          >
            <Card className="p-5 rounded-md border-term-border/50 group hover:ring-accent transition-colors cursor-pointer">
              <CardHeader className="flex justify-between items-start p-0">
                <h3 className="text-lg font-bold text-primary underline decoration-primary/30 transition-all group-hover:decoration-primary">
                  {project.title}
                </h3>
              </CardHeader>
              <p className="text-sm text-foreground leading-relaxed">
                {project.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
