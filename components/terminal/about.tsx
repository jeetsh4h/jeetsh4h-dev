import { ABOUT } from "@/lib/data";

export default function About() {
  return (
    <div className="text-foreground leading-relaxed">
      <p>
        My name is <span className="text-primary">{ABOUT.name}</span> and I am a{" "}
        <span className="text-secondary">{ABOUT.role}</span>.
      </p>
      <br />
      <p>{ABOUT.bio}</p>
    </div>
  );
}
