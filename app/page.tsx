import type { Metadata } from "next";
import Profile from "@/components/profile";
import Experience from "@/components/experience";
import Research from "@/components/research";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Footer from "@/components/footer";
import { ABOUT } from "@/lib/content/about";
import { EDUCATION } from "@/lib/content/education";
import { SEO } from "@/lib/content/seo";
import { SOCIALS } from "@/lib/content/socials";

export const metadata: Metadata = {
  title: {
    absolute: SEO.title,
  },
  description: SEO.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ABOUT.name,
    url: SEO.url,
    jobTitle: ABOUT.role,
    description: SEO.description,
    sameAs: SOCIALS.filter((link) => link.kind !== "email").map(
      (link) => link.href,
    ),
    homeLocation: {
      "@type": "Place",
      name: "Mumbai, India",
    },
    alumniOf: [...new Set(EDUCATION.map((entry) => entry.institution))].map(
      (institution) => ({
        "@type": "CollegeOrUniversity",
        name: institution,
      }),
    ),
    knowsAbout: [
      "Full-stack engineering",
      "React Native",
      "Next.js",
      "Supabase",
      "RAG systems",
      "Computer vision",
      "ConvLSTM",
      "Precipitation nowcasting",
      "Spatiotemporal deep learning",
      "PostgreSQL",
      "Azure",
      "Google Cloud",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ABOUT.name,
    url: SEO.url,
  };

  const structuredData = JSON.stringify([personSchema, websiteSchema]).replace(
    /</g,
    "\\u003c",
  );

  return (
    <main className="min-h-screen font-mono">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 space-y-16">
        <section className="space-y-6">
          <Profile />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="experience-heading"
        >
          <h2
            id="experience-heading"
            className="sr-only"
          >
            Experience
          </h2>
          <Experience />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="research-heading"
        >
          <h2
            id="research-heading"
            className="sr-only"
          >
            Research
          </h2>
          <Research />
        </section>

        <section
          className="space-y-6"
          aria-labelledby="skills-heading"
        >
          <h2
            id="skills-heading"
            className="sr-only"
          >
            Skills
          </h2>
          <Skills />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="projects-heading"
        >
          <h2
            id="projects-heading"
            className="sr-only"
          >
            Projects
          </h2>
          <Projects />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="education-heading"
        >
          <h2
            id="education-heading"
            className="sr-only"
          >
            Education
          </h2>
          <Education />
        </section>
      </div>

      <Footer />
    </main>
  );
}
