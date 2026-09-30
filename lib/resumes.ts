import fs from "node:fs/promises";
import path from "node:path";

export interface Resume {
  slug: string;
  title: string;
  updatedAt: string;
  description: string;
  href: string;
}

export function parseResumeMetadata(source: string, slug: string): Resume {
  const declarations = Array.from(
    source.matchAll(
      /^\\resumemetadata\{([^{}\n]+)\}\{([^{}\n]+)\}\{([^{}\n]+)\}$/gm,
    ),
  );
  if (declarations.length !== 1) {
    throw new Error(`${slug}.tex must declare exactly one \\resumemetadata.`);
  }
  const [, title, updatedAt, description] = declarations[0];
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(updatedAt) ||
    Number.isNaN(Date.parse(`${updatedAt}T00:00:00Z`)) ||
    new Date(`${updatedAt}T00:00:00Z`).toISOString().slice(0, 10) !== updatedAt
  ) {
    throw new Error(`${slug}.tex has an invalid update date: ${updatedAt}`);
  }
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(slug)) {
    throw new Error(`Invalid resume filename: ${slug}`);
  }
  return {
    slug,
    title,
    updatedAt,
    description,
    href: `/resumes/${slug}.pdf`,
  };
}

export async function getResumes(): Promise<Resume[]> {
  const sourceDirectory = path.join(process.cwd(), "cv", "resumes");
  const sources = (await fs.readdir(sourceDirectory))
    .filter(
      (filename) =>
        filename.endsWith(".tex") && filename !== "resume-layout.tex",
    )
    .sort();

  return Promise.all(
    sources.map(async (filename) => {
      const source = await fs.readFile(
        path.join(sourceDirectory, filename),
        "utf8",
      );
      const resume = parseResumeMetadata(source, filename.slice(0, -4));
      const pdf = await fs.stat(
        path.join(process.cwd(), "public", resume.href),
      );
      if (!pdf.isFile() || pdf.size === 0) {
        throw new Error(
          `Missing resume PDF: run pnpm resumes:build (${resume.slug}).`,
        );
      }
      return resume;
    }),
  );
}
