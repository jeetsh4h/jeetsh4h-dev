#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_DIR="$ROOT_DIR/cv"

rm -f \
  "$CV_DIR"/*.aux \
  "$CV_DIR"/*.bbl \
  "$CV_DIR"/*.bcf \
  "$CV_DIR"/*.blg \
  "$CV_DIR"/*.fdb_latexmk \
  "$CV_DIR"/*.fls \
  "$CV_DIR"/*.log \
  "$CV_DIR"/*.out \
  "$CV_DIR"/*.run.xml \
  "$CV_DIR"/*.synctex.gz \
  "$CV_DIR"/*.toc \
  "$CV_DIR"/cv.pdf

if [[ "${1:-}" == "--all" ]]; then
  rm -f "$ROOT_DIR/public/cv.pdf"
fi
