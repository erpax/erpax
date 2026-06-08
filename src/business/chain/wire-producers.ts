/**
 * Wire chain producers — Slice BBBBBBBB (2026-05-11).
 *
 * Given a collection slug, walk BUSINESS_CHAINS and return a list of
 * `CollectionAfterChangeHook`s that produce every chain emit declared
 * for steps owned by that slug. Used by `createAccountingCollection`
 * so the chain-registry's `emits:` becomes the single source of truth
 * for runtime event production — no per-collection `import { emitX }`
 * dance.
 *
 * Per Conservation Law 4 (event-graph closure): if BUSINESS_CHAINS
 * declares `(collection, action, emits)`, then either:
 *   (a) the chain step has `producer: { onStatus | onCreate, aggregate }`
 *       and this helper auto-wires the hook, OR
 *   (b) the collection wires the emit by hand (e.g. legacy Slice KKKK
 *       chainEventEmitters exports) — `checkChainEmitsHaveProducer`
 *       finds the literal in source and passes.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — single wiring path
 * @audit ISO 19011:2018 §6.4.6 producer→event traceability via BUSINESS_CHAINS
 * @see ./registry.ts BUSINESS_CHAINS
 * @see ../../hooks/chainEventEmitters.ts emitOnStatusTransition / emitOnCreate
 */

import type { CollectionAfterChangeHook } from 'payload'
import { emitOnStatusTransition, emitOnCreate } from '@/chain/event/emitter'
import { BUSINESS_CHAINS } from './registry'

/**
 * Return every afterChange hook needed to satisfy chain emits owned by
 * `collectionSlug`. Skips steps without a `producer:` (those remain
 * bespoke — wired manually or intentionally silent).
 *
 * Deduplicates by `(emits, onStatus|onCreate)` so the same event id
 * appearing in multiple chains (e.g. `bill:matched` in P2P_THREE_WAY_MATCH
 * and BILL_DUPLICATE_CHECK) only fires once per row.
 */
export function wireChainProducersFor(
  collectionSlug: string,
): CollectionAfterChangeHook[] {
  const seen = new Set<string>()
  const hooks: CollectionAfterChangeHook[] = []
  for (const chain of Object.values(BUSINESS_CHAINS)) {
    for (const step of chain.steps) {
      if (step.collection !== collectionSlug) continue
      if (!step.producer) continue
      if (!step.emits) continue
      const key = step.producer.onCreate
        ? `${step.emits}::onCreate`
        : `${step.emits}::onStatus:${step.producer.onStatus ?? ''}`
      if (seen.has(key)) continue
      seen.add(key)
      if (step.producer.onCreate === true) {
        hooks.push(emitOnCreate(step.emits, step.producer.aggregate))
      } else if (typeof step.producer.onStatus === 'string' && step.producer.onStatus.length > 0) {
        hooks.push(emitOnStatusTransition(step.producer.onStatus, step.emits, step.producer.aggregate))
      }
    }
  }
  return hooks
}
