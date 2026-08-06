import type { Metadata } from "next";
import TerminalPageClient from "@/components/terminal/terminal-page-client";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";

export const metadata: Metadata = {
  title: "Terminal",
  alternates: {
    canonical: "/terminal",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function TerminalPage() {
  const diaryEntries = await getPublishedDiaryEntries();

  return <TerminalPageClient diaryEntries={diaryEntries} />;
}
