import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

import {
  type BlogPostMetadata,
  type BlogPostSummary,
  type PublishedBlogPostSummary,
} from "@/lib/blog/metadata";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MDX_EXTENSION = ".mdx";
const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type BlogPostModule = {
  default: ComponentType;
  metadata?: BlogPostMetadata;
};

export type BlogPost = BlogPostSummary & {
  Component: ComponentType;
};

export type PublishedBlogPost = PublishedBlogPostSummary & {
  Component: ComponentType;
};

export function getSlugFromFilename(filename: string) {
  if (!filename.endsWith(MDX_EXTENSION)) {
    throw new Error(`Blog post filename must end with ${MDX_EXTENSION}.`);
  }

  return filename.slice(0, -MDX_EXTENSION.length);
}

function assertValidSlug(slug: string) {
  if (!VALID_SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid blog post slug: ${slug}`);
  }
}

async function getBlogPostFiles() {
  const filenames = await fs.readdir(BLOG_CONTENT_DIR);
  const mdxFiles = filenames.filter((filename) =>
    filename.endsWith(MDX_EXTENSION),
  );
  const seen = new Set<string>();

  for (const filename of mdxFiles) {
    const slug = getSlugFromFilename(filename);
    assertValidSlug(slug);

    if (seen.has(slug)) {
      throw new Error(`Duplicate blog post slug: ${slug}`);
    }

    seen.add(slug);
  }

  return mdxFiles.sort();
}

async function readBlogPostMetadata(filename: string): Promise<BlogPostSummary> {
  const slug = getSlugFromFilename(filename);
  const postModule = await importBlogPostModule(slug);

  if (!postModule.metadata) {
    throw new Error(`${filename} must export metadata.`);
  }

  return {
    slug,
    ...postModule.metadata,
  };
}

function isPublishedPost(post: BlogPostSummary): post is PublishedBlogPostSummary {
  return !post.draft && Boolean(post.publishedAt && post.editedAt);
}

function sortNewestFirst(posts: BlogPostSummary[]) {
  return [...posts].sort((first, second) => {
    const dateComparison = (second.publishedAt ?? "").localeCompare(
      first.publishedAt ?? "",
    );

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return first.slug.localeCompare(second.slug);
  });
}

async function importBlogPostModule(slug: string) {
  return (await import(`@/content/blog/${slug}.mdx`)) as BlogPostModule;
}

export async function getAllBlogPosts() {
  const files = await getBlogPostFiles();
  const posts = await Promise.all(files.map(readBlogPostMetadata));

  return sortNewestFirst(posts);
}

export async function getPublishedBlogPosts() {
  const posts = await getAllBlogPosts();

  return posts.filter(isPublishedPost);
}

export async function getPublishedBlogPostSlugs() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => post.slug);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  assertValidSlug(slug);

  const posts = await getAllBlogPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  const postModule = await importBlogPostModule(slug);

  return {
    ...post,
    Component: postModule.default,
  };
}

export async function getPublishedBlogPost(
  slug: string,
): Promise<PublishedBlogPost | null> {
  assertValidSlug(slug);

  const posts = await getPublishedBlogPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  const postModule = await importBlogPostModule(slug);

  return {
    ...post,
    Component: postModule.default,
  };
}
