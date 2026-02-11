import { SOCIALS } from "@/lib/data";

export default function Socials() {
  return (
    <>
      <a
        href={`https://${SOCIALS.github}`}
        target="_blank"
        className="text-term-path hover:underline hover:text-term-user transition-colors"
      >
        GitHub
      </a>
      <a
        href={`https://${SOCIALS.linkedin}`}
        target="_blank"
        className="text-term-path hover:underline hover:text-term-user transition-colors"
      >
        LinkedIn
      </a>
      <a
        href={`mailto:${SOCIALS.email}`}
        className="text-term-path hover:underline hover:text-term-user transition-colors"
      >
        Email
      </a>
    </>
  );
}
