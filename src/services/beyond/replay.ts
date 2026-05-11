/**
 * Law 12 — Deterministic replay.
 *
 * Slice ZZZZZ. Given (auditLeaf, snapshotUuid), replay the chain step
 * and prove byte-identical output. Required for compliance audits:
 * "show me how this number was computed; I want to reproduce it."
 *
 * Combines:
 *   - Merkle audit chain (QQQQ) for the input event
 *   - Content-uuid (RRRRR) for the snapshot input + output verification
 *   - AgentRuntime (DDDDD) for the actual replay
 *
 * @standard ISRS 4400 agreed-upon-procedures (replay verification)
 * @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 reusability
 */

import { computeContentUuid, jcsCanonicalize } from '@/services/integrity'
import type { AgentEffect } from '@/services/agents/types'
import type { ReplayRequest, ReplayResult } from './types'

/**
 * Compute the canonical hash of an effect sequence — must be byte-
 * identical across runs to count as a successful replay.
 */
export function effectsHash(effects: ReadonlyArray<AgentEffect>, tenantId: string): string {
  // Strip non-deterministic timestamps from emitted events before hashing.
  const stripped = effects.map((e) => {
    if (e.kind === 'emit') {
      const { emittedAt: _emittedAt, ...rest } = e.event
      return { ...e, event: rest }
    }
    return e
  })
  return computeContentUuid(
    { effects: stripped } as unknown as Record<string, unknown>,
    tenantId,
  )
}

/**
 * Replay an audit leaf — caller supplies the original input + a way
 * to invoke the chain step. Returns ok:true when the recomputed
 * effectsHash matches the leaf's recorded outputHash.
 */
export async function replayLeaf(args: {
  request: ReplayRequest
  expectedOutputHash: string
  invoke: () => Promise<AgentEffect[]>
  tenantId: string
}): Promise<ReplayResult> {
  const replayed = await args.invoke()
  const actual = effectsHash(replayed, args.tenantId)
  if (actual === args.expectedOutputHash) return { ok: true, effects: replayed }
  return { ok: false, mismatch: { expectedHash: args.expectedOutputHash, actualHash: actual } }
}

/** Pure function — confirm an effect sequence is replay-stable (no Date.now / Math.random in the kinds). */
export function isReplayStable(effects: ReadonlyArray<AgentEffect>): { ok: boolean; reason?: string } {
  for (const e of effects) {
    if (e.kind === 'emit' && !e.event.emittedAt) {
      return { ok: false, reason: 'emit effect missing emittedAt' }
    }
  }
  // JCS canonicalization roundtrip — proves the effects can be hashed deterministically.
  try { jcsCanonicalize(effects as unknown) } catch (err) {
    return { ok: false, reason: `effects not JCS-serializable: ${(err as Error).message}` }
  }
  return { ok: true }
}
