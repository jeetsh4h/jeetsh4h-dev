import { IconTerminal2 } from "@tabler/icons-react";
import { buttonVariants } from "./ui/button-variants";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type TerminalCommandLinkCommand =
  | "about"
  | "socials"
  | "experience"
  | "research"
  | "skills"
  | "projects"
  | "education";

export default function TerminalCommandLink({
  command,
  buttonStyles,
  textStyles,
  iconStyles,
}: {
  command: TerminalCommandLinkCommand;
  buttonStyles?: string;
  textStyles?: string;
  iconStyles?: string;
}) {
  return (
    <Link
      href={`/terminal?cmd=${command}`}
      className={cn(
        buttonVariants({
          variant: null,
          className:
            "rounded py-4.5 border border-border bg-card text-accent shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
        }),
        buttonStyles,
      )}
    >
      <IconTerminal2 className={cn("size-3", iconStyles)} />
      <span className={cn("text-xl", textStyles)}>{command}</span>
    </Link>
  );
}
