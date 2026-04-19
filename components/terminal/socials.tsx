import Link from "next/link";
import { buildSocialsSection } from "@/lib/site-content";

export default function Socials() {
  const socials = buildSocialsSection();

  return (
    <div className="flex flex-col gap-2 mt-2 text-primary font-semibold underline decoration-primary/30">
      {socials.links.map((link) => (
        <Link
          key={link.kind}
          href={link.href}
          target={link.kind === "email" ? undefined : "_blank"}
          className="hover:decoration-primary transition-all"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
