#!/usr/bin/env bash
# ERPax pre-push gate — single command that runs every architecture
# guard the maintainer has built up across slices LLLL → MMMM → NNNN.
#
# Wire to git via:
#   echo 'bash scripts/pre-push.sh' > .git/hooks/pre-push && chmod +x .git/hooks/pre-push
#
# Or via package.json `"prepush": "bash scripts/pre-push.sh"` consumed by
# whichever git-hook manager the project adopts (husky / simple-git-hooks).
#
# Each gate prints a compact PASS/FAIL header so a long log is still
# greppable. The first failure aborts (`set -e`); STRICT_INVARIANTS=1 is
# forced so the architecture invariants throw on any failure.
#
# @audit ISO-19011:2018 §6.4 audit-evidence-pre-push
# @compliance SOX §404 internal-controls release-gate

set -euo pipefail

cd "$(dirname "$0")/.."

bold() { printf "\n\033[1m%s\033[0m\n" "$*"; }
ok()   { printf "\033[32m✓\033[0m %s\n" "$*"; }
fail() { printf "\033[31m✗\033[0m %s\n" "$*"; exit 1; }

bold "━━━ ERPax pre-push gate ━━━"

# ── 1. TypeScript strict ───────────────────────────────────────────────
bold "[1/5] tsc --noEmit"
if pnpm tsc --noEmit; then
  ok "tsc clean"
else
  fail "tsc failed — see output above"
fi

# ── 2. Architecture invariants (LLLL) — STRICT ────────────────────────
bold "[2/5] architecture invariants (5-axis)"
if STRICT_INVARIANTS=1 pnpm vitest run tests/architecture/invariants.spec.ts --reporter=basic; then
  ok "all 5 axes pass under STRICT mode"
else
  fail "architecture invariants failed — see output above"
fi

# ── 3. Business-chain integration tests (KKKK + MMMM + NNNN; CCCCC-prep co-located) ──
# CCCCC-prep (2026-05-11): tests are now co-located next to their seed
# files at src/plugins/accounting/seeds/chains/<id>.test.ts.
bold "[3/5] business-chain integration tests"
if pnpm vitest run src/plugins/accounting/seeds/chains/ --reporter=basic; then
  ok "all chain seed/test pairs pass"
else
  fail "chain tests failed — see output above"
fi

# ── 4. Generated docs are in sync with the registry ───────────────────
bold "[4/5] docs/BUSINESS_CHAINS.md in sync"
if pnpm exec tsx src/services/business-chains/gen-doc.ts; then
  if git diff --quiet docs/BUSINESS_CHAINS.md; then
    ok "doc matches registry — no diff"
  else
    fail "docs/BUSINESS_CHAINS.md is out of sync — commit the regenerated file"
  fi
else
  fail "doc generator threw — see output above"
fi

# ── 5. No orphan barrel exports ───────────────────────────────────────
bold "[5/5] accounting barrel ↔ plugin registration symmetry"
BARREL=$(grep -c '^export { \(default as \)\?[A-Z]' src/plugins/accounting/collections/index.ts)
PLUGIN=$(grep -c '^      [A-Z][a-zA-Z]\+,$' src/plugins/accounting/plugin.ts)
if [ "$BARREL" -eq "$PLUGIN" ]; then
  ok "barrel=$BARREL ↔ plugin=$PLUGIN symmetric"
else
  fail "barrel=$BARREL ≠ plugin=$PLUGIN — ASYMMETRIC"
fi

bold "━━━ all 5 gates passed ━━━"
