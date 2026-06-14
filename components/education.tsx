import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { SectionGrid, SectionHeading } from "./ui/section";
import { buildEducationSection } from "@/lib/site-content";

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
            key={`${edu.institution}-${edu.period}`}
          >
            <CardHeader className="flex justify-between items-center -mx-4">
              <CardTitle className="min-w-0 text-primary font-bold text-lg">
                {edu.institution}
              </CardTitle>
              <Badge className="mt-0.5 shrink-0 whitespace-nowrap">
                {edu.period}
              </Badge>
            </CardHeader>
            <div className="-mt-2.5 text-sm text-secondary mb-4 leading-6 min-h-12 overflow-hidden">
              {edu.degree}
            </div>
            <div className="-mt-6 space-y-1.5 pt-4 border-t border-input/50">
              {edu.details.map((detail) => (
                <div
                  key={`${edu.institution}-${detail}`}
                  className="text-xs text-foreground flex items-center gap-2"
                >
                  <span className="size-1 rounded-full bg-accent" />
                  {detail}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {education.priorEducation.length > 0 && (
          <Card
            variant="content"
            className="md:col-span-2"
          >
            <div className="space-y-4">
              {education.priorEducation.map((edu, index) => (
                <div
                  key={`${edu.institution}-${edu.period}`}
                  className={
                    index > 0 ? "border-t border-input/50 pt-4" : ""
                  }
                >
                  <CardHeader className="flex items-center justify-between -mx-4">
                    <CardTitle className="min-w-0 text-lg font-bold text-primary">
                      {edu.institution}
                    </CardTitle>
                    <Badge className="mt-0.5 shrink-0 whitespace-nowrap">
                      {edu.period}
                    </Badge>
                  </CardHeader>
                  <div className="text-sm text-secondary leading-6">
                    {edu.degree}
                  </div>
                  {edu.details.length > 0 && (
                    <div className="pt-1 text-xs text-foreground">
                      {edu.details.map((detail) => (
                        <div
                          key={`${edu.institution}-${detail}`}
                          className="flex items-center gap-2"
                        >
                          <span className="size-1 rounded-full bg-accent" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </SectionGrid>
    </>
  );
}
