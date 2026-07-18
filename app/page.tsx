import type { Metadata } from "next";
import Profile from "@/components/profile";
import Experience from "@/components/experience";
import Research from "@/components/research";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import { ABOUT } from "@/lib/content/about";
import { EDUCATION } from "@/lib/content/education";
import { SEO } from "@/lib/content/seo";
import { SKILLS } from "@/lib/content/skills";
import { SOCIALS } from "@/lib/content/socials";
import { dateStringToIsoDateTime } from "@/lib/diary/metadata";

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
  const [currentEducation, ...completedEducation] = EDUCATION;
  const jobTitle = ABOUT.role.split("|")[0]?.trim() || ABOUT.role;
  const affiliation =
    currentEducation ?
      {
        "@type": "CollegeOrUniversity",
        name: currentEducation.institution,
      }
    : undefined;
  const alumniOf = [
    ...new Set(completedEducation.map((entry) => entry.institution)),
  ].map((institution) => ({
    "@type": "CollegeOrUniversity",
    name: institution,
  }));
  const knowsAbout = [
    ...new Set([
      "Software engineering",
      ...SEO.areas,
      ...Object.values(SKILLS).flat(),
    ]),
  ];

  const personSchema = {
    "@type": "Person",
    "@id": `${SEO.url}/#person`,
    name: ABOUT.name,
    url: SEO.url,
    jobTitle,
    description: SEO.description,
    sameAs: SOCIALS.filter(
      (link) =>
        link.href.startsWith("http://") || link.href.startsWith("https://"),
    ).map((link) => link.href),
    homeLocation: {
      "@type": "Place",
      name: ABOUT.location,
    },
    ...(affiliation ? { affiliation } : {}),
    alumniOf,
    knowsAbout,
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SEO.url}/#website`,
    name: ABOUT.name,
    url: SEO.url,
    publisher: {
      "@id": `${SEO.url}/#person`,
    },
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": `${SEO.url}/#profile-page`,
    url: SEO.url,
    name: SEO.title,
    dateModified: dateStringToIsoDateTime(SEO.updatedAt),
    mainEntity: {
      "@id": `${SEO.url}/#person`,
    },
    isPartOf: {
      "@id": `${SEO.url}/#website`,
    },
  };

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, profilePageSchema],
  }).replace(/</g, "\\u003c");

  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-12 md:py-20 space-y-10 md:space-y-12">
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

        <section
          className="space-y-6"
          aria-labelledby="skills-heading"
        >
          <Skills />
        </section>
      </div>
    </main>
  );
}
