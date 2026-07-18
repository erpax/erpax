import { describe, it, expect } from 'vitest'
import { MILLENNIUM, corpusSolvesAny, open, lensFor } from './index'

// "The Clay Millennium Problems are the testing ground for the quantum waves." The only honest toolbox NAMES
// them and refuses to solve them. Every entry's `corpusSolves` is the literal false — the type forbids claiming
// a solution. Six open, one solved (Poincaré, by Perelman — not the corpus). The tools classify, never produce.
describe('millennium — the Clay problems, taught as lenses; the corpus solves none', () => {
  it('names all seven Millennium Problems', () => {
    const names = MILLENNIUM.map((p) => p.name)
    for (const n of ['P vs NP', 'Riemann Hypothesis', 'Navier–Stokes existence & smoothness', 'Yang–Mills existence & mass gap', 'Hodge Conjecture', 'Birch–Swinnerton-Dyer', 'Poincaré Conjecture']) {
      expect(names).toContain(n)
    }
    expect(MILLENNIUM).toHaveLength(7)
  })

  it('the corpus solves NONE of them — honest by construction (corpusSolves is literal false)', () => {
    expect(corpusSolvesAny()).toBe(false)
    for (const p of MILLENNIUM) expect(p.corpusSolves).toBe(false)
  })

  it('six are OPEN; only Poincaré is solved — by Perelman, not the corpus', () => {
    expect(open()).toHaveLength(6)
    const poincare = lensFor('Poincaré Conjecture')!
    expect(poincare.open).toBe(false)
    expect(poincare.solvedBy).toMatch(/Perelman/)
    expect(poincare.corpusSolves).toBe(false) // solved by Perelman, still not by the corpus
  })

  it('P vs NP has the strongest genuine lens — the fold’s verify-easy / derive-hard asymmetry', () => {
    const p = lensFor('P vs NP')!
    expect(p.lens).toMatch(/verify-easy|derive-hard|content-address/)
    expect(p.why).toMatch(/not a proof|ONE instance|no separation/) // a resonance, not a separation of P and NP
  })

  it('problems with no honest lens say so — none invented (Yang–Mills, Hodge, BSD)', () => {
    for (const n of ['Yang–Mills existence & mass gap', 'Hodge Conjecture', 'Birch–Swinnerton-Dyer']) {
      expect(lensFor(n)!.lens).toMatch(/none/)
    }
  })

  it('Riemann is refused, not fabricated — a lens (π–primes via ζ), never a proof of the zeros', () => {
    const r = lensFor('Riemann Hypothesis')!
    expect(r.open).toBe(true)
    expect(r.why).toMatch(/does not prove|refuse/) // the corpus touches ζ, does not prove the critical line
  })
})
