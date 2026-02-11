import { ABOUT } from "@/lib/data";
import { IconTerminal2 } from "@tabler/icons-react";

export default function About() {
  return (
    <>
      <div className="absolute -left-3 top-1 opacity-0 md:opacity-100 -translate-x-full pr-4 flex items-center justify-end">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-term-muted/50 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
          <IconTerminal2 className="w-3 h-3" />
          <span>about</span>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
        {ABOUT.bio}
      </p>
    </>
  );
}
