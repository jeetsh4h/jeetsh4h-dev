import React from "react";
import { type CommandDef } from "./types";
import {
  PROFILE,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  EDUCATION,
  SKILLS,
} from "@/lib/data";

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
  action: () => {
    const featuredExp = EXPERIENCE.filter((job) => !job.compact);
    const compactExp = EXPERIENCE.filter((job) => job.compact);

    return {
      result: (
        <div className="flex flex-col gap-8 mt-2">
          {featuredExp.map((job, idx) => {
            // Color logic based on index
            const dotColor = idx % 2 === 0 ? "bg-term-user" : "bg-term-host";

            return (
              <div
                key={idx}
                className={`relative ${job.description ? "" : "opacity-80"}`}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-5.75 top-1.5 w-3 h-3 ${dotColor} rounded-full border-2 border-term-bg ring-1 ring-term-border/50`}
                />

                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="text-term-user font-bold text-base">
                    {job.company}
                  </span>
                  <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded w-fit">
                    {job.period}
                  </span>
                </div>
                <div className="text-term-host text-sm mb-2 font-semibold">
                  {job.role}
                </div>

                {job.description && (
                  <ul className="list-disc list-outside text-muted-foreground text-xs space-y-1 ml-4">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Compact Section for older internships */}
          {compactExp.length > 0 && (
            <div className="relative opacity-80">
              <div className="text-muted-foreground text-xs space-y-3">
                {compactExp.map((job, idx) => (
                  <div
                    key={idx}
                    className="relative"
                  >
                    {/* Small Dot for each compact item */}
                    <div className="absolute -left-5.75 top-1.5 w-3 h-3 bg-term-muted rounded-full border-2 border-term-bg ring-1 ring-term-border/50" />

                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-term-user">
                          {job.company}
                        </span>
                        <span className="text-term-muted text-xs">
                          {job.period}
                        </span>
                      </div>
                      <div className="ml-2 mt-0.5">{job.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      status: "success",
    };
  },
};

const projects: CommandDef = {
  description: "View my work & code",
  aliases: ["proj"],
  action: () => ({
    result: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="border border-term-border p-4 rounded-lg bg-term-bg hover:border-term-user transition-colors group"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-term-path font-bold text-sm group-hover:text-term-user transition-colors">
                {proj.title}
              </div>
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] border border-term-border px-2 py-0.5 rounded hover:bg-term-user hover:text-term-bg transition-colors"
              >
                {proj.linkText} ↗
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              {proj.description}
            </div>
          </div>
        ))}
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
        {RESEARCH.map((paper, idx) => (
          <div
            key={idx}
            className="border-l-2 border-term-host pl-3"
          >
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold block mb-1 ${LINK_STYLES}`}
            >
              {paper.title}
            </a>
            <div className="text-xs text-muted-foreground">
              {paper.authors} ({paper.year})
            </div>
          </div>
        ))}
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
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className={
              idx > 0 ? "border-t border-term-border/50 pt-2 opacity-80" : ""
            }
          >
            <div className="flex justify-between items-baseline">
              <span className="text-term-user font-bold text-base">
                {edu.institution}
              </span>
              <span className="text-term-muted text-xs">{edu.period}</span>
            </div>
            <div className="text-term-host text-sm mb-1">{edu.degree}</div>
            <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2 mt-1">
              {edu.details.map((detail, i) => {
                const [label, val] = detail.split(": ");
                return val ?
                    <div key={i}>
                      <span className="text-term-path">{label}:</span> {val}
                    </div>
                  : <div key={i}>{detail}</div>;
              })}
            </div>
          </div>
        ))}

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
        {Object.entries(SKILLS).map(([cat, val]) => (
          <div key={cat}>
            <span className="text-term-user font-bold w-24 inline-block">
              {cat}:
            </span>
            <span className="text-muted-foreground">{val}</span>
          </div>
        ))}
      </div>
    ),
    status: "success",
  }),
};

const socials: CommandDef = {
  description: "Connect with me",
  aliases: ["contact", "social"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-2 mt-2">
        <a
          href={`https://${PROFILE.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="text-term-host w-24">GitHub</span>
          <span className={LINK_STYLES}>{PROFILE.github}</span>
        </a>
        <a
          href={`https://${PROFILE.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="text-term-host w-24">LinkedIn</span>
          <span className={LINK_STYLES}>{PROFILE.linkedin}</span>
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="flex items-center gap-2 group"
        >
          <span className="text-term-host w-24">Email</span>
          <span className={LINK_STYLES}>{PROFILE.email}</span>
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
  social: socials,
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
