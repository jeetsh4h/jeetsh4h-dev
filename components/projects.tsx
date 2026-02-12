import { PROJECTS } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";

export default function Projects() {
  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="projects" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {PROJECTS.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            className="block p-5 rounded-xl border border-term-border bg-card/30 hover:bg-card/80 hover:border-term-user transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-foreground group-hover:text-term-user transition-colors">
                {project.title}
              </h3>
              <span className="text-[10px] text-term-muted border border-term-border px-1.5 py-0.5 rounded">
                {project.linkText} ↗
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </>
  );
}
