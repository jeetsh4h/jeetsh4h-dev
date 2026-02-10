import Link from "next/link";
import { IconTerminal2 } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  PROFILE,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  EDUCATION,
  SKILLS,
} from "@/lib/data";

export default function Page() {
  return (
    <main className="min-h-screen bg-term-bg font-mono selection:bg-term-user selection:text-term-bg">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 space-y-16">
        {/* Header (About) */}
        <section className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-term-user tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-xl text-term-host">{PROFILE.role}</p>
            </div>

            {/* Desktop CTA with CLI Logo */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Desktop CTA with CLI Logo */}
              <Link
                href="/terminal"
                className="hidden md:flex items-center gap-2 text-xs border border-term-border px-3 py-1.5 rounded-full hover:bg-term-border hover:text-term-user transition-colors group h-9"
              >
                <IconTerminal2 className="w-4 h-4 text-term-muted group-hover:text-term-user transition-colors" />
                <span>Open in Terminal</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Optional 'about' command hint for the bio section */}
            <div className="absolute -left-3 top-1 opacity-0 md:opacity-100 -translate-x-full pr-4 flex items-center justify-end">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-term-muted/50 select-none">
                <IconTerminal2 className="w-3 h-3" />
                <span>about</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
              {PROFILE.bio}
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href={`https://${PROFILE.github}`}
              target="_blank"
              className="text-term-path hover:underline hover:text-term-user transition-colors"
            >
              GitHub
            </a>
            <a
              href={`https://${PROFILE.linkedin}`}
              target="_blank"
              className="text-term-path hover:underline hover:text-term-user transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-term-path hover:underline hover:text-term-user transition-colors"
            >
              Email
            </a>
          </div>

          {/* Mobile CTA */}
          <Link
            href="/terminal"
            className="md:hidden inline-flex items-center gap-2 text-xs border border-term-border px-4 py-2 rounded-md bg-term-bg hover:bg-term-border transition-colors w-full justify-center"
          >
            <IconTerminal2 className="w-4 h-4" />
            Open in Terminal
          </Link>
        </section>

        {/* Experience */}
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
              <span className="text-term-muted">::</span> Experience
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
              <IconTerminal2 className="w-3 h-3" />
              <span>experience</span>
            </div>
          </div>

          <div className="border-l-2 border-term-border/50 ml-2 space-y-10 pl-8 relative">
            {EXPERIENCE.filter((e) => e.description || e.achievements).map(
              (job, i) => (
                <div
                  key={i}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-9.75 top-1.5 w-3 h-3 rounded-full bg-term-bg border-2 border-term-user ring-2 ring-term-bg" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {job.company}
                    </h3>
                    <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-sm text-term-host font-medium mb-3">
                    {job.role}
                  </div>

                  {job.achievements ?
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                      {job.achievements.map((ach, j) => (
                        <li key={j}>{ach}</li>
                      ))}
                    </ul>
                  : <p className="text-muted-foreground text-sm leading-relaxed">
                      {job.description}
                    </p>
                  }
                </div>
              ),
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
              <span className="text-term-muted">::</span> Projects
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
              <IconTerminal2 className="w-3 h-3" />
              <span>projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                className="block p-5 rounded-xl border border-term-border bg-card/30 hover:bg-card/80 hover:border-term-user transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-foreground group-hover:text-term-user transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-term-muted border border-term-border px-1.5 py-0.5 rounded">
                    {project.linkText} ↗
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Research */}
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
              <span className="text-term-muted">::</span> Research
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
              <IconTerminal2 className="w-3 h-3" />
              <span>research</span>
            </div>
          </div>

          <div className="space-y-6">
            {RESEARCH.map((paper, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-4 sm:items-start group"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-foreground leading-tight group-hover:text-term-user transition-colors">
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {paper.title}
                      </a>
                    </h3>
                    <span className="text-xs font-mono text-term-muted whitespace-nowrap border border-term-border px-2 py-0.5 rounded">
                      {paper.year}
                    </span>
                  </div>
                  <div className="text-sm text-term-host">{paper.venue}</div>
                  <div className="text-sm text-muted-foreground">
                    {paper.authors}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
              <span className="text-term-muted">::</span> Education
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
              <IconTerminal2 className="w-3 h-3" />
              <span>education</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-term-border bg-card/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground">
                      {edu.institution}
                    </h3>
                    <span className="text-xs text-term-muted font-mono bg-term-border/20 px-2 py-0.5 rounded">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-sm text-term-host font-medium mb-4">
                    {edu.degree}
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-term-border/50">
                  {edu.details.map((detail, j) => (
                    <div
                      key={j}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-term-path" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-term-path flex items-center gap-2">
              <span className="text-term-muted">::</span> Skills
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-term-muted/60 border border-term-border/30 px-2 py-1 rounded bg-term-border/5 select-none">
              <IconTerminal2 className="w-3 h-3" />
              <span>skills</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div
                key={category}
                className="p-4 rounded-lg border border-term-border/50"
              >
                <div className="text-term-host font-bold mb-2">{category}</div>
                <div className="text-muted-foreground leading-relaxed">
                  {items.split(", ").map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-term-border/20 px-2 py-0.5 rounded mr-2 mb-2 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-12 pb-8 border-t border-term-border/30 text-center text-xs text-term-muted">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js &
            Tailwind.
          </p>
        </footer>
      </div>
    </main>
  );
}
