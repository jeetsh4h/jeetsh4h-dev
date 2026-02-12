import { ABOUT } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";

export default function About() {
  return (
    <>
      <TerminalCommandLink
        command="about"
        textStyles="text-md"
        buttonStyles="px-2 py-1.5"
      />
      <p className="text-foreground leading-relaxed max-w-3xl text-lg pt-2">
        {ABOUT.bio}
      </p>
    </>
  );
}
