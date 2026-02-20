import React from "react";
import type { CommandDef } from "./types";
import About from "./about";
import Experience from "./experience";
import Projects from "./projects";
import Research from "./research";
import Education from "./education";
import Skills from "./skills";
import Socials from "./socials";
import { Theme, isThemeArg } from "./theme";
import Link from "next/link";
import SpotifyCommand from "./spotify";

const about: CommandDef = {
  description: "Who is Jeet?",
  aliases: ["bio"],
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
  description: "View some of my work",
  aliases: ["proj", "project"],
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

const theme: CommandDef = {
  description: "Switch theme (usage: theme [--toggle | --system])",
  action: ({ args }: { args: string[] }) => {
    if (args.length > 1) {
      return {
        result: `Too many arguments. Usage: theme [--toggle | --system]`,
        status: "error",
      };
    }
    if (args.length === 1) {
      const arg = args[0];
      if (!isThemeArg(arg)) {
        return {
          result: `Invalid argument: ${arg}. Usage: theme [--toggle | --system]`,
          status: "error",
        };
      }

      return {
        result: <Theme args={[arg]} />,
        status: "success",
      };
    }

    return {
      result: <Theme args={[]} />,
      status: "success",
    };
  },
};

const pdf: CommandDef = {
  description: "Download my CV as a PDF",
  aliases: ["cv", "resume"],
  action: () => ({
    result: (
      <div className="flex flex-col gap-2 mt-2 text-primary font-semibold underline decoration-primary/30">
        <Link
          href="/cv.pdf"
          download="Jeet_Shah_CV.pdf"
          className="w-fit hover:decoration-primary transition-all"
        >
          Download
        </Link>
      </div>
    ),
    status: "success",
  }),
};

const spotify: CommandDef = {
  description: "View my Spotify activity",
  aliases: ["music", "nowplaying"],
  action: () => ({
    result: <SpotifyCommand />,
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
  bio: about,
  experience,
  exp: experience,
  work: experience,
  projects,
  project: projects,
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
  theme,
  pdf,
  cv: pdf,
  resume: pdf,
  spotify,
  music: spotify,
  nowplaying: spotify,
  whoami: {
    description: "Information about YOU",
    // TODO: figure out current IP, location, device, etc.
    action: () => ({
      result: <div className="text-term-muted">guest@jeetsh4h-dev</div>,
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
                  <span className="text-secondary">{key}</span>
                  <span className="text-foreground">{cmd.description}</span>
                </React.Fragment>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Tip: Use <kbd className="bg-muted px-1 rounded">Tab</kbd> or{" "}
            <kbd className="bg-muted px-1 rounded">→</kbd> to autocomplete. Use{" "}
            <kbd className="bg-muted px-1 rounded">↑</kbd>{" "}
            <kbd className="bg-muted px-1 rounded">↓</kbd> for navigating
            history.
          </div>
        </div>
      ),
      status: "success",
    }),
  },
  clear,
  cls: clear,
};
