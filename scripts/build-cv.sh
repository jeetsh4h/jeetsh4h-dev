#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_DIR="$ROOT_DIR/cv"
PUBLIC_DIR="$ROOT_DIR/public"

cleanup() {
  "$ROOT_DIR/scripts/clean-cv.sh"
}
trap cleanup EXIT

"$ROOT_DIR/scripts/check-cv-deps.sh"

cd "$CV_DIR"
latexmk -xelatex -file-line-error -halt-on-error -interaction=nonstopmode cv.tex

mkdir -p "$PUBLIC_DIR"
cp "$CV_DIR/cv.pdf" "$PUBLIC_DIR/cv.pdf"
