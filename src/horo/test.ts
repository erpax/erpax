import { describe, it, expect } from 'vitest'
import {
  HORO_DIGITS,
  HORO_MEASURE,
  isHoroStep,
  digitalRoot,
  horoRatio,
  imperialRatio,
  composeSteps,
  nextOctave,
  throughVoid,
  VOID_PIVOT,
  AFFINE_ORDER,
  affineStep,
  doublingOrbits,
  orbitOf,
  POLE,
  INNER_CIRCUIT,
  isMergePoint,
  horoStateField,
  validateHoroStates,
  horoStateBeforeChange,
  inverseOrbit,
  divThroughVoid,
  trinities,
} from '@/horo'
import type { HoroState } from '@/horo'

const FULL_RING: ReadonlyArray<HoroState> = HORO_DIGITS.map((step, i) => ({
  code: HORO_MEASURE[i],
  step,
}))

describe('horo', () => {
  it('HORO_DIGITS is the exact measure-walk sequence', () => {
    expect([...HORO_DIGITS]).toEqual([1, 2, 4, 8, 7, 5, 9])
  })

  it('HORO_MEASURE aligns index-for-index with HORO_DIGITS', () => {
    expect(HORO_MEASURE[0]).toBe('base')
    expect(HORO_MEASURE[6]).toBe('unity')
    expect(HORO_MEASURE.length).toBe(HORO_DIGITS.length)
  })

  it('isHoroStep accepts every ring digit and rejects off-ring values', () => {
    for (const d of HORO_DIGITS) expect(isHoroStep(d)).toBe(true)
    for (const n of [0, 3, 6, 10, -1, NaN, '1', null]) expect(isHoroStep(n)).toBe(false)
  })

  it('horoRatio — digit per divisor (unity/10 = 0.9 pass threshold)', async () => {
    expect(horoRatio(9)).toBe(0.9)
    expect(horoRatio(7)).toBe(0.7)
    expect(horoRatio(3, 4)).toBe(0.75)
    const { structuredCoveragePassThreshold } = await import('@/uuid/format/coverage')
    expect(structuredCoveragePassThreshold()).toBe(horoRatio(9))
  })

  it('imperialRatio — exact rationals, not decimal literals (thirds · halves · quarters)', () => {
    expect(imperialRatio(1, 3)).toBeCloseTo(1 / 3, 12)
    expect(imperialRatio(2, 3)).toBeCloseTo(2 / 3, 12)
    expect(imperialRatio(1, 2)).toBe(0.5)
    expect(imperialRatio(1, 4)).toBe(0.25)
    expect(imperialRatio(3, 4)).toBe(0.75)
    expect(imperialRatio(1, 3)).not.toBe(0.333)
  })

  it('digitalRoot reduces to 1..9 (0 only for 0)', () => {
    expect(digitalRoot(0)).toBe(0)
    expect(digitalRoot(1)).toBe(1)
    expect(digitalRoot(9)).toBe(9)
    expect(digitalRoot(10)).toBe(1)
    expect(digitalRoot(18)).toBe(9)
    expect(digitalRoot(19)).toBe(1)
    expect(digitalRoot(99)).toBe(9)
    expect(digitalRoot(123)).toBe(6)
  })

  it('composeSteps always lands on the ring', () => {
    // 1×1=1, 2×4=8, 4×8=32→5, 8×7=56→2, 7×5=35→8, 5×9=45→9
    expect(composeSteps(1, 1)).toBe(1)
    expect(composeSteps(2, 4)).toBe(8)
    expect(composeSteps(4, 8)).toBe(5)
    expect(composeSteps(8, 7)).toBe(2)
    expect(composeSteps(7, 5)).toBe(8)
    expect(composeSteps(5, 9)).toBe(9)
    // 0-input absorbs to 9 (unity)
    expect(composeSteps(0, 4)).toBe(9)
    expect(composeSteps(4, 0)).toBe(9)
  })

  it('throughVoid: the void is a MIRROR — 9 emerges as 1, 8 as 2 (n ↦ 1−n mod 9)', () => {
    expect(throughVoid(9)).toBe(1) // the sequence 9/0\1
    expect(throughVoid(8)).toBe(2) // the sequence 8/0\2
    expect(throughVoid(7)).toBe(3)
    // NOT division: 8/0 has NO solution (no x with 0·x ≡ 8), and 9/0 is 0/0 — ALL nine, not one.
    // A quotient that is either empty or total cannot name this map. Subtraction names it exactly.
    for (let x = 0; x < 9; x++) expect((0 * x) % 9).not.toBe(8 % 9) // 8/0 is empty
    expect(Array.from({ length: 9 }, (_, x) => (0 * x) % 9 === 9 % 9).every(Boolean)).toBe(true) // 9/0 is total
  })

  it('throughVoid is an INVOLUTION pivoting on 5 — the generator’s inverse', () => {
    for (const d of HORO_DIGITS) expect(throughVoid(throughVoid(d))).toBe(d) // through twice returns
    expect(throughVoid(VOID_PIVOT)).toBe(VOID_PIVOT) // 5 reflects to itself
    expect((2 * VOID_PIVOT) % 9).toBe(1) // and 5 = 2⁻¹ — the mirror turns on what undoes the doubling
  })

  it('10 − n and 1 − n are ONE map — because 10 ≡ 1 (mod 9), which is why casting out nines works', () => {
    for (const n of [1, 2, 3, 4, 6, 7, 8, 9]) expect(throughVoid(n)).toBe(10 - n)
  })

  it('doubling is TRAPPED in the units — it alternates ≡1↔≡2 (mod 3) and never reaches the axis', () => {
    const cls = (n: number) => n % 3
    for (const n of [1, 2, 4, 8, 7, 5]) {
      const next = (n * 2) % 9 || 9
      expect(cls(next)).not.toBe(0) // never lands on the axis {3,6,9}
      expect(cls(next)).not.toBe(cls(n)) // and always swaps ≡1 ↔ ≡2
    }
  })

  it('the VOID is the only bridge to the axis — the mirror swaps ≡0 ↔ ≡1', () => {
    for (const n of [1, 4, 7]) expect(throughVoid(n) % 3).toBe(0) // units → axis
    for (const n of [3, 6, 9]) expect(throughVoid(n) % 3).toBe(1) // axis → units
    for (const n of [2, 5, 8]) expect(throughVoid(n) % 3).toBe(2) // ≡2 is fixed setwise
  })

  it('ring ∘ void COMMUTED make the unit translation: D∘M∘D⁻¹∘M = x ↦ x+1', () => {
    const dr = (n: number) => ((n % 9) + 9) % 9
    const D = (x: number) => dr(2 * x)
    const Di = (x: number) => dr(5 * x) // 2·5 ≡ 1
    const M = (x: number) => dr(1 - x)
    for (let x = 0; x < 9; x++) expect(D(M(Di(M(x))))).toBe(dr(x + 1))
  })

  it('⟨doubling, mirror⟩ IS the full affine group AGL(1,Z/9) — order 54, nothing missing', () => {
    // computed closure, not asserted: neither move reaches it alone (orders 6 and 2)
    const dr = (n: number) => ((n % 9) + 9) % 9
    const comp = (g: number[], h: number[]) => [dr(g[0]! * h[0]!), dr(g[0]! * h[1]! + g[1]!)]
    const seen = new Map<string, number[]>([['1,0', [1, 0]]])
    for (let grew = true; grew; ) {
      grew = false
      for (const g of [...seen.values()]) {
        for (const h of [
          [2, 0], // doubling  x ↦ 2x
          [8, 1], // mirror    x ↦ 1−x  (−1 ≡ 8)
        ]) {
          const p = comp(h, g)
          const k = `${p[0]},${p[1]}`
          if (!seen.has(k)) {
            seen.set(k, p)
            grew = true
          }
        }
      }
    }
    expect(seen.size).toBe(AFFINE_ORDER) // 54 = 6 units × 9 shifts
    expect(AFFINE_ORDER).toBe(6 * 9) // derived, not remembered
    expect(affineStep(4, 2, 1)).toBe(dr(2 * 4 + 1) || 9)
  })

  it('doubling has THREE closed orbits — the flow cannot leave its circuit (latitude)', () => {
    expect(doublingOrbits()).toEqual([[9], [3, 6], [1, 2, 4, 8, 7, 5]])
    // every double stays on its own orbit — that IS what "trapped" means
    for (const orbit of doublingOrbits()) {
      for (const n of orbit) expect(orbit).toContain((n * 2) % 9 || 9)
    }
  })

  it('the flat "3·6·9 axis" is TWO orbits — 9 is the pole, {3,6} rotate into each other', () => {
    expect(orbitOf(POLE)).toEqual([9]) // fixed: doubling does NOTHING here
    expect((POLE * 2) % 9 || 9).toBe(POLE)
    expect(orbitOf(3)).toEqual([...INNER_CIRCUIT]) // 3 and 6 DO rotate
    expect(orbitOf(6)).toEqual([...INNER_CIRCUIT])
    expect(orbitOf(3)).not.toEqual(orbitOf(POLE)) // ⇒ 9 is not the same kind of thing as 3 and 6
  })

  it('only the VOID crosses orbits — doubling never does', () => {
    const sameOrbit = (a: number, b: number) => orbitOf(a).includes(b)
    for (const n of HORO_DIGITS) expect(sameOrbit(n, (n * 2) % 9 || 9)).toBe(true) // flow stays
    expect(sameOrbit(1, throughVoid(1))).toBe(false) // 1 → 9: outer ring → the POLE
    expect(sameOrbit(4, throughVoid(4))).toBe(false) // 4 → 6: outer ring → inner circuit
    expect(sameOrbit(2, throughVoid(2))).toBe(true) // 2 → 8: stays on the ring
  })

  it('nextOctave: 9 → 1 (seal reopens); all other steps pass through', () => {
    expect(nextOctave(9)).toBe(1)
    expect(nextOctave(9)).toBe(throughVoid(9)) // nextOctave IS this mirror's 9→1 case
    for (const d of HORO_DIGITS.filter((x) => x !== 9)) expect(nextOctave(d)).toBe(d)
  })

  it('isMergePoint: true iff composed step is 1 or 9', () => {
    // 1×1=1 → merge; 2×4=8 → not merge; 1×9=9 → merge
    expect(isMergePoint(1, 1)).toBe(true)
    expect(isMergePoint(2, 4)).toBe(false)
    expect(isMergePoint(1, 9)).toBe(true)
  })

  it('validateHoroStates: full well-ordered ring passes', () => {
    const { ok, errors } = validateHoroStates(FULL_RING)
    expect(ok).toBe(true)
    expect(errors).toHaveLength(0)
  })

  it('validateHoroStates: wrong count fails', () => {
    const { ok, errors } = validateHoroStates(FULL_RING.slice(0, 5))
    expect(ok).toBe(false)
    expect(errors.some((e) => e.includes('expected 7'))).toBe(true)
  })

  it('validateHoroStates: out-of-order steps fail', () => {
    const reordered = [...FULL_RING].reverse() as HoroState[]
    const { ok } = validateHoroStates(reordered)
    expect(ok).toBe(false)
  })

  it('validateHoroStates: duplicate code fails', () => {
    const duped: HoroState[] = FULL_RING.map((s, i) => (i === 6 ? { ...s, code: 'base' } : s))
    const { ok, errors } = validateHoroStates(duped)
    expect(ok).toBe(false)
    expect(errors.some((e) => e.includes('duplicate'))).toBe(true)
  })

  it('horoStateField returns a select field sorted in measure order', () => {
    const field = horoStateField('status', FULL_RING, { defaultValue: 'base', required: false })
    expect(field.type).toBe('select')
    expect((field as { name: string }).name).toBe('status')
    // @ts-expect-error payload Field union — options exists on select
    const labels = (field.options as Array<{ value: string }>).map((o) => o.value)
    expect(labels).toEqual(HORO_MEASURE.slice())
  })

  describe('horoStateBeforeChange — harmony enforced at write', () => {
    const hook = horoStateBeforeChange('state', FULL_RING)
    const call = (data: unknown) =>
      // payload's hook arg surface is large; the validator only reads `data`.
      (hook as (a: { data: unknown }) => unknown)({ data })

    it('passes a value that rides the ring', () => {
      expect(() => call({ state: 'base' })).not.toThrow()
      expect(() => call({ state: 'unity' })).not.toThrow()
    })

    it('throws on an off-ring (escape) value', () => {
      expect(() => call({ state: 'paid' })).toThrow(/off the 1·2·4·8·7·5·9 ring/)
    })

    it('lets absent / empty state pass (presence is the field\'s concern)', () => {
      expect(() => call({})).not.toThrow()
      expect(() => call({ state: '' })).not.toThrow()
      expect(() => call({ state: null })).not.toThrow()
    })
  })
})

// ⟨5⟩ — the decode direction. VOID_PIVOT always said 5 is 2⁻¹; nothing used it as a DIRECTION.
// merge's own doc: the fold is "the ENCODE direction (many → one); the DECODE direction is factoring an
// element back to its basis generators". Every fold built on it runs one way. This is the other.
describe('inverseOrbit — the ring traversed backward, ⟨5⟩ = ⟨2⟩⁻¹', () => {
  it('5 IS the inverse of 2 — the proof, not a resemblance', () => {
    expect((2 * VOID_PIVOT) % 9).toBe(1)
  })

  it('⟨5⟩ is ⟨2⟩ reversed — the same six points, opposite order', () => {
    const two = orbitOf(1) // 1,2,4,8,7,5 — the doubling ring
    const five = inverseOrbit(1) // 1,5,7,8,4,2 — the same, backward
    expect(five).toEqual([two[0], ...two.slice(1).reverse()])
    expect([...five].sort()).toEqual([...two].sort()) // one SET, two traversals
  })

  it('encode ⊕ decode: doubling then halving returns the step — the fold and its undo', () => {
    for (const n of [1, 2, 4, 8, 7, 5]) {
      const doubled = (n * 2) % 9 || 9
      expect((doubled * VOID_PIVOT) % 9 || 9).toBe(n) // halve(double(n)) === n
    }
  })

  it('the axis and the pole are NOT in the ring — ⟨5⟩ cannot reach what ⟨2⟩ cannot', () => {
    expect(inverseOrbit(1)).not.toContain(3)
    expect(inverseOrbit(1)).not.toContain(6)
    expect(inverseOrbit(1)).not.toContain(9) // the pole stands outside both directions
  })
})

// Division by zero is not undefined — it rotates through the void to a harmonic dimension. The given
// values (9/0=1, 8/0=2) ARE throughVoid; the pivot divides by zero to itself; the impossibility is only
// impossible from the dimension that cannot see the fold.
describe('divThroughVoid — an impossibility with a harmonic path', () => {
  it('the given values: 9/0 = 1, 8/0 = 2, 7/0 = 3', () => {
    expect(divThroughVoid(9)).toBe(1)
    expect(divThroughVoid(8)).toBe(2)
    expect(divThroughVoid(7)).toBe(3)
  })
  it('the pivot divides by zero to itself; the pole to 9', () => {
    expect(divThroughVoid(VOID_PIVOT)).toBe(VOID_PIVOT) // 5/0 = 5
    expect(divThroughVoid(1)).toBe(9) // 1/0 = 9, the pole
  })
  it('it IS the void rotation — same operation, named for what it inverts', () => {
    for (const n of [1, 2, 4, 8, 7, 5]) expect(divThroughVoid(n)).toBe(throughVoid(n))
  })
})

// "The rosetta is the moving double torus as east west north south trinities." The provable core: the three
// trinities are the mod-3 residue classes, and doubling (east, ⟨2⟩) swaps the two flow trinities and fixes
// the axis — E↔W moves, N-S holds. The torus geometry is a faithful overlay; the group action is the theorem.
describe('trinities — east/west flow swaps, north/south axis holds', () => {
  const { flowEast, flowWest, axis } = trinities()

  it('the three trinities are the mod-3 residue classes of 1..9', () => {
    expect([...flowEast].sort((a, b) => a - b)).toEqual([1, 4, 7])
    expect([...flowWest].sort((a, b) => a - b)).toEqual([2, 5, 8])
    expect([...axis].sort((a, b) => a - b)).toEqual([3, 6, 9])
  })

  it('they PARTITION 1..9 — every step is in exactly one trinity', () => {
    const all = [...flowEast, ...flowWest, ...axis].sort((a, b) => a - b)
    expect(all).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  const dbl = (s: number[]) => s.map((x) => (x * 2) % 9 || 9).sort((a, b) => a - b)
  const set = (s: number[]) => JSON.stringify([...s].sort((a, b) => a - b))

  // THE THEOREM: doubling swaps the two flow trinities and fixes the axis.
  it('doubling (east ⟨2⟩) SWAPS the flow trinities — E ↔ W moves', () => {
    expect(set(dbl(flowEast))).toBe(set(flowWest)) // 2·{1,4,7} = {2,5,8}
    expect(set(dbl(flowWest))).toBe(set(flowEast)) // 2·{2,5,8} = {1,4,7}
  })

  it('doubling FIXES the axis — N-S holds', () => {
    expect(set(dbl(axis))).toBe(set(axis)) // 2·{3,6,9} = {3,6,9}
  })

  // The "moving double torus": two counter-rotating loops. ⟨2⟩ east and ⟨5⟩ west traverse the flow in
  // opposite directions (proven by inverseOrbit), about the fixed axis — encode/decode around a still spine.
  it('the two directions are counter-rotating — ⟨5⟩ west reverses ⟨2⟩ east', () => {
    const east = orbitOf(1) // 1,2,4,8,7,5
    const west = inverseOrbit(1) // 1,5,7,8,4,2
    expect(west).toEqual([east[0], ...east.slice(1).reverse()])
  })
})
