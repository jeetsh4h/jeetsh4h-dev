import Profile from "@/components/profile";
import Experience from "@/components/experience";
import Research from "@/components/research";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

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
      </div>

      <Footer />
    </main>
  );
}
