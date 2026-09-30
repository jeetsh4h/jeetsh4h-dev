#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RESUME_DIR="$ROOT_DIR/cv/resumes"
PUBLIC_DIR="$ROOT_DIR/public/resumes"

"$ROOT_DIR/scripts/check-cv-deps.sh"
BUILD_DIR="$(mktemp -d "$RESUME_DIR/.build.XXXXXX")"
trap 'rm -rf "$BUILD_DIR"' EXIT

cd "$RESUME_DIR"
for source in *.tex; do
  [[ "$source" == "resume-layout.tex" ]] && continue
  role="${source%.tex}"
  if [[ ! "$role" =~ ^[a-z]+(-[a-z]+)*$ ]]; then
    echo "Invalid resume filename: $source" >&2
    exit 1
  fi
  latexmk -xelatex -file-line-error -halt-on-error -interaction=nonstopmode \
    -outdir="$BUILD_DIR" "$source"
  # XeLaTeX's log records page count; no extra CI packages are required.
  pages="$(tr '\n' ' ' < "$BUILD_DIR/$role.log" | sed -n 's/.*Output written on .* (\([0-9][0-9]*\) pages\{0,1\},.*/\1/p')"
  if [[ "$pages" != "1" ]] || [[ ! -s "$BUILD_DIR/$role.pdf" ]]; then
    echo "$role.pdf has ${pages:-unknown} pages; expected exactly one." >&2
    exit 1
  fi
  if grep -Eq 'Overfull \\[hv]box' "$BUILD_DIR/$role.log"; then
    echo "$role has overflowing content." >&2
    exit 1
  fi
  echo "Verified one page: $role.pdf"
done

# Publish only after every source passes. This directory contains generated PDFs.
mkdir -p "$PUBLIC_DIR"
rm -f "$PUBLIC_DIR"/*.pdf
cp "$BUILD_DIR"/*.pdf "$PUBLIC_DIR/"
