import { SKILLS } from "@/lib/data";

export default function Skills() {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(SKILLS).map(([cat, val]) => (
        <div key={cat}>
          <span className="text-term-user font-bold w-24 inline-block">
            {cat}:
          </span>
          <span className="text-muted-foreground">{val}</span>
        </div>
      ))}
    </div>
  );
}
