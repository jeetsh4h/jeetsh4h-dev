import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Card } from "./ui/card";
import {
  SectionHeading,
  formatPeriod,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import { buildEducationSection } from "@/lib/site-content";
import { cn } from "@/lib/utils";

function DegreeName({ degree }: { degree: string }) {
  return degree.split(" · ").map((part, index) => (
    <span
      key={`${part}-${index}`}
      className="block"
    >
      {part}
    </span>
  ));
}

function DetailList({ details }: { details: string[] }) {
  if (details.length === 0) {
    return null;
  }

  return (
    <ul className="mt-3 max-w-[72ch] list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground marker:text-muted-foreground">
      {details.map((detail) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  );
}

export default function Education() {
  const education = buildEducationSection();

  return (
    <>
      <SectionHeading
        id="education-heading"
        command="education"
      />

      <ol className="space-y-10">
        {education.higherEducation.map((edu) => (
          <li
            key={`${edu.institution}-${edu.period}`}
            className={sectionRowClassName}
          >
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
                {edu.institution}
              </h3>
              <p className="text-sm leading-6 text-foreground">
                <DegreeName degree={edu.degree} />
              </p>
              <p className="text-xs leading-6 text-muted-foreground">
                {edu.location}
              </p>
              <DetailList details={edu.details} />
            </div>
            <p className={cn(sectionMetaClassName, "lg:pt-1")}>
              {formatPeriod(edu.period)}
            </p>
          </li>
        ))}

        {education.priorEducation.map((edu) => (
          <li
            key={`${edu.institution}-${edu.period}`}
            className={sectionRowClassName}
          >
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-primary-readable">
                {edu.institution}
              </h3>
              <p className="text-sm leading-6 text-foreground">
                <DegreeName degree={edu.degree} />
              </p>
              <DetailList details={edu.details} />
            </div>
            <p className={sectionMetaClassName}>{formatPeriod(edu.period)}</p>
          </li>
        ))}
      </ol>

      {education.coursework.length > 0 && (
        <div className={sectionRowClassName}>
          <h3
            className={cn(
              sectionMetaClassName,
              "text-sm font-bold text-primary-readable lg:pt-3",
            )}
          >
            Selected coursework{" "}
            <span className="block text-xs font-normal text-muted-foreground">
              FLAME University
            </span>
          </h3>
          <ul className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
            {education.coursework.map((course) => (
              <li key={course.code}>
                <Card
                  variant="interactive"
                  size="sm"
                  className="relative h-full gap-2 p-4 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold leading-snug text-primary-readable">
                      <Link
                        href={course.link}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-none after:absolute after:inset-0 after:content-['']"
                      >
                        {course.title}
                      </Link>
                    </h4>
                    <span className="inline-flex shrink-0 items-center gap-1 text-[11px] leading-5 text-muted-foreground">
                      {course.code}
                      <IconArrowUpRight
                        className="size-3 text-accent-readable"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground">
                    {course.artifact}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
