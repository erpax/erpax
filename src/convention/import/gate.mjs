#!/usr/bin/env node
// convention/import/gate.mjs — THE WIRE made a gate. The import convention
// ([[convention]]/import, [[convention]]/shallow, [[tamper]]/import) is now
// ENFORCED here, not merely asserted in prose: a non-index import lowers
// coverage, so this gate fails the build when the live count of non-index
// ("deep"/relative) imports EXCEEDS a committed baseline — a RATCHET.
//
// Why a ratchet, not purity===1: live import-purity is ~80.7% (≈1379 deep
// imports today); driving it to 1 is hundreds of import rewrites = separate
// scope. The discipline this gate enforces is narrower and exact: the
// convention CANNOT GET WORSE. Every new deep import is a red push; the
// baseline only ratchets DOWN as deep imports are removed (lower the literal
// below in the same commit that removes them — reviewable in `git diff`).
//
// Single-source: the scan itself is the canonical `nonIndexImports()` in
// @/tamper/import — this gate does NOT re-implement the walk (that duplication
// is exactly what the audit hunts). Run under tsx so the `@/` alias resolves:
//   NODE_OPTIONS="--no-deprecation --import=tsx/esm" node src/convention/import/gate.mjs
// (wired as `pnpm lint:imports`).
//
// FAIL-CLOSED: any scan error, an unreadable baseline, or a non-numeric live
// count exits 1 — a gate that cannot run is a gate that did not pass. The only
// exit-0 path is a successful scan whose violation count is <= baseline.
//
// @audit count = nonIndexImports().length from @/tamper/import — scanned live, never hand-asserted
// @standard ISO/IEC 25010:2023 §5.5 testability — the ratchet decision is a pure exported fn (gate.test.ts)

/**
 * IMPORT_PURITY_BASELINE — the committed ceiling on non-index imports.
 *
 * This is a checked-in literal so the ratchet is reviewable in git: a PR that
 * adds a deep import pushes the live count over this number and fails CI; a PR
 * that removes deep imports should LOWER this number in the same diff. It must
 * only ever move DOWN. Derived from `tsx src/tamper/import/index.ts`
 * (purity 80.7% = 1379 non-index of 7146 `@/` imports, 2026-06-06).
 */
export const IMPORT_PURITY_BASELINE = 890

/**
 * The pure ratchet decision — separated from I/O so the logic is regression-locked
 * by gate.test.ts (no fs, no process). Returns the gate verdict.
 *
 * @param {{ violations: number, baseline: number }} input
 * @returns {{ ok: boolean, violations: number, baseline: number, reason: string }}
 */
export function importRatchet({ violations, baseline }) {
  // Fail-closed on un-gradeable inputs: a non-finite count or baseline means the
  // scan or the literal is broken — that is NOT a pass.
  if (!Number.isFinite(violations) || violations < 0) {
    return { ok: false, violations, baseline, reason: 'non-index import count is not a finite, non-negative number — scan failed (DENY)' }
  }
  if (!Number.isFinite(baseline) || baseline < 0) {
    return { ok: false, violations, baseline, reason: 'baseline is not a finite, non-negative number (DENY)' }
  }
  if (violations > baseline) {
    return {
      ok: false,
      violations,
      baseline,
      reason: `non-index imports rose ${violations - baseline} above the baseline (${violations} > ${baseline}) — a new deep/relative import was added; import the atom's index (@/x), not a deep file`,
    }
  }
  return {
    ok: true,
    violations,
    baseline,
    reason:
      violations < baseline
        ? `non-index imports fell ${baseline - violations} below the baseline — lower IMPORT_PURITY_BASELINE to ${violations} to ratchet`
        : `non-index imports at the baseline (${violations}) — convention held`,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  let violations
  try {
    // Single canonical reader of the import graph — re-implementing the scan here
    // would be the very duplication the convention forbids.
    const { nonIndexImports } = await import('@/tamper/import')
    violations = nonIndexImports().length
  } catch (e) {
    // FAIL-CLOSED: the scan could not run (e.g. @/ alias unresolved, fs error) — DENY.
    console.error('✖ lint:imports: could not run the import-purity scan — ' + (e && e.message ? e.message : String(e)))
    process.exit(1)
  }
  const verdict = importRatchet({ violations, baseline: IMPORT_PURITY_BASELINE })
  if (verdict.ok) {
    console.log('✓ lint:imports: ' + verdict.reason)
    process.exit(0)
  }
  console.error('✖ lint:imports: ' + verdict.reason)
  console.error('  the import convention is a RATCHET — it may not get worse. Run: tsx src/tamper/import/index.ts')
  process.exit(1)
}
