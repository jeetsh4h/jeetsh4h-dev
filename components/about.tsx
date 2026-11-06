import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();

  return (
    <p className="max-w-[68ch] text-sm leading-7 text-foreground sm:text-[0.9375rem]">
      {intro.bio}
    </p>
  );
}
