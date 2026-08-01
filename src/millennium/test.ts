import { describe, it, expect } from 'vitest'
import {
  MILLENNIUM,
  attempt,
  challenges,
  corpusSolvesAny,
  lensFor,
  open,
  openChallenges,
  problemMatrix,
  renderMillenniumSection,
  selfCells,
  resolutionClaim,
} from './index'

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

describe('millennium — all seven saved INVERTED: a claim solves by surviving, never by asserting', () => {
  it('every problem is saved beside its negation — seven challenges, seven inversions', () => {
    const cs = challenges()
    expect(cs).toHaveLength(MILLENNIUM.length)
    expect(cs).toHaveLength(7)
    for (const c of cs) {
      expect(c.pair.claim).toBe(resolutionClaim(c.problem))
      expect(c.pair.antiClaim).toBe(`¬(${c.pair.claim})`)
      // the inversion never touches the register's own honesty
      expect(c.problem.corpusSolves as boolean).toBe(false)
    }
  })

  it('six stand OPEN — neither proved nor refuted, which is the state the duel exists to close', () => {
    expect(openChallenges()).toHaveLength(6)
    for (const c of openChallenges()) {
      expect(c.verdict.holder).toBe('open')
      expect(c.verdict.stands).toBe(false)
      expect(c.problem.solvedBy).toBe('')
    }
  })

  it('exactly one stands — Poincaré, and its prover is Perelman, not this corpus', () => {
    const standing = challenges().filter((c) => c.verdict.stands)
    expect(standing).toHaveLength(1)
    expect(standing[0]!.problem.name).toBe('Poincaré Conjecture')
    expect(standing[0]!.problem.solvedBy).toMatch(/Perelman/)
    expect(standing[0]!.verdict.holder).toBe('prover')
    expect(standing[0]!.problem.corpusSolves as boolean).toBe(false) // still not ours
    expect(corpusSolvesAny()).toBe(false)
  })

  it('three are LENSLESS — the duel cannot even start where nothing points at the problem', () => {
    const lensless = challenges().filter((c) => c.lensless)
    expect(lensless.map((c) => c.problem.name).sort()).toEqual([
      'Birch–Swinnerton-Dyer',
      'Hodge Conjecture',
      'Yang–Mills existence & mass gap',
    ])
  })

  it('the door refuses an assertion — no rounds is not an attempt', () => {
    const a = attempt('P vs NP', [])
    expect(a.survived).toBe(false)
    expect(a.reason).toContain('an assertion is not an attempt')
  })

  it('a single refutation falls the attempt, whatever else was proved (Popper asymmetry)', () => {
    const a = attempt('P vs NP', [{ proved: true, refuted: false }, { proved: true, refuted: true }])
    expect(a.survived).toBe(false)
    expect(a.verdict.holder).toBe('refuter')
  })

  it('an attempt SURVIVES only by proving and never being refuted — corroborated, never proven true', () => {
    const a = attempt('P vs NP', [{ proved: true, refuted: false }, { proved: true, refuted: false }])
    expect(a.survived).toBe(true)
    expect(a.reason).toContain('never proven true')
    // and surviving a duel still does not make it the corpus's solution
    expect(corpusSolvesAny()).toBe(false)
  })

  it('an unknown problem is REFUSED, never silently treated as unsolved', () => {
    const a = attempt('Collatz', [{ proved: true, refuted: false }])
    expect(a.survived).toBe(false)
    expect(a.reason).toContain('no such Millennium Problem')
  })
})

describe('millennium — the diagonal: each problem interacting with itself', () => {
  it('the matrix is n(n+1)/2 cells — the pairs PLUS the diagonal that challenges() left empty', () => {
    const m = problemMatrix()
    const n = MILLENNIUM.length
    expect(m.pairs).toBe((n * (n - 1)) / 2) // 21
    expect(m.diagonal).toBe(n) // 7 — one per problem
    expect(m.cells).toHaveLength((n * (n + 1)) / 2) // 28
    expect(m.pairs + m.diagonal).toBe(m.cells.length)
  })

  it('exactly one self-cell per problem, and a self-cell is never a pair', () => {
    const self = selfCells()
    expect(self).toHaveLength(MILLENNIUM.length)
    expect(self.map((c) => c.row)).toEqual(MILLENNIUM.map((p) => p.name))
    for (const c of self) expect(c.row).toBe(c.column)
    for (const c of problemMatrix().cells.filter((c) => !c.self)) expect(c.row).not.toBe(c.column)
  })

  it('naming the diagonal solves nothing — corpusSolves is still the literal false', () => {
    expect(corpusSolvesAny()).toBe(false)
    expect(problemMatrix().cells.length).toBeGreaterThan(challenges().length) // 28 > 7
    for (const p of MILLENNIUM) expect(p.corpusSolves as boolean).toBe(false)
  })
})

describe('millennium — the statement and the named gap', () => {
  it('every problem states its conjecture ALGEBRAICALLY, separate from any lens', () => {
    for (const p of MILLENNIUM) {
      expect(p.statement.length).toBeGreaterThan(40)
      expect(p.statement).not.toBe(p.lens) // the mathematics is not the analogy
      expect(p.statement).not.toBe(p.why)
    }
    // the statements carry their actual algebra, not a gloss
    expect(lensFor('Riemann Hypothesis')!.statement).toMatch(/Re\(s\) = ½/)
    expect(lensFor('Birch–Swinnerton-Dyer')!.statement).toMatch(/rank E\(ℚ\)/)
    expect(lensFor('Poincaré Conjecture')!.statement).toMatch(/M ≅ S³/)
  })

  it('every OPEN problem names its gap; only the externally-proved one has none', () => {
    for (const p of MILLENNIUM) {
      if (p.open) {
        expect(p.gap.length).toBeGreaterThan(20) // a named gap, argue-able
        expect(p.gap).not.toBe('') // never a mystery
      } else {
        expect(p.gap).toBe('') // Poincaré: nothing missing, it is proved — externally
        expect(p.solvedBy).toMatch(/Perelman/)
      }
    }
    expect(MILLENNIUM.filter((p) => p.gap === '')).toHaveLength(1)
  })

  it('the rendered section publishes the refusal — corpusSolvesAny appears IN the table', () => {
    const md = renderMillenniumSection().join('\n')
    expect(md).toContain('corpusSolvesAny()')
    expect(md).toContain('**false**')
    expect(md).not.toMatch(/\bsolved by this (fold|corpus)\b/i)
    for (const p of MILLENNIUM) expect(md).toContain(p.statement)
    // and it gives a recompute path — Law 5
    expect(md).toMatch(/tsx src\/millennium|pnpm vitest/)
  })
})
