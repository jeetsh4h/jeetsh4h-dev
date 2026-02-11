export default function About() {
  return (
    <div className="text-muted-foreground leading-relaxed max-w-xl">
      <p>
        I am a{" "}
        <span className="text-term-user">
          Product-minded Full-Stack Engineer
        </span>{" "}
        and <span className="text-term-host">AI Researcher</span>.
      </p>
      <br />
      <p>
        Currently co-founding <span className="text-term-path">TriCatch</span>{" "}
        and building scalable systems. I specialize in spatiotemporal modeling
        (NeurIPS Winner) and bridging the gap between business requirements and
        technical architecture.
      </p>
      <br />
      <p>
        I have a dual focus: building robust products (React Native, Supabase)
        and advancing Computer Vision research (ConvLSTM, RAG).
      </p>
    </div>
  );
}
