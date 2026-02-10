import { Terminal } from "@/components/terminal/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TerminalPage() {
  return (
    <div className="grid h-dvh w-full place-items-center overflow-hidden p-4 relative bg-term-bg">
      <Link href="/">
        <Button
          variant="link"
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-mono text-term-muted hover:text-term-user transition-colors opacity-70 hover:opacity-100 group hover:no-underline cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
      </Link>

      <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
        <Terminal />
      </div>
    </div>
  );
}
