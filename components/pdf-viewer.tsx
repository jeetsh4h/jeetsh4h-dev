"use client";

import { Card } from "./ui/card";

export default function PDFViewer() {
  return (
    <Card className="size-full overflow-hidden min-h-0 p-0 gap-0 relative rounded-sm shadow-md">
      <iframe
        src="/cv.pdf#view=FitH"
        title="CV"
        className="size-full"
      />
    </Card>
  );
}
