import { SKILLS } from "@/lib/data";
import { IconTerminal2 } from "@tabler/icons-react";

export default function Skills() {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
          <span className="text-term-muted">::</span> Skills
        </h2>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
          <IconTerminal2 className="w-3 h-3" />
          <span>skills</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="p-4 rounded-lg border border-term-border/50"
          >
            <div className="text-term-host font-bold mb-2">{category}</div>
            <div className="text-muted-foreground leading-relaxed">
              {items.split(", ").map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-term-border/20 px-2 py-0.5 rounded mr-2 mb-2 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
