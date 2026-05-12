/**
 * FinanceAgent — first DomainAgent (slice EEEEE pilot).
 *
 * Owns the finance/accounting collections: invoices, payments,
 * journal-entries, bank accounts/statements/transactions, account
 * reconciliations. Subscribes to the upstream cycle events
 * (invoice:activated, payment:received, shipment:delivered,
 * bank:transaction:matched) and posts the corresponding journal
 * entries via AgentEffect[].
 *
 * Slice EEEEE (2026-05-11). Proof-of-contract pilot — demonstrates
 * the AgentRuntime round-trip on O2C_GOODS without replacing the
 * existing chain seed impls. Subsequent cuts thread the runtime
 * through the chain dispatcher so this agent's effects fire on
 * every real chain step.
 *
 * @standard IFRS IFRS-15 §38 point-in-time-control-transfer
 * @standard IFRS IAS-7 statement-of-cash-flows
 * @standard SOX §404 process-walk-through-controls
 * @audit ISO-19011:2018 §6.4.6 audit-evidence
 * @feature accounting_core
 * @role accountant — write
 * @role auditor — read
 */

import type {
  DomainAgent, AgentContext, AgentEffect, DomainEvent,
} from '@/services/agents/types'
import type { SpecChainStep } from '@/services/spec-generator'

const OWNED_COLLECTIONS = [
  'invoices',
  'payments',
  'journal-entries',
  'bank-accounts',
  'bank-statements',
  'bank-transactions',
  'account-reconciliations',
] as const

const SUBSCRIBES_TO = [
  'invoice:activated',
  'payment:received',
  'shipment:delivered',
  'bank:transaction:matched',
  'subscription:refunded',
] as const

const EMITS = [
  'journal:posted',
  'invoice:completed',
  'payment:matched',
] as const

/**
 * Resolve the action a chain step asks the finance agent to perform.
 * Step notes follow the canonical `collection=X action=Y — desc`
 * grammar parsed by the spec-generator extractor.
 */
function actionFromStep(step: SpecChainStep): string | undefined {
  return step.note?.match(/\baction=([\w-]+)/)?.[1]
}

async function onChainStep(
  ctx: AgentContext,
  step: SpecChainStep,
): Promise<AgentEffect[]> {
  const action = actionFromStep(step)
  const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
  if (!collection || !OWNED_COLLECTIONS.includes(collection as (typeof OWNED_COLLECTIONS)[number])) {
    return []
  }

  const effects: AgentEffect[] = []

  // Common pattern: every finance step writes a Merkle-audit leaf so the
  // chain's evidence-trail conforms to ISO 19011 §6.4.6 + SOX §404.
  effects.push({
    kind: 'audit',
    leaf: {
      tenantId: ctx.tenantId,
      subjectCollection: collection,
      subjectId: (step as unknown as { subjectId?: string }).subjectId ?? 'pending',
      action: action ?? 'unknown',
      chainId: step.chainId,
      chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}`,
    },
  })

  // Action-specific effects. Each branch is intentionally thin — the
  // chain seed impls still own the heavy state-mutation; the agent
  // provides the effect/event/audit overlay.
  switch (action) {
    case 'activate': // invoice activation → emit invoice:activated for downstream
      effects.push({
        kind: 'emit',
        event: {
          id: 'invoice:activated',
          tenantId: ctx.tenantId,
          payload: { chainId: step.chainId, stepIndex: step.stepIndex },
          emittedAt: new Date().toISOString(),
        },
      })
      break

    case 'receive': // payment received → emit payment:matched + journal:posted
      effects.push(
        {
          kind: 'emit',
          event: {
            id: 'payment:matched',
            tenantId: ctx.tenantId,
            payload: { chainId: step.chainId, stepIndex: step.stepIndex },
            emittedAt: new Date().toISOString(),
          },
        },
        {
          kind: 'emit',
          event: {
            id: 'journal:posted',
            tenantId: ctx.tenantId,
            payload: { chainId: step.chainId, stepIndex: step.stepIndex, action: 'cash-receipt' },
            emittedAt: new Date().toISOString(),
          },
        },
      )
      break

    case 'complete': // invoice completed → emit invoice:completed
      effects.push({
        kind: 'emit',
        event: {
          id: 'invoice:completed',
          tenantId: ctx.tenantId,
          payload: { chainId: step.chainId, stepIndex: step.stepIndex },
          emittedAt: new Date().toISOString(),
        },
      })
      break

    case 'reconcile': // bank reconciliation → emit journal:posted for the rec entry
      effects.push({
        kind: 'emit',
        event: {
          id: 'journal:posted',
          tenantId: ctx.tenantId,
          payload: { chainId: step.chainId, stepIndex: step.stepIndex, action: 'bank-reconciliation' },
          emittedAt: new Date().toISOString(),
        },
      })
      break

    default:
      // No action-specific effect; the audit leaf is enough.
      break
  }

  return effects
}

async function onEvent(
  ctx: AgentContext,
  ev: DomainEvent,
): Promise<AgentEffect[]> {
  // Subscribed events: each becomes one Merkle leaf so the cross-chain
  // event trace is auditable end-to-end.
  return [
    {
      kind: 'audit',
      leaf: {
        tenantId: ctx.tenantId,
        subjectCollection: 'audit-events',
        subjectId: ev.id,
        action: 'finance-handled-event',
      },
    },
  ]
}

export const FinanceAgent: DomainAgent = {
  id: 'finance',
  ownsCollections: OWNED_COLLECTIONS,
  subscribesTo: SUBSCRIBES_TO,
  emits: EMITS,
  // No cron — finance agent is event-driven, not scheduled. R2R period close
  // can drive a scheduled tick later via SCHEDULED_TASKS registry.
  onChainStep,
  onEvent,
}
