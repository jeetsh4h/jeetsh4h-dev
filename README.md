# jeetsh4h.dev

## Attribution

**Cat ASCII art:**

- https://user.xmission.com/~emailbox/ascii_cats.htm
- https://emojicombos.com/cute-cat-ascii-art
- https://www.asciiart.eu/animals/cat
- https://asciiart.website/cat.php?category_id=32

**Cat sprites:**

- https://luizmelo.itch.io/pet-cat-pack

**Color scheme:**

- https://catppuccin.com

<!-- Add attribution for the SVGs and note about AI-generated SVGs -->

## Local Development

```bash
pnpm install
pnpm dev
```

## CV Build

Requires a local TeX Live installation with `latexmk`, `xelatex`, and the
OpenType fonts used by `cv/cv.tex`.

```bash
pnpm cv:check-deps
pnpm cv:build
```

The generated PDF is copied to `public/cv.pdf` for local preview.

On CachyOS/Arch with `fish` and `paru`, install the required TeX Live packages
with:

```fish
pnpm cv:install-deps:cachyos
```

The installer wraps:

```fish
paru -S --needed texlive-bin texlive-binextra texlive-basic texlive-xetex texlive-latex texlive-latexrecommended texlive-latexextra texlive-fontsrecommended
```

## CI LaTeX Image

Deploy workflows build `public/cv.pdf` with a slim GHCR image:

`ghcr.io/jeetsh4h/jeetsh4h-dev/latex-cv:latest`

If the image dependencies change, update `.github/docker/latex-cv/Dockerfile`
and run the `Build LaTeX CV Image` workflow before relying on deploy workflows.

## Checks

```bash
pnpm lint
pnpm test
pnpm build
pnpm verify
```

## Manual Date Maintenance

Some dates are content decisions and must be reviewed by hand when changing the
site:

- `diary/*.mdx`: keep `publishedAt` as the original publish date and set
  `updatedAt` only when the entry content meaningfully changes.
- `lib/content/seo.ts`: update `SEO.updatedAt` when the homepage/site content has
  a meaningful content update; it feeds sitemap freshness for the canonical
  homepage.
- `lib/content/experience.ts`, `lib/content/education.ts`, and
  `lib/content/research.ts`: review date ranges, `Present` entries, research
  years, and any revisit notes whenever profile content changes.
- `cv/cv.tex`: keep experience, publication, and education dates in sync with
  the site content.
- Ensure the footer copyright years and License copyright year is updated.

## Diary Entries

```bash
pnpm diary:new
```

Creates `diary/change-this-diary-entry-slug.mdx` with placeholder
title/description and today's date. The placeholders are intentionally loud;
change the slug, title, and description before publishing.

Useful variants:

```bash
pnpm diary:new -- "Entry Title"
pnpm diary:new -- "Entry Title" --slug custom-slug --date YYYY-MM-DD
pnpm diary:new -- "Entry Title" --published
```

- Pass the title as one quoted argument.
- Drafts include `draft: true` and stay out of the diary index, RSS, and sitemap.
- Published entries need a non-empty `description` and `publishedAt`.
- Slugs must be lowercase letters/numbers with single hyphens.
