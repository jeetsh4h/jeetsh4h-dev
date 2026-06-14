import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import matter from "gray-matter";

import {
  normalizeBlogPostMetadata,
  type BlogPostSummary,
  type PublishedBlogPostSummary,
} from "@/lib/blog/schema";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MDX_EXTENSION = ".mdx";
const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type BlogPostModule = {
  default: ComponentType;
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
  const filePath = path.join(BLOG_CONTENT_DIR, filename);
  const source = await fs.readFile(filePath, "utf8");
  const { data } = matter(source);
  const metadata = normalizeBlogPostMetadata(
    data,
    path.relative(process.cwd(), filePath),
  );

  return {
    slug,
    ...metadata,
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

  const postModule = (await import(
    `@/content/blog/${slug}.mdx`
  )) as BlogPostModule;

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

  const postModule = (await import(
    `@/content/blog/${slug}.mdx`
  )) as BlogPostModule;

  return {
    ...post,
    Component: postModule.default,
  };
}
