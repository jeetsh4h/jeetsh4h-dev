#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_DIR="$ROOT_DIR/cv"
PUBLIC_DIR="$ROOT_DIR/public"

if ! command -v latexmk >/dev/null 2>&1; then
  echo "error: latexmk is required to build the CV." >&2
  echo "Install a LaTeX distribution that includes latexmk, then run pnpm cv:build again." >&2
  exit 1
fi

cd "$CV_DIR"
latexmk -pdf -file-line-error -halt-on-error -interaction=nonstopmode cv.tex

mkdir -p "$PUBLIC_DIR"
cp "$CV_DIR/cv.pdf" "$PUBLIC_DIR/cv.pdf"

"$ROOT_DIR/scripts/clean-cv.sh"
