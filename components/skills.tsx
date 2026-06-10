import { Badge } from "./ui/badge";
import { Card, CardHeader } from "./ui/card";
import { SectionGrid, SectionHeading } from "./ui/section";
import { buildSkillsSection } from "@/lib/site-content";

export default function Skills() {
  const skills = buildSkillsSection();

  return (
    <>
      <SectionHeading
        id="skills-heading"
        command="skills"
        className="gap-4"
      />

      <SectionGrid
        columns="sm"
        className="text-sm"
      >
        {skills.categories.map((category) => (
          <Card
            key={category.name}
            variant="content"
            className="p-4"
          >
            <CardHeader className="text-primary font-bold text-lg -mx-4">
              {category.name}
            </CardHeader>
            <div className="text-foreground leading-relaxed">
              {category.items.map((skill) => (
                <Badge
                  key={skill}
                  className="mr-2 mb-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </SectionGrid>
    </>
  );
}
