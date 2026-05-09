#!/usr/bin/env bash
# Standards citation index generator.
#
# Walks src/ and tests/ for every JSDoc tag the STANDARDS.md grammar
# defines (@standard, @rfc, @compliance, @accounting, @security, @audit,
# @quality), groups by tag value, and prints which files cite each one.
#
# This realises the "grep yields the full citation index" promise in
# docs/STANDARDS.md §3. CI can call `bash scripts/standards-citation-index.sh
# --check` to fail when a banner shape drifts (e.g. a stray @standard with
# no value).
#
# Run from repo root:
#   bash scripts/standards-citation-index.sh                # full index (stdout)
#   bash scripts/standards-citation-index.sh --counts       # tag totals only
#   bash scripts/standards-citation-index.sh --check        # fail on malformed banners
#   bash scripts/standards-citation-index.sh --required     # fail on missing banners under src/standards/ + tests/standards/
#   bash scripts/standards-citation-index.sh --write-index  # write index to docs/STANDARDS_INDEX.md
#   bash scripts/standards-citation-index.sh --verify-index # fail if docs/STANDARDS_INDEX.md is stale
#
# @standard ISO-25010:2023 quality-model maintainability
# @standard ISO-19011:2018 audit-evidence

set -euo pipefail

cd "$(dirname "$0")/.."

mode="${1:-index}"

# Tag → human label.
# Implemented as a function (not `declare -A`) so the script stays compatible
# with macOS's stock bash 3.2 — pre-push hooks run under the user's shell.
tag_label() {
  case "$1" in
    standard)   echo '@standard' ;;
    rfc)        echo '@rfc' ;;
    compliance) echo '@compliance' ;;
    accounting) echo '@accounting' ;;
    security)   echo '@security' ;;
    audit)      echo '@audit' ;;
    quality)    echo '@quality' ;;
    *)          echo "" ;;
  esac
}

emit_section() {
  local tag="$1"
  local label="$2"
  local pattern="^\\s*\\*\\s*${label}\\s+(\\S+.*)$"
  local hits
  echo
  echo "## ${label}"
  echo
  # Files containing this tag, with the value column extracted.
  # `|| true` so a tag with zero citations doesn't fail under `pipefail`.
  hits=$(grep -rEn --include='*.ts' --include='*.tsx' --include='*.md' \
       "${pattern}" src/ tests/ docs/ 2>/dev/null | sort -u || true)
  if [ -z "$hits" ]; then
    echo "_(no citations yet — reserved for future use)_"
  else
    echo "$hits"
  fi
}

count_tag() {
  local label="$1"
  grep -rE --include='*.ts' --include='*.tsx' --include='*.md' \
       "^\\s*\\*\\s*${label}\\s" src/ tests/ docs/ 2>/dev/null \
    | wc -l \
    | tr -d ' ' \
    || echo 0
}

case "$mode" in
  --counts)
    echo "Tag totals (citation count, not unique standards):"
    echo
    for tag in standard rfc compliance accounting security audit quality; do
      label="$(tag_label "$tag")"
      printf "  %-13s %s\n" "$label" "$(count_tag "$label")"
    done
    ;;

  --check)
    fail=0
    # Look for tag with no value (e.g. "* @standard" alone on a line).
    for tag in standard rfc compliance accounting security audit quality; do
      label="$(tag_label "$tag")"
      bad=$(grep -rEn --include='*.ts' --include='*.tsx' \
            "^\\s*\\*\\s*${label}\\s*$" src/ tests/ 2>/dev/null || true)
      if [ -n "$bad" ]; then
        echo "ERROR: ${label} with no value:"
        echo "${bad}"
        fail=1
      fi
    done
    if [ "$fail" -eq 0 ]; then
      echo "OK — every standards tag has a value."
    fi
    exit "$fail"
    ;;

  --required)
    # Every implementation file under src/standards/ MUST cite at least one
    # @standard or @rfc tag. Same rule applies to tests/standards/ — a test
    # file's whole reason for living is to exercise a specific standard.
    # README.md and index.ts barrels are exempt.
    fail=0
    missing=()
    while IFS= read -r f; do
      base=$(basename "$f")
      [ "$base" = "index.ts" ] && continue
      [ "$base" = "README.md" ] && continue
      # Look in the first 60 lines for @standard or @rfc on a banner line.
      if ! head -60 "$f" | grep -qE '^\s*\*\s*@(standard|rfc)\s' ; then
        missing+=("$f")
        fail=1
      fi
    done < <(
      find src/standards   -type f \( -name '*.ts' -o -name '*.tsx' \) 2>/dev/null
      find tests/standards -type f \( -name '*.ts' -o -name '*.tsx' \) 2>/dev/null
    )
    if [ "$fail" -eq 0 ]; then
      echo "OK — every src/standards/ and tests/standards/ file cites at least one @standard or @rfc."
    else
      echo "ERROR: standards files missing @standard / @rfc banner:"
      for f in "${missing[@]}"; do echo "  ${f}"; done
    fi
    exit "$fail"
    ;;

  --write-index)
    # Materialise the full index into docs/STANDARDS_INDEX.md.
    # CI runs --verify-index to enforce the committed file matches a fresh
    # generation; contributors regenerate via `pnpm standards:write-index`.
    out="docs/STANDARDS_INDEX.md"
    {
      cat <<'HEADER'
# Standards citation index (generated)

> **Generated.** Do not edit by hand. Regenerate with
> `pnpm standards:write-index`. CI verifies this file is fresh via
> `pnpm standards:verify-index`.
>
> Source of truth: the JSDoc banners in code. This file is the
> materialised output of `bash scripts/standards-citation-index.sh`.
HEADER
      for tag in standard rfc compliance accounting security audit quality; do
        emit_section "$tag" "$(tag_label "$tag")"
      done
    } > "$out"
    echo "Wrote ${out} ($(wc -l < "$out" | tr -d ' ') lines)"
    ;;

  --verify-index)
    # Generate fresh index to a temp file, diff against the committed copy.
    out="docs/STANDARDS_INDEX.md"
    tmp=$(mktemp)
    trap 'rm -f "$tmp"' EXIT
    {
      cat <<'HEADER'
# Standards citation index (generated)

> **Generated.** Do not edit by hand. Regenerate with
> `pnpm standards:write-index`. CI verifies this file is fresh via
> `pnpm standards:verify-index`.
>
> Source of truth: the JSDoc banners in code. This file is the
> materialised output of `bash scripts/standards-citation-index.sh`.
HEADER
      for tag in standard rfc compliance accounting security audit quality; do
        emit_section "$tag" "$(tag_label "$tag")"
      done
    } > "$tmp"
    if [ ! -f "$out" ]; then
      echo "ERROR: ${out} does not exist. Run: pnpm standards:write-index"
      exit 1
    fi
    if ! diff -q "$tmp" "$out" >/dev/null 2>&1; then
      echo "ERROR: ${out} is stale. Run: pnpm standards:write-index"
      echo
      echo "First 40 lines of diff:"
      diff -u "$out" "$tmp" | head -40
      exit 1
    fi
    echo "OK — ${out} matches the live citation banners."
    ;;

  index|*)
    cat <<'HEADER'
# Standards citation index (generated)

This file is the materialised output of:

    bash scripts/standards-citation-index.sh

It enumerates every JSDoc standards-tag citation found under src/, tests/,
and docs/. Re-run the script after adding new banners — it is not auto-
generated by CI yet.

Source of truth: the JSDoc banners in code. If this file is stale, the
script regenerates it.
HEADER
    for tag in standard rfc compliance accounting security audit quality; do
      emit_section "$tag" "${TAGS[$tag]}"
    done
    ;;
esac
