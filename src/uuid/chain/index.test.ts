/**
 * UUID-chain tests — Conservation Law 60.
 *
 * Slice TTTTTTTTT-cut1 (2026-05-11). Pins:
 *
 *   1. forgeGenesisLink produces a link with depth=0, prev=genesis-sentinel.
 *   2. forgeChainLink advances depth by 1 and references the prior leaf.
 *   3. computeChainLinkUuid is stable for the same (prev, payload,
 *      occurredAt, tenant) tuple.
 *   4. Two chains with byte-equal sequences produce byte-equal HEAD
 *      uuids (federation by uuid).
 *   5. verifyChain returns ok:true for an intact chain.
 *   6. verifyChain detects tamper at the earliest divergence.
 *   7. walkChain yields links in HEAD-to-genesis order.
 *
 * @audit Conservation Law 60 binding-uuid-is-blockchain-leaf
 */
import { describe, it, expect } from 'vitest'
import {
  GENESIS_PREV_UUID,
  forgeGenesisLink,
  forgeChainLink,
  verifyChain,
  walkChain,
  type ChainLink,
  type LinkStore,
} from '@/uuid/chain'
import type { ContentUuid } from '@/integrity/content-uuid'

interface TestPayload { kind: string }

/** Simple in-memory link store backed by a Map keyed by leafUuid. */
function makeStore<P>(): LinkStore<P> & { put(link: ChainLink<P>): void; size: () => number; mutate(uuid: string, mutator: (l: ChainLink<P>) => ChainLink<P>): void } {
  const m = new Map<string, ChainLink<P>>()
  return {
    async getLink(uuid) { return m.get(uuid as unknown as string) ?? null },
    put(link) { m.set(link.leafUuid as unknown as string, link) },
    size: () => m.size,
    mutate(uuid, fn) {
      const before = m.get(uuid)
      if (before) m.set(uuid, fn(before))
    },
  }
}

const TENANT = 'tenant-1'

function payloadUuid(value: number): ContentUuid<TestPayload> {
  // Deterministic synthetic payload uuids for the test.
  const hex = value.toString(16).padStart(12, '0')
  return `00000000-0000-5000-8000-${hex}` as ContentUuid<TestPayload>
}

// Slice XXXXXXXXX-cut1 (2026-05-11) — pinned structural metadata.
describe('forged leaves carry slot=chainLeaf + CHAINED capability (Law 61 + 62)', () => {
  it('genesis leafUuid decodes as a structured uuidv8 with slot=chainLeaf', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    const parts = decodeStructured(g.leafUuid as unknown as string)
    expect(parts.slotName).toBe('chainLeaf')
    expect(parts.capabilityNames).toContain('CHAINED')
    expect(parts.capabilityNames).not.toContain('SEALED')
  })

  it('sealed leaves carry CHAINED + SEALED capabilities', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
      sealed: true,
    })
    const parts = decodeStructured(g.leafUuid as unknown as string)
    expect(parts.slotName).toBe('chainLeaf')
    expect([...parts.capabilityNames].sort()).toEqual(['CHAINED', 'SEALED'])
  })

  it('non-sealed and sealed leaves with otherwise-identical inputs are distinct (capability bit changes uuid)', async () => {
    const a = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    const b = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
      sealed: true,
    })
    expect(a.leafUuid).not.toBe(b.leafUuid)
  })
})

describe('forgeGenesisLink', () => {
  it('produces depth=0 with the genesis sentinel as prev', () => {
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0),
      tenantId: TENANT,
      occurredAt: '2026-05-11T08:00:00.000Z',
    })
    expect(g.depth).toBe(0)
    expect(g.prevUuid).toBe(GENESIS_PREV_UUID)
    expect(g.payloadUuid).toBe(payloadUuid(0))
    // Slice XXXXXXXXX-cut1 — leaves are now uuidv8 (version nibble = 8)
// carrying slot=chainLeaf + CHAINED capability.
expect(g.leafUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
  })

  it('two genesis links with the same payload + time → byte-equal leafUuid', () => {
    const a = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    const b = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    expect(a.leafUuid).toBe(b.leafUuid)
  })
})

describe('forgeChainLink', () => {
  it('advances depth by 1 and references the prior leaf-uuid', () => {
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    const next = forgeChainLink<TestPayload>({
      prevUuid: g.leafUuid,
      prevDepth: g.depth,
      payloadUuid: payloadUuid(1),
      tenantId: TENANT,
      occurredAt: '2026-05-11T08:01:00.000Z',
    })
    expect(next.depth).toBe(1)
    expect(next.prevUuid).toBe(g.leafUuid)
    expect(next.leafUuid).not.toBe(g.leafUuid)
  })

  it('different timestamps with same (prev, payload) → distinct leaves (replay-safe)', () => {
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    const a = forgeChainLink<TestPayload>({
      prevUuid: g.leafUuid, prevDepth: 0, payloadUuid: payloadUuid(1),
      tenantId: TENANT, occurredAt: '2026-05-11T08:01:00.000Z',
    })
    const b = forgeChainLink<TestPayload>({
      prevUuid: g.leafUuid, prevDepth: 0, payloadUuid: payloadUuid(1),
      tenantId: TENANT, occurredAt: '2026-05-11T08:02:00.000Z',   // different ts
    })
    expect(a.leafUuid).not.toBe(b.leafUuid)
  })
})

describe('computeChainLinkUuid — federation determinism', () => {
  it('two chains with byte-equal sequences produce byte-equal HEAD uuids', () => {
    const seq = [
      { p: payloadUuid(0), t: '2026-05-11T08:00:00.000Z' },
      { p: payloadUuid(1), t: '2026-05-11T08:01:00.000Z' },
      { p: payloadUuid(2), t: '2026-05-11T08:02:00.000Z' },
      { p: payloadUuid(3), t: '2026-05-11T08:03:00.000Z' },
    ]
    const buildHead = (): string => {
      let prev: ContentUuid<unknown> = GENESIS_PREV_UUID as ContentUuid<unknown>
      let depth = -1
      for (const step of seq) {
        const link = forgeChainLink<TestPayload>({
          prevUuid: prev, prevDepth: depth, payloadUuid: step.p,
          tenantId: TENANT, occurredAt: step.t,
        })
        prev = link.leafUuid
        depth = link.depth
      }
      return String(prev)
    }
    expect(buildHead()).toBe(buildHead())
  })
})

describe('verifyChain — intact + tamper detection', () => {
  function buildChain(steps: number): { store: ReturnType<typeof makeStore<TestPayload>>; headUuid: ContentUuid<ChainLink<TestPayload>> } {
    const store = makeStore<TestPayload>()
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    store.put(g)
    let head = g.leafUuid
    let depth = g.depth
    for (let i = 1; i < steps; i++) {
      const link = forgeChainLink<TestPayload>({
        prevUuid: head, prevDepth: depth, payloadUuid: payloadUuid(i),
        tenantId: TENANT,
        occurredAt: `2026-05-11T08:${String(i).padStart(2, '0')}:00.000Z`,
      })
      store.put(link)
      head = link.leafUuid
      depth = link.depth
    }
    return { store, headUuid: head }
  }

  it('returns ok:true for an intact 5-link chain', async () => {
    const { store, headUuid } = buildChain(5)
    const result = await verifyChain({ headUuid, store })
    expect(result.ok).toBe(true)
    expect(result.verifiedLeaves).toBe(5)
    expect(result.depth).toBe(4)
  })

  it('detects tamper when a payloadUuid is mutated in the store', async () => {
    const { store, headUuid } = buildChain(5)
    // Walk to depth-2 and corrupt its payloadUuid.
    const allLinks: ChainLink<TestPayload>[] = []
    for await (const link of walkChain({ headUuid, store })) allLinks.push(link)
    const target = allLinks[2]!   // depth-2 link
    store.mutate(target.leafUuid as unknown as string, (l) => ({
      ...l,
      payloadUuid: payloadUuid(9999) as ContentUuid<TestPayload>,
    }))
    const result = await verifyChain({ headUuid, store })
    expect(result.ok).toBe(false)
    expect(result.firstFailureReason).toMatch(/recomputed leaf uuid/)
    expect(result.firstFailureLeaf).toBe(target.leafUuid)
  })

  it('detects tamper when a link is missing from the store', async () => {
    const { store, headUuid } = buildChain(3)
    const allLinks: ChainLink<TestPayload>[] = []
    for await (const link of walkChain({ headUuid, store })) allLinks.push(link)
    // We can't delete via the public API; emulate via direct map access.
    const map = (store as unknown as { getLink(u: ContentUuid<ChainLink<TestPayload>>): Promise<ChainLink<TestPayload> | null> })
    // Hack: replace getLink so it returns null for genesis depth.
    const genesisLeaf = allLinks[allLinks.length - 1]!.leafUuid
    const origGet = map.getLink.bind(map)
    map.getLink = async (u: ContentUuid<ChainLink<TestPayload>>) => {
      if (u === genesisLeaf) return null
      return origGet(u)
    }
    const result = await verifyChain({ headUuid, store })
    expect(result.ok).toBe(false)
    expect(result.firstFailureReason).toMatch(/missing link/)
  })
})

describe('walkChain — HEAD-to-genesis order', () => {
  it('yields links in descending depth order', async () => {
    const store = makeStore<TestPayload>()
    const g = forgeGenesisLink<TestPayload>({
      payloadUuid: payloadUuid(0), tenantId: TENANT, occurredAt: '2026-05-11T08:00:00.000Z',
    })
    store.put(g)
    let head = g.leafUuid
    let depth = g.depth
    for (let i = 1; i < 4; i++) {
      const link = forgeChainLink<TestPayload>({
        prevUuid: head, prevDepth: depth, payloadUuid: payloadUuid(i),
        tenantId: TENANT, occurredAt: `2026-05-11T08:0${i}:00.000Z`,
      })
      store.put(link)
      head = link.leafUuid
      depth = link.depth
    }
    const depths: number[] = []
    for await (const link of walkChain({ headUuid: head, store })) depths.push(link.depth)
    expect(depths).toEqual([3, 2, 1, 0])
  })
})
