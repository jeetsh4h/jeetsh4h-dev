import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import { SEO } from "@/lib/content/seo";

describe("sitemap", () => {
  it("exposes the homepage and raw CV PDF but excludes utility pages", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(SEO.url);
    expect(urls).toContain(`${SEO.url}/cv.pdf`);
    expect(urls).not.toContain(`${SEO.url}/pdf`);
    expect(urls).not.toContain(`${SEO.url}/terminal`);
  });
});
