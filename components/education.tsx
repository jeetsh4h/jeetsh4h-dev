import TerminalCommandLink from "./terminal-command-link";
import { Card, CardHeader } from "./ui/card";
import { buildEducationSection } from "@/lib/site-content";

export default function Education() {
  const education = buildEducationSection();

  return (
    <>
      <h2
        id="education-heading"
        className="flex items-center"
      >
        <TerminalCommandLink command="education" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {education.higherEducation.map((edu) => (
          <Card
            className="p-5 rounded-md border-term-border/50"
            key={`${edu.institution}-${edu.period}`}
          >
            <CardHeader className="flex justify-between items-center -mx-4">
              <span className="text-primary font-bold text-lg">
                {edu.institution}
              </span>
              <span className="inline-block bg-term-border/20 px-2 py-0.5 rounded mt-0.5 text-xs">
                {edu.period}
              </span>
            </CardHeader>
            <div className="-mt-2.5 text-sm text-secondary mb-4 leading-6 min-h-12 overflow-hidden">
              {edu.degree}
            </div>
            <div className="-mt-6 space-y-1.5 pt-4 border-t border-term-border/50">
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
          <Card className="p-5 rounded-md border-term-border/50 md:col-span-2">
            <div className="space-y-4">
              {education.priorEducation.map((edu, index) => (
                <div
                  key={`${edu.institution}-${edu.period}`}
                  className={
                    index > 0 ? "border-t border-term-border/50 pt-4" : ""
                  }
                >
                  <CardHeader className="flex items-center justify-between -mx-4">
                    <span className="text-lg font-bold text-primary">
                      {edu.institution}
                    </span>
                    <span className="mt-0.5 inline-block rounded bg-term-border/20 px-2 py-0.5 text-xs">
                      {edu.period}
                    </span>
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
      </div>
    </>
  );
}
