import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPublishedBlogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Blog | Jeet Shah",
    description:
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Jeet Shah",
    description:
      "Writing by Jeet Shah on software engineering, systems, web interfaces, and research.",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatPostDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main
      id="main-content"
      className="min-h-screen font-mono"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between p-4 pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <p className="text-xs text-muted-foreground">guest@jeetsh4h-dev:~</p>
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
            blog
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Notes on software engineering, systems, interfaces, and research.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <Card variant="interactive">
                <CardHeader className="px-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <CardTitle className="text-lg text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </CardTitle>
                    <Badge>{formatPostDate(post.publishedAt)}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                {post.tags.length > 0 && (
                  <CardContent className="px-0">
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
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
