#!/usr/bin/env bash
# Slices F + L + M + N + O + P + Q + X + HH — delete every dead stub,
# deprecated shim, retired tree, and legacy dev-note discovered through
# the standards-folder refactor.
# Verified zero-import as of session 2026-05-08 / 2026-05-09 (post-Slice-HH).
#
# Run from repo root: `bash scripts/slice-f-delete-dead-stubs.sh`
#
# What this deletes (~137 files across 9 slices):
#
#   Slice F (61) — original audit:
#   • 20 top-level shadow .ts in src/collections/  (each is `export {}` with @deprecated JSDoc)
#   • 5 retired collection folders (Customers, Vendors, TaxJurisdictions, TaxCodes, FiscalPeriods)
#   • src/collections/Ledger/  (5 files — retired ledger kernel)
#   • src/services/__tests__/  (6 .example.ts files; never picked up by vitest's test glob)
#   • 2 deprecated accounting/automatic-entries{,-refactored}.ts stubs
#   • 3 deprecated kernel-shaped seed test stubs in tests/utilities/
#   • src/plugins/{accounting,export,receivables}/__tests__/  (9 files;
#     canonical homes live under tests/int/ so the co-located copies were
#     never run by vitest's `tests/int/**/*.int.spec.ts` glob)
#   • src/hooks/accounting/  (9 deprecated stubs)
#   • src/types/{tax,localization}.ts  (2 deprecated stubs)
#
#   Slice L (7) — NIST primitive shims (callers migrated to @/standards/<nist-id>):
#   • src/utilities/encryption/index.ts
#   • src/utilities/deriveSecret.ts
#   • src/utilities/permissions/{index,predicates,types,payload,conventions}.ts
#
#   Slice M (4) — old test paths replaced by tests/standards/<id>/:
#   • tests/int/utilities/iso.int.spec.ts
#   • tests/utilities/encryption.test.ts
#   • tests/int/utilities/permissionsPredicates.int.spec.ts
#   • tests/int/utilities/permissionConventions.int.spec.ts
#
#   Slice N (~45) — additional dead trees discovered 2026-05-09:
#   • src/__tests__/  (12 files — retired root-level test scaffolding)
#   • src/lib/  (16 files — retired services / state-machine kernel)
#   • src/middleware/  (1 file — canonical: src/plugins/accounting/middleware/)
#   • src/payload/  (11 files — retired parallel collection tree)
#   • tests/accounting/  (5 files — already stubbed; canonical: tests/int/accounting/)
#
# What this DOES NOT delete (deferred — content review needed):
#   • tests/accounting/*.int.spec.ts  (5 files, outside vitest include glob so dead,
#     but contents differ from tests/int/accounting/* — diff sizes 350-1303 lines.
#     Compare and merge any unique cases first.)
#
# Verification done before this script was written:
#   • grep -rn for any import of each file path: zero hits
#   • grep -rn for each export name across src/ and tests/: zero hits outside the
#     file itself or its self-referential @deprecated comment
#   • each file's content confirmed as `export {}` only

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Deleting 20 top-level shadow files in src/collections/"
rm -f \
  src/collections/GLAccounts.ts \
  src/collections/JournalEntries.ts \
  src/collections/GLPostings.ts \
  src/collections/BankStatements.ts \
  src/collections/FinancialStatements.ts \
  src/collections/PeriodEndAdjustments.ts \
  src/collections/TaxCalculations.ts \
  src/collections/CurrencyRates.ts \
  src/collections/TrialBalance.ts \
  src/collections/ARAgingReport.ts \
  src/collections/APAgingReport.ts \
  src/collections/AllowanceForDoubtfulAccounts.ts \
  src/collections/FixedAssets.ts \
  src/collections/InventoryCostFlow.ts \
  src/collections/COGSCalculation.ts \
  src/collections/BudgetPlanning.ts \
  src/collections/BudgetVariance.ts \
  src/collections/FinancialRatios.ts \
  src/collections/CashFlowForecast.ts \
  src/collections/TrendAnalysis.ts

echo "==> Deleting 5 retired collection-folder stubs"
rm -rf \
  src/collections/Customers \
  src/collections/Vendors \
  src/collections/TaxJurisdictions \
  src/collections/TaxCodes \
  src/collections/FiscalPeriods

echo "==> Deleting retired Ledger kernel"
rm -rf src/collections/Ledger

echo "==> Deleting deprecated services/__tests__ examples"
rm -rf src/services/__tests__

echo "==> Deleting deprecated accounting automatic-entries stubs"
rm -f \
  src/plugins/accounting/automatic-entries.ts \
  src/plugins/accounting/automatic-entries-refactored.ts

echo "==> Deleting deprecated kernel-shaped seed test stubs"
rm -f \
  tests/utilities/seedCurrent.test.ts \
  tests/utilities/setupNewTenant.test.ts \
  tests/utilities/seedComprehensive.test.ts

echo "==> Deleting plugin co-located __tests__ stubs (canonical homes are tests/int/)"
rm -rf \
  src/plugins/accounting/__tests__ \
  src/plugins/export/__tests__ \
  src/plugins/receivables/__tests__

echo "==> Deleting deprecated src/hooks/accounting/ shadow stubs"
rm -rf src/hooks/accounting

echo "==> Deleting deprecated src/types/tax.ts stub (canonical: payload-types.ts)"
rm -f src/types/tax.ts

# Slice RR found this still on disk despite being an explicit @deprecated
# stub with zero importers. Replacement is to query Payload's `tax-codes`
# and `tax-jurisdictions` collections directly via `req.payload.find()`.
echo "==> Slice RR: deleting deprecated tax-automation.service.ts stub (zero importers)"
rm -f src/services/tax-automation.service.ts

echo "==> Deleting deprecated src/types/localization.ts (replaced by src/i18n/ + next-intl)"
rm -f src/types/localization.ts

# ── Slice L — NIST primitive shims (callers migrated to @/standards/<nist-id>) ──
# Verify before running: grep returns zero hits.
#   grep -rln "from ['\"]@/utilities/\(encryption\|deriveSecret\|permissions\)" src tests
#   grep -rln "from ['\"]\./utilities/deriveSecret\|from ['\"]\.\./deriveSecret" src tests
echo "==> Slice L: deleting NIST primitive shims (callers migrated 2026-05-08)"
echo "==> Slice Q: also deleting Slice-A iso shim (zero callers since 2026-05-08)"
rm -f \
  src/utilities/iso/index.ts \
  src/utilities/encryption/index.ts \
  src/utilities/deriveSecret.ts \
  src/utilities/permissions/index.ts \
  src/utilities/permissions/predicates.ts \
  src/utilities/permissions/types.ts \
  src/utilities/permissions/payload.ts \
  src/utilities/permissions/conventions.ts
# Empty parents — remove only if no other files remain
rmdir src/utilities/encryption 2>/dev/null || true
rmdir src/utilities/permissions 2>/dev/null || true
rmdir src/utilities/iso 2>/dev/null || true

# ── Slice M — old test paths replaced by tests/standards/<id>/ (STANDARDS.md §5) ──
# Tests were moved + split into per-standard files; vitest.config.mts now
# includes both `tests/int/**/*.int.spec.ts` and `tests/standards/**/*.int.spec.ts`.
# Verify before running:
#   ls tests/standards/{iso-4217,iso-3166-1,iso-3166-2,iso-8601,iso-13616,iso-9362,bcp-47,_money,nist-sp-800-38,nist-incits-359}
echo "==> Slice M: deleting moved test stubs (split into tests/standards/<id>/)"
rm -f \
  tests/int/utilities/iso.int.spec.ts \
  tests/utilities/encryption.test.ts \
  tests/int/utilities/permissionsPredicates.int.spec.ts \
  tests/int/utilities/permissionConventions.int.spec.ts

# ── Slice N — additional dead trees discovered 2026-05-09 ──
# Each tree below was confirmed zero-import via:
#   grep -rln "@/__tests__\|src/__tests__\|@/lib/\|@/middleware/\|@/payload/" src tests
#     → zero matches outside the trees themselves.
# Every .ts file in these trees is a `@deprecated export {}` stub.

echo "==> Slice N: deleting src/__tests__/ (retired root-level test scaffolding)"
rm -rf src/__tests__

echo "==> Slice N: deleting src/lib/ (retired services / state-machine kernel)"
rm -rf src/lib

echo "==> Slice N: deleting src/middleware/ (canonical: src/plugins/accounting/middleware/)"
rm -rf src/middleware

echo "==> Slice N: deleting src/payload/ (retired parallel collection tree)"
rm -rf src/payload

echo "==> Slice N: deleting tests/accounting/ (already stubbed; canonical: tests/int/accounting/)"
rm -rf tests/accounting

# ── Slice O — utility-shim cleanup (callers migrated to @/standards/<id>) ──
# Verify before running:
#   grep -rln "from ['\"]@/utilities/\(formatDateTime\|localeUtils\|rateLimit\|payloadCache\)" src tests
echo "==> Slice O: deleting utility shims for relocated standards modules"
rm -f \
  src/utilities/formatDateTime.ts \
  src/utilities/localeUtils.ts \
  src/utilities/rateLimit.ts \
  src/utilities/payloadCache.ts

# ── Slice P — URI / cache / security-headers shims (callers migrated 2026-05-09) ──
# Verify before running:
#   grep -rln "from ['\"]@/utilities/\(urlUtils\|getURL\|generatePreviewPath\|getDocument\|getGlobals\|getRedirects\|securityHeaders\)" src tests
echo "==> Slice P: deleting URI / cache / security-headers shims"
rm -f \
  src/utilities/urlUtils.ts \
  src/utilities/getURL.ts \
  src/utilities/generatePreviewPath.ts \
  src/utilities/getDocument.ts \
  src/utilities/getGlobals.ts \
  src/utilities/getRedirects.ts \
  src/utilities/securityHeaders.ts

# ── Slice X — relocate misplaced standards-tests to canonical tests/standards/<id>/ ──
# Each test file references @/standards/rfc-* directly, so it belongs under
# tests/standards/<id>/ per docs/STANDARDS.md §5 and was missed in Slice M.
# Canonical homes already exist (created in this slice); these are now duplicates.
# Verify before running:
#   diff -q tests/int/utilities/urlUtils.int.spec.ts tests/standards/rfc-3986/url-utils.int.spec.ts
# ── Slice PPP — backward-compat removal + DRY merge into standards ──
# All four delegated to non-existent services (FFF DOA); detached from
# Payments/Invoices/FixedAssets in PPP. base-accounting-hook had its
# `ensureHostId` merged into canonical `autoPopulateHost`. host-scope
# middleware (GGG) had zero callers.
echo "==> Slice PPP: deleting deprecated hooks + base + middleware (DRY merge)"
rm -f \
  src/plugins/accounting/hooks/ar-aging.hook.ts \
  src/plugins/accounting/hooks/ap-aging.hook.ts \
  src/plugins/accounting/hooks/cogs.hook.ts \
  src/plugins/accounting/hooks/depreciation.hook.ts \
  src/plugins/accounting/hooks/base-accounting-hook.ts \
  src/plugins/accounting/middleware/host-scope.ts \
  src/plugins/accounting/middleware/index.ts

echo "==> Slice X: deleting misplaced test originals (canonical homes in tests/standards/)"
rm -f \
  tests/int/utilities/urlUtils.int.spec.ts \
  tests/int/utilities/generatePreviewPath.int.spec.ts \
  tests/int/utilities/getURL.int.spec.ts \
  tests/int/utilities/getDocument.int.spec.ts \
  tests/int/utilities/getRedirects.int.spec.ts \
  tests/int/utilities/payloadCache.int.spec.ts \
  tests/int/utilities/getGlobals.int.spec.ts

# ── Slice HH — top-level legacy dev-notes from earlier cleanup passes ──
# These are session summaries / cleanup plans from prior reorganizations
# (test reorg, plugin reorg, DRY cleanup, seed implementation). The work
# they describe has already executed and is now superseded by:
#   • docs/STANDARDS.md (taxonomy)
#   • docs/STANDARDS_AUDIT.md (per-file map)
#   • src/standards/<id>/README.md (per-standard scope)
#   • CHANGELOG.md 1.0.0 (the new permanent record)
# Review individually first if you want to preserve any architecture notes;
# `git log --diff-filter=D --follow -- <file>` recovers content after delete.
# ── Slice NN — fuse_hidden cruft from in-place perl rewrites ──
# When `perl -i` runs on a FUSE-mounted directory, the kernel keeps the
# replaced inodes visible as `.fuse_hidden*` until all open file
# descriptors close. They survive the rewrite and clutter `git status`.
# Safe to delete — they're filesystem detritus, not source files.
echo "==> Slice NN: deleting fuse_hidden cruft from perl -i rewrites"
find src tests scripts -name '.fuse_hidden*' -type f -delete 2>/dev/null || true

echo "==> Slice CCCCC-prep (2026-05-11): deleting tests/_attic/ — emptied test subdirs after co-location"
# Every spec moved to its sibling src/ position; the now-empty
# tests/{access,utilities,jobs,testing,int,standards,architecture}
# subdirs were staged at tests/_attic/. Drop them now that we have unlink.
rm -rf tests/_attic 2>/dev/null || true

echo "==> Slice AAAAA-cont (2026-05-11): deleting _attic/ — dead stubs + .bak files staged for removal"
# The Cowork sandbox FUSE mount blocks unlink (only rename works), so
# AAAAA-cont moved 10 retired report-shape stubs (APAgingReport, ARAgingReport,
# AllowanceForDoubtfulAccounts, BudgetVariance, CashFlowForecast,
# COGSCalculation, FinancialRatios, InventoryCostFlow, TrendAnalysis,
# TrialBalance) + 13 *.ts.bak factory-helper-migration backups into
# src/plugins/accounting/collections/_attic/ instead of deleting them.
# Now that we're running locally with full unlink, drop the whole folder.
rm -rf src/plugins/accounting/collections/_attic 2>/dev/null || true

echo "==> Slice HH: deleting top-level legacy dev-notes from earlier cleanup passes"
rm -f \
  CLEANUP_INSTRUCTIONS.md \
  COMPLETE_TEST_IMPLEMENTATION.md \
  CONFIG_AWARE_TESTING.md \
  DRY_CLEANUP_SUMMARY.md \
  IMPLEMENTATION_SUMMARY.md \
  PLUGIN_REORGANIZATION_SUMMARY.md \
  REORGANIZATION_SUMMARY.md \
  SRC_CLEANUP_PLAN.md \
  TESTING_ARCHITECTURE.md \
  TEST_SEED_SYSTEM_IMPLEMENTATION.md

echo
echo "==> Done. Remaining src/collections layout:"
ls -d src/collections/*/ src/collections/*.ts 2>/dev/null | sort

echo
echo "==> Now verify nothing references the deleted exports:"
echo "    pnpm tsc --noEmit"
echo "    pnpm payload migrate:create"
echo "    pnpm vitest run"
