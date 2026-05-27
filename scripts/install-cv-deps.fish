#!/usr/bin/env fish

set -l packages \
  texlive-bin \
  texlive-binextra \
  texlive-basic \
  texlive-xetex \
  texlive-latex \
  texlive-latexrecommended \
  texlive-latexextra \
  texlive-fontsrecommended

if not type -q paru
  echo "error: paru is required to install the CachyOS/Arch CV dependencies." >&2
  exit 1
end

paru -S --needed $packages
or exit $status

set -l script_dir (dirname (status --current-filename))
set -l root_dir (cd "$script_dir/.."; and pwd)

bash "$root_dir/scripts/check-cv-deps.sh"
