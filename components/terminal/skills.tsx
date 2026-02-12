import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(SKILLS).map(([cat, val]) => (
        <div key={cat}>
          <span className="text-primary font-bold w-24 inline-block">
            {cat}
            {/* TODO: make the colons all in the same column */}
            <span className="text-accent">:</span>
          </span>
          <span className="text-foreground">{val}</span>
        </div>
      ))}
    </div>
  );
}
