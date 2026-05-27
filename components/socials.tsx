import TerminalCommandLink from "./terminal-command-link";
import Link from "next/link";
import { buildSocialsSection } from "@/lib/site-content";

export default function Socials() {
  const socials = buildSocialsSection();

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
        {socials.links.map((link) => (
          <Link
            key={link.kind}
            href={link.href}
            target={link.kind === "email" ? undefined : "_blank"}
            rel={link.kind === "email" ? undefined : "noopener noreferrer"}
            className="hover:decoration-primary transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
