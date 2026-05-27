import { buildSkillsSection } from "@/lib/site-content";

export default function Skills() {
  const skills = buildSkillsSection();

  return (
    <div className="flex flex-col gap-2">
      {skills.categories.map((category) => (
        <div
          key={category.name}
          className="grid grid-cols-[6.5rem_auto_1fr] gap-x-1"
        >
          <span className="text-primary font-bold">{category.name}</span>
          <span className="text-accent">:</span>
          <span className="text-foreground">{category.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}
