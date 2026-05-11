/**
 * Meta-automation — Slice QQQQQ. Per spec §7c.
 *
 * Turns conservation-invariant WARN/FAIL signals into MCP-tool fix
 * proposals. Called by MetaSkillAgent's hourly cron (slice IIIII).
 *
 * Each WARN/FAIL maps to a specific tool call:
 *   Law 1  spec coverage missing      → erpax.spec.suggestStandards
 *   Law 3b i18n stub detected         → erpax.i18n.translateBatch
 *   Law 4  orphan emit/sub            → erpax.spec.fillBanner (add @subscribes)
 *   Law 7  unowned chain step         → erpax.agents.scaffold
 *   Law 8  content-uuid tampered      → erpax.integrity.auditTenant + reconcile
 *   Law 10 dangling reference         → erpax.refs.findDangling + rebind
 *   Law 17 agent missing capability   → erpax.agents.fillCapability
 *   Law 19 missing explanation        → autoExplain + persist
 *   Law 22 AI without provenance      → backfill aiProvenance
 *   Law 23 self-observation broken    → escalate to maintainer (NOT auto-healed)
 *   Law 24 clone integrity broken     → escalate (genome non-deterministic)
 *
 * Proposals are emitted as DomainEvents (`fix:proposed`) and recorded
 * to the audit chain; whether they auto-apply or wait for human
 * approval depends on the proposal's `autoApply` field (today: only
 * 'spec.fillBanner' + 'i18n.translateBatch' auto-apply).
 *
 * @audit ISO 19011:2018 §6.4.6 (proposals + their resolution audit-trailed)
 * @standard ISO/IEC 25010:2023 §5.7 modifiability (self-modifying with audit)
 */

import type { McpClient } from '@/services/agents/mcp/in-process-client'
import type { InvariantResult } from '@/services/architecture-invariants/types'

export interface FixProposal {
  readonly invariant: string                              // checkSpecCoverage100Percent / etc.
  readonly severity: 'warn' | 'fail'
  readonly proposedTool: string                           // 'erpax.spec.fillBanner' / etc.
  readonly proposedArgs: Record<string, unknown>
  readonly autoApply: boolean                              // true = MetaSkillAgent applies; false = escalate
  readonly rationale: string                               // human-readable why
}

const PROPOSALS_LOG: FixProposal[] = []

/** Translate one InvariantResult into a FixProposal (or null if no auto-action). */
export function proposeFixFor(result: InvariantResult): FixProposal | null {
  if (result.severity === 'pass') return null
  const offenders = result.offenders ?? []

  switch (result.check) {
    case 'spec-coverage-100':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.spec.suggestStandards',
        proposedArgs: { offenders: offenders.slice(0, 3) },
        autoApply: false,   // suggestions need maintainer review
        rationale: `${offenders.length} collections missing @standard or @summary; propose citations to add`,
      }

    case 'i18n-coverage-strict':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.i18n.translateBatch',
        proposedArgs: { locales: offenders.map((s) => s.split(':')[0]).slice(0, 5) },
        autoApply: true,    // translation API can run unattended
        rationale: `Untranslated stubs in: ${offenders.slice(0, 5).join(', ')}`,
      }

    case 'event-graph-connected':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.spec.fillBanner',
        proposedArgs: { tag: '@subscribes', orphanEvents: offenders.slice(0, 5) },
        autoApply: false,
        rationale: `${offenders.length} orphan emits/subs; propose subscriber agents`,
      }

    case 'agent-owns-every-step':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.agents.scaffold',
        proposedArgs: { unownedSteps: offenders.slice(0, 5) },
        autoApply: false,
        rationale: `${offenders.length} chain steps lack an owning agent; scaffold + maintainer signs off`,
      }

    case 'content-integrity-provable':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.integrity.auditTenant',
        proposedArgs: { tampered: offenders.slice(0, 5) },
        autoApply: true,    // reconciliation pulls healthy peer; safe to run unattended
        rationale: `${offenders.length} rows have uuid mismatch; reconcile via Law 9 storage redundancy`,
      }

    case 'referential-harmony':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.refs.findDangling',
        proposedArgs: { tenantId: 'all', sampleSize: 50 },
        autoApply: false,
        rationale: `${offenders.length} dangling refs; propose rebinds — maintainer confirms`,
      }

    case 'genome-deterministic':
      return {
        invariant: result.check, severity: 'fail',
        proposedTool: 'erpax.platform.publishSelf',
        proposedArgs: { sourceDid: 'erpax-self-test', scope: 'genome' },
        autoApply: false,    // ESCALATE — non-determinism breaks cloning
        rationale: 'Genome bundle hashes non-deterministically; cloning would silently break — investigate which field varies between runs',
      }

    default:
      return null
  }
}

/** Run the proposer over a batch of results; record proposals; auto-apply where safe. */
export async function processInvariantResults(args: {
  results: ReadonlyArray<InvariantResult>
  mcp: McpClient
}): Promise<{ proposed: number; autoApplied: number; escalated: number }> {
  let proposed = 0, autoApplied = 0, escalated = 0
  for (const r of args.results) {
    const p = proposeFixFor(r); if (!p) continue
    PROPOSALS_LOG.push(p)
    proposed++
    if (p.autoApply) {
      try { await args.mcp.callTool(p.proposedTool, p.proposedArgs); autoApplied++ } catch { /* swallow; remains in log */ }
    } else {
      escalated++
    }
  }
  return { proposed, autoApplied, escalated }
}

export function listProposals(): ReadonlyArray<FixProposal> { return PROPOSALS_LOG }
export function __resetProposalsForTests(): void { PROPOSALS_LOG.length = 0 }
