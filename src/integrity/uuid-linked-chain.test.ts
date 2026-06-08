/**
 * Tests for the uuid-linked audit chain verifier — Slice TTTTTTTT.
 *
 * Focus: the FAIL-CLOSED contract of verifyUuidLinkedChain. A verifier must
 * return a verification result (ok:false with brokenAtSeq) on any uncertainty,
 * and must NEVER throw — a thrown verifier is a DoS hazard and can flip
 * fail-open if a caller try/catches the throw and treats it as trust.
 */
import { describe, it, expect } from 'vitest'
import {
  buildNextLeaf,
  verifyUuidLinkedChain,
  GENESIS_PREV_UUID,
  type UuidLinkedLeaf,
} from './uuid-linked-chain'

const TS = '2026-06-06T12:00:00.000Z'

/** Build a 2-leaf chain over two payloads. */
function chainOf(p0: unknown, p1: unknown): { leaves: UuidLinkedLeaf[]; payloads: unknown[] } {
  const l0 = buildNextLeaf({ head: null, payload: p0, timestampIso: TS })
  const l1 = buildNextLeaf({ head: l0, payload: p1, timestampIso: TS })
  return { leaves: [l0, l1], payloads: [p0, p1] }
}

describe('verifyUuidLinkedChain — structural verification', () => {
  it('an empty chain is intact', async () => {
    expect(await verifyUuidLinkedChain({ leaves: [] })).toEqual({ ok: true, chainLength: 0 })
  })

  it('a genuine chain verifies; the first leaf links to GENESIS', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    expect(leaves[0]!.prevLeafUuid).toBe(GENESIS_PREV_UUID)
    const v = await verifyUuidLinkedChain({ leaves })
    expect(v.ok).toBe(true)
    expect(v.chainLength).toBe(2)
  })

  it('a wrong prevLeafUuid is pinpointed', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    const broken = [leaves[0]!, { ...leaves[1]!, prevLeafUuid: 'deadbeef' }]
    const v = await verifyUuidLinkedChain({ leaves: broken })
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(1)
  })

  it('a payload tampered after the fact is detected via retrievePayload', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    // serve a tampered payload for seq 1
    const v = await verifyUuidLinkedChain({
      leaves,
      retrievePayload: async (leaf) => (leaf.seq === 1 ? { b: 999 } : { a: 1 }),
    })
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(1)
    expect(v.reason).toMatch(/payload tampered at seq 1/)
  })
})

describe('verifyUuidLinkedChain — FAIL-CLOSED on a missing payload', () => {
  it('returns ok:false (does NOT throw) when retrievePayload yields undefined', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    // Regression: payloadContentUuid(undefined) -> createHash().update(undefined)
    // throws ERR_INVALID_ARG_TYPE. The guard must convert this into a result.
    let result: Awaited<ReturnType<typeof verifyUuidLinkedChain>> | undefined
    await expect(
      (async () => {
        result = await verifyUuidLinkedChain({
          leaves,
          retrievePayload: async (leaf) => (leaf.seq === 1 ? undefined : { a: 1 }),
        })
      })(),
    ).resolves.toBeUndefined() // i.e. the call did NOT throw
    expect(result!.ok).toBe(false)
    expect(result!.brokenAtSeq).toBe(1)
    expect(result!.reason).toMatch(/payload unavailable at seq 1/)
  })

  it('returns ok:false when retrievePayload yields null', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    const v = await verifyUuidLinkedChain({
      leaves,
      retrievePayload: async () => null,
    })
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(0)
    expect(v.reason).toMatch(/payload unavailable/)
  })

  it('a missing payload for the FIRST leaf fails closed before any trust is granted', async () => {
    const { leaves } = chainOf({ a: 1 }, { b: 2 })
    const v = await verifyUuidLinkedChain({ leaves, retrievePayload: async () => undefined })
    expect(v.ok).toBe(false)
    expect(v.brokenAtSeq).toBe(0)
  })
})
