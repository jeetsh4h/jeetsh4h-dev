import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {EDUCATION.map((edu, idx) => (
        <div
          key={idx}
          className={
            idx > 0 ? "border-t border-term-border/50 pt-2 opacity-80" : ""
          }
        >
          <div className="flex justify-between items-baseline">
            <span className="text-term-user font-bold text-base">
              {edu.institution}
            </span>
            <span className="text-term-muted text-xs">{edu.period}</span>
          </div>
          <div className="text-term-host text-sm mb-1">{edu.degree}</div>
          <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
            {edu.details.map((detail, i) => {
              const [label, val] = detail.split(": ");
              return val ?
                  <div key={i}>
                    <span className="text-term-path">{label}:</span> {val}
                  </div>
                : <div key={i}>{detail}</div>;
            })}
          </div>
        </div>
      ))}

      <div className="border-t border-term-border/50 pt-2 opacity-80">
        <div className="text-xs text-muted-foreground">
          <span className="text-term-user font-bold">Prior Education:</span>
          <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
            <li>PACE Jr. Sci. College (HSC): 94.00% (Merit Scholarship)</li>
            <li>
              CP Goenka Int&apos;l School (IGCSE): 92.25% (Cambridge
              Certificate)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
