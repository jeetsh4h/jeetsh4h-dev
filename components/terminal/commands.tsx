import React from "react";
import { type CommandDef } from "./types";

const LINK_STYLES =
  "text-term-path underline decoration-term-path/30 hover:decoration-term-path transition-all";

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
        <br />
        <p>
          I have a dual focus: building robust products (React Native, Supabase)
          and advancing Computer Vision research (ConvLSTM, RAG).
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
      <div className="flex flex-col gap-8 mt-2">
        {/* TriCatch */}
        <div className="relative">
          {/* Dot: Positioned to hit the parent border exactly (-23px accounts for pl-4 + border width) */}
          <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-user rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

          <div className="flex justify-between items-baseline flex-wrap">
            <span className="text-term-user font-bold text-base">TriCatch</span>
            <span className="text-term-muted text-xs">Dec 2025 - Present</span>
          </div>
          <div className="text-term-host text-sm mb-2 font-semibold">
            Co-founder & Lead Engineer
          </div>
          <ul className="list-disc list-outside text-muted-foreground text-xs space-y-1 ml-4">
            <li>
              Architecting <span className="text-term-path">Movynn</span> (React
              Native & Supabase).
            </li>
            <li>
              Engineered an offline-first synchronization engine for
              low-connectivity environments.
            </li>
            <li>
              Managing full-cycle development and secure user data handling.
            </li>
          </ul>
        </div>

        {/* Voltek AI */}
        <div className="relative">
          <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-host rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

          <div className="flex justify-between items-baseline flex-wrap">
            <span className="text-term-user font-bold text-base">
              Voltek AI
            </span>
            <span className="text-term-muted text-xs">Oct 2024 - Present</span>
          </div>
          <div className="text-term-host text-sm mb-2 font-semibold">
            Software Developer
          </div>
          <ul className="list-disc list-outside text-muted-foreground text-xs space-y-1 ml-4">
            <li>
              Designed NANOLOY data pipeline (PostgreSQL, Azure), reducing query
              latency by 200%.
            </li>
            <li>
              Built Multi-LLM RAG system for internal knowledge retrieval.
            </li>
            <li>
              Deployed full-stack logging visualization (NextJS, FastAPI).
            </li>
          </ul>
        </div>

        {/* ISRO */}
        <div className="relative">
          <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-path rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

          <div className="flex justify-between items-baseline flex-wrap">
            <span className="text-term-user font-bold text-base">
              ISRO (Space Apps Centre)
            </span>
            <span className="text-term-muted text-xs">May 2023 - Aug 2023</span>
          </div>
          <div className="text-term-host text-sm mb-2 font-semibold">
            Research Intern (SRTD)
          </div>
          <div className="text-muted-foreground text-xs ml-1 leading-relaxed">
            Developed ConvLSTM model for precipitation nowcasting in a
            high-security air-gapped HPC environment. Outperformed baselines by
            30.7%.
          </div>
        </div>

        {/* NFB */}
        <div className="relative">
          <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-host rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

          <div className="flex justify-between items-baseline flex-wrap">
            <span className="text-term-user font-bold text-base">
              National Federation of the Blind
            </span>
            <span className="text-term-muted text-xs">May 2024 - Sep 2024</span>
          </div>
          <div className="text-term-host text-sm mb-2 font-semibold">
            Project Solutions Intern
          </div>
          <div className="text-muted-foreground text-xs ml-1">
            Developed assistive navigation tools using Raspberry Pi and CV.
          </div>
        </div>

        {/* Previous Internships (Compact) */}
        <div className="relative opacity-80">
          <div className="absolute -left-5.75 top-2 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />
          <div className="text-muted-foreground text-xs space-y-3">
            <div>
              <span className="font-bold text-term-user">Sportskeeda</span>{" "}
              <span className="text-term-muted">
                (Aug &apos;23 - Oct &apos;23)
              </span>
              <div className="ml-2">Golf Content Writer.</div>
            </div>
            <div className="absolute -left-5.75 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />
            <div>
              <span className="font-bold text-term-user">Analyse India</span>{" "}
              <span className="text-term-muted">
                (May &apos;22 - Aug &apos;22)
              </span>
              <div className="ml-2">
                Automated technical analysis processes.
              </div>
            </div>
            <div className="absolute -left-5.75 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />
            <div>
              <span className="font-bold text-term-user">SNEHA</span>{" "}
              <span className="text-term-muted">
                (Apr &apos;22 - Jun &apos;22)
              </span>
              <div className="ml-2">
                IT/IM Intern, audited network diagrams.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const projects: CommandDef = {
  description: "View my work & code",
  aliases: ["proj"],
  action: () => ({
    result: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Jyeshthanubandh */}
        <div className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
              Jyeshthanubandh
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.Jyeshthanubandh.pcmc_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
            >
              Play Store ↗
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            Official safety app for Pimpri-Chinchwad Police. Features real-time
            police integration and medical data tracking.
          </div>
        </div>

        {/* Paudha Yodha */}
        <div className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
              Paudha Yodha
            </div>
            <a
              href="https://github.com/jeetsh4h/paudhayodha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
            >
              GitHub ↗
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            Plant disease detection app (92% accuracy). Fine-tuned ResNet-50 on
            leaf imagery. Bit N Build Finalist.
          </div>
        </div>

        {/* Spicetify Extensions */}
        <div className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
              Spicetify Extensions
            </div>
            <a
              href="https://github.com/CharlieS1103/spicetify-extensions/pull/110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
            >
              PR Link ↗
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            Open Source contribution to the popular Spotify customization tool.
            Implemented &quot;Wikify&quot; feature for track metadata.
          </div>
        </div>

        {/* DISS384 (Research Code) */}
        <div className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
              Precipitation Nowcasting
            </div>
            <a
              href="https://github.com/jeetsh4h/DISS384"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
            >
              GitHub ↗
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            Codebase for my dissertation (DISS384). Research resources and
            implementation for high-resolution rainfall prediction.
          </div>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const research: CommandDef = {
  description: "Academic Publications",
  aliases: ["papers"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-4 mt-2">
        <div className="border-l-2 border-term-host pl-3">
          <a
            href="https://arxiv.org/abs/2511.11197"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold block mb-1 ${LINK_STYLES}`}
          >
            Computationally-efficient deep learning models for nowcasting of
            precipitation (2025)
          </a>
          <div className="text-xs text-muted-foreground">
            Bhuskute, Anushree, et al. •{" "}
            <span className="text-term-muted">arXiv:2511.11197 [cs.CV]</span>
          </div>
        </div>

        <div className="border-l-2 border-term-host pl-3">
          <a
            href="https://arxiv.org/abs/2412.00451"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold block mb-1 ${LINK_STYLES}`}
          >
            A conditional Generative Adversarial network model for the
            Weather4Cast 2024 Challenge
          </a>
          <div className="text-xs text-muted-foreground">
            Deshpande, Atharva, et al. •{" "}
            <span className="text-term-muted">arXiv:2412.00451 [cs.CV]</span>
          </div>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const education: CommandDef = {
  description: "Academic Background",
  aliases: ["edu"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-4 mt-2">
        <div>
          <div className="flex justify-between items-baseline">
            <span className="text-term-user font-bold text-base">
              FLAME University
            </span>
            <span className="text-term-muted text-xs">2021 - 2025</span>
          </div>
          <div className="text-term-host text-sm mb-1">
            BSc. (Hons.) in Computer Science
          </div>
          <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
            <div>
              <span className="text-term-path">GPA:</span> 8.88/10
            </div>
            <div>
              <span className="text-term-path">Award:</span> Merit Scholarship
              (25%)
            </div>
          </div>
          <div className="text-term-host text-sm mt-2 mb-1">
            PG Diploma in Interdisciplinary Studies
          </div>
          <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
            <div>
              <span className="text-term-path">GPA:</span> 8.38/10
            </div>
            <div>
              <span className="text-term-path">Award:</span> Merit Scholarship
              (60%)
            </div>
          </div>
        </div>

        <div className="border-t border-term-border/50 pt-2 opacity-80">
          <div className="text-xs text-muted-foreground">
            <span className="text-term-user font-bold">Prior Education:</span>
            <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
              <li>PACE Jr. Sci. College (HSC): 94.00% (Merit Scholarship)</li>
              <li>
                CP Goenka Int&apos;l School (IGCSE): 92.25% (Cambridge
                Certificate)
              </li>
            </ul>
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
            Python, TypeScript, C++, SQL, Haskell, C#
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            Frameworks:
          </span>
          <span className="text-muted-foreground">
            React Native, Next.js, NestJS, FastAPI, Flask
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            AI/ML:
          </span>
          <span className="text-muted-foreground">
            PyTorch, TensorFlow, Computer Vision, RAG, ConvLSTM
          </span>
        </div>
        <div>
          <span className="text-term-user font-bold w-24 inline-block">
            Infra:
          </span>
          <span className="text-muted-foreground">
            Docker, Linux (HPC/Air-gapped), Azure, GCP, PostgreSQL
          </span>
        </div>
      </div>
    ),
    status: "success",
  }),
};

const socials: CommandDef = {
  description: "Connect with me",
  aliases: ["contact"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-2 mt-2">
        <a
          href="https://github.com/jeetsh4h"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="text-term-user w-24">GitHub</span>
          <span className={LINK_STYLES}>github.com/jeetsh4h</span>
        </a>
        <a
          href="https://linkedin.com/in/jeetsh4h"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="text-term-host w-24">LinkedIn</span>
          <span className={LINK_STYLES}>linkedin.com/in/jeetsh4h</span>
        </a>
        <a
          href="mailto:jeetsh4h@gmail.com"
          className="flex items-center gap-2 group"
        >
          <span className="text-term-path w-24">Email</span>
          <span className={LINK_STYLES}>jeetsh4h@gmail.com</span>
        </a>
      </div>
    ),
    status: "success",
  }),
};

const clear: CommandDef = {
  description: "Clear terminal",
  aliases: ["cls"],
  action: ({ clearHistory }) => ({
    result: clearHistory(),
    status: "success",
  }),
};

export const COMMAND_REGISTRY: Record<string, CommandDef> = {
  about,
  experience,
  exp: experience,
  work: experience,
  projects,
  proj: projects,
  research,
  papers: research,
  education,
  edu: education,
  skills,
  stack: skills,
  socials,
  contact: socials,

  // system commands
  whoami: {
    description: "Current user",
    action: () => ({
      result: <div className="text-term-muted">visitor@system</div>,
      status: "success",
    }),
  },
  help: {
    description: "List available commands",
    action: () => ({
      result: (
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-primary font-bold mb-1">Available Commands:</div>
          <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm">
            {Object.entries(COMMAND_REGISTRY).map(([key, cmd]) => {
              if (cmd.aliases?.includes(key)) return null;
              return (
                <React.Fragment key={key}>
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
    }),
  },
  clear,
  cls: clear,
};
