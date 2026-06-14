import Link from "next/link";
import { buildSocialsSection } from "@/lib/site-content";

export default function Socials() {
  const socials = buildSocialsSection();

  return (
    <div className="flex flex-col items-start gap-2 mt-2 text-primary font-semibold">
      {socials.links.map((link) => {
        const SocialIcon = link.icon;
        const opensInNewTab =
          link.href.startsWith("http://") ||
          link.href.startsWith("https://");

        return (
          <Link
            key={link.href}
            href={link.href}
            target={opensInNewTab ? "_blank" : undefined}
            rel={opensInNewTab ? "noopener noreferrer" : undefined}
            className="inline leading-none underline decoration-primary/30 decoration-1 underline-offset-2 hover:decoration-primary hover:decoration-2"
          >
            <SocialIcon
              className="mr-2 inline size-3.5 align-[-0.125em]"
              stroke={1.5}
              aria-hidden="true"
            />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
