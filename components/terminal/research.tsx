import { RESEARCH } from "@/lib/data";

export default function Research() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {RESEARCH.map((paper, idx) => (
        <div
          key={idx}
          className="border-l-2 border-term-host pl-3"
        >
          {/* TODO: Link component */}
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold block mb-1 text-term-path underline decoration-term-path/30 hover:decoration-term-path transition-all"
          >
            {paper.title}
          </a>
          <div className="text-xs text-muted-foreground">
            {paper.authors} ({paper.year})
          </div>
        </div>
      ))}
    </div>
  );
}
