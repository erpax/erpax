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
export NODE_OPTIONS="--no-deprecation --import=./src/css/load-hook.mjs --import=tsx/esm"

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

healed=()

# ── Artefact 1 (docs/STANDARDS_INDEX.md) REMOVED ─────────────────────
# The loose generated md violated md-purity (only SKILL.md is allowed) and was
# superseded by the standards catalogue: src/standards/emit.ts →
# src/standards/catalogue.ts → src/standards/SKILL.md. No artefact to heal here.

# ── Artefact 1.5: consistency-apply (Slice IIIIIIII 2026-05-11) ──────
#
# Before regenerating payload-types, run the ConsistencyAgent's
# deterministic transforms to close any structural drift the most
# recent commits introduced:
#   - applyChainProducerBackfill — adds producer:{} to BUSINESS_CHAINS
#     steps with a known action→status mapping (Class J).
#   - applyEmitsLegacyToStructured — upgrades string-form `emits:` to
#     structured wiring so the factory auto-injects producer hooks
#     (Class F).
#
# Idempotent: re-running on already-clean source is a no-op (the
# Slice DDDDDDDD apply functions skip entries with `producer:` /
# structured entries already present).
#
# Why BEFORE payload generate:types: the Slice EEEEEEEE / GGGGGGGG /
# HHHHHHHH errors all surfaced inside the payload sanitizer. The
# applyAll transforms close the upstream cause (e.g. a chain step
# whose emit literal isn't wired anywhere) so the regen can succeed.
# When applyAll is a no-op, this section adds zero latency.
# REMOVED — this block was dead, and dead in the way that matters: it guarded on
# `src/services/consistency-apply/index.ts`, a module that moved to `@/consistency/apply`. The guard
# was false on every run, so the heal never fired and the hook reported the same green it reports
# when the heal succeeds. A step that cannot run reads as coverage and is silence.
#
# It was not repointed. The module it would call still resolves
# `src/services/business-chains/registry.ts` internally, which is also gone — so activating it here
# would trade a silent no-op for a caught-and-logged error, which is not an improvement. The
# capability is not lost: `@/consistency/apply` is wired live through the MCP consistency tool
# (`src/agents/mcp/tool/consistency.ts`), which calls it by its real address.
#
# Found by [[rules]]/command, which measures paths named by whatever the repo actually runs.

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

# ── Artefact 3: SKILL.md frontmatter ─────────────────────────────────
#
# Every SKILL.md carries a computed frontmatter block derived from the atom's own body and its
# place in the matrix. It is DERIVED, so it drifts the moment an atom is minted or a body edited.
#
# THE FOLD HAD NO FIXPOINT, and the cause was an escape asymmetry, not the graph. `yamlQuote`
# writes `\\` for a backslash; `existingDescription` stripped the quotes and returned the body
# verbatim, so every sync re-escaped an already-escaped value and DOUBLED every backslash. One
# backslash became 2^passes of them: src/access/SKILL.md reached 25,179,501 bytes from 13,731,
# 49 files passed 100 KB, and the description grew on every pass so the fold could never settle.
# The reader now reverses exactly what the writer emits, and the corpus converges in 4 passes.
#
# `--sync` iterates to that fixpoint and REFUSES rather than reporting a settled tree; a pass that
# writes nothing ends the loop, so a settled tree costs exactly one pass.
#
# MEMOISED on the same key as the Payload artefacts, recorded AFTER a settled run — the fold costs
# ~40s even when it writes nothing, and paying that on every push is the crack this hook spent a
# session folding out. Any later edit to any input misses the memo, so it cannot hide drift.
SKILL_CACHE_DIR="${TMPDIR:-/tmp}/erpax-skill-frontmatter"
if [ "$DRY_RUN" = 0 ]; then
  skill_key=""
  if [ "${PAYLOAD_VERIFY_NOCACHE:-0}" != "1" ]; then
    skill_key="$(bash scripts/payload-input-key.sh 2>/dev/null || true)"
  fi
  if [ -n "$skill_key" ] && [ -f "$SKILL_CACHE_DIR/$skill_key" ]; then
    : # settled at this exact tree state — nothing to fold
  elif cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/skill/router/upgrade/index.ts --sync >/tmp/erpax-skill-sync.log 2>&1; then
    if ! git diff --quiet -- 'src/**/SKILL.md'; then
      echo "auto-heal: SKILL.md frontmatter drifted — regenerated"
      git add 'src/**/SKILL.md' 2>/dev/null || true
      healed+=("SKILL.md frontmatter")
    fi
    settled_key="$(bash scripts/payload-input-key.sh 2>/dev/null || true)"
    if [ -n "$settled_key" ]; then
      mkdir -p "$SKILL_CACHE_DIR" && : > "$SKILL_CACHE_DIR/$settled_key"
    fi
  else
    # A REFUSAL lands here: the fold could not settle. Do not stage a mid-cascade tree.
    echo "auto-heal: SKILL.md frontmatter sync did not settle — last 20 lines:"
    tail -20 /tmp/erpax-skill-sync.log || true
  fi
  rm -f /tmp/erpax-skill-sync.log
fi

# ── Artefact 4: the translations catalogue + per-atom projections ────
#
# Every atom carries a `translations.ts` whose entries store a uuid and a word-split RECOMPUTED
# from the source string. [[translations]]/collect asserts they recompute — "NO HALLUCINATION" —
# and nothing regenerated them, so the assertion had been red in CI.
#
# CORRECTION, recorded because the wrong version of it was committed: this step was pulled out
# earlier today on the grounds that `catalogueFile` "cannot succeed at corpus scale", after it
# died with `RangeError: Invalid string length`. That was a symptom, not the cause. The corpus's
# SKILL.md descriptions had been corrupted by an escape round-trip that doubled every backslash
# (see skill/router/upgrade/graph), so the descriptions alone were ~68 MB and the catalogue
# literal genuinely could not be built. With the descriptions repaired the same command writes
# 3,582 projections plus a 5.48 MB catalogue in FOUR SECONDS. Scale was never the problem.
#
# It is idempotent and inside the <5s contract at the top of this file, so it needs no memo.
if [ "$DRY_RUN" = 0 ]; then
  if cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/cli/index.ts translations collect >/tmp/erpax-tr.log 2>&1; then
    if ! git diff --quiet -- 'src/**/translations.ts' 'src/translations/catalogue.ts'; then
      echo "auto-heal: translations catalogue drifted — regenerated"
      git add 'src/**/translations.ts' src/translations/catalogue.ts 2>/dev/null || true
      healed+=("translations catalogue")
    fi
  else
    echo "auto-heal: translations collect FAILED — last 20 lines:"
    tail -20 /tmp/erpax-tr.log || true
  fi
  rm -f /tmp/erpax-tr.log
fi

# ── Artefact 5: the uuid matrix ──────────────────────────────────────
#
# `src/uuid/matrix/generated.ts` is one node per atom, derived from the tree — so minting an atom
# drifts it, and nothing regenerated it. Measured 2026-09-07: it held 3,581 of 3,582, missing
# `css/variables`, an atom minted earlier the same day. [[publish]]/complete caught it — "a count
# is not a census" — because three independent listings agreed on the total and not on the members.
#
# Its own banner cited `src/services/uuid-matrix/collide.mjs` (a path dissolved long ago) and
# `pnpm matrix:generate` (a script that did not exist). Both now name something real: a citation
# that leads nowhere is [[rules]]/reference, and a command that cannot run is [[rules]]/command.
#
# Emits in under a second, so it needs no memo.
if [ "$DRY_RUN" = 0 ]; then
  if node src/uuid/matrix/collide.mjs --emit >/tmp/erpax-matrix.log 2>&1; then
    if ! git diff --quiet -- src/uuid/matrix/generated.ts; then
      echo "auto-heal: uuid matrix drifted — regenerated"
      git add src/uuid/matrix/generated.ts 2>/dev/null || true
      healed+=("uuid matrix")
    fi
  else
    echo "auto-heal: uuid matrix emit FAILED — last 20 lines:"
    tail -20 /tmp/erpax-matrix.log || true
  fi
  rm -f /tmp/erpax-matrix.log
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
