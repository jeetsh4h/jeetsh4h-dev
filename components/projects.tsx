import { PROJECTS } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";

export default function Projects() {
  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="projects" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {PROJECTS.map((project, i) => (
          <Card
            className="p-5 rounded-md border-term-border/50 group hover:ring-accent transition-colors cursor-pointer"
            key={i}
          >
            <CardHeader className="flex justify-between items-start p-0">
              <Link
                className="text-primary underline decoration-primary/30 group-hover:decoration-primary transition-all"
                href={project.link}
                target="_blank"
              >
                <h3 className="font-bold text-lg ">{project.title}</h3>
              </Link>
            </CardHeader>
            <p className="text-sm text-foreground leading-relaxed">
              {project.description}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
