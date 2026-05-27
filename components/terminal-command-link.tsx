import { IconTerminal2 } from "@tabler/icons-react";
import { buttonVariants } from "./ui/button-variants";
import Link from "next/link";
import { cn } from "@/lib/utils";

// TODO: allow for command to be typed strictly to
// the commands registered in the COMMAND_REGISTRY
export default function TerminalCommandLink({
  command,
  buttonStyles,
  textStyles,
  iconStyles,
}: {
  command: string;
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
