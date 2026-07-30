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
    <div className="flex flex-col gap-4 mt-2">
      {education.higherEducation.map((edu, idx) => (
        <div
          key={`${edu.institution}-${edu.period}`}
          className={idx > 0 ? "border-t border-input/50 pt-2" : ""}
        >
          <div className="flex justify-between items-baseline">
            <span className="text-primary font-bold text-base">
              {edu.institution}
            </span>
            <span className="text-xs text-muted-foreground bg-input/20 px-2 py-0.5 rounded w-fit">
              {edu.period}
            </span>
          </div>
          <div className="mb-1 text-sm text-secondary">
            <DegreeName degree={edu.degree} />
          </div>
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

      {education.priorEducation.length > 0 && (
        <div className="border-t border-input/50 pt-2">
          <span className="text-accent font-bold">Prior Education:</span>
          <ul className="text-xs text-foreground marker:text-accent list-disc list-inside mt-1 ml-1 space-y-1">
            {education.priorEducation.map((edu) => (
              <li key={`${edu.institution}-${edu.period}`}>
                <span className="text-primary">{edu.institution}</span>{" "}
                <span className="text-secondary">
                  (<DegreeName degree={edu.degree} />)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-input/50 pt-2">
        <span className="text-accent font-bold">Selected Coursework:</span>
        <ul className="mt-1 ml-1 space-y-1 text-xs text-foreground marker:text-accent list-disc list-inside">
          {education.coursework.map((course) => (
            <li key={course.code}>
              <span className="text-secondary">{course.code}</span>{" "}
              {course.title} — {course.artifact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
