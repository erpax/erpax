import { describe, it, expect } from 'vitest'
import {
  receiptAddress,
  receiptState,
  runOutward,
  contractRows,
  leadsOf,
  type OutwardRow,
  nextBook,
  outwardVerdict,
  type OutwardProbe,
} from './index'

/**
 * outward — proven with INJECTED answers, never a network call. A test that reaches
 * the real VIES would be the thing this atom exists to avoid: slow, flaky, and red
 * for reasons that are nobody's fault.
 */

const probe = (name: string, answer: unknown, host = 'example.test'): OutwardProbe => ({
  name,
  host,
  run: async () => answer,
})
const failing = (name: string, msg = 'ECONNREFUSED'): OutwardProbe => ({
  name,
  host: 'down.test',
  run: async () => {
    throw new Error(msg)
  },
})

describe('outward — the address', () => {
  it('is content-addressed: the same ANSWER folds to the same address', () => {
    expect(receiptAddress({ rate: 1.95583 })).toBe(receiptAddress({ rate: 1.95583 }))
  })

  it('ignores key ORDER — two servers may serialise the same answer differently', () => {
    expect(receiptAddress({ a: 1, b: 2 })).toBe(receiptAddress({ b: 2, a: 1 }))
    expect(receiptAddress({ x: { p: 1, q: 2 } })).toBe(receiptAddress({ x: { q: 2, p: 1 } }))
  })

  it('moves when the answer moves', () => {
    expect(receiptAddress({ rate: 1.95583 })).not.toBe(receiptAddress({ rate: 1.96 }))
  })

  it('is a v8 content-uuid', () => {
    expect(receiptAddress('anything')).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })
})

describe('outward — the four states', () => {
  it('fresh on first sighting, unchanged on agreement, moved on change', () => {
    expect(receiptState(undefined, 'a')).toBe('fresh')
    expect(receiptState('a', 'a')).toBe('unchanged')
    expect(receiptState('a', 'b')).toBe('moved')
  })

  it('classifies a live run against its prior book', async () => {
    const answer = { rate: 1.95583 }
    const prior = { ecb: receiptAddress(answer), vies: receiptAddress({ valid: true }) }
    const rows = await runOutward([probe('ecb', answer), probe('vies', { valid: false }), probe('new', 1)], prior)
    expect(rows.map((r) => r.state)).toEqual(['unchanged', 'moved', 'fresh'])
  })
})

describe('outward — a down boundary is not a failure', () => {
  it('records unreachable, KEEPS the prior address, and never throws', async () => {
    const prior = { peppol: 'previously-seen-address' }
    const rows = await runOutward([failing('peppol')], prior)
    expect(rows[0]!.state).toBe('unreachable')
    expect(rows[0]!.address).toBe('previously-seen-address') // the last receipt still stands
    expect(rows[0]!.note).toContain('ECONNREFUSED')
  })

  it('does NOT erase the receipt of an unreachable probe', async () => {
    const prior = { peppol: 'kept' }
    const book = nextBook(prior, await runOutward([failing('peppol')], prior))
    expect(book.peppol).toBe('kept')
  })

  it('does not make the verdict fail — only a MOVED answer is news', async () => {
    const v = outwardVerdict(await runOutward([failing('a'), probe('b', 1)], { b: receiptAddress(1) }))
    expect(v.holds).toBe(true)
    expect(v.unreachable).toHaveLength(1)
  })
})

describe('outward — the verdict', () => {
  it('holds ⟺ nothing moved', async () => {
    const prior = { x: receiptAddress('old') }
    const stable = outwardVerdict(await runOutward([probe('x', 'old')], prior))
    expect(stable.holds).toBe(true)

    const changed = outwardVerdict(await runOutward([probe('x', 'new')], prior))
    expect(changed.holds).toBe(false)
    expect(changed.moved.map((r) => r.name)).toEqual(['x'])
  })

  it('one row per probe, in probe order', async () => {
    const rows = await runOutward([probe('a', 1), failing('b'), probe('c', 3)], {})
    expect(rows.map((r) => r.name)).toEqual(['a', 'b', 'c'])
  })

  it('records WHO answered, not only what', async () => {
    const rows = await runOutward([probe('vies', { valid: true }, 'ec.europa.eu')], {})
    expect(rows[0]!.host).toBe('ec.europa.eu')
  })
})

describe('outward — every API is a lead source, and a rate moving is not a lead', () => {
  it('a contract verdict FLIP is a lead; the same verdict is not', () => {
    const before = contractRows('world', [{ rail: 'frankfurter', holds: true, detail: 'EUR on 2026-09-24: 31 rate(s)' }], {})
    expect(before[0]!.state).toBe('fresh')
    const book = nextBook({}, before)
    // the SAME verdict, a different day and one more currency — not a lead
    const again = contractRows('world', [{ rail: 'frankfurter', holds: true, detail: 'EUR on 2026-09-25: 32 rate(s)' }], book)
    expect(again[0]!.state).toBe('unchanged')
    expect(leadsOf(again)).toEqual([])
    // the contract BREAKING is a lead
    const broke = contractRows('world', [{ rail: 'frankfurter', holds: false, detail: '"rates" is empty' }], book)
    expect(broke[0]!.state).toBe('moved')
    expect(leadsOf(broke)).toHaveLength(1)
    expect(leadsOf(broke)[0]!.note).toBe('"rates" is empty')
  })

  it('a rail nobody had asked before is a lead — fresh is new information', () => {
    const rows = contractRows('bg', [{ rail: 'bnb', holds: true, detail: 'ok' }], {})
    expect(leadsOf(rows).map((r) => r.state)).toEqual(['fresh'])
  })

  it('the receipt is namespaced by source, so two registries may share a rail name', () => {
    const a = contractRows('bg', [{ rail: 'rates', holds: true, detail: 'x' }], {})
    const b = contractRows('world', [{ rail: 'rates', holds: true, detail: 'x' }], {})
    expect(a[0]!.name).toBe('bg:rates')
    expect(b[0]!.name).toBe('world:rates')
    // same verdict ⇒ same address, but different receipt keys — neither masks the other
    expect(a[0]!.address).toBe(b[0]!.address)
    expect(nextBook({}, [...a, ...b])).toEqual({ 'bg:rates': a[0]!.address, 'world:rates': b[0]!.address })
  })

  it('unreachable is NOT a lead — an unanswered question is not new information', () => {
    const rows: OutwardRow[] = [{ name: 'x', host: 'h', address: 'a', state: 'unreachable' }]
    expect(leadsOf(rows)).toEqual([])
  })

  it('the detail is never folded — that is what keeps a daily rate out of the lead stream', () => {
    const addr = (holds: boolean, detail: string) => contractRows('s', [{ rail: 'r', holds, detail }], {})[0]!.address
    expect(addr(true, 'monday')).toBe(addr(true, 'tuesday'))
    expect(addr(false, 'monday')).not.toBe(addr(true, 'monday'))
  })
})
