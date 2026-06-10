import * as React from "react";

import TerminalCommandLink, {
  type TerminalCommandLinkCommand,
} from "@/components/terminal-command-link";
import { cn } from "@/lib/utils";

function SectionHeading({
  id,
  command,
  className,
}: {
  id: string;
  command: TerminalCommandLinkCommand;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn("flex items-center", className)}
    >
      <TerminalCommandLink command={command} />
    </h2>
  );
}

function SectionGrid({
  className,
  columns = "md",
  ...props
}: React.ComponentProps<"div"> & { columns?: "sm" | "md" }) {
  return (
    <div
      className={cn(
        columns === "sm" && "grid grid-cols-1 sm:grid-cols-2 gap-4",
        columns === "md" && "grid grid-cols-1 md:grid-cols-2 gap-4 -mt-2",
        className,
      )}
      {...props}
    />
  );
}

export { SectionHeading, SectionGrid };
