export type DateString = `${number}-${number}-${number}`;

type BaseBlogPostMetadataInput = {
  title: string;
  description?: string;
  publishedAt?: DateString;
  editedAt?: DateString;
  tags?: readonly string[];
};

type PublishedBlogPostMetadataInput = BaseBlogPostMetadataInput & {
  description: string;
  publishedAt: DateString;
  draft?: false;
};

type DraftBlogPostMetadataInput = BaseBlogPostMetadataInput & {
  draft: true;
};

export type BlogPostMetadataInput =
  | PublishedBlogPostMetadataInput
  | DraftBlogPostMetadataInput;

export type BlogPostMetadata = {
  title: string;
  description: string;
  publishedAt?: DateString;
  editedAt?: DateString;
  tags: readonly string[];
  draft: boolean;
};

export type BlogPostSummary = BlogPostMetadata & {
  slug: string;
};

export type PublishedBlogPostSummary = BlogPostSummary & {
  draft: false;
  publishedAt: DateString;
  editedAt: DateString;
};

type MetadataRecord = Record<string, unknown>;

function isRecord(value: unknown): value is MetadataRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  input: unknown,
  fieldName: string,
  { allowEmpty = false } = {},
) {
  if (typeof input !== "string") {
    throw new Error(`${fieldName} must be a string.`);
  }

  const value = input.trim();

  if (!allowEmpty && !value) {
    throw new Error(`${fieldName} cannot be empty.`);
  }

  return value;
}

function optionalString(input: unknown, fieldName: string) {
  if (input === undefined) {
    return undefined;
  }

  return requiredString(input, fieldName, { allowEmpty: true });
}

function validateDate(
  input: unknown,
  fieldName: string,
): DateString | undefined {
  if (input === undefined) {
    return undefined;
  }

  if (typeof input !== "string") {
    throw new Error(`${fieldName} must be a YYYY-MM-DD string.`);
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);

  if (!match) {
    throw new Error(`${fieldName} must be a valid YYYY-MM-DD date.`);
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
    throw new Error(`${fieldName} must be a valid YYYY-MM-DD date.`);
  }

  return input as DateString;
}

function normalizeTags(input: unknown) {
  if (input === undefined) {
    return [];
  }

  if (!Array.isArray(input)) {
    throw new Error("tags must be an array of strings.");
  }

  return input.map((tag) => requiredString(tag, "tags"));
}

export function defineBlogPost(input: BlogPostMetadataInput): BlogPostMetadata {
  if (!isRecord(input)) {
    throw new Error("Blog post metadata must be an object.");
  }

  const title = requiredString(input.title, "title");
  const draft = input.draft ?? false;

  if (typeof draft !== "boolean") {
    throw new Error("draft must be a boolean.");
  }

  const description = optionalString(input.description, "description") ?? "";
  const publishedAt = validateDate(input.publishedAt, "publishedAt");
  const editedAt = validateDate(input.editedAt, "editedAt") ?? publishedAt;

  if (!draft) {
    if (!description) {
      throw new Error("description is required for published posts.");
    }

    if (!publishedAt) {
      throw new Error("publishedAt is required for published posts.");
    }
  }

  if (publishedAt && editedAt && editedAt < publishedAt) {
    throw new Error("editedAt cannot be earlier than publishedAt.");
  }

  return {
    title,
    description,
    publishedAt,
    editedAt,
    tags: normalizeTags(input.tags),
    draft,
  };
}
