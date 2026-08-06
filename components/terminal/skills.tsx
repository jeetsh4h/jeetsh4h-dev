import { buildSkillsSection } from "@/lib/site-content";

export default function Skills({ filter }: { filter?: string }) {
  const skills = buildSkillsSection();
  const normalizedFilter = filter?.toLowerCase();
  const categories =
    normalizedFilter ?
      skills.categories.filter(
        (category) =>
          category.name.toLowerCase().includes(normalizedFilter) ||
          category.items.some((item) =>
            item.toLowerCase().includes(normalizedFilter),
          ),
      )
    : skills.categories;

  if (categories.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        No skill category matches{" "}
        <span className="text-secondary">{filter}</span>.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
        <div
          key={category.name}
          className="grid grid-cols-1 gap-x-1 sm:grid-cols-[11rem_auto_1fr]"
        >
          <span className="text-primary font-bold">{category.name}</span>
          <span className="text-accent">:</span>
          <span className="text-foreground">{category.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}
