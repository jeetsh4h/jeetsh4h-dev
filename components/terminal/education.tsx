import { EDUCATION, PRIOR_EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {EDUCATION.map((edu, idx) => (
        <div
          key={`${edu.institution}-${edu.period}`}
          className={idx > 0 ? "border-t border-term-border/50 pt-2" : ""}
        >
          <div className="flex justify-between items-baseline">
            <span className="text-primary font-bold text-base">
              {edu.institution}
            </span>
            <span className="text-xs text-muted-foreground bg-term-border/20 px-2 py-0.5 rounded w-fit">
              {edu.period}
            </span>
          </div>
          <div className="text-secondary text-sm mb-1">{edu.degree}</div>
          <div className="text-xs text-foreground grid grid-cols-2 gap-2 mt-1">
            {edu.details.map((detail) => {
              const [label, val] = detail.split(": ");
              return val ?
                  <div key={`${edu.institution}-${detail}`}>
                    <span className="text-accent">{label}:</span> {val}
                  </div>
                : <div key={`${edu.institution}-${detail}`}>{detail}</div>;
            })}
          </div>
        </div>
      ))}

      {PRIOR_EDUCATION && PRIOR_EDUCATION.length > 0 && (
        <div className="border-t border-term-border/50 pt-2">
          <span className="text-primary font-bold">Prior Education:</span>
          <ul className="text-xs text-foreground marker:text-accent list-disc list-inside mt-1 ml-1 space-y-1">
            {PRIOR_EDUCATION.map((edu) => (
              <li key={`${edu.institution}-${edu.period}`}>
                {edu.institution}: {edu.degree}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
