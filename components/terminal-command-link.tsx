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
        variant="outline"
        className={cn("rounded cursor-pointer py-4.5", buttonStyles)}
      >
        <IconTerminal2 className={cn("w-3 h-3", iconStyles)} />
        <span className={cn("text-xl", textStyles)}>{command}</span>
      </Button>
    </Link>
  );
}
