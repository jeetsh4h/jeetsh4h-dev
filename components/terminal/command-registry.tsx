import React from "react";
import Link from "next/link";

import About from "./about";
import Awards from "./awards";
import CatArt from "./cat";
import Diary from "./diary";
import Education from "./education";
import Experience from "./experience";
import Leadership from "./leadership";
import Pdf from "./pdf";
import Projects from "./projects";
import Research from "./research";
import Skills from "./skills";
import Socials from "./socials";
import SpotifyCommand from "./spotify";
import { Theme, isThemeArg } from "./theme";
import type { TerminalCommand, TerminalCommandCategory } from "./command-types";
import type { EducationView } from "./education";
import type { ExperienceCategory } from "./experience";

function createCommand(
  definition: Omit<TerminalCommand, "execute">,
  execute: TerminalCommand["execute"],
): TerminalCommand {
  return { ...definition, execute };
}

const CATEGORY_LABELS: Record<TerminalCommandCategory, string> = {
  profile: "Profile",
  writing: "Writing",
  navigation: "Navigation",
  system: "System",
  fun: "Fun",
};

const CATEGORY_ORDER = [
  "profile",
  "writing",
  "navigation",
  "system",
  "fun",
] satisfies TerminalCommandCategory[];

function HelpContent({ commandName }: { commandName?: string }) {
  if (commandName) {
    const canonicalName = TERMINAL_COMMAND_ALIASES[commandName] ?? commandName;
    const command = TERMINAL_COMMAND_MAP[canonicalName];

    if (!command) return null;

    return (
      <div className="mt-2 flex flex-col gap-2 text-xs">
        <div>
          <span className="text-base font-bold text-primary">
            {command.name}
          </span>
          <span className="ml-2 text-foreground">{command.description}</span>
        </div>
        <div>
          <span className="text-accent">Usage:</span>{" "}
          <code className="text-secondary">
            {command.usage ?? command.name}
          </code>
        </div>
        {command.aliases && command.aliases.length > 0 && (
          <div>
            <span className="text-accent">Aliases:</span>{" "}
            <span className="text-foreground">
              {command.aliases.join(", ")}
            </span>
          </div>
        )}
        {command.examples && command.examples.length > 0 && (
          <div>
            <span className="text-accent">Examples:</span>
            <ul className="ml-4 mt-1 list-disc text-secondary marker:text-accent">
              {command.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="font-bold text-primary">Available Commands:</div>
      {CATEGORY_ORDER.map((category) => {
        const commands = TERMINAL_COMMANDS.filter(
          (command) => command.category === category,
        );

        return (
          <section key={category}>
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-sm">
              {commands.map((command) => (
                <React.Fragment key={command.name}>
                  <span className="text-secondary">{command.name}</span>
                  <span className="text-foreground">{command.description}</span>
                </React.Fragment>
              ))}
            </div>
          </section>
        );
      })}
      <div className="mt-1 text-xs text-muted-foreground">
        Use <kbd className="rounded bg-muted px-1">help &lt;command&gt;</kbd>{" "}
        for examples. <kbd className="rounded bg-muted px-1">Tab</kbd> or{" "}
        <kbd className="rounded bg-muted px-1">→</kbd> autocompletes;{" "}
        <kbd className="rounded bg-muted px-1">↑</kbd>{" "}
        <kbd className="rounded bg-muted px-1">↓</kbd> navigates history;{" "}
        <kbd className="rounded bg-muted px-1">Ctrl+L</kbd> clears.
      </div>
    </div>
  );
}

function argumentError(usage: string) {
  return { kind: "error" as const, message: `Usage: ${usage}` };
}

const EXPERIENCE_CATEGORIES: Record<string, ExperienceCategory> = {
  engineering: "engineering",
  research: "research",
  teaching: "teaching-writing",
};

const RESEARCH_KINDS = new Set(["preprint", "thesis", "presentation"]);
const EDUCATION_VIEWS = new Set<EducationView>(["degrees", "coursework"]);
const DIARY_ACTIONS = new Set(["list", "read", "search", "tag"]);

const TERMINAL_COMMANDS: TerminalCommand[] = [
  createCommand(
    {
      name: "about",
      description: "Who is Jeet?",
      category: "profile",
      aliases: ["bio", "intro"],
    },
    () => ({ kind: "render", node: <About />, status: "success" }),
  ),
  createCommand(
    {
      name: "experience",
      description: "Engineering, research, teaching, and writing",
      category: "profile",
      usage: "experience [engineering | research | teaching]",
      examples: ["experience engineering", "experience research"],
      aliases: ["exp", "work"],
    },
    ({ args }) => {
      if (args.length > 1)
        return argumentError("experience [engineering | research | teaching]");
      const category = args[0] ? EXPERIENCE_CATEGORIES[args[0]] : "all";
      if (!category)
        return argumentError("experience [engineering | research | teaching]");
      return {
        kind: "render",
        node: <Experience category={category} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "projects",
      description: "Projects, links, and technical stacks",
      category: "profile",
      usage: "projects [featured | <title-or-stack>]",
      examples: ["projects featured", "projects rust", "projects react"],
      aliases: ["proj", "project"],
    },
    ({ args }) => {
      if (args.length > 1)
        return argumentError("projects [featured | <title-or-stack>]");
      return {
        kind: "render",
        node: <Projects filter={args[0]} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "research",
      description: "Preprints, thesis, and presentation",
      category: "profile",
      usage: "research [preprint | thesis | presentation]",
      examples: ["research preprint", "research thesis"],
      aliases: ["papers", "paper", "pubs", "publications"],
    },
    ({ args }) => {
      if (args.length > 1 || (args[0] && !RESEARCH_KINDS.has(args[0]))) {
        return argumentError("research [preprint | thesis | presentation]");
      }
      return {
        kind: "render",
        node: <Research kind={args[0]} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "awards",
      description: "Honors and competition results",
      category: "profile",
      aliases: ["honors", "achievements"],
    },
    () => ({ kind: "render", node: <Awards />, status: "success" }),
  ),
  createCommand(
    {
      name: "leadership",
      description: "Leadership and service",
      category: "profile",
      aliases: ["service", "community"],
    },
    () => ({ kind: "render", node: <Leadership />, status: "success" }),
  ),
  createCommand(
    {
      name: "education",
      description: "Degrees and selected coursework",
      category: "profile",
      usage: "education [degrees | coursework]",
      examples: ["education degrees", "education coursework"],
      aliases: ["edu", "school", "university", "uni", "college"],
    },
    ({ args }) => {
      if (
        args.length > 1 ||
        (args[0] && !EDUCATION_VIEWS.has(args[0] as EducationView))
      ) {
        return argumentError("education [degrees | coursework]");
      }
      return {
        kind: "render",
        node: (
          <Education view={(args[0] as EducationView | undefined) ?? "all"} />
        ),
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "skills",
      description: "Technical skills by discipline",
      category: "profile",
      usage: "skills [category-or-skill]",
      examples: ["skills systems", "skills react", "skills ml"],
      aliases: ["stack", "tech", "skill"],
    },
    ({ args }) => {
      if (args.length > 1) return argumentError("skills [category-or-skill]");
      return {
        kind: "render",
        node: <Skills filter={args[0]} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "socials",
      description: "Contact and social links",
      category: "profile",
      aliases: ["contact", "social", "email"],
    },
    () => ({ kind: "render", node: <Socials />, status: "success" }),
  ),
  createCommand(
    {
      name: "diary",
      description: "Read and search diary entries",
      category: "writing",
      usage: "diary [list | read <slug> | search <text> | tag <tag>]",
      examples: ["diary list", "diary search programming", "diary tag seo"],
      aliases: ["blog", "writing"],
    },
    ({ args, diaryEntries }) => {
      const [action = "list"] = args;
      const needsValue =
        action === "read" || action === "search" || action === "tag";
      if (
        !DIARY_ACTIONS.has(action) ||
        (needsValue && args.length < 2) ||
        (!needsValue && args.length > 1)
      ) {
        return argumentError(
          "diary [list | read <slug> | search <text> | tag <tag>]",
        );
      }
      return {
        kind: "render",
        node: (
          <Diary
            args={args}
            entries={diaryEntries}
          />
        ),
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "pdf",
      description: "Open or download my CV",
      category: "navigation",
      aliases: ["cv", "resume"],
    },
    () => ({ kind: "render", node: <Pdf />, status: "success" }),
  ),
  createCommand(
    {
      name: "theme",
      description: "Inspect or change the color theme",
      category: "system",
      usage: "theme [light | dark | system | toggle]",
      examples: ["theme dark", "theme system"],
    },
    ({ args }) => {
      const arg = args[0];

      if (args.length > 1) {
        return argumentError("theme [light | dark | system | toggle]");
      }

      if (!arg) {
        return {
          kind: "render",
          node: <Theme args={[]} />,
          status: "success",
        };
      }

      if (!isThemeArg(arg)) {
        return argumentError("theme [light | dark | system | toggle]");
      }

      return {
        kind: "render",
        node: <Theme args={[arg]} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "help",
      description: "List commands or inspect one command",
      category: "system",
      usage: "help [command]",
      examples: ["help experience", "help diary"],
      aliases: ["man"],
    },
    ({ args }) => {
      if (args.length > 1) return argumentError("help [command]");
      if (args[0]) {
        const normalizedName = args[0].toLowerCase();
        const canonicalName =
          TERMINAL_COMMAND_ALIASES[normalizedName] ?? normalizedName;
        if (!TERMINAL_COMMAND_MAP[canonicalName]) {
          return {
            kind: "error",
            message: `No help available for: "${args[0]}"`,
          };
        }
      }
      return {
        kind: "render",
        node: <HelpContent commandName={args[0]?.toLowerCase()} />,
        status: "success",
      };
    },
  ),
  createCommand(
    {
      name: "clear",
      description: "Clear terminal output",
      category: "system",
      aliases: ["cls"],
    },
    () => ({ kind: "clear" }),
  ),
  createCommand(
    {
      name: "spotify",
      description: "View my Spotify activity",
      category: "fun",
      aliases: ["music", "nowplaying"],
    },
    () => ({ kind: "render", node: <SpotifyCommand />, status: "success" }),
  ),
  createCommand(
    {
      name: "cat",
      description: "Output a… meow?",
      category: "fun",
      usage: "cat [--download]",
      examples: ["cat", "cat --download"],
      aliases: ["meow"],
    },
    ({ args }) => {
      if (args.length > 1 || (args[0] && args[0] !== "--download")) {
        return argumentError("cat [--download]");
      }
      if (args[0] === "--download") {
        return {
          kind: "render",
          node: (
            <div className="mt-2 text-primary font-semibold underline decoration-primary/30">
              <Link
                href="/cat.txt"
                download="cat.txt"
              >
                Download cat.txt
              </Link>
            </div>
          ),
          status: "success",
        };
      }
      return { kind: "render", node: <CatArt />, status: "success" };
    },
  ),
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
