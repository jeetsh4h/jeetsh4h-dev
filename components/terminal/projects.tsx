import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {PROJECTS.map((proj, idx) => (
        <div
          key={idx}
          className="border border-border p-4 rounded-lg bg-card group cursor-pointer hover:border-accent"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-primary text-md underline decoration-primary/50 group-hover:decoration-primary transition-all">
              {proj.title}
            </div>
          </div>
          <div className="text-xs text-foreground">{proj.description}</div>
        </div>
      ))}
    </div>
  );
}
