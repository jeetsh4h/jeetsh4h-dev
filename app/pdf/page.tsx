import type { Metadata } from "next";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PDFViewer from "@/components/pdf-viewer";

export const metadata: Metadata = {
  title: "Jeet Shah | CV",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PDFPage() {
  return (
    <>
      <main
        id="main-content"
        className="h-dvh flex flex-col"
      >
        <div className="mx-auto flex w-full flex-none items-center justify-between p-4 pb-2">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="link"
            className="group flex cursor-pointer items-center gap-2 px-0 text-xs font-mono text-muted-foreground transition-colors hover:text-secondary hover:no-underline hover:decoration-secondary"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="underline">../home</span>
          </Button>
        </div>
        <div className="w-full flex-1 min-h-0 max-w-3xl mx-auto px-4 pb-4">
          <PDFViewer />
        </div>
      </main>
      <Footer className="mt-12" />
    </>
  );
}
