import Link from "next/link";

const PROOF_LINKS = [
  {
    label: "Weather4Cast 2025 result",
    href: "https://weather4cast.net/neurips2025/",
    description: "Official result listing team kaubega in 2nd place.",
  },
  {
    label: "Weather4Cast 2025 arXiv",
    href: "https://arxiv.org/abs/2511.11197",
    description: "Published Weather4Cast paper with Jeet Shah as co-author.",
  },
  {
    label: "Weather4Cast 2024 arXiv",
    href: "https://arxiv.org/abs/2412.00451",
    description: "Published Weather4Cast paper with Jeet Shah as co-author.",
  },
  {
    label: "GitHub",
    href: "https://github.com/jeetsh4h",
    description: "Public code and project history.",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jeetsh4h",
    description: "Professional profile.",
  },
  {
    label: "Jyeshthanubandh",
    href: "https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app",
    description: "Public Play Store listing.",
  },
  {
    label: "Portfolio source",
    href: "https://github.com/jeetsh4h/jeetsh4h-dev",
    description: "Source code for this site.",
  },
];

export default function Proof() {
  return (
    <div className="mt-2 grid gap-3 text-xs">
      {PROOF_LINKS.map((link) => (
        <div
          key={link.href}
          className="border-l-2 border-accent pl-3"
        >
          <Link
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-primary underline decoration-primary/50 hover:decoration-primary transition-all"
          >
            {link.label}
          </Link>
          <div className="mt-0.5 text-foreground">{link.description}</div>
        </div>
      ))}
    </div>
  );
}
