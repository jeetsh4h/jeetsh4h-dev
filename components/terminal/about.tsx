import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();

  return (
    <div className="text-foreground leading-relaxed">
      <p>
        My name is <span className="text-primary">{intro.name}</span> and I am a{" "}
        <span className="text-secondary">{intro.role}</span>.
      </p>
      <br />
      <p>{intro.bio}</p>
    </div>
  );
}
