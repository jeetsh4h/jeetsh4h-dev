import type { Metadata } from "next";
import TerminalPageClient from "@/components/terminal/terminal-page-client";

export const metadata: Metadata = {
  title: "Jeet Shah | Terminal",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TerminalPage() {
  return <TerminalPageClient />;
}
