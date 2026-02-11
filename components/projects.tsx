import { PROJECTS } from "@/lib/data";
import { IconTerminal2 } from "@tabler/icons-react";

export default function Projects() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
          <span className="text-term-muted">::</span> Projects
        </h2>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
          <IconTerminal2 className="w-3 h-3" />
          <span>projects</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
