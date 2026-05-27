export default function Now() {
  const items = [
    "Building Movynn for Elevate Fitness.",
    "Maintaining Nanoloy internal tooling for battery manufacturing research workflows.",
    "Pursuing Columbia University M.S. Computer Science in New York City.",
    "Exploring networked systems, programming-language design, and AI-assisted software engineering workflows.",
  ];

  return (
    <ul className="mt-2 list-disc list-outside marker:text-accent ml-4 space-y-1.5 text-xs text-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
