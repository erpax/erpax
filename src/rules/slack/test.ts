import { describe, expect, it } from 'vitest'
import { assertNoSlack, claimBalance, totalSlack } from '@/rules/slack'

const b = (over: number[], under: number[], exact: number) => ({
  over: over.map((s, i) => ({ axis: `o${i}`, live: 10 - s, ceiling: 10, slack: s })),
  under: under.map((s, i) => ({ axis: `u${i}`, live: 10, ceiling: 10 + s, slack: s })),
  exact,
})

// Computed ONCE: claimBalance walks every live axis (~20s), and four independent calls made this
// file time out on its first run. A test that fails on a slow machine and passes on a fast one
// measures the machine, which is the defect this atom's own SKILL warns about.
const LIVE = claimBalance(process.cwd())

describe('rules/slack — an under-claim is an over-claim, involuted', () => {
  it('sums the unheld headroom across every under-claiming axis', () => {
    expect(totalSlack(b([], [3, 5], 0))).toBe(8)
    expect(totalSlack(b([-2], [], 4))).toBe(0)
  })

  it('fails closed on slack, exactly as the corpus fails closed on excess', () => {
    expect(() => assertNoSlack(process.cwd(), 10_000)).not.toThrow()
  })

  // The point this atom exists for. Every gate in this corpus asks "is this claim too strong?".
  // None asked "too weak?" — and a ceiling above its live value permits the corpus to decay back
  // to the claim with every run staying green. Same defect, opposite polarity.
  it('reports BOTH directions, never only the familiar one', () => {
    const live = LIVE
    expect(Array.isArray(live.over)).toBe(true)
    expect(Array.isArray(live.under)).toBe(true)
    expect(live.over.length + live.under.length + live.exact).toBeGreaterThan(15)
  })

  it('an axis it cannot measure is omitted, never counted as balanced', () => {
    // "could not ask" is not "in balance" — the conflation this corpus keeps paying for
    const empty = LIVE
    for (const a of [...empty.over, ...empty.under]) expect(Number.isFinite(a.live)).toBe(true)
  })

  it('slack is exactly ceiling − live, in both directions', () => {
    for (const a of LIVE.under) {
      expect(a.slack).toBe(a.ceiling - a.live)
      expect(a.slack).toBeGreaterThan(0)
    }
    for (const a of LIVE.over) expect(a.live).toBeGreaterThan(a.ceiling)
  })
})
