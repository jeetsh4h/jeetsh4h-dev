import TerminalCommandLink from "./terminal-command-link";
import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();

  return (
    <>
      <TerminalCommandLink
        command="about"
        textStyles="text-md"
        buttonStyles="px-2 py-1.5"
      />
      <p className="max-w-4xl pt-3 text-sm leading-7 text-foreground sm:text-base">
        {intro.bio}
      </p>
    </>
  );
}
