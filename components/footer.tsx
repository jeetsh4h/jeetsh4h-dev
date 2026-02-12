import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "pt-12 pb-8 border-t border-muted/30 text-center text-xs text-muted-foreground font-mono",
        className,
      )}
    >
      <p>
        © {new Date().getFullYear()} Jeet Chetan Shah.{" "}
        <Link
          href="https://github.com/jeetsh4h/jeetsh4h-dev"
          target="_blank"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Source Code
        </Link>
        .
      </p>
    </footer>
  );
}
