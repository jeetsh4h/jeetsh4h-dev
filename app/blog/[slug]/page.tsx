import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPublishedBlogPost,
  getPublishedBlogPostSlugs,
  type PublishedBlogPost,
} from "@/lib/blog/posts";
import { SEO } from "@/lib/content/seo";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatPostDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

async function getPublishedPost(slug: string): Promise<PublishedBlogPost | null> {
  try {
    return await getPublishedBlogPost(slug);
  } catch {
    return null;
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {};
  }

  const url = `/blog/${post.slug}`;
  const title = post.title;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: "Jeet Shah", url: SEO.url }],
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.editedAt,
      authors: ["Jeet Shah"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: ["/twitter-image"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const { Component } = post;

  return (
    <main
      id="main-content"
      className="min-h-screen font-mono"
    >
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <Button
          nativeButton={false}
          render={<Link href="/blog" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../blog</span>
        </Button>

        <header className="mb-10 mt-6 space-y-5 border-l-2 border-accent pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{formatPostDate(post.publishedAt)}</Badge>
            {post.editedAt !== post.publishedAt && (
              <Badge>Edited {formatPostDate(post.editedAt)}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  size="xs"
                  className="text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="space-y-6">
          <Component />
        </div>
      </article>
    </main>
  );
}
