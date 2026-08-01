import { randomBytes } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { classify, manifest, verdictHolds, type MeasureRun } from '@/convention/discern'

import { admit, attest, memoryRegistry, MIN_SEED_BYTES } from '../source'

import {
  assertIndependentSources,
  assertNoEntropyOverClaim,
  BITS_PER_DRAW,
  CLAIMS,
  composeAll,
  composedStrengthBits,
  ENTROPY_ADDED_BY_FOLD,
  shareFrom,
  SURFACES,
  ThresholdRefused,
} from './index'

const HW_KEY = Buffer.alloc(32, 0xa1)

/** One admitted draw per share — the whole point. Never one seed folded n ways. */
function independentShare(index: number, reg = memoryRegistry()): ReturnType<typeof shareFrom> {
  const seed = randomBytes(MIN_SEED_BYTES)
  const adm = admit(seed, `device-${index}`, attest(seed, HW_KEY), HW_KEY, reg)
  return shareFrom(adm, seed, index)
}

describe('entropy/threshold — n keys are strong only when they are n independent draws', () => {
  it('THE INVARIANT: two shares from one admitted seed are refused', () => {
    const reg = memoryRegistry()
    const seed = randomBytes(MIN_SEED_BYTES)
    const adm = admit(seed, 'device-1', attest(seed, HW_KEY), HW_KEY, reg)
    // the tempting mistake: one draw, two key schedules, called "two shares"
    const a = shareFrom(adm, seed, 1)
    const b = shareFrom(adm, seed, 2)
    expect(a.material.equals(b.material)).toBe(false) // they LOOK independent
    expect(() => assertIndependentSources([a, b])).toThrow(ThresholdRefused)
    expect(() => assertIndependentSources([a, b])).toThrow(/one secret wearing two masks/)
  })

  it('independent draws pass, and compose ADDITIVELY', () => {
    const reg = memoryRegistry()
    const shares = [1, 2, 3].map((i) => independentShare(i, reg))
    expect(() => assertIndependentSources(shares)).not.toThrow()
    expect(composedStrengthBits(shares)).toBe(3 * BITS_PER_DRAW)
  })

  it('THE ARITHMETIC THAT IS THE SECURITY ARGUMENT: folded n carries ONE draw', () => {
    const reg = memoryRegistry()
    const seed = randomBytes(MIN_SEED_BYTES)
    const adm = admit(seed, 'device-1', attest(seed, HW_KEY), HW_KEY, reg)
    const folded = [1, 2, 3, 4, 5].map((i) => shareFrom(adm, seed, i))
    // five shares, one seed — breaking the seed breaks all five
    expect(composedStrengthBits(folded)).toBe(BITS_PER_DRAW)
    expect(composedStrengthBits(folded)).toBeLessThan(composedStrengthBits([1, 2, 3, 4, 5].map((i) => independentShare(i, reg))))
  })

  it('composition requires EVERY share — n−1 do not reproduce it', () => {
    const reg = memoryRegistry()
    const shares = [1, 2, 3].map((i) => independentShare(i, reg))
    const all = composeAll(shares)
    const missingOne = composeAll(shares.slice(0, 2))
    expect(all.equals(missingOne)).toBe(false)
    expect(all.length).toBe(32)
  })

  it('composeAll refuses a shared source — the invariant is not optional at the call site', () => {
    const reg = memoryRegistry()
    const seed = randomBytes(MIN_SEED_BYTES)
    const adm = admit(seed, 'device-1', attest(seed, HW_KEY), HW_KEY, reg)
    expect(() => composeAll([shareFrom(adm, seed, 1), shareFrom(adm, seed, 2)])).toThrow(/shared-source/)
  })

  it('a single share is not a composition', () => {
    expect(() => composeAll([independentShare(1)])).toThrow(/too-few-shares/)
  })

  it('a share whose seed does not match its admission is refused', () => {
    const reg = memoryRegistry()
    const seed = randomBytes(MIN_SEED_BYTES)
    const adm = admit(seed, 'device-1', attest(seed, HW_KEY), HW_KEY, reg)
    expect(() => shareFrom(adm, randomBytes(MIN_SEED_BYTES), 1)).toThrow(/does not match the admission/)
  })

  it('FOLD AND ENTANGLEMENT ADD ZERO — a claim otherwise is refused, not argued with', () => {
    expect(ENTROPY_ADDED_BY_FOLD).toBe(0)
    expect(() => assertNoEntropyOverClaim('horo fold', 0)).not.toThrow()
    expect(() => assertNoEntropyOverClaim('entanglement graph', 0)).not.toThrow()
    // a reversible encoding that created entropy would create more each time it ran
    expect(() => assertNoEntropyOverClaim('horo fold', 128)).toThrow(/over-claim/)
    expect(() => assertNoEntropyOverClaim('entanglement graph', 1)).toThrow(/raises forge-cost/)
  })
})

describe('entropy/threshold — the claims, typed by discern', () => {
  const run: MeasureRun = (m) =>
    m === 'src/entropy/threshold/test.ts'
      ? {
          exercised: 'refused two shares from one seed; composed three independent draws additively',
          wouldFailIf: 'assertIndependentSources accepted shares sharing a source address',
          passed: true,
        }
      : undefined

  it('independence, composition and the zero-entropy fold are VERDICTS; m-of-n is a COMPASS', () => {
    const m = manifest('entropy/threshold', CLAIMS, SURFACES)
    expect(m.verdicts.map((v) => v.property)).toEqual([
      'threshold.independence',
      'threshold.composition',
      'threshold.foldAddsNoEntropy',
    ])
    // Shamir over a prime field is where implementations go wrong. Rolling it here is what the
    // spec forbids, so the gap is DECLARED and shows in the integrity metric rather than hidden.
    expect(classify(CLAIMS[3]!)).toBe('compass')
    for (const v of m.verdicts) expect(verdictHolds(v, run).holds).toBe(true)
  })

  it('an undeclared surface throws — no silent omission', () => {
    expect(() => manifest('entropy/threshold', CLAIMS, [...SURFACES, 'threshold.rotation'])).toThrow(/Silence is not a claim of safety/)
  })
})

describe('entropy/threshold — judged by the constitution', () => {
  const change: Change = {
    atom: 'entropy/threshold',
    dualities: [
      { builds: 'assertIndependentSources', breaks: 'two shares from one seed throw' },
      { builds: 'composeAll', breaks: 'a single share, and a shared source, both throw' },
      { builds: 'assertNoEntropyOverClaim', breaks: 'any non-zero entropy claim on a fold throws' },
    ],
    anchors: ['NIST SP 800-57 Part 1 r5 §5.6.1', 'NIST SP 800-90B'],
    claims: [
      {
        text: 'this gives n-key strength',
        boundary:
          'it gives n × 256 bits ONLY for n independent admitted draws, and says so in arithmetic ' +
          'rather than in prose. m-of-n reconstruction is NOT implemented — it is a compass until a ' +
          'vetted Shamir library is pinned, because rolling prime-field secret sharing is where ' +
          'implementations go wrong. What ships is n-of-n XOR, where the math is one operation',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'independent⊕folded', ring: [1, 1] },
    ],
    served: [{ result: 'the composed strength in bits', recompute: 'src/entropy/threshold/index.ts' }],
    postings: [
      { debit: 'draw/admitted', credit: 'share/independent', amount: 3 },
      { debit: 'share/independent', credit: 'draw/admitted', amount: 3 },
    ],
    edges: [
      { from: 'threshold', to: 'source' },
      { from: 'source', to: 'threshold' },
    ],
    quantities: [
      { name: 'bits per independent draw', value: 256, derivation: 'src/entropy/threshold/index.ts' },
      { name: 'entropy added by folding', value: 0, derivation: 'src/entropy/threshold/index.ts' },
    ],
    keepers: [],
    seed: ['src/entropy/threshold/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
