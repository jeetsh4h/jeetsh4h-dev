import fs from "node:fs/promises";
import path from "node:path";

const DIARY_CONTENT_DIR = path.join(process.cwd(), "content", "diary");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DEFAULT_TITLE = "CHANGE THIS DIARY ENTRY TITLE";
const DEFAULT_DESCRIPTION =
  "CHANGE THIS DIARY ENTRY DESCRIPTION BEFORE PUBLISHING.";
const DEFAULT_SLUG = "change-this-diary-entry-slug";

function usage() {
  return [
    'Usage: pnpm diary:new ["Entry Title"] [--slug custom-slug] [--date YYYY-MM-DD] [--published]',
    "",
    "Creates content/diary/{slug}.mdx with a typed metadata export.",
    "Running without a title creates a draft scaffold with placeholders that must be changed.",
  ].join("\n");
}

function parseArgs(argv) {
  const options = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    slug: undefined,
    date: today(),
    published: false,
  };
  let hasCustomTitle = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }

    if (arg === "--published") {
      options.published = true;
      continue;
    }

    if (arg === "--slug" || arg === "--date") {
      const value = argv[index + 1];

      if (!value) {
        throw new Error(`${arg} requires a value.`);
      }

      options[arg.slice(2)] = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--slug=")) {
      options.slug = arg.slice("--slug=".length);
      continue;
    }

    if (arg.startsWith("--date=")) {
      options.date = arg.slice("--date=".length);
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    if (hasCustomTitle) {
      throw new Error("Provide the entry title as a single quoted argument.");
    }

    options.title = arg;
    hasCustomTitle = true;
  }

  const title = options.title.trim();

  if (!title) {
    throw new Error("Entry title is required.");
  }

  return {
    ...options,
    title,
    slug: options.slug ?? (hasCustomTitle ? slugify(title) : DEFAULT_SLUG),
    usesDefaultSlug: options.slug === undefined && !hasCustomTitle,
  };
}

function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assertValidSlug(slug) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      "Slug must use lowercase letters, numbers, and single hyphens.",
    );
  }
}

function assertValidDate(value) {
  const match = DATE_PATTERN.exec(value);

  if (!match) {
    throw new Error("Date must be a valid YYYY-MM-DD date.");
  }

  const [, yearPart, monthPart, dayPart] = match;
  const year = Number(yearPart);
  const month = Number(monthPart);
  const day = Number(dayPart);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("Date must be a valid YYYY-MM-DD date.");
  }
}

function renderEntry({ title, description, date, published }) {
  const lines = [
    'import { defineDiaryEntry } from "@/lib/diary/metadata";',
    "",
    "export const metadata = defineDiaryEntry({",
    `  title: ${JSON.stringify(title)},`,
    `  description: ${JSON.stringify(description)},`,
    `  publishedAt: ${JSON.stringify(date)},`,
    "  tags: [],",
  ];

  if (!published) {
    lines.push("  draft: true,");
  }

  lines.push("});", "", `# ${title}`, "");

  return lines.join("\n");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function getAvailableDefaultSlug() {
  let suffix = 0;

  while (true) {
    const slug =
      suffix === 0 ? DEFAULT_SLUG : `${DEFAULT_SLUG}-${String(suffix)}`;
    const filePath = path.join(DIARY_CONTENT_DIR, `${slug}.mdx`);

    if (!(await fileExists(filePath))) {
      return { slug, filePath };
    }

    suffix += 1;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  assertValidSlug(options.slug);
  assertValidDate(options.date);

  await fs.mkdir(DIARY_CONTENT_DIR, { recursive: true });

  let filePath = path.join(DIARY_CONTENT_DIR, `${options.slug}.mdx`);

  if (options.usesDefaultSlug) {
    const availableDefault = await getAvailableDefaultSlug();
    options.slug = availableDefault.slug;
    filePath = availableDefault.filePath;
  }

  if (await fileExists(filePath)) {
    throw new Error(
      `Diary entry already exists: ${path.relative(process.cwd(), filePath)}`,
    );
  }

  await fs.writeFile(filePath, renderEntry(options), "utf8");
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);
}

main().catch((error) => {
  console.error(error.message);
  console.error("");
  console.error(usage());
  process.exit(1);
});
