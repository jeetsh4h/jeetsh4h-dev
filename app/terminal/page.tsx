import { Terminal } from "@/components/terminal/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TerminalPage() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-term-bg">
      <div className="flex-none p-4 pb-2">
        <Link href="/">
          <Button
            variant="link"
            className="group flex items-center gap-2 text-xs font-mono text-term-muted opacity-70 transition-colors hover:text-term-user hover:no-underline hover:opacity-100"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span className="underline">../home</span>
          </Button>
        </Link>
      </div>

      <div className="w-full flex-1 min-h-0 max-w-3xl mx-auto px-4 pb-4 animate-in fade-in zoom-in-95 duration-500">
        <Terminal />
      </div>
    </div>
  );
}
