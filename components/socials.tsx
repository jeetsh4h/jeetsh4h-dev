import { SOCIALS } from "@/lib/data";
import TerminalCommandLink from "./terminal-command-link";
import Link from "next/link";

export default function Socials() {
  return (
    <div>
      <div className="mb-4">
        <TerminalCommandLink
          command="socials"
          textStyles="text-md"
          buttonStyles="px-2 py-1.5"
        />
      </div>

      <div className="flex flex-row items-center gap-4 text-primary font-semibold underline decoration-primary/30">
        <Link
          href={`https://${SOCIALS.github}`}
          target="_blank"
          className="hover:decoration-primary transition-all"
        >
          GitHub
        </Link>
        <Link
          href={`https://${SOCIALS.linkedin}`}
          target="_blank"
          className="hover:decoration-primary transition-all"
        >
          LinkedIn
        </Link>
        <Link
          href={`mailto:${SOCIALS.email}`}
          className="hover:decoration-primary transition-all"
        >
          Email
        </Link>
      </div>
    </div>
  );
}
