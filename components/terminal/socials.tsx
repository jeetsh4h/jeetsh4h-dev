import { SOCIALS } from "@/lib/data";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex flex-col gap-2 mt-2 text-primary font-semibold underline decoration-primary/30">
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
  );
}
