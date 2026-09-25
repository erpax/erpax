import { describe, it, expect } from 'vitest'
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
  type Conjecture,
} from '@/conjecture'
import { refute } from '@/think'
import { algebraLog2 } from '@/algebra'
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
