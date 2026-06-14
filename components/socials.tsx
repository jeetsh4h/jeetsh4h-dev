import TerminalCommandLink from "./terminal-command-link";
import Link from "next/link";
import { buildSocialsSection } from "@/lib/site-content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

      <div className="flex flex-row items-center gap-1">
        {socials.links.map((link) => {
          const SocialIcon = link.icon;
          const opensInNewTab =
            link.href.startsWith("http://") ||
            link.href.startsWith("https://");
          const label = `Open ${link.label}`;

          return (
            <Tooltip key={link.href}>
              <TooltipTrigger
                render={
                  <Link
                    href={link.href}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="group/social relative inline-flex size-11 shrink-0 items-center justify-center bg-transparent text-primary outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
                  >
                    <SocialIcon
                      className="size-9"
                      stroke={1.35}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute bottom-0 left-1/2 h-px w-7 -translate-x-1/2 bg-primary/30 group-hover/social:h-0.5 group-hover/social:bg-primary"
                      aria-hidden="true"
                    />
                  </Link>
                }
              />
              <TooltipContent side="bottom">{link.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
