/**
 * MetaSkillAgent — pure observer / meta-automation hook (slice QQQQQ scope).
 * Slice IIIII (2026-05-11). Owns no Payload collections. Listens to every
 * conservation-invariant failure, every gap-detected escalation, every
 * spec-coverage warning — and (in QQQQQ) proposes fixes via MCP tools.
 *
 * @feature meta_automation
 */
import type { DomainAgent, AgentContext, AgentEffect, DomainEvent } from '../types'

export const MetaSkillAgent: DomainAgent = {
  id: 'meta-skill',
  ownsCollections: [],
  subscribesTo: ['invariant:failed', 'invariant:warned', 'gap:detected', 'spec:coverage:warned', 'i18n:stub:detected'],
  emits: [
    'fix:proposed', 'spec:tag:suggested', 'i18n:translation:requested',
    'meta:sweep:tick', 'meta:dry-proof:tick', 'meta:trinity:tick',  // slice OOOOOOOO
  ],
  cron: '0 */1 * * *',  // hourly — sweep for new gaps, propose fixes (QQQQQ)
  async onEvent(ctx: AgentContext, ev: DomainEvent): Promise<AgentEffect[]> {
    // Today: just record the event for traceability.
    // QQQQQ slice extends this to call erpax.spec.fillBanner / erpax.i18n.translateBatch
    // / erpax.chain.backfillMarkup via ctx.mcp and emit fix:proposed.
    return [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'meta-observed' } },
    ]
  },
  async onSchedule(ctx: AgentContext): Promise<AgentEffect[]> {
    // Slice QQQQQ — meta-automation production wiring.
    // Hourly sweep:
    //   1. Run all 26 conservation invariants via the runtime suite.
    //   2. For each WARN/FAIL, proposeFixFor → MCP tool call.
    //   3. Auto-apply safe proposals; escalate the rest.
    //   4. Emit meta:sweep:tick + escalations (audit-trailed).
    //   5. Run Law 25 (commerce) + Law 26 (self-accounting) against
    //      the platform tenant — escalate overdue filings/obligations.
    const sweptAt = new Date().toISOString()
    const effects: AgentEffect[] = [
      { kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: 'meta-sweep', action: 'scheduled-sweep' } },
    ]

    // 1. Run invariants suite ONCE; reuse for proposer + DRY-proof
    //    publish (slice OOOOOOOO) + Trinity rollup. Single sweep,
    //    multiple downstream consumers.
    try {
      const { runAllInvariants } = await import('@/services/architecture-invariants')
      const { processInvariantResults } = await import('@/services/meta-automation')
      const { publishDryProofBundle } = await import('@/services/proof/dry-proof')
      const { rollUpToTrinity } = await import('@/services/architecture-invariants/trinity')
      const { buildErpaxMcpTools } = await import('@/services/agents/mcp/tool-defs')
      const { agentRegistry } = await import('@/services/agents/bootstrap')

      const invariantCtx = { payload: ctx.payload, repoRoot: process.cwd() }
      const suite = await runAllInvariants(invariantCtx)
      const results = [...suite.fails, ...suite.warns]
      const summary = await processInvariantResults({ results, mcp: ctx.mcp })
      effects.push({
        kind: 'emit',
        event: {
          id: 'meta:sweep:tick', tenantId: ctx.tenantId,
          payload: { at: sweptAt, ...summary }, emittedAt: sweptAt,
        },
      })
      if (summary.escalated > 0) {
        effects.push({
          kind: 'escalate', severity: 'major',
          templateKey: 'meta.proposalsEscalated',
          vars: { count: summary.escalated, sweepAt: sweptAt },
        })
      }

      // Slice OOOOOOOO — publish DRY-proof bundle (Law 44) once per
      // sweep; emit Trinity rollup over the same suite (no second run).
      const tools = buildErpaxMcpTools(agentRegistry)
      const origin = process.env.PLATFORM_ORIGIN ?? 'https://erpax.local'
      const bundle = await publishDryProofBundle({ invariantCtx, tools, origin })
      effects.push({
        kind: 'emit',
        event: {
          id: 'meta:dry-proof:tick', tenantId: ctx.tenantId,
          payload: {
            at: sweptAt, contentUuid: bundle.contentUuid,
            publicUrl: bundle.publicUrl, laws: bundle.summary,
          },
          emittedAt: sweptAt,
        },
      })
      const passedLawNums = suite.passes
        .map((p) => Number(p.check.match(/\d+/)?.[0]))
        .filter((n) => Number.isFinite(n))
      const trinity = rollUpToTrinity(passedLawNums)
      effects.push({
        kind: 'emit',
        event: {
          id: 'meta:trinity:tick', tenantId: ctx.tenantId,
          payload: { at: sweptAt, trinity }, emittedAt: sweptAt,
        },
      })
    } catch (err) {
      effects.push({
        kind: 'escalate', severity: 'critical',
        templateKey: 'meta.sweepFailed',
        vars: { error: (err as Error).message, sweepAt: sweptAt },
      })
    }

    // 2. Law 25 + Law 26 audits against the platform tenant
    try {
      const { checkCommerceLifecycle } = await import('@/services/commerce')
      const { checkSelfAccountingComplete } = await import('@/services/self-accounting')
      const lifecycle = checkCommerceLifecycle()
      if (!lifecycle.ok) {
        effects.push({
          kind: 'escalate', severity: 'major', templateKey: 'meta.commerceOrphans',
          vars: { count: lifecycle.orphans.length, sample: lifecycle.orphans.slice(0, 3).join(', ') },
        })
      }
      const accounting = checkSelfAccountingComplete('erpax-platform')
      if (!accounting.ok) {
        effects.push({
          kind: 'escalate', severity: 'blocker', templateKey: 'meta.selfAccountingOverdue',
          vars: {
            unbookedRevenues: accounting.unbookedRevenues,
            overdueFilings: accounting.overdueFilings.length,
            overdueObligations: accounting.overdueObligations.length,
          },
        })
      }
    } catch {
      // Self-accounting may not be active on a fresh instance — non-fatal.
    }

    return effects
  },
}
