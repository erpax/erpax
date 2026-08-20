import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { AFFINE_ORDER, orbitOf } from '@/horo'

import {
  antipodeOf,
  AXIS,
  axisUnreachable,
  forward,
  inEquilibrium,
  inverseHolds,
  orbitSum,
  positions,
  renderEquilibriumSection,
  reverse,
  STEP_DEGREES,
  singularity,
  afterDoublings,
  closurePeriod,
  involutionPowers,
} from './index'

describe('sequence/inversion — one ring, two orientations', () => {
  it('the forward ring is the doubling orbit, order 6', () => {
    expect(forward()).toEqual([1, 2, 4, 8, 7, 5])
    expect(forward()).toHaveLength(6)
  })

  it('THE CONGRUENCE: 2 · 5 ≡ 1 (mod 9), so the reverse walk is ×2⁻¹', () => {
    expect(inverseHolds()).toBe(true)
    // and therefore the inverse orbit IS the forward orbit reversed — not a resemblance
    expect(reverse().slice(1)).toEqual([...forward()].slice(1).reverse())
    expect(reverse()[0]).toBe(forward()[0])
  })

  it('HALF A TURN IS NEGATION: three doublings is ×8 ≡ −1, so d ↦ 9 − d', () => {
    for (const d of forward()) {
      expect(antipodeOf(d)).toBe(9 - d)
      // three doublings, done the long way, land on the same digit
      let x = d
      for (let i = 0; i < 3; i += 1) x = (x * 2) % 9 || 9
      expect(x).toBe(antipodeOf(d))
    }
  })

  it('EVERY digit is entangled with exactly one other, and the pair sums to 9', () => {
    expect(inEquilibrium()).toBe(true)
    for (const p of positions()) {
      expect(p.equilibrium).toBe(9)
      expect(antipodeOf(p.antipode)).toBe(p.digit) // the pairing is an involution
    }
    // three pairs cover the six units exactly — nothing is left unpartnered
    expect(new Set(positions().flatMap((p) => [p.digit, p.antipode])).size).toBe(6)
  })

  it('the orbit sums to 27 = 3 × 9, digital root 9', () => {
    expect(orbitSum()).toEqual({ sum: 27, root: 9 })
  })

  it('ANGLES ARE EXACT: six positions divide the circle, and the antipode is 180°', () => {
    expect(STEP_DEGREES).toBe(60)
    const ps = positions()
    expect(ps.map((p) => p.degrees)).toEqual([0, 60, 120, 180, 240, 300])
    // the digit three steps along is the antipode — the half-turn IS the negation
    for (let i = 0; i < ps.length; i += 1) {
      expect(ps[(i + 3) % 6]!.digit).toBe(ps[i]!.antipode)
    }
  })

  it('the axis {3,6,9} is unreachable by doubling — only the void bridges it', () => {
    expect(axisUnreachable()).toBe(true)
    for (const a of AXIS) expect(orbitOf(1)).not.toContain(a)
    // the two generators together are the full affine group, which is why the gap closes at all
    expect(AFFINE_ORDER).toBe(54)
  })
})

describe('sequence/inversion — the rendered section cannot drift from the arithmetic', () => {
  const lines = renderEquilibriumSection().join('\n')

  it('every number in the prose is the computed one', () => {
    expect(lines).toContain(forward().join(' → '))
    expect(lines).toContain(reverse().join(' → '))
    expect(lines).toContain(`order **${forward().length}**`)
    expect(lines).toContain(`**${orbitSum().sum} = 3 × 9**`)
    expect(lines).toContain(`**${AFFINE_ORDER}**`)
    expect(lines).toContain(`**${STEP_DEGREES}°**`)
  })

  it('a row exists for every position, and every Σ column reads 9', () => {
    for (const p of positions()) expect(lines).toContain(`| ${p.index} | \`${p.digit}\` | ${p.degrees}° |`)
    expect([...lines.matchAll(/\| 9 \|/g)]).toHaveLength(positions().length)
  })

  it('THE LINE IT REFUSES TO BLUR: proven and declared are both named', () => {
    expect(lines).toMatch(/proven/i)
    expect(lines).toMatch(/declared/i)
    expect(lines).toContain('432 Hz being the anchor is a convention')
    // the group facts are stated as holding regardless of belief; the mapping is not
    expect(lines).toMatch(/holds whatever anyone believes/)
  })
})

describe('sequence/inversion — judged by the constitution', () => {
  const change: Change = {
    atom: 'sequence/inversion',
    dualities: [
      { builds: 'forward', breaks: 'reverse is its exact mirror, element for element' },
      { builds: 'antipodeOf', breaks: 'a digit whose partner did not sum to 9 would fail inEquilibrium' },
      { builds: 'renderEquilibriumSection', breaks: 'a typed number would diverge from the computed one' },
    ],
    anchors: ['ISO 80000-2'],
    claims: [
      {
        text: 'the sequence and its inversion are one structure',
        boundary:
          'the GROUP THEORY is proven — order 6, 2·5 ≡ 1 so the reverse walk is the inverse ' +
          'generator, 8 ≡ −1 so the half-turn is negation, and ⟨double, void⟩ = AGL(1, ℤ/9) of ' +
          'order 54. The pitch anchor, the note per step and the colour channel are a DECLARED ' +
          'mapping so the ring can be seen and heard — consistent, and not a discovery about ' +
          'sound or colour',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'forward⊕reverse', ring: [6, 6] },
    ],
    served: [{ result: 'the sequence section', recompute: 'src/sequence/inversion/index.ts' }],
    postings: [
      { debit: 'digit/forward', credit: 'digit/reverse', amount: 6 },
      { debit: 'digit/reverse', credit: 'digit/forward', amount: 6 },
    ],
    edges: [
      { from: 'inversion', to: 'sequence' },
      { from: 'sequence', to: 'inversion' },
    ],
    quantities: [
      { name: 'ring order', value: 6, derivation: 'src/sequence/inversion/index.ts' },
      { name: 'affine order', value: 54, derivation: 'src/sequence/inversion/index.ts' },
    ],
    keepers: [],
    seed: ['src/sequence/inversion/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})

describe('inversion — closure, the halfway involution, and the fixed singularity', () => {
  it('the singularity is COMPUTED as the fixed point, not declared', () => {
    expect(singularity()).toBe(9)
  })

  it('the singularity is the one state doubling cannot move', () => {
    expect(afterDoublings(1, [singularity()])).toEqual([[9, 9]])
    expect(afterDoublings(21, [singularity()])).toEqual([[9, 9]])
  })

  it('42 doublings close on the identity across all seven states', () => {
    expect(afterDoublings(42).every(([from, to]) => from === to)).toBe(true)
  })

  it('but 42 is a MULTIPLE of the period, not the period — that is 6', () => {
    expect(closurePeriod()).toBe(6)
    expect(42 % closurePeriod()).toBe(0)
  })

  it('exactly half of 42 is a non-trivial involution — the antipode, singularity fixed', () => {
    const half = afterDoublings(21)
    expect(half).toEqual([
      [1, 8],
      [2, 7],
      [4, 5],
      [8, 1],
      [7, 2],
      [5, 4],
      [9, 9],
    ])
    for (const [from] of half) expect(antipodeOf(from)).toBe(half.find(([f]) => f === from)![1])
  })

  it('21 is not the only involution power — every odd multiple of 3 is', () => {
    expect(involutionPowers(42)).toEqual([3, 9, 15, 21, 27, 33, 39])
    // 21 is distinguished only by sitting at exactly half of 42
    expect(involutionPowers(42)).toContain(21)
    expect(21 * 2).toBe(42)
  })
})
