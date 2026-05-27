# jeetsh4h.dev

## Attribution

**Cat ASCII art:**

https://user.xmission.com/~emailbox/ascii_cats.htm  
https://emojicombos.com/cute-cat-ascii-art  
https://www.asciiart.eu/animals/cats  
https://asciiart.website/cat.php?category_id=32

**Cat sprites:**

https://luizmelo.itch.io/pet-cat-pack

**Color scheme:**

https://catppuccin.com

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

## Notes

Some project details are intentionally limited because they involve private
client codebases.
