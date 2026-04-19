import React from "react";
import Link from "next/link";

import About from "./about";
import CatArt from "./cat";
import Education from "./education";
import Experience from "./experience";
import Projects from "./projects";
import Research from "./research";
import Skills from "./skills";
import Socials from "./socials";
import SpotifyCommand from "./spotify";
import { Theme, isThemeArg } from "./theme";
import Whoami from "./whoami";
import type { TerminalCommand } from "./command-types";

function HelpContent() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="text-primary font-bold mb-1">Available Commands:</div>
      <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm">
        {TERMINAL_COMMANDS.map((command) => (
          <React.Fragment key={command.name}>
            <span className="text-secondary">{command.name}</span>
            <span className="text-foreground">{command.description}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Tip: Use <kbd className="bg-muted px-1 rounded">Tab</kbd> or{" "}
        <kbd className="bg-muted px-1 rounded">→</kbd> to autocomplete. Use{" "}
        <kbd className="bg-muted px-1 rounded">↑</kbd>{" "}
        <kbd className="bg-muted px-1 rounded">↓</kbd> for navigating history.
      </div>
    </div>
  );
}

const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    name: "about",
    description: "Who is Jeet?",
    aliases: ["bio"],
    execute: () => ({
      kind: "render",
      node: <About />,
      status: "success",
    }),
  },
  {
    name: "experience",
    description: "My professional timeline",
    aliases: ["exp", "work"],
    execute: () => ({
      kind: "render",
      node: <Experience />,
      status: "success",
    }),
  },
  {
    name: "projects",
    description: "View some of my work",
    aliases: ["proj", "project"],
    execute: () => ({
      kind: "render",
      node: <Projects />,
      status: "success",
    }),
  },
  {
    name: "research",
    description: "Academic Publications",
    aliases: ["papers"],
    execute: () => ({
      kind: "render",
      node: <Research />,
      status: "success",
    }),
  },
  {
    name: "education",
    description: "Academic Background",
    aliases: ["edu"],
    execute: () => ({
      kind: "render",
      node: <Education />,
      status: "success",
    }),
  },
  {
    name: "skills",
    description: "Languages & Frameworks",
    aliases: ["stack"],
    execute: () => ({
      kind: "render",
      node: <Skills />,
      status: "success",
    }),
  },
  {
    name: "socials",
    description: "Connect with me",
    aliases: ["contact", "social"],
    execute: () => ({
      kind: "render",
      node: <Socials />,
      status: "success",
    }),
  },
  {
    name: "theme",
    description: "Switch theme (usage: theme [--toggle | --system])",
    execute: ({ args }) => {
      if (args.length > 1) {
        return {
          kind: "error",
          message: "Too many arguments. Usage: theme [--toggle | --system]",
        };
      }

      if (args.length === 1) {
        const [arg] = args;
        if (!isThemeArg(arg)) {
          return {
            kind: "error",
            message: `Invalid argument: ${arg}. Usage: theme [--toggle | --system]`,
          };
        }

        return {
          kind: "render",
          node: <Theme args={[arg]} />,
          status: "success",
        };
      }

      return {
        kind: "render",
        node: <Theme args={[]} />,
        status: "success",
      };
    },
  },
  {
    name: "pdf",
    description: "Download my CV as a PDF",
    aliases: ["cv", "resume"],
    execute: () => ({
      kind: "render",
      node: (
        <div className="flex flex-col gap-2 mt-2 text-primary font-semibold underline decoration-primary/30">
          <Link
            href="/cv.pdf"
            download="Jeet_Shah_CV.pdf"
            className="w-fit hover:decoration-primary transition-all"
          >
            Jeet_Shah_CV.pdf
          </Link>
        </div>
      ),
      status: "success",
    }),
  },
  {
    name: "spotify",
    description: "View my Spotify activity",
    aliases: ["music", "nowplaying"],
    execute: () => ({
      kind: "render",
      node: <SpotifyCommand />,
      status: "success",
    }),
  },
  {
    name: "whoami",
    description: "Who are YOU?",
    execute: () => ({
      kind: "render",
      node: <Whoami />,
      status: "success",
    }),
  },
  {
    name: "cat",
    description: "Output a... meow?",
    aliases: ["meow"],
    execute: ({ args }) => {
      if (args.includes("--download")) {
        return {
          kind: "render",
          node: (
            <div className="flex flex-col gap-2 mt-2 text-primary font-semibold underline decoration-primary/30">
              <Link
                href="/cat.txt"
                download="cat.txt"
                className="w-fit hover:decoration-primary transition-all"
              >
                cat.txt
              </Link>
            </div>
          ),
          status: "success",
        };
      }

      return {
        kind: "render",
        node: <CatArt />,
        status: "success",
      };
    },
  },
  {
    name: "help",
    description: "List available commands",
    execute: () => ({
      kind: "render",
      node: <HelpContent />,
      status: "success",
    }),
  },
  {
    name: "clear",
    description: "Clear terminal",
    aliases: ["cls"],
    execute: () => ({
      kind: "clear",
    }),
  },
];

const TERMINAL_COMMAND_MAP = Object.fromEntries(
  TERMINAL_COMMANDS.map((command) => [command.name, command]),
) as Record<string, TerminalCommand>;

const TERMINAL_COMMAND_ALIASES = Object.fromEntries(
  TERMINAL_COMMANDS.flatMap((command) => [
    [command.name, command.name] as const,
    ...(command.aliases ?? []).map((alias) => [alias, command.name] as const),
  ]),
) as Record<string, string>;

const TERMINAL_COMMAND_NAMES = TERMINAL_COMMANDS.flatMap((command) => [
  command.name,
  ...(command.aliases ?? []),
]);

export {
  TERMINAL_COMMANDS,
  TERMINAL_COMMAND_ALIASES,
  TERMINAL_COMMAND_MAP,
  TERMINAL_COMMAND_NAMES,
};
