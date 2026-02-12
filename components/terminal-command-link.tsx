import { IconTerminal2 } from "@tabler/icons-react";
import { Button } from "./ui/button";
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
    <Link href={`/terminal?cmd=${command}`}>
      <Button
        className={cn(
          "rounded py-4.5 bg-card text-accent hover:text-accent-foreground hover:bg-accent border-border cursor-pointer",
          buttonStyles,
        )}
      >
        <IconTerminal2 className={cn("size-3", iconStyles)} />
        <span className={cn("text-xl", textStyles)}>{command}</span>
      </Button>
    </Link>
  );
}
