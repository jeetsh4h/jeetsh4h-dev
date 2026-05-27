import { Card } from "./ui/card";

export default function PDFViewer() {
  return (
    <Card className="size-full overflow-hidden min-h-0 p-0 gap-0 relative rounded-sm shadow-md">
      <iframe
        src="/cv.pdf#zoom=100,29,0"
        title="CV"
        className="size-full border-0"
      />
    </Card>
  );
}
