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
      <p className="text-foreground leading-relaxed max-w-3xl text-lg pt-2">
        {intro.bio}
      </p>
    </>
  );
}
