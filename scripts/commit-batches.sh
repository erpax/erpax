#!/usr/bin/env bash
# Slice-by-slice commit script.
#
# Stages and commits the standards-refactor + bug-hunt + DRY work in 7
# logical batches so each commit is reviewable in isolation. Designed to
# run on a clean main (or a fresh `refactor/standards-and-cleanup`
# branch) — the order matters because later batches build on earlier
# ones.
#
# Usage:
#   bash scripts/commit-batches.sh
#
# After all 7 commits land, push with:
#   git push origin <branch>
#
# Each batch ends with a `git commit -m`; abort at any point with Ctrl-C.

set -euo pipefail

cd "$(dirname "$0")/.."

# Confirm clean state before starting (no in-progress merge/rebase).
if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || [ -f .git/MERGE_HEAD ]; then
  echo "ERROR: repo is in a rebase or merge state. Resolve first."
  exit 1
fi

# Cleanup any stale index.lock from interrupted runs.
rm -f .git/index.lock 2>/dev/null || true

# Configure author for this batch session (override locally if desired).
git config user.name  "${COMMIT_AUTHOR:-Tsvetan}"
git config user.email "${COMMIT_EMAIL:-ceci@psg.bg}"

run() {
  echo
  echo "════════════════════════════════════════════════════════════════════"
  echo "  $1"
  echo "════════════════════════════════════════════════════════════════════"
  shift
  "$@"
}

# ── Batch 1 ─────────────────────────────────────────────────────────────
# Standards taxonomy: docs, src/standards/, tests/standards/, citation
# index script + audit script. The foundation everything else cites.
run "Batch 1: Standards taxonomy + per-folder READMEs + tests/standards" \
  git add \
    docs/ \
    src/standards/ \
    tests/standards/ \
    scripts/standards-citation-index.sh \
    scripts/audit-default-columns.sh

git commit -m "feat(standards): add docs/STANDARDS.md taxonomy + src/standards/ tree

15 src/standards/<id>/ folders, each with README + index.ts + impls:
  iso-4217, iso-3166-1, iso-3166-2, iso-8601, iso-13616, iso-9362,
  bcp-47, _money, nist-incits-359, nist-sp-800-38, nist-sp-800-108,
  rfc-3986, rfc-6585, rfc-9110, _security-headers

Mirror tests/standards/<id>/ (15 folders, 22 spec files, full parity).

JSDoc grammar (docs/STANDARDS.md §3): 7 tags (@standard, @rfc,
@compliance, @accounting, @security, @audit, @quality). 1,936 valid
citations across the codebase.

Discovery: scripts/standards-citation-index.sh has 6 modes
(audit, counts, check, required, write-index, verify-index).
docs/STANDARDS_AUDIT.md per-file map. docs/MIGRATION_WORKLIST.md
slice ledger + recipe for adding new standards.

Slices A–KK + V + Y + Z."

# ── Batch 2 ─────────────────────────────────────────────────────────────
# Standards banners on existing src/ + tests/ code. Largest batch — every
# annotation across collections / services / hooks / utilities / etc.
# Plus the LL useAsTitle bug fixes, NN Payload v2→v3 imports, OO
# console→logger rewrites, JJJ hostId ReferenceError fix, EE+HHH+SSS
# test fixture cleanups.
run "Batch 2: Standards banners + LL+NN+OO+JJJ bug fixes + test fixtures" \
  git add \
    src/access/ \
    src/collections/ \
    src/components/ \
    src/email/ \
    src/endpoints/ \
    src/fields/ \
    src/i18n/ \
    src/hooks/ \
    src/jobs/ \
    src/middleware.ts \
    src/services/ \
    src/types/ \
    src/utilities/ \
    src/payload.config.ts \
    src/payload-types.ts \
    src/app/ \
    src/ecommerce/ \
    src/testing/ \
    src/config/ \
    tests/

git commit -m "feat(standards): annotate ~470 files + fix 4 latent migrate bugs + 23 v2 imports

Annotations:
- Every standards-bearing file gains a JSDoc banner per docs/STANDARDS.md §3.
- Pure utilities deliberately untagged (10 files in src/utilities/ touch
  no standard; see src/utilities/README.md for the implementer-vs-consumer
  boundary).

Bug fixes surfaced during the audit phase:
- LL: 4 collections had useAsTitle pointing into nested 'identity' groups
  (TaxCodes, Customers, Vendors, FiscalPeriods). Same migrate:create
  blocker as the original TaxJurisdictions bug. Hoisted code/name/label
  to top level.
- NN: 24 files imported types from Payload v2 paths
  ('payload/types', 'payload/config') under v3. Rewrote to
  'import type { ... } from \"payload\"'.
- OO: 22 console.* calls inside src/plugins/ rewritten to
  req.payload.logger.* (was failing the existing eslint
  'payload/proper-payload-logger-usage: error' rule).
- JJJ: caught and fixed a self-introduced ReferenceError in 8 hooks
  (hostId variable rename missed the service-call sites).

Test-fixture realignments (Slice EEE+HHH+SSS):
- 3 accounting seed files: role:'X' singular -> roles:['X'] plural
  array + hostId field-key -> tenant.
- level-2 + level-3 e2e tests: ad-hoc fixture schemas + data/where
  literals flipped from 'hostId' to 'tenant' to match post-CCC schema.

Slices B–J + LL + MM + NN + OO + EEE + HHH + JJJ + KKK + LLL + QQQ + RRR + SSS."

# ── Batch 3 ─────────────────────────────────────────────────────────────
# The architectural cluster fix (Decision B): host/role/tenant unification
# across the accounting plugin. Touches collection-factory.ts,
# auth/access.ts, auth/types.ts, hooks/common.ts, all collection files
# under src/plugins/accounting/, and the 4 core collections.
run "Batch 3: Decision B — host/role/tenant unification" \
  git add \
    src/plugins/accounting/ \
    src/plugins/auth/ \
    src/plugins/hooks/ \
    src/plugins/parties/ \
    src/plugins/payables/ \
    src/plugins/receivables/ \
    src/plugins/export/

git commit -m "refactor(accounting): unify host/role/tenant model across the plugin

Resolves the architectural cluster found in Slices PP/QQ/SS/TT/UU:
the accounting plugin was authored against a different user/access/
tenant model than the canonical app. Slice VV confirmed the broken
pattern was contained to the plugin tree; Slices BBB+CCC+DDD+EEE+FFF
+GGG+HHH+PPP applied the unified fix.

Step 1 (CCC): renamed every 'host'/'hostId' field declaration to
'tenant' across 20 collection files (16 accounting + 4 core).
Step 2 (CCC): rewrote @/plugins/auth/access.ts to derive active
tenant from req.user.tenants[0]?.tenant (canonical multi-tenant
plugin shape). UserContext.host -> UserContext.tenant.
Step 3 (CCC): autoPopulateHost in @/plugins/hooks/common.ts now
sets data.tenant.
Step 4 (BBB): extended User.roles enum with 'accountant' + 'auditor';
rewrote 41 'req.user?.role === X' (singular non-existent field) to
'req.user?.roles?.includes(X)' (canonical plural array).
Step 5 (FFF + DDD): GL-posting service exports a singleton
glPostingService = new GLPostingService(eventEmitter). 4 hooks
(item, invoice, payment, bill) now import directly. The other 4
hooks (apAging, arAging, cogs, depreciation) referenced services
that don't exist as files; detached and queued for deletion.
Step 6 (EEE): seed files realigned with the new schema.

Cascading cleanup (DDD + GGG): every doc.hostId -> doc.tenant,
every requestContext fallback removed, host-scope.ts middleware
rewritten clean (was perl-mangled into a syntax error by CCC).

Service-layer + DTO rename (OOO): hostId -> tenantId across 7 type
files + 11 service files. ~70 occurrences flipped via perl. Closes
the III cosmetic residual.

DRY consolidation (PPP): merged ensureHostId into canonical
autoPopulateHost (both populated data.tenant from the user's tenant).
Factory uses beforeValidate: [autoPopulateHost] now. Removed all
@deprecated re-exports from the active import graph.

Slices BBB + CCC + DDD + EEE + FFF + GGG + III + OOO + PPP."

# ── Batch 4 ─────────────────────────────────────────────────────────────
# DRY refactor of core collections + access predicate standardization.
# Re-staging just the core collection files that changed in MMM/NNN.
# (Most of these already landed in Batch 2 since they share the directory;
# this batch only fires if there's anything left.)
run "Batch 4: Onboarding — README + CONTRIBUTING + CHANGELOG + PR template" \
  git add \
    README.md \
    CONTRIBUTING.md \
    CHANGELOG.md \
    .github/pull_request_template.md

git commit -m "docs: README rewrite + CONTRIBUTING + CHANGELOG + PR template

README.md (Slice DD): rewrote to surface the standards system as the
project's organizing principle. Lead paragraph names the JSDoc
contract; Standards System table maps each doc to its purpose;
What's Implemented section cites IFRS/ISO/EN standards inline.
Quick Start replaces stale 'Create 4 hooks in src/hooks/accounting/'
instructions (folder removed in slice-f deletion script).

CONTRIBUTING.md (Slice EE): new file. Walks contributors through
the JSDoc banner contract, the standards system rules, and the PR
flow. §4 (Slice TTT) covers the new pnpm payload:verify-types gate.

CHANGELOG.md (Slice GG, GG-current): Keep-a-Changelog 1.0.0 +
[Unreleased] sections. Records every fix from Slices A–UUU with
file paths and rationale. The audit findings (LL/MM/NN/OO/PP/QQ/RR
/SS/TT/UU/VV/YY) are documented honestly, including 1 self-introduced
regression caught + fixed in JJJ.

.github/pull_request_template.md (Slice EE): adds standards
checklist (4 items) so reviewers verify the JSDoc grammar."

# ── Batch 5 ─────────────────────────────────────────────────────────────
# Gate chain: package.json scripts + pre-push hook + CI workflow +
# eslint config + vitest config + payload-verify-types script.
run "Batch 5: Gate chain — pnpm scripts + pre-push + CI + payload:verify-types" \
  git add \
    package.json \
    pnpm-lock.yaml \
    eslint.config.mjs \
    vitest.config.mts \
    .husky/pre-push \
    .github/workflows/ci.yml \
    scripts/payload-verify-types.sh

git commit -m "ci: standards + payload-types + importmap freshness gates

5-layer enforcement chain (Slices AA + BB + CC + KK + TTT + UUU):
  1. Manual: pnpm standards:audit / counts / check / required /
     write-index / verify-index
  2. Local gate: pnpm check (runs all standards gates +
     payload:verify-types + lint + typecheck + tests)
  3. Pre-push hook: .husky/pre-push (mirrors pnpm check inline)
  4. CI standards job: parallel with lint/typecheck/test-int
  5. CI build job: blocked by needs: [standards, lint, typecheck,
     test-int]

scripts/payload-verify-types.sh (TTT + UUU): checks 2 generated
artefacts are fresh — src/payload-types.ts and
src/app/(payload)/admin/importMap.js. Stashes committed file,
regenerates, diffs, restores. Fails non-zero with 'Run: <cmd> &&
git add <path>' if either drifted.

vitest.config.mts: include glob extended for tests/standards/
(Slice M). Single-threaded execution preserved for D1/SQLite.

eslint.config.mjs: globalIgnores updated for generated artefacts."

# ── Batch 6 ─────────────────────────────────────────────────────────────
# Auxiliary scripts + the deletion script + wrangler cron.
run "Batch 6: Aux scripts + deletion script + wrangler cron" \
  git add \
    scripts/slice-f-delete-dead-stubs.sh \
    scripts/commit-batches.sh \
    wrangler.jsonc \
    cloudflare-env.d.ts \
    public/

git commit -m "chore(scripts): deletion script + wrangler cron + commit batches

scripts/slice-f-delete-dead-stubs.sh: ~144 dead files queued for
local deletion across 11 slice blocks (F + L + M + N + O + P + Q + X
+ HH + NN + RR + PPP). Sandbox can't delete; this runs locally.

scripts/commit-batches.sh: this script — re-runnable batch-commit
helper if rebasing or cherry-picking parts of the refactor.

wrangler.jsonc (AAA): triggers.crons added for the 'dunning-cycle'
Payload task (Slice ZZ). Fires every 15 min via Cloudflare's
scheduled handler -> POST /api/payload-jobs/run with the cron
Bearer token derived from PAYLOAD_SECRET.

cloudflare-env.d.ts: regenerated by wrangler types after wrangler.jsonc
edit (auto-regenerated; check committed for fresh-checkout sanity)."

# ── Batch 7 (residual) ──────────────────────────────────────────────────
# Anything left — should be empty if the prior 6 batches caught everything.
run "Batch 7: Residual catch-all (should be empty)" \
  git add -A
if git diff --cached --quiet; then
  echo "  Nothing to commit. Tree clean."
else
  git commit -m "chore: residual changes from the standards-refactor sweep

Catch-all for files not anchored to a specific slice. Review
the diff carefully; if anything here is unexpected, amend or
revert before pushing."
fi

echo
echo "════════════════════════════════════════════════════════════════════"
echo "  All batches committed."
echo "════════════════════════════════════════════════════════════════════"
echo
echo "  Final state:"
git log --oneline -10 | sed 's/^/    /'
echo
echo "  Recommended next step:"
echo "    git push origin \$(git branch --show-current)"
echo
echo "  The pre-push hook will run all gates locally first. Expect:"
echo "    1. standards:check / required / verify-index   (<1s each)"
echo "    2. payload:verify-types                          (~5–15s, regenerates payload-types + importMap)"
echo "    3. eslint --quiet                                (~30s)"
echo "    4. lint:src                                      (~20s)"
echo "    5. tsc --noEmit                                  (~60s on this project)"
echo "    6. vitest run                                    (~60–120s incl. tests/standards/)"
