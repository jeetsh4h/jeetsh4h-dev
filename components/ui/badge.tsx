import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "status";
  size?: "default" | "xs";
}) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit items-center rounded bg-term-border/20 px-2 py-0.5 text-xs text-foreground",
        variant === "status" && "shrink-0 uppercase tracking-wide",
        size === "xs" && "text-[11px]",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
