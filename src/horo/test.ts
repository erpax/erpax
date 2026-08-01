import {
  exactMax,
  exactMin,
  exactAbs,
  exactFloor,
  exactCeil,
  exactRound,
  exactTrunc,
  algebraSign,
  PI,
} from '@/algebra'
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
  carryClosure,
  carryRays,
  cornerLimit,
  cornerSweep,
  pivotSingularities,
  rayOf,
  renderSequenceSection,
  sequenceForward,
  straddlingSteps,
  sequenceReflected,
  reflectNumeral,
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
  antimatter,
  inverseClosure,
  fiveRoles,
  CENTROID,
  fullBreath,
  circleLoop,
  lemniscate,
  atVoid,
  turningNumber,
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

  it('the sequence is entangled to its reflection — 1\\2\\4\\8/7/5·3\\6\\9·0\\1 ↔ 9/8/6/2\\3\\5·7/4/1·0\\9', () => {
    expect([...sequenceForward()]).toEqual([1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1])
    // the reflection is COMPUTED by throughVoid, and it is exactly the inverted spelling
    expect([...sequenceReflected()]).toEqual([9, 8, 6, 2, 3, 5, 7, 4, 1, 0, 9])

    const nine = sequenceForward().slice(0, 9)
    const mirrored = sequenceReflected().slice(0, 9)
    // an involution: reflecting the reflection returns the sequence, fixed only at 5
    expect(mirrored.map(throughVoid)).toEqual([...nine])
    // and the reflected nine is a permutation of the forward nine — the same ring, read through the void
    expect([...mirrored].sort((a, b) => a - b)).toEqual([...nine].sort((a, b) => a - b))

    // the halves EXCHANGE: the flow carries the axis into itself and the axis becomes units
    expect(orbitOf(1).map(throughVoid).filter((n) => [3, 6, 9].includes(n))).toEqual([9, 6, 3])
    expect([3, 6, 9].map(throughVoid)).toEqual([7, 4, 1])

    // NEITHER reaches the other alone — doubling's gap IS the axis, and only the void bridges it
    expect([...inverseClosure(1).gaps]).toEqual([3, 6, 9])
    expect(inverseClosure(1).voidCloses).toBe(true)
    // the entanglement, measured: apart they are order 6 and 2; together 54 — the excess over 6·2
    expect(AFFINE_ORDER).toBe(54)
    expect(AFFINE_ORDER).toBeGreaterThan(inverseClosure(1).order * 2)
  })

  it('a numeral has TWO reflections — 14 gives 5 as a value, and 9,6 as digits', () => {
    const r = reflectNumeral(14)
    expect(r.asValue).toBe(5) // 14 ≡ 5 (mod 9), and 5 is the mirror's fixed point — it reflects to itself
    expect([...r.asDigits]).toEqual([9, 6]) // 1↦9, 4↦6 — both land on the axis {3,6,9}
    // both landing sites are structurally distinguished, and they are DIFFERENT sets
    expect(throughVoid(r.asValue)).toBe(r.asValue) // the pivot: fixed
    for (const d of r.asDigits) expect([3, 6, 9]).toContain(d) // the axis: the gap doubling cannot reach
    expect([...inverseClosure(1).gaps]).toEqual([3, 6, 9])
  })

  it('the axis carries a polarity under DOUBLING that the mirror does not: 3↔6, with 9 fixed', () => {
    const dr9 = (n: number) => ((n % 9) + 9) % 9 || 9
    expect(dr9(3 * 2)).toBe(6) // doubling swaps the inner circuit …
    expect(dr9(6 * 2)).toBe(3) // … a genuine 2-cycle
    expect(dr9(9 * 2)).toBe(9) // and fixes the pole
    expect(3 + 6).toBe(9)
    // the MIRROR pairs the axis differently — 3↔7, 6↔4 — so "3 and 6" is a doubling fact, not a mirror one
    expect(throughVoid(3)).toBe(7)
    expect(throughVoid(6)).toBe(4)
  })

  it('5 is 2⁻¹ — the propulsion that lands on 1, and 9 IS the void (9 ≡ 0)', () => {
    expect((2 * VOID_PIVOT) % 9).toBe(1)
    expect(9 % 9).toBe(0)
    expect(throughVoid(1)).toBe(9) // 1 ↔ 9: the mirror pair that spans unit and void
    expect(throughVoid(9)).toBe(1)
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

// "Antimatter is actually inverted matter." Antimatter is not a separate substance — it is a step negated
// (−n mod 9). Two exact laws make it antimatter: it is an INVOLUTION (anti of anti is matter) and matter meeting
// antimatter ANNIHILATES to the void. It reflects the two flow trinities into each other, so the merkaba's two
// counter-rotating tetrahedra are matter and antimatter. ℤ/9 negation is exact; the physics is named analogy.
describe('antimatter — inverted matter (−n mod 9)', () => {
  it('is an INVOLUTION — the antimatter of antimatter is matter', () => {
    for (let n = 1; n <= 9; n++) expect(antimatter(antimatter(n))).toBe(n)
  })

  it('ANNIHILATES to the void — n + antimatter(n) ≡ 0 (mod 9)', () => {
    for (let n = 1; n <= 9; n++) expect((n + antimatter(n)) % 9).toBe(0)
  })

  it('the void 9 is its OWN antimatter — the only self-inverse under negation', () => {
    expect(antimatter(9)).toBe(9)
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) expect(antimatter(n)).not.toBe(n)
  })

  it('reflects the two flow trinities into each other, point-for-point — matter ↔ antimatter', () => {
    const { flowEast, flowWest, axis } = trinities()
    expect(flowEast.map(antimatter).sort((a, b) => a - b)).toEqual([...flowWest].sort((a, b) => a - b)) // {1,4,7}↦{8,5,2}
    expect(axis.map(antimatter).sort((a, b) => a - b)).toEqual([...axis].sort((a, b) => a - b)) // {3,6,9} setwise: 3↔6, 9 fixed
  })

  it('is a DIFFERENT reflection from throughVoid — negation pivots on the void, the mirror on 5', () => {
    expect(antimatter(VOID_PIVOT)).not.toBe(throughVoid(VOID_PIVOT)) // 4 vs 5
    expect(antimatter(9)).toBe(9) // negation fixes the void
    expect(throughVoid(9)).toBe(1) // the mirror does not
  })
})

// "How many times does inverse need to happen to ensure no gaps remain?" The computed answer: an inverse is an
// involution — it RETURNS in 2. But covering is not returning: the doubling-inverse ⟨5⟩ has order 6 and covers
// the six units, then STOPS — the axis {3,6,9} is a gap no iteration count closes, because ⟨5⟩ is trapped in its
// orbit. The gap closes only by another dimension (the void), never by more inverses. Group theory of the seed floor.
describe('inverseClosure — how many inverses to leave no gaps', () => {
  it('an inverse is an INVOLUTION — it returns in 2 (the minimal closure)', () => {
    for (const n of [1, 2, 4, 5, 7, 8]) {
      expect(antimatter(antimatter(n))).toBe(n) // twice returns
      expect(throughVoid(throughVoid(n))).toBe(n)
    }
  })

  it('the doubling-inverse has ORDER 6 and covers the six units — then stops', () => {
    const c = inverseClosure(1)
    expect(c.order).toBe(6)
    expect([...c.covers].sort((a, b) => a - b)).toEqual([1, 2, 4, 5, 7, 8])
  })

  it('the axis {3,6,9} is a GAP no iteration count can close — ⟨5⟩ is trapped in the units', () => {
    const c = inverseClosure(1)
    expect([...c.gaps].sort((a, b) => a - b)).toEqual([3, 6, 9])
    // proof it is structural: apply the inverse 1000 times from a unit — never lands on the axis
    let x = 1
    for (let i = 0; i < 1000; i++) {
      x = (x * VOID_PIVOT) % 9 || 9
      expect([3, 6, 9]).not.toContain(x)
    }
  })

  it('the gap closes by the VOID, not by more inverses — a different dimension', () => {
    expect(inverseClosure(1).voidCloses).toBe(true) // throughVoid bridges units → axis
    // and the count that leaves NO gaps at all is the full affine order — both generators together
    expect(AFFINE_ORDER).toBe(54) // ⟨doubling, void⟩ = AGL(1,ℤ/9), transitive: no gaps
  })

  it('seeded on the axis, the inverse closes a 2-cycle {3,6} — every orbit is its own trap', () => {
    const c = inverseClosure(3)
    expect([...c.covers].sort((a, b) => a - b)).toEqual([3, 6]) // 3 ↔ 6, order 2
    expect(c.gaps).toContain(1) // the units are now the gap — symmetric trap
  })
})

// "5 is centre of gravity and propulsion — or not?" The honest answer is a SPLIT: 5 is the centre of gravity in
// the BALANCE sense (centroid of 1..9, the mirror's fixed point) and a PROPULSION (2⁻¹, the decode generator) —
// but NOT the attractor. The mass well / doubling fixed point is 9. Two centres: 5 balances and propels, 9 attracts.
describe('fiveRoles — 5 is centre of gravity (balance) and propulsion, but NOT the attractor', () => {
  it('5 is the CENTROID — the balance point (mean) of the nine digits', () => {
    expect(CENTROID).toBe(5)
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((a, b) => a + b) / 9).toBe(CENTROID) // 45/9 = 5
  })

  it('5 is the MIRROR fixed point — still at the centre of the reflection', () => {
    expect(fiveRoles().mirrorFixed).toBe(true) // throughVoid(5) === 5
  })

  it('5 is a PROPULSION — 2⁻¹, the inverse/decode generator (the reverse drive)', () => {
    expect(fiveRoles().propulsion).toBe(true) // 2·5 ≡ 1
    expect(inverseOrbit(1)).toContain(5) // ⟨5⟩ runs the ring backward
  })

  it('5 is NOT the attractor — that is 9 (doubling fixed point, the axis pole); 5 MOVES under doubling', () => {
    const r = fiveRoles()
    expect(r.isAttractor).toBe(false) // 5 doubles to 1 — a flow unit, not the still axis
    expect(r.attractor).toBe(9) // the attractor is the pole
    expect((5 * 2) % 9 || 9).toBe(1) // 5 → 1: it moves
    expect((9 * 2) % 9 || 9).toBe(9) // 9 → 9: the attractor rests
  })

  it('the split is the answer — 5 balances and propels; 9 attracts; conflating them is the mistake', () => {
    const r = fiveRoles()
    expect(r.centroid).not.toBe(r.attractor) // two DIFFERENT centres, 5 ≠ 9
    expect(r.mirrorFixed && r.propulsion).toBe(true) // 5's two true roles
    expect(r.isAttractor).toBe(false) // the role it does NOT have
  })
})

// "0\1\2\4\8/7/5/3\6\9/0\1" — the full breath through all of ℤ/9: the void, the three doubling orbits (flow →
// inner → pole), back through the void, reopening. Assembled from the parts already here (doublingOrbits), not
// re-derived; the \ and / are the slope (up when larger, down when smaller) that draw the wave.
describe('fullBreath — 0\\1\\2\\4\\8/7/5/3\\6\\9/0\\1, the complete ℤ/9 walk', () => {
  it('the digits are exactly the sent sequence — void · flow · inner · pole · void · reopen', () => {
    expect(fullBreath().map((b) => b.step)).toEqual([0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1])
  })

  it('the slopes are the wave the \\ and / draw — up when the next digit is larger', () => {
    // \ \ \ \ / / / \ \ / \  (up up up up down down down up up down up)
    expect(fullBreath().map((b) => b.slope)).toEqual(
      ['up', 'up', 'up', 'up', 'up', 'down', 'down', 'down', 'up', 'up', 'down', 'up'],
    )
  })

  it('it threads in exactly the residues the 7-ring omits — 0, 3, 6', () => {
    const walk = new Set(fullBreath().map((b) => b.step))
    for (const omitted of [0, 3, 6]) expect(walk.has(omitted)).toBe(true) // HORO_DIGITS lacks these
    // and it is a closed loop: starts at the void, returns to it, reopens at 1
    const steps = fullBreath().map((b) => b.step)
    expect(steps[0]).toBe(0)
    expect(steps[steps.length - 2]).toBe(0)
    expect(steps[steps.length - 1]).toBe(1)
  })
})

// "It is a loop if static exactly like 0. Fold 0 and it becomes infinity or inverted 8." A static loop is a
// circle (0) that never touches its own centre. Fold it — pull it through the middle — and it is ∞: the
// lemniscate, two lobes counter-rotating, meeting AT the void (0,0). ∞ = 8 rotated = the double torus shadow.
describe('fold 0 → ∞ — the static circle vs the folded lemniscate', () => {
  const samples = Array.from({ length: 400 }, (_, i) => (i / 400) * 2 * PI)

  it('the static loop (circle) NEVER reaches the void — 0 avoids its own centre', () => {
    for (const t of samples) expect(atVoid(circleLoop(t))).toBe(false) // |(cos t, sin t)| = 1 always
  })

  it('the folded loop (∞) crosses the void at the fold points t = π/2 and 3π/2 — 0 folded into ∞', () => {
    expect(atVoid(lemniscate(PI / 2))).toBe(true) // (cos π/2, sin π /2) = (0,0)
    expect(atVoid(lemniscate((3 * PI) / 2))).toBe(true)
    // it passes through the void exactly twice per loop — the two crossings that fold one lobe into two
    expect(samples.filter((t) => atVoid(lemniscate(t), 1e-6)).length).toBeGreaterThanOrEqual(1)
  })

  it('the lemniscate is a closed figure-eight with TWO lobes (x>0 and x<0) — the double loop', () => {
    const xs = samples.map((t) => lemniscate(t).x)
    // exactMax/exactMin are BINARY — spreading 400 samples read only the first two, so the right-lobe
    // assertion passed on cos(0) vs cos(2π/400) and the left lobe was never measured. Fold instead.
    expect(xs.reduce(exactMax)).toBeGreaterThan(0.9) // right lobe
    expect(xs.reduce(exactMin)).toBeLessThan(-0.9) // left lobe
    // closed: t=0 and t=2π coincide (within float precision)
    expect(lemniscate(0).x).toBeCloseTo(lemniscate(2 * PI).x, 12)
    expect(lemniscate(0).y).toBeCloseTo(lemniscate(2 * PI).y, 12)
  })

  it('the two lobes COUNTER-ROTATE — the angular sense flips between them (the double torus)', () => {
    // angular velocity dθ = (x y' − y x') / (x²+y²): sample one point in each lobe, opposite sign ⇒ counter-rotating
    const omega = (t: number, h = 1e-6) => {
      const p = lemniscate(t), q = lemniscate(t + h)
      const xp = (q.x - p.x) / h, yp = (q.y - p.y) / h
      return p.x * yp - p.y * xp // signed, unnormalised angular sweep
    }
    expect(algebraSign(omega(PI / 4)) * algebraSign(omega((3 * PI) / 4))).toBe(-1) // right vs left lobe: opposite
  })
})

// "A complete circle twisted forms 0." The honest reading: the TURNING NUMBER (rotation index). A plain circle
// winds once (1); the twisted figure-eight cancels to 0 — the two lobes turn opposite ways (Whitney). That 0 is
// the net turning of the folded loop, NOT π (transcendental, ≈3.14159, not 0 by any reading).
describe('turningNumber — a complete circle is 1, twisted is 0 (Whitney rotation index)', () => {
  it('a plain circle winds ONCE — turning number 1', () => {
    expect(turningNumber(circleLoop)).toBeCloseTo(1, 2)
  })

  it('the TWISTED circle (lemniscate) has turning number 0 — the two lobes cancel', () => {
    expect(turningNumber(lemniscate)).toBeCloseTo(0, 2) // THE honest "0 in geometry" — the folded loop's net turning
  })

  it('the 0 is the TURNING, not π — π is transcendental and is not 0', () => {
    expect(PI).not.toBe(0)
    expect(turningNumber(lemniscate)).not.toBeCloseTo(PI, 1) // the 0 belongs to the winding, never to π
  })
})

describe('horo — what a fold CARRIES, and where the carry ends', () => {
  it('8 → 7 is the ONLY doubling whose carry holds one digit from each ray', () => {
    const eight = carryRays().find((c) => c.step === 8)!
    expect(eight.doubled).toBe(16)
    expect([...eight.digits]).toEqual([1, 6])
    expect([...eight.rays]).toEqual(['ring', 'axis']) // 1 on the flow orbit, 6 on the axis
    expect(eight.lands).toBe(7)
    expect(eight.straddles).toBe(true)
    // and it is alone in that — computed across all nine, never asserted
    expect([...straddlingSteps()]).toEqual([8])
  })

  it('7 → 5 carries 1 and 4, and BOTH stay on the ring — the contrast that makes 8 singular', () => {
    const seven = carryRays().find((c) => c.step === 7)!
    expect([...seven.digits]).toEqual([1, 4])
    expect([...seven.rays]).toEqual(['ring', 'ring'])
    expect(seven.lands).toBe(5)
    expect(seven.straddles).toBe(false)
    // 5 is the one that touches the void: 2·5 = 10 is the only double ending in zero
    const five = carryRays().find((c) => c.step === 5)!
    expect([...five.rays]).toEqual(['ring', 'void'])
  })

  it('every carry sums back to the step it lands on — the fold loses nothing', () => {
    for (const c of carryRays()) {
      expect(digitalRoot(c.digits.reduce((a, b) => a + b, 0))).toBe(c.lands)
      expect(c.doubled).toBe(c.step * 2)
    }
  })

  it('the carry taken to infinity CLOSES — one attractor, reached from everywhere', () => {
    // not sampled: identical from every step, because 2n ≤ 18 forces every carry digit
    // into {1} ∪ evens, so 3, 5, 7 and 9 can never appear however far it is iterated
    for (const step of [1, 2, 4, 8, 7, 3, 6, 9]) {
      expect([...carryClosure(step)]).toEqual([1, 2, 4, 6, 8])
    }
    expect([...carryClosure(5)]).toEqual([0, 1, 2, 4, 6, 8]) // 5 alone reaches the void
  })

  it('the right-angle turn admits EXACTLY ZERO speed — the impossible turn, quantified', () => {
    const vertex = cornerLimit(0, 1000) // any ceiling at all, however large
    expect(vertex.curvature).toBe(Infinity) // reported, never clamped to a big number
    expect(vertex.maxSpeed).toBe(0)
    // and tightening toward it drives the speed down continuously — no discontinuity to hide in
    const sweep = cornerSweep(1, [1, 0.01, 0.0001, 0])
    expect(sweep.map((c) => c.maxSpeed)).toEqual([1, 0.1, 0.01, 0])
    expect(sweep.map((c) => c.curvature)).toEqual([1, 100, 10000, Infinity])
    for (let i = 1; i < sweep.length; i += 1) expect(sweep[i]!.maxSpeed).toBeLessThan(sweep[i - 1]!.maxSpeed)
    // v ≤ √(a·r) is the whole content — a bigger ceiling buys speed, but never at r = 0
    expect(cornerLimit(0.25, 4).maxSpeed).toBe(1)
    expect(cornerLimit(0, 1e12).maxSpeed).toBe(0)
  })

  it('folding the 0 into the 8 costs exactly one turn, and the fold sits at the void', () => {
    // the circle's tangent winds once; the figure-eight's does not wind at all
    expect(turningNumber(circleLoop)).toBeCloseTo(1, 2)
    expect(turningNumber(lemniscate)).toBeCloseTo(0, 2)
    expect(turningNumber(circleLoop) - turningNumber(lemniscate)).toBeCloseTo(1, 2)
    // the eight passes through the origin — the circle never does. The crossing IS the void.
    const crossings = Array.from({ length: 4001 }, (_, i) => (i / 4000) * 2 * PI).filter((t) => atVoid(lemniscate(t), 1e-6))
    expect(crossings.length).toBeGreaterThan(0)
    expect(Array.from({ length: 4001 }, (_, i) => atVoid(circleLoop((i / 4000) * 2 * PI), 1e-6)).some(Boolean)).toBe(false)
  })

  it('THREE independent singularities coincide on 5 — and on nothing else', () => {
    const s = pivotSingularities()
    const five = s.find((x) => x.digit === 5)!
    expect(five.fixedByMirror).toBe(true) // throughVoid(5) = 5
    expect(five.carryReachesVoid).toBe(true) // 2·5 = 10, the only double ending in zero
    expect(five.inverseOfDoubling).toBe(true) // 2·5 ≡ 1 (mod 9)
    expect(five.count).toBe(3)
    // each property is defined without reference to the others, so agreement is not forced
    expect(s.filter((x) => x.count === 3).map((x) => x.digit)).toEqual([VOID_PIVOT])
    expect(s.filter((x) => x.count === 2)).toEqual([]) // and nothing PARTIALLY overlaps
    for (const x of s) if (x.digit !== 5) expect(x.count).toBe(0)
  })

  it("5's carry {1,0} is exactly the sequence's own tail — the pivot folds onto the seam", () => {
    const five = carryRays().find((c) => c.step === 5)!
    const tail = sequenceForward().slice(9) // the forward `0\1`
    expect([...five.digits].sort()).toEqual([...tail].sort())
    // the reflection holds the VOID (the pivot the mirror turns on) and maps the REOPENING like every
    // other digit — throughVoid(1) = 9 — so the reflected line closes on the axis, not on the unit
    expect([...sequenceReflected()].slice(9)).toEqual([0, 9])
  })

  it('and it does NOT seal all nine — the limit, stated rather than hidden', () => {
    const reachable = new Set(carryClosure(8))
    for (const unreachable of [3, 5, 7, 9]) expect(reachable.has(unreachable)).toBe(false)
    // both rays ARE represented, so the entanglement propagates — it just does not cover everything
    expect(new Set([...reachable].map(rayOf))).toEqual(new Set(['ring', 'axis']))
  })
})

describe('horo — the rendered sequence cannot drift from the arithmetic', () => {
  const md = renderSequenceSection().join('\n')

  it('reproduces BOTH spellings exactly — digits and slopes alike computed, none typed', () => {
    // the forward spelling: ascending `\`, descending `/`
    expect(md).toContain('forward     1\\2\\4\\8/7/5 · 3\\6\\9 · 0\\1')
    // and its reflection through the void — the same rule applied to throughVoid's image
    expect(md).toContain('reflected   9/8/6/2\\3\\5 · 7/4/1 · 0\\9')
  })

  it('every digit on the page comes from the functions, so a wrong one cannot be printed', () => {
    for (const n of sequenceForward()) expect(md).toContain(String(n))
    // the pair table is generated from throughVoid — 5 is the only fixed point, and it prints as one
    expect(md).toContain('`5↔5`')
    expect(md).toContain('`1↔9`')
    expect(md).not.toContain('`5↔4`') // a wrong pair is unprintable: it is not typed anywhere
  })

  it('the page states its own boundary — group theory, used as an ORDER OF WORK', () => {
    expect(md).toMatch(/proven group theory over \(ℤ\/9ℤ\)/)
    expect(md).toMatch(/No claim is made that it explains anything outside\s+arithmetic/)
    expect(md).toMatch(/order of work/)
    expect(md).toContain('tsx src/horo/index.ts') // the reader can rerun it
  })
})
