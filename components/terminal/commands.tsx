import React from "react";
import { type CommandDef } from "./types";

const whoami: CommandDef = {
  description: "Display current user info",
  action: () => {
    return {
      result: (
        <div className="text-muted-foreground">
          {/* Updated to use semantic pastel colors */}
          <span className="text-term-user font-bold">visitor</span>
          <span className="text-term-muted">@</span>
          <span className="text-term-host font-bold">system</span>
        </div>
      ),
      status: "success",
    };
  },
};

const clear: CommandDef = {
  description: "Clear the terminal screen",
  aliases: ["cls"],
  action: ({ clearHistory }) => {
    return {
      result: clearHistory(),
      status: "success",
    };
  },
};

const help: CommandDef = {
  description: "List available commands",
  action: () => {
    return {
      result: (
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-primary font-bold mb-1">Available Commands:</div>
          <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm">
            {Object.entries(COMMAND_REGISTRY).map(([key, cmd]) => {
              if (cmd.aliases?.includes(key)) return null;
              return (
                <React.Fragment key={key}>
                  {/* Updated key color to term-path (Lavender) */}
                  <span className="text-term-path font-mono">{key}</span>
                  <span className="text-muted-foreground">
                    {cmd.description}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Tip: Use <kbd className="bg-muted px-1 rounded">Tab</kbd> to
            autocomplete.
          </div>
        </div>
      ),
      status: "success",
    };
  },
};

const about: CommandDef = {
  description: "Who is Jeet?",
  action: () => ({
    result: (
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
          (NeurIPS Winner) and bridging the gap between business requirements
          and technical architecture.
        </p>
      </div>
    ),
    status: "success",
  }),
};

const experience: CommandDef = {
  description: "My professional timeline",
  aliases: ["exp", "work"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-4 mt-2">
        {/* TriCatch */}
        <div>
          <div className="flex justify-between items-baseline">
            <span className="text-term-user font-bold">TriCatch</span>
            <span className="text-term-muted text-xs">Dec 2025 - Present</span>
          </div>
          <div className="text-term-host text-xs mb-1">
            Co-founder & Lead Engineer
          </div>
          <ul className="list-disc list-inside text-muted-foreground text-xs ml-2">
            <li>
              Architecting mobile fitness app (Movynn) with React Native &
              Supabase.
            </li>
            <li>Engineered offline-first sync engine.</li>
          </ul>
        </div>

        {/* Voltek AI */}
        <div>
          <div className="flex justify-between items-baseline">
            <span className="text-term-user font-bold">Voltek AI</span>
            <span className="text-term-muted text-xs">Oct 2024 - Present</span>
          </div>
          <div className="text-term-host text-xs mb-1">Software Developer</div>
          <ul className="list-disc list-inside text-muted-foreground text-xs ml-2">
            <li>Reduced query latency by 67% for battery research data.</li>
            <li>Built Multi-LLM RAG system for technical docs.</li>
          </ul>
        </div>

        {/* ISRO */}
        <div>
          <div className="flex justify-between items-baseline">
            <span className="text-term-user font-bold">
              ISRO (Space Apps Centre)
            </span>
            <span className="text-term-muted text-xs">May 2023 - Aug 2023</span>
          </div>
          <div className="text-term-host text-xs mb-1">
            Research Intern (SRTD)
          </div>
          <div className="text-muted-foreground text-xs ml-2">
            Developed ConvLSTM model for precipitation nowcasting, outperforming
            baselines by 30.7%.
          </div>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const projects: CommandDef = {
  description: "View my work",
  action: () => ({
    result: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="border border-term-border p-3 rounded bg-term-bg/50">
          <div className="text-term-path font-bold text-sm">
            NeurIPS Weather4Cast
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Global Rank 1. Developed winning model for rainfall prediction using
            sparse weather data.
          </div>
        </div>

        <div className="border border-term-border p-3 rounded bg-term-bg/50">
          <div className="text-term-path font-bold text-sm">
            Jyeshthanubandh
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Safety app deployed with Pimpri-Chinchwad Police for senior
            citizens.
          </div>
        </div>

        <div className="border border-term-border p-3 rounded bg-term-bg/50">
          <div className="text-term-path font-bold text-sm">Paudha Yodha</div>
          <div className="text-xs text-muted-foreground mt-1">
            Plant disease detection (92% accuracy). Google Bit N Build Finalist.
          </div>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const skills: CommandDef = {
  description: "Languages & Frameworks",
  aliases: ["stack"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            Languages:
          </span>
          <span className="text-muted-foreground">
            Python, TypeScript, C++, SQL, Haskell
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            Frameworks:
          </span>
          <span className="text-muted-foreground">
            React Native, Next.js, NestJS, FastAPI
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            AI/ML:
          </span>
          <span className="text-muted-foreground">
            PyTorch, TensorFlow, Computer Vision, RAG
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            Infra:
          </span>
          <span className="text-muted-foreground">
            Docker, Linux (HPC), Azure, GCP
          </span>
        </div>
      </div>
    ),
    status: "success",
  }),
};

export const COMMAND_REGISTRY: Record<string, CommandDef> = {
  // commands i define
  whoami,
  skills,
  projects,
  experience,
  about,

  // system commands
  clear,
  cls: clear,
  help,
};
