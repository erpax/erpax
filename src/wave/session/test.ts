import { describe, it, expect } from 'vitest'
import { selfBalancingWaveLoad } from '../load'
import { createWaveSession, completeWaveHop, waveSessionVerdict, isWaveSessionReady } from './index'

/**
 * session — the hop-by-hop receipt trail over a wave plan. The property that matters
 * is that a session is NOT ready until every wave has actually been completed: a
 * partially-walked plan reporting ready would be a receipt for work never done.
 */

const plan = (n: number) => selfBalancingWaveLoad(Array.from({ length: n }, (_, i) => `item-${i}`))
const hop = (s: ReturnType<typeof createWaveSession>, ordinal: number) =>
  completeWaveHop(s, ordinal, '2026-08-19T00:00:00.000Z', 'test')

describe('wave/session — a session tracks the plan it was opened on', () => {
  it('starts with nothing completed', () => {
    const s = createWaveSession(plan(14), 'corr-1')
    const v = waveSessionVerdict(s)
    expect(v.completedWaves).toBe(0)
    expect(v.complete).toBe(false)
    expect(isWaveSessionReady(s)).toBe(false)
  })

  it('an EMPTY plan is trivially complete and balanced', () => {
    const s = createWaveSession(plan(0), 'corr-empty')
    const v = waveSessionVerdict(s)
    expect(v.totalWaves).toBe(0)
    expect(v.complete).toBe(true)
    expect(v.balanced).toBe(true)
  })
})

describe('wave/session — readiness is earned, not assumed', () => {
  it('is NOT ready until every wave is completed', () => {
    const s = createWaveSession(plan(14), 'corr-2')
    const total = s.plan.waveCount
    expect(total).toBeGreaterThan(1)

    for (let o = 1; o < total; o++) hop(s, o)
    expect(waveSessionVerdict(s).complete).toBe(false)
    expect(isWaveSessionReady(s)).toBe(false)

    hop(s, total)
    expect(waveSessionVerdict(s).complete).toBe(true)
  })

  it('completing the same wave twice does not invent progress', () => {
    const s = createWaveSession(plan(14), 'corr-3')
    hop(s, 1)
    const after = waveSessionVerdict(s).completedWaves
    hop(s, 1)
    expect(waveSessionVerdict(s).completedWaves).toBe(after)
  })

  it('a hop emits a CHAINED receipt — the actor is folded in, not stored in clear', () => {
    // The receipt is a hash-chain leaf: it starts at GENESIS and content-addresses
    // its payload, so the actor is evidence you can verify, never a plaintext label.
    const s = createWaveSession(plan(14), 'corr-4')
    const r = hop(s, 1)
    expect(r.prevLeafUuid).toBe('GENESIS')
    expect(String(r.timestampIso)).toBe('2026-08-19T00:00:00.000Z')
    expect(String(r.leafUuid)).toMatch(/^[0-9a-f]{16,}$/)

    // A DIFFERENT actor must address differently, or the receipt proves nothing.
    const other = createWaveSession(plan(14), 'corr-4')
    const r2 = completeWaveHop(other, 1, '2026-08-19T00:00:00.000Z', 'someone-else')
    expect(r2.payloadUuid).not.toBe(r.payloadUuid)
  })
})
