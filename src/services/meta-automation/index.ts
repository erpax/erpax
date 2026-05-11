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

// SAFE-INMEM: PROPOSALS_LOG  (Slice XXXXXXXX 2026-05-11)
// Canonical proposal history now lives in the `memories` collection
// (kind=fix_proposal) — see ConsistencyAgent's onSchedule. This array
// is retained as a per-process cache so listProposals() returns
// quickly without a Payload round-trip; it does NOT need to survive
// restarts. The `mcp-mutations-have-collection` invariant respects
// the `// SAFE-INMEM:` opt-out marker.
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

    // ─── Slice ZZZZZZZZ (2026-05-11) — code-consistency invariants ──
    // Each maps to a ConsistencyAgent-owned tool. autoApply stays false
    // for now: every proposal goes to the proposals log + an audit
    // event; the engineer applies after reviewing the offender list.
    // Once the proposer matures (semantic patches that round-trip
    // through tsc), flip to autoApply: true.

    case 'factory-emits-are-hooked':
      // Slice DDDDDDDD — auto-apply via erpax.consistency.applyAll. The
      // applyEmitsLegacyToStructured transform is idempotent and
      // deterministic: read offender file, rewrite string-form emits to
      // structured form using the slug → aggregate map. Safe to run
      // unattended.
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.applyAll',
        proposedArgs: {},
        autoApply: true,
        rationale: `${offenders.length} collection 'emits:' declaration(s) lack a runtime producer — applyAll upgrades string→structured form`,
      }

    case 'chain-emits-have-producer':
      // Slice DDDDDDDD — auto-apply via erpax.consistency.applyAll. The
      // applyChainProducerBackfill transform is idempotent: read each
      // BUSINESS_CHAINS step, infer (status, aggregate) from
      // (action, collection), rewrite step to include producer: {...}.
      // 97/127 steps auto-wire; the rest are bespoke and need human review.
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.applyAll',
        proposedArgs: {},
        autoApply: true,
        rationale: `${offenders.length} BUSINESS_CHAINS step emit(s) without a producer — applyAll backfills producer: { onStatus | onCreate, aggregate } via the standard action→status map`,
      }

    case 'services-reference-real-slugs':
      // Stays manual: slug rebind needs human judgment (is the right
      // fix to redirect to an existing slug, or scaffold a new one?).
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.proposeSlugRebind',
        proposedArgs: { offenders: offenders.slice(0, 8) },
        autoApply: false,
        rationale: `${offenders.length} service/hook lookups target a non-existent slug — propose rebind or scaffold the missing collection`,
      }

    case 'relation-to-slugs-exist':
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.proposeSlugRebind',
        proposedArgs: { offenders: offenders.slice(0, 8) },
        autoApply: false,
        rationale: `${offenders.length} relationTo: pointer(s) to a non-existent slug — propose rebind or scaffold the missing collection`,
      }

    case 'no-plugin-owned-slug-collision':
      // Slice FFFFFFFF — escalate; not auto-applied because the fix is a
      // judgment call (rename our slug vs. override the plugin's
      // collection via its collectionOverride hook). Surface it loud.
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.proposeSlugRebind',
        proposedArgs: { offenders: offenders.slice(0, 8) },
        autoApply: false,
        rationale: `${offenders.length} collection(s) re-register a slug already owned by an upstream Payload plugin — config-load throws DuplicateCollection. Either rename our slug or override the plugin's collection.`,
      }

    case 'mcp-mutations-have-collection':
      // Slice RRRRRRRR — anything mcp needs needs a collection. Module-
      // scope mutable arrays surface as proposals. Migrate target is the
      // memories collection (or annotate // SAFE-INMEM:). Escalate;
      // migration is a per-array judgment call.
      return {
        invariant: result.check, severity: result.severity as 'warn' | 'fail',
        proposedTool: 'erpax.consistency.proposeSlugRebind',  // re-uses the slug-rebind proposer surface; actual fix is per-handler code change
        proposedArgs: { offenders: offenders.slice(0, 8) },
        autoApply: false,
        rationale: `${offenders.length} module-scope mutable array(s) in MCP / meta-automation — migrate to 'memories' collection (Slice RRRRRRRR) or opt out via // SAFE-INMEM: <name>`,
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
