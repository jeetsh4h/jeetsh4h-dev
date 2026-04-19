import { buildSkillsSection } from "@/lib/site-content";

export default function Skills() {
  const skills = buildSkillsSection();

  return (
    <div className="flex flex-col gap-2">
      {skills.categories.map((category) => (
        <div key={category.name}>
          <span className="text-primary font-bold w-24 inline-block">
            {category.name}
            {/* TODO: make the colons all in the same column */}
            <span className="text-accent">:</span>
          </span>
          <span className="text-foreground">{category.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}
