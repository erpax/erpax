import { describe, it, expect } from 'vitest'
import { amend, getArticle, CONSTITUTION } from '@/constitution'

// a unanimous, full-turnout polity
const unanimous = (n: number) => Array.from({ length: n }, (_, i) => ({ voter: 'v' + i, vote: 'for' as const }))

describe('constitution — the 0: society is sovereign, the foundation is entrenched', () => {
  it('the four integrity invariants are entrenched — even a unanimous polity cannot legalise corruption', () => {
    const r = amend('1-integrity', unanimous(1000), 1000) // 100% turnout, 100% for
    expect(r.allowed).toBe(false)
    expect(r.reason).toContain('entrenched')
  })

  it('one-person-one-vote and identity are likewise perpetual', () => {
    expect(amend('4-governance', unanimous(100), 100).allowed).toBe(false)
    expect(amend('0-identity', unanimous(100), 100).allowed).toBe(false)
  })

  it('a non-entrenched article IS amendable by a supermajority of the polity', () => {
    const r = amend('5-rights', unanimous(100), 100) // turnout 1.0, approval 1.0 ≥ 2/3
    expect(r.allowed).toBe(true)
    expect(r.reason).toContain('supermajority')
  })

  it('a non-entrenched amendment FAILS below the supermajority bar', () => {
    const ballots = [
      ...Array.from({ length: 55 }, (_, i) => ({ voter: 'y' + i, vote: 'for' as const })),
      ...Array.from({ length: 45 }, (_, i) => ({ voter: 'n' + i, vote: 'against' as const })),
    ]
    const r = amend('3-sovereignty', ballots, 100) // approval 0.55 < 2/3
    expect(r.allowed).toBe(false)
  })

  it('the constitution is whole — every article present, the integrity core entrenched', () => {
    expect(CONSTITUTION).toHaveLength(7)
    expect(getArticle('1-integrity')?.entrenched).toBe(true)
    expect(getArticle('2-conservation')?.entrenched).toBe(true)
  })
})
