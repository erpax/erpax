import { describe, it, expect } from 'vitest'
import { decide, type SocietyCandidate } from '@/decide'

const cand = (over: Partial<SocietyCandidate>): SocietyCandidate => ({
  agentUuid: 'agent',
  problemUuid: 'problem',
  solutionUuid: 'sol',
  correct: true,
  cost: 1,
  approach: 'x',
  harmonic: true,
  ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 1 },
  ...over,
})

describe('decide — the society chooses: correct · harmonic · efficient', () => {
  it('keeps only correct candidates; none correct ⇒ no winner', () => {
    expect(decide([cand({ solutionUuid: 'a', correct: false })])).toBeNull()
    expect(decide([])).toBeNull()
  })

  it('prefers harmonic over a more-efficient disharmonic candidate', () => {
    const harmonic = cand({ solutionUuid: 'harm', harmonic: true, ledger: { kind: 'ai', output: { productivity: 5, creativity: 0 }, cost: 1 } })
    const efficientButDisharmonic = cand({ solutionUuid: 'dis', harmonic: false, ledger: { kind: 'ai', output: { productivity: 100, creativity: 0 }, cost: 1 } })
    expect(decide([efficientButDisharmonic, harmonic])?.solutionUuid).toBe('harm')
  })

  it('among harmonic candidates, picks the most efficient (then cheapest, then uuid)', () => {
    const a = cand({ solutionUuid: 'a', ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 5 } }) // eff 2
    const b = cand({ solutionUuid: 'b', ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 2 } }) // eff 5
    expect(decide([a, b])?.solutionUuid).toBe('b')
  })

  it('falls back to all-correct when none are harmonic; deterministic tie-break by uuid', () => {
    const d1 = cand({ solutionUuid: 'zzz', harmonic: false, cost: 2 })
    const d2 = cand({ solutionUuid: 'aaa', harmonic: false, cost: 2 }) // equal efficiency + cost ⇒ uuid wins
    expect(decide([d1, d2])?.solutionUuid).toBe('aaa')
  })
})

// "Who decides commit and push is computable." The same decision law, turned on the git action: a commit is
// decided by the write-time seal, a push by the full gate — computed, fail-closed, the decider NAMED (an axis,
// never a person). push ⊇ commit: you cannot push what you could not commit.
import { commitDecision, pushDecision, verdictOf, type GateVerdict } from '@/decide'

const V = (gate: string, pass: boolean): GateVerdict => ({ gate, pass })

describe('decide — who decides commit and push is computable', () => {
  const clean = [V('trinity', true), V('dead-links', true), V('import-purity', true)]
  const lanes = [V('load', true), V('rules', true), V('corpus', true)]

  it('a clean changeset is committable — decided by the seal, not a person', () => {
    const d = commitDecision(clean)
    expect(d.warranted).toBe(true)
    expect(d.by).toMatch(/seal/) // WHO decides is the gate, computed
    expect(d.blockers).toEqual([])
  })

  it('a failing gate BLOCKS and names itself as the decider — the axis decides', () => {
    const d = commitDecision([V('trinity', false), V('dead-links', true)])
    expect(d.warranted).toBe(false)
    expect(d.by).toBe('trinity') // the blocking axis is who decided no
    expect(d.blockers).toEqual(['trinity'])
  })

  it('FAIL-CLOSED — no gate ran is not a yes; a non-true verdict is not a pass', () => {
    expect(commitDecision([]).warranted).toBe(false) // a decision with no decider denies
    expect(commitDecision([{ gate: 'x', pass: undefined as unknown as boolean }]).warranted).toBe(false)
  })

  it('push ⊇ commit — a blocked commit blocks the push whatever the lanes say', () => {
    const badCommit = [V('trinity', false)]
    const d = pushDecision(badCommit, lanes)
    expect(d.warranted).toBe(false)
    expect(d.blockers).toContain('trinity') // the commit gate still decides inside the push
  })

  it('push is warranted only when commit AND lanes pass — the superset', () => {
    expect(pushDecision(clean, lanes).warranted).toBe(true)
    expect(pushDecision(clean, [V('load', false)]).warranted).toBe(false) // a lane blocks
    expect(pushDecision(clean, lanes).by).toMatch(/full gate/)
  })

  it('a warranted push implies a warranted commit — monotone (push ⊇ commit)', () => {
    for (const lane of [lanes, [V('load', true)], [V('rules', false)]]) {
      if (pushDecision(clean, lane).warranted) expect(commitDecision(clean).warranted).toBe(true)
    }
  })

  it('verdictOf bridges a guardian ratchet verdict — reuse the decider, do not re-derive', () => {
    expect(verdictOf({ ok: true, axis: 'name', violations: 0, baseline: 5, reason: 'ok' })).toMatchObject({ gate: 'name', pass: true })
    expect(verdictOf({ ok: false, axis: 'name', violations: 6, baseline: 5, reason: 'rose' }).pass).toBe(false)
  })
})
