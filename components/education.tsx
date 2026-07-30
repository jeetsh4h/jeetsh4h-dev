import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { SectionGrid, SectionHeading } from "./ui/section";
import { buildEducationSection } from "@/lib/site-content";
import Link from "next/link";

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
            className="min-h-56 p-6"
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
            </div>
            <div className="mt-auto space-y-2 border-t border-input/50 pt-4">
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

      <div className="space-y-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Selected computer science coursework
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {education.coursework.map((course) => (
            <Link
              key={course.code}
              href={course.link}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-2 border border-input/50 bg-card/35 p-4 transition-colors hover:border-accent sm:grid-cols-[5.5rem_1fr]"
            >
              <span className="font-bold text-secondary">{course.code}</span>
              <span>
                <span className="block font-bold text-primary underline decoration-primary/20 transition-all group-hover:decoration-primary">
                  {course.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-foreground">
                  {course.artifact}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
