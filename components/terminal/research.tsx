import { RESEARCH } from "@/lib/data";
import Link from "next/dist/client/link";

export default function Research() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      {RESEARCH.map((paper, idx) => (
        <div
          key={idx}
          className="border-l-2 border-accent pl-3 group cursor-pointer"
        >
          <Link
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold block mb-1 text-primary underline decoration-primary/50 group-hover:decoration-primary transition-all"
          >
            {paper.title}
          </Link>
          <div className="text-xs text-foreground">
            {paper.authors} (
            <span className="text-secondary">{paper.year}</span>)
          </div>
        </div>
      ))}
    </div>
  );
}
