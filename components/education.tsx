import { EDUCATION } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";
import { Card, CardHeader } from "./ui/card";

export default function Education() {
  return (
    <>
      <div className="flex items-center">
        <TerminalCommandLink command="education" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2">
        {EDUCATION.map((edu, i) => (
          <Card
            className="p-5 rounded-md border-term-border/50"
            key={i}
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
              {edu.details.map((detail, j) => (
                <div
                  key={j}
                  className="text-xs text-foreground flex items-center gap-2"
                >
                  <span className="size-1 rounded-full bg-accent" />
                  {detail}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
