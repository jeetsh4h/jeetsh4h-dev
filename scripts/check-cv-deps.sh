#!/usr/bin/env bash
set -euo pipefail

REQUIRED_COMMANDS=(
  latexmk
  xelatex
  kpsewhich
)

REQUIRED_TEX_FILES=(
  article.cls
  fontspec.sty
  geometry.sty
  xcolor.sty
  enumitem.sty
  hyperref.sty
  tabularx.sty
  titlesec.sty
  texgyrepagella-regular.otf
  texgyrepagella-bold.otf
  texgyrepagella-italic.otf
  texgyrepagella-bolditalic.otf
)

ARCH_PACKAGES=(
  texlive-bin
  texlive-binextra
  texlive-basic
  texlive-xetex
  texlive-latex
  texlive-latexrecommended
  texlive-latexextra
  texlive-fontsrecommended
)

missing=0

for cmd in "${REQUIRED_COMMANDS[@]}"; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "missing command: $cmd" >&2
    missing=1
  fi
done

if command -v kpsewhich >/dev/null 2>&1; then
  for tex_file in "${REQUIRED_TEX_FILES[@]}"; do
    if ! kpsewhich "$tex_file" >/dev/null 2>&1; then
      echo "missing TeX file: $tex_file" >&2
      missing=1
    fi
  done
else
  echo "skipping TeX file checks because kpsewhich is missing." >&2
fi

if command -v xelatex >/dev/null 2>&1; then
  tmp_dir="$(mktemp -d)"
  trap 'rm -rf "$tmp_dir"' EXIT

  cat > "$tmp_dir/fontcheck.tex" <<'EOF'
\documentclass{article}
\usepackage{fontspec}
\setmainfont{texgyrepagella}[
  Extension=.otf,
  UprightFont=*-regular,
  BoldFont=*-bold,
  ItalicFont=*-italic,
  BoldItalicFont=*-bolditalic,
  Ligatures=TeX
]
\begin{document}
OK
\end{document}
EOF

  if ! (cd "$tmp_dir" && xelatex -file-line-error -halt-on-error -interaction=nonstopmode fontcheck.tex >/dev/null 2>&1); then
    echo "xelatex exists, but cannot compile with the required OpenType fonts." >&2
    missing=1
  fi
fi

if (( missing != 0 )); then
  cat >&2 <<EOF

Install the CV build dependencies on CachyOS/Arch with:

  paru -S --needed ${ARCH_PACKAGES[*]}

Then run:

  pnpm cv:check-deps
  pnpm cv:build

EOF
  exit 1
fi

echo "CV LaTeX dependencies are installed."
