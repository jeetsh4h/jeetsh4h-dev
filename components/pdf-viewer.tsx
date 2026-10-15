"use client";

import { useSyncExternalStore } from "react";
import {
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
} from "@tabler/icons-react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CV_DOWNLOAD_FILENAME, CV_PATH } from "@/lib/cv";

function subscribe() {
  return () => {};
}

// Browsers without a built-in PDF viewer (e.g. Android Chrome) render an
// empty iframe and download the file instead, so they get links.
function getCanShowPdf() {
  return navigator.pdfViewerEnabled !== false;
}

// Unknown during prerender; the iframe waits for the client so unsupported
// browsers never start a download.
function getServerCanShowPdf() {
  return null;
}

function PdfFallback() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 p-6 text-center font-mono">
      <IconFileTypePdf
        className="size-10 text-primary"
        stroke={1.25}
        aria-hidden="true"
      />
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        This browser can&apos;t show PDFs inside a page. Open or download the CV
        instead.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          nativeButton={false}
          render={
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          size="lg"
        >
          <IconExternalLink
            className="size-4"
            aria-hidden="true"
          />
          <span>Open CV</span>
        </Button>
        <Button
          nativeButton={false}
          render={
            <a
              href={CV_PATH}
              download={CV_DOWNLOAD_FILENAME}
            />
          }
          variant="secondary"
          size="lg"
        >
          <IconDownload
            className="size-4"
            aria-hidden="true"
          />
          <span>Download PDF</span>
        </Button>
      </div>
    </div>
  );
}

export default function PDFViewer() {
  const canShowPdf = useSyncExternalStore<boolean | null>(
    subscribe,
    getCanShowPdf,
    getServerCanShowPdf,
  );

  return (
    <Card className="size-full overflow-hidden min-h-0 p-0 gap-0 relative rounded-sm shadow-md">
      {canShowPdf === true && (
        <iframe
          src={`${CV_PATH}#page=1&zoom=100,24&pagemode=none`}
          title="CV"
          className="size-full border-0"
        />
      )}
      {canShowPdf === false && <PdfFallback />}
    </Card>
  );
}
