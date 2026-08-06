import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();

  return (
    <p className="max-w-4xl text-sm leading-7 text-foreground sm:text-base">
      {intro.bio}
    </p>
  );
}
