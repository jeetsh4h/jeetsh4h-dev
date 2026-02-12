import { SKILLS } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";

export default function Skills() {
  return (
    <>
      <div className="flex items-center gap-4">
        <TerminalCommandLink command="skills" />
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
