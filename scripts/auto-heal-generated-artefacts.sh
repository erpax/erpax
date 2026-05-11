#!/usr/bin/env bash
# Auto-heal generated artefacts — Slice FFFFFF (2026-05-11).
#
# When the pre-push gate detects drift in a DETERMINISTICALLY-REGENERABLE
# artefact (the index of @standard citations, the Payload types file,
# the admin importmap), this script regenerates it AND commits the
# diff as a self-heal commit, so the push can proceed without forcing
# the user to manually run `pnpm standards:write-index && git commit`.
#
# Contract (must hold for every artefact this script handles):
#
#   1. The artefact is deterministically derived from spec / source.
#   2. Re-running the generator on the same input always produces the
#      same output (byte-identical).
#   3. The generator is fast (< 5s) so adding it to the push gate is
#      cheap.
#   4. Drift is caused by the spec/source diverging from the artefact —
#      regenerating it brings them back in sync; never the other way
#      round.
#
# Non-regenerable failures (lint, tsc errors, missing @standard tag,
# untranslated i18n key, conservation invariant warning) are NOT
# auto-healed — they require human review.
#
# Usage (from repo root):
#   bash scripts/auto-heal-generated-artefacts.sh           # heal all known artefacts
#   bash scripts/auto-heal-generated-artefacts.sh --dry-run # report only
#
# @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability
# @standard ISO 19011:2018 §6.4.6 audit-evidence (self-heal commits visible in git log)
# @audit deterministic-regeneration

set -e
cd "$(dirname "$0")/.." || exit 1
export PATH="$PWD/node_modules/.bin:$PATH"
export NODE_OPTIONS=--no-deprecation

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

healed=()

# ── Artefact 1: docs/STANDARDS_INDEX.md ──────────────────────────────
if bash scripts/standards-citation-index.sh --verify-index >/dev/null 2>&1; then
  : # already in sync
else
  echo "auto-heal: STANDARDS_INDEX.md is stale — regenerating"
  if [ "$DRY_RUN" = 0 ]; then
    bash scripts/standards-citation-index.sh --write-index >/dev/null
    git add docs/STANDARDS_INDEX.md
    healed+=("docs/STANDARDS_INDEX.md")
  fi
fi

# ── Artefact 2: src/payload-types.ts ─────────────────────────────────
if bash scripts/payload-verify-types.sh >/dev/null 2>&1; then
  :
else
  if command -v pnpm >/dev/null 2>&1; then
    echo "auto-heal: src/payload-types.ts is stale — regenerating"
    if [ "$DRY_RUN" = 0 ]; then
      # Capture full output so a failure shows what payload actually said,
      # instead of the silent 'ERROR: ... Run it manually' that hid the
      # cause for slices NNNNNN..MMMMMMMM. Tail keeps the message compact;
      # the exit code is propagated.
      tmp_types_log=$(mktemp)
      if ! pnpm exec payload generate:types >"$tmp_types_log" 2>&1; then
        echo "  ↳ payload generate:types FAILED — last 40 lines of output:"
        tail -40 "$tmp_types_log" | sed 's/^/    /'
        echo "  ↳ full log: $tmp_types_log"
        rm -f "$tmp_types_log"
        echo "ERROR: pnpm exec payload generate:types failed for Payload types."
        exit 1
      fi
      rm -f "$tmp_types_log"
      tmp_imp_log=$(mktemp)
      if ! pnpm exec payload generate:importmap >"$tmp_imp_log" 2>&1; then
        echo "  ↳ payload generate:importmap FAILED — last 40 lines of output:"
        tail -40 "$tmp_imp_log" | sed 's/^/    /'
        echo "  ↳ full log: $tmp_imp_log"
        rm -f "$tmp_imp_log"
        echo "ERROR: pnpm exec payload generate:importmap failed for Payload admin importmap."
        exit 1
      fi
      rm -f "$tmp_imp_log"
      git add src/payload-types.ts "src/app/(payload)/admin/importMap.js" 2>/dev/null || true
      healed+=("src/payload-types.ts")
    fi
  else
    echo "auto-heal: SKIPPED payload-types regen (pnpm not available in this environment)"
  fi
fi

# ── Future artefacts — wire as they land ─────────────────────────────
# - src/services/spec-generator/* outputs (chain registry, seeds, tests,
#   marketing pages, README per collection): when CCCCC pipeline gets
#   a `--write` mode for each generator, dispatch here.
# - i18n bundles new keys: regenerate via translation-generator.

# ── Commit the heal as a single chore commit ─────────────────────────
if [ ${#healed[@]} -gt 0 ] && [ "$DRY_RUN" = 0 ]; then
  msg="chore(auto-heal): pre-push regen — $(printf '%s, ' "${healed[@]}" | sed 's/, $//')"
  # Detect if there's actually anything staged (defensive — git add may be a no-op
  # if the regenerated file is already identical to HEAD for some reason).
  if ! git diff --cached --quiet; then
    git commit --no-verify -m "$msg

Auto-healed by scripts/auto-heal-generated-artefacts.sh during the
pre-push gate. These files are deterministically regenerable from
spec/source (RFC 8785-canonicalized walks); the generator is fast and
the output is byte-identical across runs.

The original commits ran with --no-verify (sandbox without pnpm,
or rebase / cherry-pick / amend), bypassing the pre-commit auto-regen.
The pre-push gate caught the drift, this self-heal closes it, the gate
re-runs and the push proceeds.

@audit ISO 19011:2018 §6.4.6 self-heal-commits visible in git log
@standard ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability"
    echo "auto-heal: committed (${#healed[@]} artefact(s))"
  fi
elif [ ${#healed[@]} -eq 0 ]; then
  : # nothing to do
fi

exit 0
