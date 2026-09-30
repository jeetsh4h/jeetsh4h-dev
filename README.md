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

## Role-specific Resumes

Role-specific resume sources live in `cv/resumes/`.

```bash
pnpm resumes:build
```

This uses the CV’s TeX Live installation. The command discovers resume sources,
rejects multiple pages or overflowing content, and publishes the PDFs to
`public/resumes/`. Temporary TeX build files are removed automatically. Generated
PDFs remain ignored, like `public/cv.pdf`, and both deploy workflows regenerate
them from source. Build the CV and resumes before running `pnpm verify`.

Each resume declares its catalog title, last content-update date, and description
in its TeX source, immediately after the shared layout input:

```tex
\resumemetadata{Role Title}{2026-09-30}{Relevant experience for this role.}
```

Keep these three fields as single-line plain text without TeX commands or braces.
Change the date only when editing content, not when rebuilding. The page reads
these declarations directly; there is no separate catalog to maintain. New
role sources are discovered automatically by the build and page. To add a
resume, create a `<role>.tex` file with the shared layout and metadata. To remove
one, delete its source. Run `pnpm resumes:build` after either change; the build
also removes stale PDFs. No fixed list or count needs updating.

Edit the corresponding `.tex` source and rebuild; `resume-layout.tex` controls
shared typography. Review the resulting PDF after changing content. Preserve
one-page density by selecting relevant evidence and adjusting spacing, rather
than shrinking the font or adding filler.

Resumes use black text with blue, underlined links. The internal selection
record in `cv/content-review.md` tracks included evidence, exclusions, and facts
that still need clarification.

## Merge PDFs

The Fish CLI requires `pdfunite`, provided by Poppler. By default it prompts
for the PDF order and output path:

```fish
pnpm pdf:merge resume.pdf letter.pdf transcript.pdf
```

At the order prompt, press Enter to keep the displayed order or enter every
item number in the desired order, such as `2 1 3`.

For automation, skip either or both prompts:

```fish
pnpm pdf:merge --current-order resume.pdf letter.pdf
pnpm pdf:merge --output application.pdf resume.pdf letter.pdf
pnpm pdf:merge --current-order --output application.pdf resume.pdf letter.pdf
```

An explicit `--output` path replaces an existing file. The interactive path
asks before replacing one.

## CI LaTeX Image

Deploy workflows build `public/cv.pdf` and `public/resumes/*.pdf` with a slim GHCR image:

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
  the site content and LinkedIn. Update the explicit footer date after meaningful
  CV changes; rebuilding alone must not claim a fresh content date.
- `cv/resumes/*.tex`: update `\resumemetadata` dates after content edits and run
  `pnpm resumes:build` to refresh the public downloads.
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
