import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  // TODO: add rose/tulsi easter egg that you can water on top of the footer separator.
  return (
    <footer
      className={cn(
        "pt-10 pb-8 border-t border-muted/30 text-center text-xs text-muted-foreground font-mono",
        className,
      )}
    >
      <p>
        © {currentYear} Jeet Chetan Shah.{" "}
        <Link
          href="https://github.com/jeetsh4h/jeetsh4h-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Source Code
        </Link>
        .
      </p>
    </footer>
  );
}
