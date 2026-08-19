import { describe, it, expect } from 'vitest'
import { AuditChain } from './durable-objects'
import { buildNextLeaf, verifyUuidLinkedChain } from '@/integrity/uuid-linked-chain'

/**
 * AuditChain DO — the audit chain proven END TO END, through the object itself.
 *
 * The chain had two halves tested and the SEAM between them untested: the verifier
 * (`uuid-linked-chain.test.ts`, structural) and the write path
 * (`write-audit-event.test.ts`, against a MOCK mediator). The Durable Object that
 * actually holds the chain — its fetch handler, its prev/seq admission rules, its
 * refusal — had no test at all. A gate nobody exercises is a gate that cannot fire
 * ([[rules]]/unraised), and this one is the single-writer point the whole
 * tamper-evidence claim rests on.
 *
 * These drive the REAL DO class with the REAL leaf builder and the REAL verifier.
 * Only the storage substrate is faked (a Map standing in for DurableObjectState) —
 * so what is proven is the object's own logic, not a re-implementation of it.
 *
 * @invariant a genuine append advances the head and the stored chain verifies
 * @invariant a forged prev is REFUSED (409) — the chain cannot be re-pointed
 * @invariant a replayed/skipped seq is REFUSED (409) — no gaps, no double-writes
 * @invariant a payload tampered in storage is DETECTED by the verifier
 * @standard RFC 9562 §5.8 content-uuid · ISO 19011:2018 §6.4 audit evidence
 */

/** Minimal DurableObjectState — the DO only uses `storage.get/put`. */
const fakeState = () => {
  const map = new Map<string, unknown>()
  return {
    map,
    storage: {
      get: async <T>(k: string): Promise<T | undefined> => map.get(k) as T | undefined,
      put: async (k: string, v: unknown): Promise<void> => void map.set(k, v),
    },
  }
}

const chainFor = () => {
  const state = fakeState()
  // The DO takes DurableObjectState; the fake satisfies the surface it actually uses.
  const doInstance = new AuditChain(state as never)
  const call = (method: string, path: string, body?: unknown) =>
    doInstance.fetch(
      new Request(`https://audit.internal${path}`, {
        method,
        ...(body === undefined ? {} : { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }),
      }),
    )
  return { state, call }
}

/** Append `n` genuine events through the DO, honouring the head it reports. */
async function appendGenuine(call: ReturnType<typeof chainFor>['call'], payloads: readonly unknown[]) {
  const appended = []
  for (const payload of payloads) {
    const head = (await (await call('GET', '/head')).json()) as { leafUuid: string; seq: number } | null
    const leaf = buildNextLeaf({ head, payload })
    const res = await call('POST', '/append-linked', { leaf, payload })
    expect(res.status).toBe(200)
    appended.push(leaf)
  }
  return appended
}

describe('AuditChain DO — a genuine chain', () => {
  it('advances the head, returns the leaves in order, and VERIFIES end to end', async () => {
    const { call } = chainFor()
    const payloads = [
      { event: 'invoice.posted', id: 'INV-1', amount: 1200 },
      { event: 'payment.received', id: 'PAY-1', amount: 1200 },
      { event: 'period.closed', id: '2026-08' },
    ]
    const built = await appendGenuine(call, payloads)

    const head = (await (await call('GET', '/head')).json()) as { leafUuid: string; seq: number }
    expect(head.seq).toBe(2)
    expect(head.leafUuid).toBe(built[2]!.leafUuid)

    const { leaves } = (await (await call('GET', '/chain')).json()) as { leaves: typeof built }
    expect(leaves.map((l) => l.seq)).toEqual([0, 1, 2])
    expect(leaves[0]!.prevLeafUuid).toBe('GENESIS')
    // each leaf points at its predecessor — the link, read from DO storage
    expect(leaves[1]!.prevLeafUuid).toBe(leaves[0]!.leafUuid)
    expect(leaves[2]!.prevLeafUuid).toBe(leaves[1]!.leafUuid)

    // THE END-TO-END SEAM: the real verifier, over what the DO actually stored,
    // resolving payloads back through the DO's own /leaf route.
    const verdict = await verifyUuidLinkedChain({
      leaves,
      retrievePayload: async (leaf) => {
        const r = await call('GET', `/leaf/${leaf.seq}`)
        return ((await r.json()) as { payload: unknown }).payload
      },
    })
    expect(verdict.ok).toBe(true)
    expect(verdict.chainLength).toBe(3)
  })
})

describe('AuditChain DO — the refusals (what makes the chain evidence)', () => {
  it('REFUSES a forged prev — the chain cannot be re-pointed', async () => {
    const { call } = chainFor()
    await appendGenuine(call, [{ event: 'a' }, { event: 'b' }])

    // A forger builds a leaf claiming to follow GENESIS while the head is at seq 1.
    const forged = buildNextLeaf({ head: null, payload: { event: 'forged-history' } })
    const res = await call('POST', '/append-linked', { leaf: forged, payload: { event: 'forged-history' } })
    expect(res.status).toBe(409)
    const err = (await res.json()) as { error: string; expected: string }
    expect(err.error).toBe('prev-mismatch')

    // the head is untouched — the refusal left no trace in the chain
    const head = (await (await call('GET', '/head')).json()) as { seq: number }
    expect(head.seq).toBe(1)
  })

  it('REFUSES a verbatim replay — the position is already taken', async () => {
    const { call } = chainFor()
    const [first] = await appendGenuine(call, [{ event: 'only' }])
    // Replaying leaf 0 fails on PREV first: once the head advanced, GENESIS is no
    // longer the expected predecessor. (The seq guard is raised separately below —
    // a rule nothing constructs is a rule that cannot fire, [[rules]]/unraised.)
    const res = await call('POST', '/append-linked', { leaf: first, payload: { event: 'only' } })
    expect(res.status).toBe(409)
    expect(((await res.json()) as { error: string }).error).toBe('prev-mismatch')
  })

  it('REFUSES a skipped seq even when prev is CORRECT — no gaps in the record', async () => {
    const { call } = chainFor()
    await appendGenuine(call, [{ event: 'a' }])
    const head = (await (await call('GET', '/head')).json()) as { leafUuid: string; seq: number }

    // Correct predecessor, but jumping the sequence — this is the only way to reach
    // the seq guard, so the guard is genuinely exercised rather than assumed.
    const gapped = { ...buildNextLeaf({ head, payload: { event: 'gap' } }), seq: head.seq + 5 }
    const res = await call('POST', '/append-linked', { leaf: gapped, payload: { event: 'gap' } })
    expect(res.status).toBe(409)
    const err = (await res.json()) as { error: string; expected: number; got: number }
    expect(err.error).toBe('seq-mismatch')
    expect(err.expected).toBe(head.seq + 1)
    expect(err.got).toBe(head.seq + 5)
  })

  it('REFUSES a malformed leaf outright', async () => {
    const { call } = chainFor()
    const res = await call('POST', '/append-linked', { leaf: { nope: true }, payload: {} })
    expect(res.status).toBe(400)
  })
})

describe('AuditChain DO — tamper in storage is DETECTED', () => {
  it('a payload rewritten behind the DO fails verification', async () => {
    const { state, call } = chainFor()
    await appendGenuine(call, [{ amount: 1200 }, { amount: 900 }])
    const { leaves } = (await (await call('GET', '/chain')).json()) as { leaves: ReadonlyArray<{ seq: number }> }

    // The attacker edits the stored payload directly — the leaf uuid still commits
    // to the ORIGINAL content, so the recomputation disagrees.
    state.map.set('payload:1', { amount: 999_999 })

    const verdict = await verifyUuidLinkedChain({
      leaves: leaves as never,
      retrievePayload: async (leaf) => state.map.get(`payload:${leaf.seq}`),
    })
    expect(verdict.ok).toBe(false)
  })
})
