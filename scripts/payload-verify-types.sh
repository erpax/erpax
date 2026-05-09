#!/usr/bin/env bash
# Generated-artefact freshness gate.
#
# For each tracked auto-generated file (Payload types, Cloudflare env types,
# Payload importmap), stash the committed version, regenerate from the live
# source, diff. Exit non-zero if any drifted — i.e. the dev forgot to
# commit a regenerated artefact after changing the source of truth. Same
# shape as `pnpm standards:verify-index`.
#
# Run from repo root: `bash scripts/payload-verify-types.sh`
#
# Wiring (Slices TTT + UUU):
#   • `pnpm check` — runs after standards gates, before lint+typecheck.
#   • `.husky/pre-push` — cheapest local gate that blocks a stale push.
#   • `.github/workflows/ci.yml` typecheck job — runs before `tsc
#     --noEmit` so stale artefacts fail with a clear regenerate
#     instruction instead of a misleading downstream error.
#
# @standard ISO-25010:2023 quality-model maintainability
# @audit ISO-19011:2018 audit-evidence artefacts-fresh

set -euo pipefail

cd "$(dirname "$0")/.."

# Each entry: target-path|regenerate-command|description
# Order matters — payload generate:types ALSO emits the schema, so it
# runs first; importmap regenerates after collections settle.
TARGETS=(
  "src/payload-types.ts|pnpm exec payload generate:types|Payload types"
  "src/app/(payload)/admin/importMap.js|pnpm exec payload generate:importmap|Payload admin importmap"
)

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

fail=0

for entry in "${TARGETS[@]}"; do
  IFS='|' read -r target cmd label <<< "$entry"

  if [ ! -f "$target" ]; then
    echo "ERROR: ${target} does not exist. Run: ${cmd}"
    fail=1
    continue
  fi

  backup="${tmp}/$(echo "$target" | tr '/' '_').committed"
  cp "$target" "$backup"

  if ! NODE_OPTIONS=--no-deprecation eval "$cmd" > /dev/null 2>&1 ; then
    cp "$backup" "$target"
    echo "ERROR: ${cmd} failed for ${label}."
    echo "       Run it manually to see the error."
    fail=1
    continue
  fi

  if ! diff -q "$backup" "$target" >/dev/null 2>&1; then
    echo "ERROR: ${target} is stale (${label})."
    echo "       Run: ${cmd} && git add ${target}"
    echo
    echo "First 30 lines of diff:"
    diff -u "$backup" "$target" | head -30
    cp "$backup" "$target"
    fail=1
    continue
  fi

  cp "$backup" "$target"
  echo "OK — ${target} matches the live source (${label})."
done

exit "$fail"
