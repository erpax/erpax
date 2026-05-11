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
  emits: ['fix:proposed', 'spec:tag:suggested', 'i18n:translation:requested'],
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

    // 1. Run invariants suite + dispatch proposer
    try {
      const { runAllInvariants } = await import('@/services/architecture-invariants')
      const { processInvariantResults } = await import('@/services/meta-automation')
      const suite = await runAllInvariants({ payload: ctx.payload, repoRoot: process.cwd() })
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
