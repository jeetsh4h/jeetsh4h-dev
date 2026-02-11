import React from "react";
import { type CommandDef } from "./types";
import About from "@/components/terminal/about";
import Experience from "@/components/terminal/experience";
import Projects from "@/components/terminal/projects";
import Research from "@/components/terminal/research";
import Education from "@/components/terminal/education";
import Skills from "@/components/terminal/skills";
import Socials from "@/components/terminal/socials";

const about: CommandDef = {
  description: "Who is Jeet?",
  action: () => ({
    result: <About />,
    status: "success",
  }),
};

const experience: CommandDef = {
  description: "My professional timeline",
  aliases: ["exp", "work"],
  action: () => ({
    result: <Experience />,
    status: "success",
  }),
};

const projects: CommandDef = {
  description: "View my work & code",
  aliases: ["proj"],
  action: () => ({
    result: <Projects />,
    status: "success",
  }),
};

const research: CommandDef = {
  description: "Academic Publications",
  aliases: ["papers"],
  action: () => ({
    result: <Research />,
    status: "success",
  }),
};

const education: CommandDef = {
  description: "Academic Background",
  aliases: ["edu"],
  action: () => ({
    result: <Education />,
    status: "success",
  }),
};

const skills: CommandDef = {
  description: "Languages & Frameworks",
  aliases: ["stack"],
  action: () => ({
    result: <Skills />,
    status: "success",
  }),
};

const socials: CommandDef = {
  description: "Connect with me",
  aliases: ["contact", "social"],
  action: () => ({
    result: <Socials />,
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
