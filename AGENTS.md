# jeetsh4h.dev

## Project

- This is Jeet Shah's personal website and diary/blog. It is both a personal archive and experimental playground and a polished, recruiter-facing portfolio. Preserve its voice and distinctive design while keeping public claims accurate, accessible, performant, and discoverable.
- This is a Next.js App Router application with local MDX diary entries. Before changing Next.js, React, or MDX behavior, inspect the installed versions in `package.json` and use the matching official documentation.
- Use `README.md` for setup, commands, content-date maintenance, diary publishing, and CV build details. Run relevant focused checks while editing and `pnpm verify` before completing code, configuration, or MDX changes; if the generated CV is absent, follow the documented CV workflow rather than creating a placeholder.

## Diary entries

- Everything in `diary/*.mdx`, including titles and descriptions, is authored by Jeet. Preserve his wording, tone, capitalization, jokes, opinions, and stylistic choices. Do not rewrite diary content for style, consistency, recruiter appeal, or SEO unless explicitly asked.
- Only flag objective suspected typos; never silently fix them. Report the location and suggested correction. Do not treat grammar, phrasing, or voice as errors unless explicitly asked.
- Keep `publishedAt` as the original publication date. Change `updatedAt` only after a meaningful human-authored content change, never merely to signal freshness.

## CV

- `cv/cv.pdf` and `public/cv.pdf` are generated, ignored artifacts. Never edit or commit them as source; edit `cv/cv.tex` and use the documented build scripts.
- Keep overlapping experience, education, research, and date information in the CV and website in sync.

## SEO-sensitive edits

- The canonical production origin is `https://jeetsh4h.dev`. When editing an indexable route, preserve accurate page-specific metadata, its self-canonical, crawlable HTML content and links, and structured data that matches visible content.
- Indexing policy: `/`, `/diary`, published diary entries, and `/cv.pdf` are indexable; `/pdf`, `/terminal`, drafts, previews, and error or utility pages are not. Only canonical indexable URLs belong in `app/sitemap.ts`. Keep `noindex` pages crawlable so crawlers can read the directive.
- When a route or published diary entry changes, keep its metadata, canonical URL, robots policy, sitemap entry, RSS entry, dates, structured data, and relevant tests consistent. Do not insert keywords or alter diary prose for SEO.
