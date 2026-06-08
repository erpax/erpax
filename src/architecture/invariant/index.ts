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
export {
  TRINITY,
  rollUpToTrinity,
  trinityForPriorLaw,
  trinityGrouping,
  type TrinityDimension,
  type TrinityGrouping,
  type TrinityLaw,
  type TrinityLawDescriptor,
  type TrinityVerdict,
} from './trinity'
export {
  LAW_CATALOG,
  buildAgentLawProfile,
  buildAllAgentLawProfiles,
  checkAgentLawCoverage,
  inferEmittedEffectKinds,
  type AgentLawCoverageResult,
  type AgentLawProfile,
  type LawCategory,
  type LawDescriptor,
} from './by-agent'

/** Run all invariants. Skips axes listed in `ctx.skipAxes`. */
export async function runAllInvariants(
  ctx: InvariantContext = {},
): Promise<InvariantSuiteResult> {
  const skip = new Set<InvariantAxis>(ctx.skipAxes ?? [])
  const results: InvariantResult[] = []

  // ── Axis 1: standards ───────────────────────────────────────────
  if (!skip.has('standards')) {
    results.push(C.checkLegislationRuleOfLaw(ctx))  // the society's own law: the rule of law holds
    results.push(C.checkStandardsTagOnEveryCollection(ctx))
    results.push(C.checkEveryFolderIsAnAtom(ctx))  // dissolved-tree law: one atom = one folder (index.*/SKILL.md)
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
    results.push(await C.checkMcpSelfTestableInvariant(ctx))  // Law 41 — AAAAAAA
    // Slice JJJJJJJJJ (2026-05-11) — Law 53 self-referential-closure.
    // Every ExternalRole ERPax consumes has a registered InternalProvider
    // so the dependency graph terminates at ERPax itself.
    results.push(await C.checkSelfReferentialClosure(ctx))    // Law 53 — JJJJJJJJJ
  }

  // ── Axis 5: entropy ─────────────────────────────────────────────
  if (!skip.has('entropy')) {
    // Slice PPPPPPPPP-cut1 (2026-05-11) — tamper-surface review Batch 1.
    // Findings 1 + 2 from the review: ensure factory default-on
    // tamper-proofing reaches every accounting collection AND every
    // audit-events write routes through writeAuditEvent (uuid-linked).
    results.push(await C.checkAccountingCollectionsAreTamperProofed(ctx))
    results.push(C.checkAuditEventsAreChainLinked(ctx))
    // Slice XXXXXXXXX-cut1 (2026-05-11) — Conservation Law 62 made
    // measurable. Coverage of structured uuidv8 across high-signal
    // collections; warns when < structuredCoveragePassThreshold() (9/10).
    results.push(await C.checkFeatureCoverage(ctx))
    // Conservation Law 62 — the harmonic axis: flow×flow stays in the helix.
    results.push(C.checkHarmonicHelixClosure(ctx))
    // Lock all to uuid: every atom-key locks to one content-uuid (fs-derived; warns on duplicate paths).
    results.push(C.checkAtomsLockedToUuid(ctx))
    // ── The dissolved-tree architecture law ([[coordinate]] · [[merge]]) ──
    // No grouping prefix; cross-unit imports are @/; collection folders are
    // plural; every atom is connected on ≥2 sides (the coordinate cross).
    results.push(C.checkLocality(ctx))                       // locality — no @/collections|@/services|… prefix, no cross-unit ../
    results.push(C.checkSingularModelPluralCollection(ctx))  // singular-model / plural-collection
    results.push(C.checkAtomCrossBalance(ctx))               // ≥2-cross balance (parent/prev/next)
    results.push(C.checkNoDuplicateCollectionSlugs(ctx))
    results.push(C.checkNoDuplicateArrayDbNames(ctx))
    results.push(C.checkNoDuplicateChainIds(ctx))
    results.push(C.checkFeatureRegistryKeyMatchesId(ctx))
    results.push(C.checkNoInlineTaxonomyArrays(ctx))
    results.push(C.checkChainEmitsHaveProducer(ctx))
    // Slice ZZZZZZZZ (2026-05-11) — code-consistency invariants ported
    // from `src/aura/find-gaps.ts` so MetaSkillAgent's
    // hourly cron sees them as `invariant:warned` events and the
    // meta-automation proposer attaches fix proposals.
    results.push(C.checkFactoryEmitsAreHooked(ctx))             // Class F
    results.push(C.checkServicesReferenceRealSlugs(ctx))        // Class M
    results.push(C.checkRelationToSlugsExist(ctx))              // Class I (static)
    // Slice FFFFFFFF (2026-05-11) — surface duplicate-collection collisions
    // BEFORE Payload's config-load throws. Class N.
    results.push(C.checkNoPluginOwnedSlugCollision(ctx))        // Class N (plugin-owned slug)
    // Slice RRRRRRRR (2026-05-11) — anything mcp needs needs a collection;
    // module-scope mutable arrays in MCP handlers / meta-automation
    // surface as warnings until they migrate to the memories collection
    // (or opt out via // SAFE-INMEM:).
    results.push(C.checkMcpMutationsHaveCollection(ctx))        // Class O (MCP mutations need persistence)
    // Slice SSSSSSSS (2026-05-11) — every CF binding access in MCP /
    // meta-automation must flow through the erpax mediator (tenant-
    // scoped, audit-trailed, RBAC-gated, rate-limited, PII-redacted).
    results.push(C.checkMcpBindingsAreMediated(ctx))            // Class P (MCP CF-bindings security)
    // Slice VVVVVVVV (2026-05-11) — one binding per CF service type.
    // Tamper surface is single → audit + uuid-link guarantees hold.
    results.push(C.checkOneBindingPerType(ctx))                 // Class Q (one binding per type)
    // Slice EEEEEEEEE (2026-05-11) — every plugin's mediator usage stays
    // within its declared PluginAccess<K> set. Principle of least
    // privilege at compile time + runtime.
    results.push(C.checkPluginsDeclareAccess(ctx))              // Class R (plugin typed access)
    results.push(await C.checkAuditChainIntegrity(ctx))
    results.push(C.checkBridgeRelationshipsIndexed(ctx))
    results.push(C.checkSoDSymmetric(ctx))
    results.push(C.checkInvoicePaymentCanonicalAccess(ctx))
    results.push(C.checkCollectionsAreUniformlyDRY(ctx))
    results.push(C.checkTextFieldsAreStronglyTyped(ctx)) // a number/date/email/bool stored as text is entropy — static break
  }

  // ─── Slice DDDDD — agent / spec / i18n / event-graph conservation laws ───
  if (!skip.has('standards')) {
    results.push(C.checkSpecCoverage100Percent(ctx))   // Law 1
    results.push(C.checkI18nCoverageStrict(ctx))       // Law 3b
    results.push(await C.checkMcpToolStandardizationInvariant(ctx))  // Law 38 — XXXXXX
    results.push(await C.checkMcpStateMutatorsAdminGuarded(ctx))     // Slice FFFFFFFFFF — admin-guard coverage
    results.push(await C.checkMcpPresentationCoverageInvariant(ctx))  // Law 39 — YYYYYY
    results.push(await C.checkDryProofPublishedInvariant(ctx))   // Law 44 — DDDDDDD
    results.push(C.checkUuidShortDisplayInvariant(ctx))          // Law 46 — FFFFFFF
    results.push(C.checkTypeUuidCoverageInvariant(ctx))          // Law 47 — GGGGGGG
  }
  if (!skip.has('expansion')) {
    results.push(C.checkEventGraphConnected(ctx))      // Law 4
    results.push(C.checkAgentOwnsEveryStep(ctx))       // Law 7
    results.push(C.checkBlockCompositionTypeSafety(ctx))  // Law 32 — PPPPPP
    results.push(await C.checkAutoGenerationCoverageInvariant(ctx))  // Law 37 — WWWWWW
    results.push(await C.checkMcpBarrelWired(ctx))                   // Slice BBBBBBBBBB — barrel-wired surface
    results.push(await C.checkMcpRebuildableFromSourceInvariant(ctx))  // Law 40 — ZZZZZZ
    results.push(C.checkAgentLawCoverageInvariant(ctx))         // Law 45 — EEEEEEE
    results.push(C.checkDimensionalCoverageInvariant(ctx))      // Law 49 — LLLLLLLL
    results.push(C.checkDimensionalPluginScaffoldedInvariant(ctx))  // Law 51 — MMMMMMMM
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
    results.push(C.checkTorusBoundedInvariant(ctx))           // Law 43 — CCCCCCC
    results.push(C.checkInfiniteFinitenessInvariant(ctx))     // Law 48 — IIIIIIIII
    results.push(await C.checkMcpDryCleanlinessInvariant(ctx))  // Law 50 — BBBBBBB
    results.push(C.checkPwaUuidIntegrityInvariant(ctx))         // Law 52 — NNNNNNNN
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
