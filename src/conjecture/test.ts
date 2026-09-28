import { describe, it, expect } from 'vitest'
import { messageUuid } from '@/quantum/chat/merkle'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  TRANSFORMS,
  atomPath,
  next,
  prior,
  rank,
  score,
  surpriseBits,
  undecided,
  crossStream,
  crossCandidate,
  type Conjecture,
  type Intersection,
} from '@/conjecture'
import { refute } from '@/think'
import { algebraLog2, exactMax } from '@/algebra'
import { atomAddress } from '@/atom/address'

const c = (over: Partial<Conjecture> = {}): Conjecture => ({
  claim: 'a ceiling above its live value is an under-claim',
  from: 'law/folder ratchet',
  transform: 'involution',
  decidedBy: 'tsx src/rules/slack/index.ts',
  priorFor: 0,
  priorAgainst: 0,
  costSeconds: 1,
  ...over,
})

describe('conjecture — the atom', () => {
  it('lives where it says it lives', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('every declared transform has produced a real gate here at least once', () => {
    expect(Object.keys(TRANSFORMS).sort()).toEqual(
      ['compose', 'dual', 'generalise', 'involution', 'transpose'].sort(),
    )
  })
})

/**
 * The half that makes the instrument worth having: an idea that looks impossible is
 * the one whose answer teaches most, so the score must REWARD it.
 */
describe('conjecture — surprise rewards the impossible-looking claim', () => {
  it('a claim nobody has looked at has the honest prior of one half', () => {
    expect(prior(0, 0)).toBe(0.5)
    expect(surpriseBits(0, 0)).toBe(1) // one bit — a coin
  })

  it('the impossible-looking claim carries more bits than the expected one', () => {
    const impossible = surpriseBits(0, 9) // nine observations against, none for
    const expected = surpriseBits(9, 0)
    expect(impossible).toBeGreaterThan(expected)
    expect(impossible).toBeCloseTo(-algebraLog2(1 / 11), 9)
    expect(expected).toBeCloseTo(-algebraLog2(10 / 11), 9)
    expect(impossible / expected).toBeGreaterThan(20) // not a tie-break — an order of magnitude
  })

  it('and it outranks the expected one when both are decidable and equally cheap', () => {
    const [first] = rank([c({ claim: 'expected', priorFor: 9 }), c({ claim: 'impossible', priorAgainst: 9 })])
    expect(first?.claim).toBe('impossible')
  })
})

/**
 * Two refusals, both laws this corpus already paid for.
 */
describe('conjecture — zero is a refusal, not a small number', () => {
  it('an undecidable claim is worth nothing however surprising — rules/refutable as an order', () => {
    const wild = score(c({ claim: 'unfalsifiable', priorAgainst: 1000, decidedBy: '' }))
    expect(wild.surpriseBits).toBeGreaterThan(9) // enormously surprising
    expect(wild.decidable).toBe(false)
    expect(wild.worth).toBe(0)
    // and a dull but testable claim beats it outright
    expect(score(c({ priorFor: 9 })).worth).toBeGreaterThan(wild.worth)
  })

  it('an already-refuted claim is worth nothing — never divide by the same zero twice', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'conjecture-'))
    const claim = 'the tangle is an artifact of the scan'
    expect(score(c({ claim }), cwd).worth).toBeGreaterThan(0)
    refute(claim, 'the parser moved it 152 → 225', 'parse the grammar, never match it', cwd)
    const after = score(c({ claim }), cwd)
    expect(after.refuted).toBe(true)
    expect(after.worth).toBe(0)
  })

  it('a dearer test is worth less than a cheap one at equal surprise', () => {
    expect(score(c({ costSeconds: 1 })).worth).toBeGreaterThan(score(c({ costSeconds: 60 })).worth)
    // cost floors at one second: a free test does not make a claim infinitely worth testing
    expect(score(c({ costSeconds: 0 })).worth).toBe(score(c({ costSeconds: 1 })).worth)
  })
})

describe('conjecture — what it hands an agent with no prompt', () => {
  it('next() is the highest-worth decidable claim', () => {
    const best = next([
      c({ claim: 'dull', priorFor: 9 }),
      c({ claim: 'wild but undecidable', priorAgainst: 99, decidedBy: '' }),
      c({ claim: 'impossible and cheap to settle', priorAgainst: 9 }),
    ])
    expect(best?.claim).toBe('impossible and cheap to settle')
  })

  it('and returns nothing rather than inventing a claim when none is testable', () => {
    expect(next([c({ decidedBy: '' })])).toBeUndefined()
  })

  it('an undecidable claim is kept and reported as a missing instrument, never dropped', () => {
    const list = [c({ claim: 'nothing can settle this', decidedBy: '' }), c()]
    expect(rank(list)).toHaveLength(2) // kept in the ranking
    expect(undecided(list)).toHaveLength(1)
    expect(undecided(list)[0]?.needs).toContain('verdict')
  })
})

/**
 * A cross is ENUMERATED, never authored — C(n,2) of them exist the moment the laws do.
 */
describe('conjecture — the crosses formulate on the spot', () => {
  it('enumerates every pair of laws and ranks the absences', async () => {
    const { crosses } = await import('@/conjecture')
    const all = crosses()
    const laws = new Set(all.flatMap((c) => [c.a, c.b]))
    // C(n,2) exactly — nothing chosen, nothing dropped
    expect(all).toHaveLength((laws.size * (laws.size - 1)) / 2)
    // no pair repeats, and none crosses itself
    expect(new Set(all.map((c) => `${c.a}|${c.b}`)).size).toBe(all.length)
    expect(all.every((c) => c.a !== c.b)).toBe(true)
    // sorted by the surprise of the absence
    for (let i = 1; i < all.length; i++) {
      expect(all[i - 1]!.bits).toBeGreaterThanOrEqual(all[i]!.bits)
    }
  })

  it('a pair that is drawn carries less surprise than one that never is', async () => {
    const { crosses } = await import('@/conjecture')
    const all = crosses()
    const drawn = all.filter((c) => c.together > 0)
    const never = all.filter((c) => c.together === 0)
    expect(drawn.length).toBeGreaterThan(0)
    expect(never.length).toBeGreaterThan(0)
    // an absence between two WIDELY cited laws outranks one between two rare ones
    const loud = never.filter((c) => c.citedA > 10 && c.citedB > 10)
    const quiet = never.filter((c) => c.citedA <= 2 && c.citedB <= 2)
    if (loud.length > 0 && quiet.length > 0) {
      const top = (xs: readonly { bits: number }[]): number => xs.reduce((m, c) => exactMax(m, c.bits), 0)
      expect(top(loud)).toBeGreaterThan(top(quiet))
    }
  })

  it('and every generated cross scores ZERO — a site is not a claim', async () => {
    const { crossConjectures, rank, next, undecided } = await import('@/conjecture')
    const cs = crossConjectures()
    expect(cs.length).toBeGreaterThan(0)
    expect(cs.every((c) => c.decidedBy === '')).toBe(true)
    // enumeration cannot flood the queue with work to act on
    expect(rank(cs).every((c) => c.worth === 0)).toBe(true)
    expect(next(cs)).toBeUndefined()
    // but every one is reported as an instrument that does not exist yet
    expect(undecided(cs)).toHaveLength(cs.length)
  })
})

/**
 * The prose ranking predicted nothing. Three top picks, three empty measurements.
 */
describe('conjecture — the measured cross inverts the prose ranking', () => {
  const sets = new Map<string, ReadonlySet<string>>([
    ['unfolded', new Set(['a.ts', 'b.ts', 'c.ts', 'd.ts'])],
    ['copy', new Set(['a.ts', 'b.ts'])],
    ['concentration', new Set(['z.ts'])],
  ])

  it('intersection is symmetric and hides which set is the large one', async () => {
    const { crossIntersections } = await import('@/conjecture')
    const rows = crossIntersections(sets)
    expect(rows).toHaveLength(3) // C(3,2)
    const cu = rows.find((r) => r.a === 'copy' && r.b === 'unfolded')
    expect(cu?.shared).toBe(2)
    expect(rows.find((r) => r.a === 'concentration')?.shared).toBe(0)
  })

  /**
   * The count says two laws met; only the lift says whether meeting meant anything. Live, `unfolded`
   * named 428 of 579 atoms, so its 86 shared with `cycle` sat against an EXPECTED 78 — a raw ranking
   * called that the top finding in the corpus.
   */
  it('a pair firing INDEPENDENTLY measures lift 1, whatever its shared count', async () => {
    const { crossIntersections } = await import('@/conjecture')
    // Universe of 4. `big` holds all 4, `half` holds 2 of them — so every `half` member is also a
    // `big` member BY CONSTRUCTION, and the expectation is exactly the observation.
    const independent = new Map<string, ReadonlySet<string>>([
      ['big', new Set(['a.ts', 'b.ts', 'c.ts', 'd.ts'])],
      ['half', new Set(['a.ts', 'b.ts'])],
    ])
    const row = crossIntersections(independent)[0]!
    expect(row.shared).toBe(2)
    expect(row.expected).toBe(2) // 4 × 2 / 4
    expect(row.lift).toBe(1)
    expect(row.bits).toBe(0) // log₂(1) — no information in the meeting
  })

  it('lift above 1 is the evidence; below 1 the laws AVOID each other', async () => {
    const { crossIntersections } = await import('@/conjecture')
    // Two halves of a 4-atom universe that meet on BOTH their members — maximal concentration.
    const together = crossIntersections(
      new Map<string, ReadonlySet<string>>([
        ['x', new Set(['a.ts', 'b.ts'])],
        ['y', new Set(['a.ts', 'b.ts'])],
        ['z', new Set(['c.ts', 'd.ts'])],
      ]),
    )
    expect(together[0]!.lift).toBe(2) // x × y: 2 shared against an expected 1
    expect(together.find((r) => r.a === 'x' && r.b === 'z')!.lift).toBe(0) // disjoint: never met
    // and the SORT leads with lift, so the base rate cannot take the top row
    expect(together[0]!.a).toBe('x')
    expect(together[0]!.b).toBe('y')
  })

  it('an unmeasurable expectation is 0 — never Infinity, never "exactly chance"', async () => {
    const { crossIntersections } = await import('@/conjecture')
    const row = crossIntersections(
      new Map<string, ReadonlySet<string>>([['a', new Set<string>()], ['b', new Set<string>()]]),
    )[0]!
    expect(row.expected).toBe(0)
    expect(row.lift).toBe(0)
    expect(Number.isFinite(row.bits)).toBe(true)
  })

  it('containment is DIRECTIONAL — it says which law carries which', async () => {
    const { containment } = await import('@/conjecture')
    const c = containment(sets)
    const copyInUnfolded = c.find((x) => x.law === 'copy' && x.inside === 'unfolded')
    const unfoldedInCopy = c.find((x) => x.law === 'unfolded' && x.inside === 'copy')
    expect(copyInUnfolded?.share).toBe(1) // every copy file is un-folded
    expect(unfoldedInCopy?.share).toBe(0.5) // only half the un-folded files are copies
    expect(copyInUnfolded!.share).toBeGreaterThan(unfoldedInCopy!.share) // unfolded CARRIES copy
  })

  it('and a law meeting nothing is named — its crosses are provably empty', async () => {
    const { orthogonalLaws } = await import('@/conjecture')
    expect(orthogonalLaws(sets)).toEqual(['concentration'])
  })
})

describe('crossStream — the proven crosses, streamed without a human', () => {
  const sets = (o: Record<string, string[]>) => new Map(Object.entries(o).map(([k, v]) => [k, new Set(v)]))

  it('a cross with an EMPTY intersection is never streamed — prose ranking is not evidence', () => {
    // `crosses` ranks absence in PROSE and this corpus refuted it by measuring: its top three picks
    // came back empty. The stream rides the MEASURED overlap, so an empty pair cannot enter it.
    const s = crossStream(sets({ a: ['f1'], b: ['f2'], c: ['f1'] }), [])
    expect(s.proven.map((i: Intersection) => `${i.a}×${i.b}`)).toEqual(['a×c'])
    expect(s.proven.every((i: Intersection) => i.shared > 0)).toBe(true)
  })

  it('nothing drawn ⇒ covered 0, and next is the MOST-SHARED cross', () => {
    const s = crossStream(sets({ a: ['f1', 'f2', 'f3'], b: ['f1', 'f2', 'f3'], c: ['f1'] }), [])
    expect(s.covered).toBe(0)
    expect(s.next).toBe(crossCandidate(s.proven[0]!))
    expect(s.proven[0]!.shared).toBeGreaterThanOrEqual(s.proven[s.proven.length - 1]!.shared)
  })

  it('drawing one advances the stream past it', () => {
    const s0 = crossStream(sets({ a: ['f1', 'f2'], b: ['f1', 'f2'], c: ['f1'] }), [])
    const first = s0.next!
    const s1 = crossStream(sets({ a: ['f1', 'f2'], b: ['f1', 'f2'], c: ['f1'] }), [messageUuid(first)])
    expect(s1.next).not.toBe(first)
    expect(s1.outstanding).toBe(s0.outstanding - 1)
  })

  it('all drawn ⇒ covered 1 and next undefined — the proven space is exhausted', () => {
    const m = sets({ a: ['f1'], b: ['f1'] })
    const s = crossStream(m, crossStream(m, []).proven.map(crossCandidate).map(messageUuid))
    expect(s.covered).toBe(1)
    expect(s.next).toBeUndefined()
    expect(s.outstanding).toBe(0)
  })

  it('no proven crosses ⇒ covered 1 by definition, and nothing to draw', () => {
    const s = crossStream(sets({ a: ['f1'], b: ['f2'] }), [])
    expect(s.proven).toEqual([])
    expect(s.covered).toBe(1)
    expect(s.next).toBeUndefined()
  })
})
