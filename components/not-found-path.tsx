"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NotFoundPath({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/not-found";
  return (
    <span className={cn("text-destructive font-mono", className)}>
      {pathname}
    </span>
  );
}
