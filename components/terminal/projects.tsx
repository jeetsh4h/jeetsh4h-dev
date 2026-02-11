import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {PROJECTS.map((proj, idx) => (
        <div
          key={idx}
          className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
              {proj.title}
            </div>
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
            >
              {proj.linkText} ↗
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            {proj.description}
          </div>
        </div>
      ))}
    </div>
  );
}
