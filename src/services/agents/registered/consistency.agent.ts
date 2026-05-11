/**
 * ConsistencyAgent — code-consistency gap closure.
 *
 * Slice ZZZZZZZZ (2026-05-11). Per user 'use the mcp agents. create
 * new if necessary. one inconsistency leads to another. address all.
 * full scan.'
 *
 * Subscribes to the three new code-consistency invariants from Slice
 * ZZZZZZZZ — factory `emits:` not hooked, service-to-missing-slug
 * lookups, static relationTo orphans — and the existing
 * `chain-emits-have-producer` + `referential-harmony` checks. Where
 * MetaSkillAgent is a catch-all observer, this agent is the dedicated
 * owner of the structural-drift family: it knows the propose-fix
 * shape for each gap class.
 *
 * Design follows the DomainAgent contract (slice DDDDD) — no Payload
 * collections owned (this agent's outputs are proposals, audit-trail
 * leaves, and MCP-tool calls). The hourly cron runs the same suite
 * MetaSkillAgent does but specifically routes the code-consistency
 * results through the dedicated proposer.
 *
 * @standard ISO/IEC 25010:2023 §5.7 modifiability (self-modifying with audit)
 * @audit ISO 19011:2018 §6.4.6 (proposal + resolution audit-trailed)
 * @feature meta_automation
 * @see ../meta-automation/index.ts proposeFixFor
 * @see ../architecture-invariants/checks.ts checkFactoryEmitsAreHooked
 */
import type { DomainAgent, AgentContext, AgentEffect, DomainEvent } from '../types'

const HANDLED_INVARIANTS = new Set([
  'factory-emits-are-hooked',
  'services-reference-real-slugs',
  'relation-to-slugs-exist',
  'chain-emits-have-producer',
  'referential-harmony',
  // Slice FFFFFFFF (2026-05-11) — surface plugin-owned slug collisions
  // before Payload's runtime DuplicateCollection trip.
  'no-plugin-owned-slug-collision',
  // Slice RRRRRRRR (2026-05-11) — anything mcp needs needs a collection.
  // Module-scope mutable arrays in MCP / meta-automation surface as
  // proposals until they migrate to `memories` collection.
  'mcp-mutations-have-collection',
  // Slice SSSSSSSS (2026-05-11) — every CF binding access in MCP /
  // meta-automation must flow through the erpax mediator.
  'mcp-bindings-are-mediated',
  // Slice VVVVVVVV (2026-05-11) — one binding per CF service type;
  // uuid-keyed name argument differentiates purposes. Single tamper
  // surface in the core where all merge to one.
  'one-binding-per-type',
  // Slice EEEEEEEEE (2026-05-11) — every plugin's binding usage stays
  // within its declared PluginAccess<K> set (typed least privilege).
  'plugins-declare-access',
])

export const ConsistencyAgent: DomainAgent = {
  id: 'consistency',
  ownsCollections: [],
  subscribesTo: [
    'invariant:warned', 'invariant:failed',
    'gap:detected',
    // The meta sweep tick fans out invariant results — this agent
    // re-processes the code-consistency family in particular.
    'meta:sweep:tick',
  ],
  emits: [
    'fix:proposed',
    'consistency:scan:complete',
  ],
  // Run 30 minutes offset from MetaSkillAgent's :00 so the two don't
  // contend on the invariant suite (each suite walk reads ~500 source
  // files; spacing them avoids duplicate cost).
  cron: '30 */1 * * *',

  async onEvent(ctx: AgentContext, ev: DomainEvent): Promise<AgentEffect[]> {
    // Only the code-consistency family triggers a proposal cycle; other
    // events are observed-only.
    return [
      {
        kind: 'audit',
        leaf: {
          tenantId: ctx.tenantId,
          subjectCollection: 'audit-events',
          subjectId: ev.id,
          action: 'consistency-observed',
        },
      },
    ]
  },

  async onSchedule(ctx: AgentContext): Promise<AgentEffect[]> {
    const sweptAt = new Date().toISOString()
    const effects: AgentEffect[] = [
      {
        kind: 'audit',
        leaf: {
          tenantId: ctx.tenantId,
          subjectCollection: 'audit-events',
          subjectId: 'consistency-sweep',
          action: 'scheduled-consistency-scan',
        },
      },
    ]
    try {
      const { runAllInvariants } = await import('@/services/architecture-invariants')
      const { processInvariantResults, proposeFixFor } = await import('@/services/meta-automation')
      // Slice XXXXXXXX (2026-05-11) — persist agent state to memories.
      // Closes the loop on "anything mcp needs needs a collection".
      const {
        writeMemoryBatch, asFixProposalMemory, asDriftSnapshotMemory, asEmergingGapMemory,
      } = await import('@/services/agents/memory-writer')
      // Compute the drift snapshot once per sweep so all memory rows
      // share the same harmonic cycle uuid.
      let cycleUuid: string | undefined
      let driftSnapshotMemory: ReturnType<typeof asDriftSnapshotMemory> | undefined
      let emergingGapMemories: ReturnType<typeof asEmergingGapMemory>[] = []
      try {
        const { dryCleanScan } = await import('@/services/agents/mcp/dry-clean')
        const { buildErpaxMcpTools } = await import('@/services/agents/mcp/tool-defs')
        const { agentRegistry } = await import('@/services/agents/bootstrap')
        const tools = buildErpaxMcpTools(agentRegistry)
        const report = dryCleanScan(tools as never)
        cycleUuid = report.cycleUuid
        const stratDist: Record<string, number> = {}
        for (const d of report.strategyDecisions) {
          stratDist[d.strategy] = (stratDist[d.strategy] ?? 0) + 1
        }
        driftSnapshotMemory = asDriftSnapshotMemory({
          cycleUuid,
          entropy: report.driftDistribution.driftEntropy,
          stableDriftCeiling: report.driftDistribution.stableDriftCeiling,
          realDriftFloor: report.driftDistribution.realDriftFloor,
          toolsScanned: report.toolsScanned,
          strategiesDistribution: stratDist,
        })
        emergingGapMemories = report.emergingGaps.map((g) =>
          asEmergingGapMemory({
            cycleUuid: cycleUuid!,
            suggestedTool: g.suggestedTool,
            area: g.area,
            evidence: g.evidence,
            anchorPair: g.anchorPair,
            anchorScore: g.anchorScore,
          }),
        )
      } catch {
        /* dryCleanScan unavailable in this runtime — skip */
      }
      const repoRoot =
        typeof process !== 'undefined' && typeof process.cwd === 'function'
          ? process.cwd()
          : undefined
      const invariantCtx = { payload: ctx.payload, repoRoot }
      const suite = await runAllInvariants(invariantCtx)
      const codeConsistencyResults = [...suite.fails, ...suite.warns].filter((r) =>
        HANDLED_INVARIANTS.has(r.check),
      )
      // Re-run the proposer specifically over this family — meta-skill
      // also processed them but we want the audit row to attribute the
      // proposals to ConsistencyAgent (per-agent accountability).
      const summary = await processInvariantResults({
        results: codeConsistencyResults,
        mcp: ctx.mcp,
      })
      // Slice BBBBBBBBB — persist platform-translation harvest. Each
      // cycle walks tools/<area>.ts files, harvests LocalizedString
      // maps, upserts tenant='platform' rows in the translations
      // collection. Idempotent: rows whose contentUuid matches the
      // harvest are skipped. New deployments boot with full coverage
      // after the first sweep.
      try {
        const { harvestPlatformTranslations, applyI18nHarvestToPayload } =
          await import('@/services/i18n-harvest')
        const repoRoot = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : undefined
        if (repoRoot && ctx.payload) {
          const harvested = harvestPlatformTranslations(repoRoot)
          if (harvested.length > 0) {
            await applyI18nHarvestToPayload({
              client: ctx.payload as never,
              harvested,
            })
          }
        }
      } catch {
        /* best-effort harvest; never block the sweep */
      }
      // Slice XXXXXXXX — persist this cycle's proposals + drift snapshot +
      // emerging gaps to the memories collection so the history is
      // queryable across restarts and the mcp-mutations-have-collection
      // invariant passes for real.
      try {
        const batch: Parameters<typeof writeMemoryBatch>[2][number][] = []
        for (const r of codeConsistencyResults) {
          const proposal = proposeFixFor(r)
          if (!proposal || !cycleUuid) continue
          batch.push(asFixProposalMemory({
            cycleUuid, invariantId: r.check,
            proposedTool: proposal.proposedTool,
            proposedArgs: proposal.proposedArgs,
            autoApply: proposal.autoApply,
            rationale: proposal.rationale,
            severity: proposal.severity,
          }))
        }
        if (driftSnapshotMemory) batch.push(driftSnapshotMemory)
        for (const g of emergingGapMemories) batch.push(g)
        if (batch.length > 0 && ctx.payload) {
          await writeMemoryBatch(ctx.payload as never, ctx.tenantId, batch)
        }
      } catch {
        /* best-effort persistence; never block the sweep */
      }
      // Emit `consistency:scan:complete` so downstream observers (e.g.
      // dashboards / engineering-status pages) can react.
      const proposalCount = codeConsistencyResults
        .map(proposeFixFor)
        .filter((p): p is NonNullable<typeof p> => p !== null).length
      effects.push({
        kind: 'emit',
        event: {
          id: 'consistency:scan:complete',
          tenantId: ctx.tenantId,
          payload: {
            at: sweptAt,
            inspected: codeConsistencyResults.length,
            proposed: summary.proposed,
            autoApplied: summary.autoApplied,
            escalated: summary.escalated,
            proposalCount,
          },
          emittedAt: sweptAt,
        },
      })
      if (summary.escalated > 0) {
        effects.push({
          kind: 'escalate',
          severity: 'minor',
          templateKey: 'consistency.proposalsEscalated',
          vars: { count: summary.escalated, sweepAt: sweptAt },
        })
      }
    } catch (err) {
      effects.push({
        kind: 'audit',
        leaf: {
          tenantId: ctx.tenantId,
          subjectCollection: 'audit-events',
          subjectId: 'consistency-sweep',
          action: `consistency-sweep-failed: ${err instanceof Error ? err.message : String(err)}`,
        },
      })
    }
    return effects
  },
}
