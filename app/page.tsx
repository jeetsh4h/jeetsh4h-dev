import Link from "next/link";
import Profile from "@/components/profile";
import Experience from "@/components/experience";
import Research from "@/components/research";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

export default function Page() {
  return (
    <main className="min-h-screen font-mono">
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

        <footer className="pt-12 pb-8 border-t border-muted/30 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Jeet Chetan Shah.{" "}
            <Link
              href="https://github.com/jeetsh4h/jeetsh4h-dev"
              target="_blank"
              className="underline decoration-muted-foreground/40 hover:text-secondary hover:decoration-secondary transition-colors"
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
