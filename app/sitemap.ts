import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog/posts";
import { SEO } from "@/lib/content/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const blogPosts = await getPublishedBlogPosts();
  const latestBlogEdit = blogPosts
    .map((post) => post.editedAt)
    .sort()
    .at(-1);

  return [
    {
      url: SEO.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SEO.url}/cv.pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SEO.url}/blog`,
      lastModified:
        latestBlogEdit ? new Date(`${latestBlogEdit}T00:00:00.000Z`) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${SEO.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.editedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
