/**
 * Law 20 — Reversibility. Slice ZZZZZ.
 *
 * Every state transition has a typed inverse. Powers GDPR right-to-
 * erasure, regulatory reversal, and "undo" workflows without
 * bespoke per-collection unwind code.
 *
 * @standard GDPR Art. 17 right-to-erasure
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (reversal trail)
 */

import type { AgentEffect } from '@/agent/types'
import type { InverseEffect } from '@/beyond/types'

/** Compute the typed inverse of an AgentEffect, or null if irreversible. */
export function inverseOf(effect: AgentEffect, opts?: { previousState?: unknown; createdId?: string }): InverseEffect {
  switch (effect.kind) {
    case 'create':
      if (!opts?.createdId) return { kind: 'cannot-invert', reason: 'create inverse requires the created id' }
      return { kind: 'undo-create', collection: effect.collection, id: opts.createdId }
    case 'update':
      if (opts?.previousState === undefined) {
        return { kind: 'cannot-invert', reason: 'update inverse requires previous state' }
      }
      return { kind: 'undo-update', collection: effect.collection, id: effect.id, restorePatch: opts.previousState }
    case 'emit':
      return { kind: 'undo-emit', eventId: effect.event.id }
    case 'call':
      // A call delegates to the callee; its consequences ARE the callee's own
      // effects, inverted at their own site — there is nothing to invert here.
      return { kind: 'cannot-invert', reason: 'call delegates to the callee — invert the callee’s effects at their site' }
    case 'audit':
      // Audit leaves are immutable by Law 5; emit a tombstone instead.
      return { kind: 'undo-audit', leafHash: 'tombstone-pending' }
    case 'notify':
    case 'escalate':
      // External side-effects (emails, escalations) are not invertible.
      return { kind: 'cannot-invert', reason: `${effect.kind} effects have already left the system boundary` }
    case 'capture':
      return { kind: 'cannot-invert', reason: 'multimedia evidence is append-only' }
    default: {
      const _exhaustive: never = effect
      return { kind: 'cannot-invert', reason: `unknown effect kind: ${(_exhaustive as { kind: string }).kind}` }
    }
  }
}

/** True when EVERY effect in a sequence is invertible. */
export function isFullyReversible(
  effects: ReadonlyArray<AgentEffect>,
  context?: { previousStates?: ReadonlyArray<unknown>; createdIds?: ReadonlyArray<string> },
): boolean {
  return effects.every((e, i) => {
    const inv = inverseOf(e, {
      previousState: context?.previousStates?.[i],
      createdId: context?.createdIds?.[i],
    })
    return inv.kind !== 'cannot-invert'
  })
}
