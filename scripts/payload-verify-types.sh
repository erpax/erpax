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
  "src/payload-types.ts|./node_modules/.bin/payload generate:types|Payload types"
  "src/app/(payload)/admin/importMap.js|./node_modules/.bin/payload generate:importmap|Payload admin importmap"
)

# ── Memo: the answer is a pure function of its inputs ────────────────────────────────────────
#
# This gate BOOTS PAYLOAD TWICE (generate:types, then generate:importmap) and costs ~94s. The
# pre-push hook ran it twice per push — once inside the auto-heal, once as the assert — so ~190s
# of every push was one answer, computed twice. That is the corpus's own law broken in its own
# hook: reuse the computed answer, never re-derive.
#
# The key is computed in ONE place — scripts/payload-input-key.sh — because payload/approval.ts
# consults the same memo for the same two commands, and two definitions of "what this depends on"
# is exactly the defect this session spent itself folding out. Any edit to any input misses the
# memo and pays the full boot, so this cannot hide a stale artefact.
#
# PAYLOAD_VERIFY_NOCACHE=1 forces the full run.
CACHE_DIR="${TMPDIR:-/tmp}/erpax-payload-verify"
verify_key() { bash scripts/payload-input-key.sh; }

if [ "${PAYLOAD_VERIFY_NOCACHE:-0}" != "1" ]; then
  KEY="$(verify_key)"
  if [ -f "$CACHE_DIR/$KEY" ]; then
    echo "OK — generated artefacts match the live source (memo hit ${KEY:0:12}; PAYLOAD_VERIFY_NOCACHE=1 to re-derive)."
    exit 0
  fi
fi

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

  if ! NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=tsx/esm --import=./src/css/load-hook.mjs" \
      eval "$cmd" >"${tmp}/regen.out" 2>&1 ; then
    cp "$backup" "$target"
    echo "ERROR: ${cmd} failed for ${label}."
    echo "------- regen output (last 80 lines) -------"
    tail -80 "${tmp}/regen.out" || true
    echo "--------------------------------------------"
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

# Memo only a PASS. A failure must be re-derived every time: the fix changes the inputs anyway,
# and a cached red would outlive its cause.
if [ "$fail" -eq 0 ] && [ "${PAYLOAD_VERIFY_NOCACHE:-0}" != "1" ]; then
  mkdir -p "$CACHE_DIR" && : > "$CACHE_DIR/$(verify_key)"
fi

exit "$fail"
