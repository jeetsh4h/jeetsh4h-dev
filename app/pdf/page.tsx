import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PDFViewer from "@/components/pdf-viewer";

export default function PDFPage() {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <div className="flex-none p-4 pb-2">
          <Link href="/">
            <Button
              variant="link"
              className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-secondary hover:decoration-secondary transition-colors hover:no-underline cursor-pointer"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              <span className="underline">../home</span>
            </Button>
          </Link>
        </div>
        <div className="w-full flex-1 min-h-0 max-w-3xl mx-auto px-4 pb-4">
          <PDFViewer />
        </div>
      </div>
      <Footer className="mt-12" />
    </>
  );
}
