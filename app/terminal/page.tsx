import { Terminal } from "@/components/terminal/terminal";
import Link from "next/link";

export default function TerminalPage() {
  return (
    <div className="grid h-dvh w-full place-items-center overflow-hidden p-4 relative bg-term-bg">
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-mono text-term-muted hover:text-term-user transition-colors opacity-70 hover:opacity-100 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        <span>../home</span>
      </Link>

      <div className="w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
        <Terminal />
      </div>
    </div>
  );
}
