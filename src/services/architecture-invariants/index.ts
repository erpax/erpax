/**
 * Architecture invariants — single canonical gate for ERPax.
 *
 * Slice LLLL (2026-05-10): the test the maintainer asked for —
 * "ERPax is compatible with all standards and its agnostic
 * architecture is stable in expansion and compression. Fallbacks
 * make all work seamlessly preserving integrity with zero extra
 * entropy."
 *
 * Use:
 *   ```ts
 *   const result = await runAllInvariants({ payload })
 *   if (result.fails.length > 0) {
 *     for (const f of result.fails) console.error(`[${f.axis}] ${f.check}: ${f.reason}`)
 *     throw new Error(`${result.fails.length} invariant failure(s)`)
 *   }
 *   ```
 *
 * @audit ISO-19011:2018 §6.4 audit-evidence-invariants
 * @standard ISO/IEC 25010:2023 quality-model
 */

import type {
  InvariantContext,
  InvariantResult,
  InvariantSuiteResult,
  InvariantAxis,
} from './types'

import * as C from './checks'

export type {
  InvariantContext,
  InvariantResult,
  InvariantSuiteResult,
  InvariantAxis,
  InvariantSeverity,
} from './types'

export { runInvariantsAtBoot } from './onInit'

/** Run all invariants. Skips axes listed in `ctx.skipAxes`. */
export async function runAllInvariants(
  ctx: InvariantContext = {},
): Promise<InvariantSuiteResult> {
  const skip = new Set<InvariantAxis>(ctx.skipAxes ?? [])
  const results: InvariantResult[] = []

  // ── Axis 1: standards ───────────────────────────────────────────
  if (!skip.has('standards')) {
    results.push(C.checkStandardsTagOnEveryCollection(ctx))
    results.push(C.checkStandardsFolderShape(ctx))
    results.push(C.checkChainHasStandards(ctx))
    results.push(C.checkRolesHaveStandards(ctx))
    results.push(C.checkIfrsCoverage100Percent(ctx))
  }

  // ── Axis 2: expansion ───────────────────────────────────────────
  if (!skip.has('expansion')) {
    results.push(C.checkAccountingBarrelMatchesPluginRegistration(ctx))
    results.push(C.checkFeatureGatesExistInRegistry(ctx))
    results.push(C.checkChainStepsReferenceRealCollections(ctx))
    results.push(C.checkChainRequiresHaveProducers(ctx))
    results.push(C.checkScheduledTasksCronValid(ctx))
    results.push(C.checkScheduledTasksFeatureGatesExist(ctx))
    results.push(C.checkChainSeedFilesExist(ctx))
    results.push(C.checkChainSeedFieldsExistOnCollections(ctx))
    results.push(C.checkWorkflowAssigneeRolesExist(ctx))
  }

  // ── Axis 3: compression ─────────────────────────────────────────
  if (!skip.has('compression')) {
    results.push(C.checkFreeTierNonEmpty(ctx))
    results.push(C.checkTierLadderInclusivity(ctx))
    results.push(C.checkCoreChainsRunnableOnFree(ctx))
  }

  // ── Axis 4: fallback ────────────────────────────────────────────
  if (!skip.has('fallback')) {
    results.push(await C.checkAiFallbackReturnsError(ctx))
    results.push(await C.checkNotificationFallback(ctx))
  }

  // ── Axis 5: entropy ─────────────────────────────────────────────
  if (!skip.has('entropy')) {
    results.push(C.checkNoDuplicateCollectionSlugs(ctx))
    results.push(C.checkNoDuplicateArrayDbNames(ctx))
    results.push(C.checkNoDuplicateChainIds(ctx))
    results.push(C.checkFeatureRegistryKeyMatchesId(ctx))
    results.push(C.checkNoInlineTaxonomyArrays(ctx))
    results.push(C.checkChainEmitsHaveProducer(ctx))
    results.push(await C.checkAuditChainIntegrity(ctx))
    results.push(C.checkBridgeRelationshipsIndexed(ctx))
    results.push(C.checkSoDSymmetric(ctx))
    results.push(C.checkInvoicePaymentCanonicalAccess(ctx))
    results.push(C.checkCollectionsAreUniformlyDRY(ctx))
  }

  // ─── Slice DDDDD — agent / spec / i18n / event-graph conservation laws ───
  if (!skip.has('standards')) {
    results.push(C.checkSpecCoverage100Percent(ctx))   // Law 1
    results.push(C.checkI18nCoverageStrict(ctx))       // Law 3b
    results.push(C.checkMcpToolStandardizationInvariant(ctx))  // Law 38 — XXXXXX
  }
  if (!skip.has('expansion')) {
    results.push(C.checkEventGraphConnected(ctx))      // Law 4
    results.push(C.checkAgentOwnsEveryStep(ctx))       // Law 7
    results.push(C.checkBlockCompositionTypeSafety(ctx))  // Law 32 — PPPPPP
    results.push(C.checkAutoGenerationCoverageInvariant(ctx))  // Law 37 — WWWWWW
  }
  if (!skip.has('entropy')) {
    results.push(await C.checkContentIntegrityProvable(ctx))  // Law 8 — RRRRR
    results.push(await C.checkReferentialHarmony(ctx))        // Law 10 — UUUUU
    results.push(C.checkGenomeDeterministic(ctx))             // Law 24 — HHHHHH
    results.push(C.checkErpaxObservesSelf(ctx))               // Law 23 — GGGGGG
    results.push(C.checkSeoVortexCouplingInvariant(ctx))      // Law 29 — NNNNNN
    results.push(C.checkVoteAggregateAuthenticity(ctx))       // Law 30 — OOOOOO
    results.push(C.checkNoDoubleVotingInvariant(ctx))         // Law 31 — OOOOOO
    results.push(C.checkStreamCoherenceProbe(ctx))            // Law 33 — RRRRRR
    results.push(await C.checkStreamUuidChainProbe(ctx))      // Law 34 — SSSSSS
    results.push(await C.checkStorageIndependenceProbe(ctx))  // Law 35 — TTTTTT
    results.push(await C.checkReplicationConsensusProbe(ctx)) // Law 36 — UUUUUU
  }

  return {
    totalChecks: results.length,
    fails:  results.filter((r) => r.severity === 'fail'),
    warns:  results.filter((r) => r.severity === 'warn'),
    passes: results.filter((r) => r.severity === 'pass'),
  }
}

/** Pretty-print suite result for stdout / logs. */
export function formatInvariantResult(suite: InvariantSuiteResult): string {
  const lines: string[] = []
  lines.push(`Architecture invariants — ${suite.totalChecks} checks, ${suite.passes.length} pass / ${suite.warns.length} warn / ${suite.fails.length} fail`)
  for (const r of suite.fails) {
    lines.push(`  ✗ [${r.axis}] ${r.check}: ${r.reason}`)
    if (r.offenders) for (const o of r.offenders.slice(0, 5)) lines.push(`      • ${o}`)
    if (r.offenders && r.offenders.length > 5) lines.push(`      • … +${r.offenders.length - 5} more`)
  }
  for (const r of suite.warns) {
    lines.push(`  ⚠ [${r.axis}] ${r.check}: ${r.reason}`)
  }
  return lines.join('\n')
}
