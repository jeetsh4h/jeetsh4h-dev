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
          variant: "tertiary",
          className: "py-4.5",
        }),
        buttonStyles,
      )}
    >
      <IconTerminal2 className={cn("size-3", iconStyles)} />
      <span className={cn("text-xl", textStyles)}>{command}</span>
    </Link>
  );
}
