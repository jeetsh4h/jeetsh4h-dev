import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { SectionGrid, SectionHeading } from "./ui/section";
import { buildEducationSection } from "@/lib/site-content";

function DegreeName({ degree }: { degree: string }) {
  return degree.split(" · ").map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <span className="text-accent"> · </span>}
      {part}
    </span>
  ));
}

export default function Education() {
  const education = buildEducationSection();

  return (
    <>
      <SectionHeading
        id="education-heading"
        command="education"
      />

      <SectionGrid>
        {education.higherEducation.map((edu) => (
          <Card
            variant="content"
            size="sm"
            className="p-5"
            key={`${edu.institution}-${edu.period}`}
          >
            <CardHeader className="-mx-4 flex flex-wrap items-start justify-between gap-3">
              <CardTitle className="min-w-0 text-lg font-bold text-primary">
                {edu.institution}
              </CardTitle>
              <Badge className="mt-0.5 shrink-0 whitespace-nowrap">
                {edu.period}
              </Badge>
            </CardHeader>
            <div className="min-h-12 text-sm leading-6 text-secondary">
              <DegreeName degree={edu.degree} />
              <div className="text-xs text-muted-foreground">
                {edu.location}
              </div>
            </div>
            <div className="space-y-2 border-t border-input/50 pt-4">
              {edu.details.map((detail) => (
                <div
                  key={`${edu.institution}-${detail}`}
                  className="flex items-start gap-2 text-xs leading-relaxed text-foreground"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                  {detail}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {education.priorEducation.length > 0 &&
          education.priorEducation.map((edu) => (
            <Card
              variant="content"
              key={`${edu.institution}-${edu.period}`}
            >
              <CardHeader className="-mx-4 flex items-start justify-between gap-3">
                <CardTitle className="min-w-0 text-base font-bold leading-snug text-primary">
                  {edu.institution}
                </CardTitle>
                <Badge className="mt-0.5 shrink-0 whitespace-nowrap">
                  {edu.period}
                </Badge>
              </CardHeader>
              <div className="-mt-2 text-sm leading-6 text-secondary">
                <DegreeName degree={edu.degree} />
              </div>
              {edu.details.length > 0 && (
                <div className="space-y-1.5 border-t border-input/50 pt-3 text-xs text-foreground">
                  {edu.details.map((detail) => (
                    <div
                      key={`${edu.institution}-${detail}`}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                      {detail}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
      </SectionGrid>
    </>
  );
}
