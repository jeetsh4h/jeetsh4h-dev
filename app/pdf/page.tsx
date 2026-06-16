import type { Metadata } from "next";
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
    <main
      id="main-content"
      className="h-dvh flex flex-col"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="flex text-xs"
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
  );
}
