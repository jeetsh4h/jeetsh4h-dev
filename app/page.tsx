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
    jobTitle: "Software Engineer",
    description: SEO.description,
    sameAs: SOCIALS.filter((link) => link.kind !== "email").map(
      (link) => link.href,
    ),
    homeLocation: {
      "@type": "Place",
      name: ABOUT.location,
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Columbia University",
    },
    alumniOf: [
      ...new Set(
        EDUCATION.map((entry) => entry.institution).filter(
          (institution) => institution !== "Columbia University",
        ),
      ),
    ].map((institution) => ({
      "@type": "CollegeOrUniversity",
      name: institution,
    })),
    knowsAbout: [
      "Software engineering",
      "Networked systems",
      "Programming languages",
      "AI-assisted software engineering",
      "React Native",
      "Convex",
      "FastAPI",
      "Supabase",
      "Spatiotemporal forecasting",
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
    <main
      id="main-content"
      className="min-h-screen font-mono"
    >
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
          <Experience />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="research-heading"
        >
          <Research />
        </section>

        <section
          className="space-y-6"
          aria-labelledby="skills-heading"
        >
          <Skills />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="projects-heading"
        >
          <Projects />
        </section>

        <section
          className="space-y-8"
          aria-labelledby="education-heading"
        >
          <Education />
        </section>
      </div>

      <Footer />
    </main>
  );
}
