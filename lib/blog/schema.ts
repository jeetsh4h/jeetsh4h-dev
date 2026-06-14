export type BlogPostMetadata = {
  title: string;
  description: string;
  publishedAt?: string;
  editedAt?: string;
  tags: string[];
  draft: boolean;
};

export type BlogPostSummary = BlogPostMetadata & {
  slug: string;
};

export type PublishedBlogPostSummary = BlogPostSummary & {
  draft: false;
  publishedAt: string;
  editedAt: string;
};

type FrontmatterRecord = Record<string, unknown>;

function isRecord(value: unknown): value is FrontmatterRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function normalizeString(
  input: unknown,
  fieldName: string,
  sourceLabel: string,
) {
  if (typeof input !== "string") {
    throw new Error(`${sourceLabel}: ${fieldName} must be a string.`);
  }

  const value = input.trim();

  if (!value) {
    throw new Error(`${sourceLabel}: ${fieldName} cannot be empty.`);
  }

  return value;
}

function normalizeOptionalDate(
  input: unknown,
  fieldName: string,
  sourceLabel: string,
) {
  if (input === undefined) {
    return undefined;
  }

  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) {
      throw new Error(
        `${sourceLabel}: ${fieldName} must be a valid YYYY-MM-DD date.`,
      );
    }

    return input.toISOString().slice(0, 10);
  }

  if (typeof input !== "string") {
    throw new Error(`${sourceLabel}: ${fieldName} must be a YYYY-MM-DD date.`);
  }

  const value = input.trim();

  if (!isIsoDate(value)) {
    throw new Error(
      `${sourceLabel}: ${fieldName} must be a valid YYYY-MM-DD date.`,
    );
  }

  return value;
}

function normalizeTags(input: unknown, sourceLabel: string) {
  if (input === undefined) {
    return [];
  }

  if (!Array.isArray(input)) {
    throw new Error(`${sourceLabel}: tags must be an array of strings.`);
  }

  const tags = input.map((tag) => normalizeString(tag, "tags", sourceLabel));
  const normalizedTags = tags.map((tag) => tag.toLowerCase());

  if (new Set(normalizedTags).size !== normalizedTags.length) {
    throw new Error(`${sourceLabel}: tags must be unique.`);
  }

  return tags;
}

export function normalizeBlogPostMetadata(
  input: unknown,
  sourceLabel: string,
): BlogPostMetadata {
  if (!isRecord(input)) {
    throw new Error(`${sourceLabel}: frontmatter must be a YAML object.`);
  }

  const title = normalizeString(input.title, "title", sourceLabel);
  const description = normalizeString(
    input.description,
    "description",
    sourceLabel,
  );
  const tags = normalizeTags(input.tags, sourceLabel);

  if (description.length > 180) {
    throw new Error(
      `${sourceLabel}: description must be 180 characters or fewer.`,
    );
  }

  if (input.draft !== undefined && typeof input.draft !== "boolean") {
    throw new Error(`${sourceLabel}: draft must be a boolean.`);
  }

  const draft = input.draft ?? false;
  const publishedAt = normalizeOptionalDate(
    input.publishedAt,
    "publishedAt",
    sourceLabel,
  );
  const editedAt =
    normalizeOptionalDate(input.editedAt, "editedAt", sourceLabel) ??
    publishedAt;

  if (!draft && !publishedAt) {
    throw new Error(
      `${sourceLabel}: publishedAt is required for published posts.`,
    );
  }

  if (
    publishedAt &&
    editedAt &&
    new Date(`${editedAt}T00:00:00.000Z`) <
      new Date(`${publishedAt}T00:00:00.000Z`)
  ) {
    throw new Error(
      `${sourceLabel}: editedAt cannot be earlier than publishedAt.`,
    );
  }

  return {
    title,
    description,
    publishedAt,
    editedAt,
    tags,
    draft,
  };
}
