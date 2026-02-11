import Link from "next/link";
import Profile from "@/components/profile";
import Experience from "@/components/experience";
import Research from "@/components/research";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

export default function Page() {
  return (
    <main className="min-h-screen bg-term-bg font-mono selection:bg-term-user selection:text-term-bg">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 space-y-16">
        <section className="space-y-6">
          <Profile />
        </section>

        <section className="space-y-8">
          <Experience />
        </section>

        <section className="space-y-8">
          <Research />
        </section>

        <section className="space-y-6">
          <Skills />
        </section>

        <section className="space-y-8">
          <Projects />
        </section>

        <section className="space-y-8">
          <Education />
        </section>

        <footer className="pt-12 pb-8 border-t border-term-border/30 text-center text-xs text-term-muted">
          <p>
            © {new Date().getFullYear()} Jeet Chetan Shah.{" "}
            <Link
              href="https://github.com/jeetsh4h/jeetsh4h-dev"
              target="_blank"
              className="underline hover:text-term-user transition-colors"
            >
              Source Code
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
