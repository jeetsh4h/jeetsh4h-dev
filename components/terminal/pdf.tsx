import {
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
} from "@tabler/icons-react";
import Link from "next/link";

const CV_PATH = "/cv.pdf";

export default function Pdf() {
  return (
    <div className="mt-2 max-w-lg">
      <div className="flex items-start gap-3">
        <IconFileTypePdf
          className="mt-0.5 size-5 shrink-0 text-primary"
          stroke={1.5}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <div className="font-bold text-primary">Jeet Shah — CV</div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Software engineering, research, education, and leadership
          </div>
          <code className="mt-1 block text-[10px] text-secondary">
            {CV_PATH}
          </code>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
        <Link
          href={CV_PATH}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-2 hover:decoration-primary"
        >
          Open CV
          <IconExternalLink
            className="size-3.5"
            stroke={1.5}
            aria-hidden="true"
          />
        </Link>
        <Link
          href={CV_PATH}
          download="Jeet_Shah_CV.pdf"
          className="inline-flex items-center gap-1.5 text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-2 hover:decoration-accent"
        >
          Download PDF
          <IconDownload
            className="size-3.5"
            stroke={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
