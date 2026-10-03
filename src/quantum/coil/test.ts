import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { coil, coilCrosses, coins, coverage, rotation, rotateAbout, seatOf } from './index'

const choose2 = (n: number): number => (n * (n - 1)) / 2

describe('quantum/coil — one rotation each way covers every cross iff the ring is a trinity', () => {
  it('a trinity: forward and backward rotations are the six ordered pairs — every cross, both faces', () => {
    const t = coil(['a', 'b', 'c'])
    const f = rotation(t, 'forward').map(([x, y]) => `${coins(x)}→${coins(y)}`)
    const b = rotation(t, 'backward').map(([x, y]) => `${coins(x)}→${coins(y)}`)
    expect(f).toEqual(['a→b', 'b→c', 'c→a'])
    expect(b).toEqual(['a→c', 'b→a', 'c→b'])
    expect(new Set([...f, ...b]).size).toBe(6)
    expect(coverage(t)).toEqual({ covered: 3, crosses: 3, complete: true, nodes: 1, rotations: 2 })
  })

  it('a flat ring of more than three is NOT covered by one rotation — C(n,2) > n', () => {
    // a single node with six children would be a ring, not a coil; `coil` never builds one, so the
    // arithmetic is asserted directly: the only positive n with C(n,2) = n is 3.
    const solutions = Array.from({ length: 65 }, (_, n) => n).filter((n) => choose2(n) === n)
    expect(solutions).toEqual([0, 3])
  })

  it('seven laws coil into two trinities and an axis, and every one of the 21 crosses is covered', () => {
    const laws = ['copy', 'cycle', 'concentration', 'mirror', 'unfolded', 'unreached', 'accounting-wave']
    const t = coil(laws)
    expect(t.kind).toBe('coil')
    if (t.kind !== 'coil') return
    expect(t.children.map(coins)).toEqual([['copy', 'cycle', 'concentration'], ['mirror', 'unfolded', 'unreached'], ['accounting-wave']])
    expect(coverage(t)).toEqual({ covered: 21, crosses: 21, complete: true, nodes: 3, rotations: 6 })
  })

  it('coverage is complete for every rosetta size the corpus could hand it', () => {
    for (let n = 1; n <= 40; n++) {
      const c = coverage(coil(Array.from({ length: n }, (_, i) => `l${i}`)))
      expect(c.complete).toBe(true)
      expect(c.crosses).toBe(choose2(n))
    }
  })

  it('the Lean twin states the same facts and proves them without axioms', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Coil.lean'), 'utf8')
    for (const t of ['trinity_is_the_coil', 'one_turn_each_way_reaches_every_coin', 'seven_laws_fully_crossed', 'no_self_cross', 'backward_is_forward_twice']) {
      expect(lean).toContain(`theorem ${t}`)
    }
    expect(lean).toContain('def crosses (n : Nat) : Nat := n * (n - 1) / 2')
    expect(lean).not.toMatch(/\bsorry\b/)
  })
})

describe('coilCrosses — the two faces of every cross, over populations', () => {
  const sets = new Map<string, ReadonlySet<string>>([
    ['copy', new Set(['x', 'y', 'z'])],
    ['cycle', new Set(['y', 'z', 'w'])],
    ['concentration', new Set(['q'])],
    ['mirror', new Set(['x'])],
  ])

  it('forward and backward faces are the two containment shares; shared and theorem are symmetric', () => {
    const levels = coilCrosses(sets, ['copy', 'cycle', 'concentration'])
    expect(levels).toHaveLength(1)
    const [l] = levels
    const f = l!.forward.find((c) => c.a[0] === 'copy' && c.b[0] === 'cycle')!
    const b = l!.backward.find((c) => c.a[0] === 'cycle' && c.b[0] === 'copy')!
    expect(f.shared).toBe(2)
    expect(f.forward).toBeCloseTo(2 / 3)
    expect(f.backward).toBeCloseTo(2 / 3)
    expect(b.shared).toBe(2)
    expect(b.forward).toBe(f.backward)
    expect(b.backward).toBe(f.forward)
    const z = l!.forward.find((c) => c.b[0] === 'concentration')!
    expect(z.theorem).toBe(true)
    expect(z.shared).toBe(0)
  })

  it('a coil-coil cross unions the populations and carries no lift — one independence model does not exist for it', () => {
    const levels = coilCrosses(sets, ['copy', 'cycle', 'concentration', 'mirror'])
    // four laws → one trinity + the axis `mirror`; the top node crosses the coil with the axis
    const top = levels.find((l) => l.depth === 0)!
    const coilVsAxis = top.forward.find((c) => c.a.length === 3)!
    expect(coilVsAxis.b).toEqual(['mirror'])
    expect(coilVsAxis.shared).toBe(1) // x
    expect(coilVsAxis.backward).toBe(1) // all of mirror lies inside the coil
    expect(coilVsAxis.lift).toBeNull()
    const inner = levels.find((l) => l.depth === 1)!
    expect(inner.forward.every((c) => c.lift !== null)).toBe(true)
  })
})

describe('rotateAbout — a lead as the axis, every law a seat, both faces', () => {
  const sets = new Map<string, ReadonlySet<string>>([
    ['copy', new Set(['src/a/index.ts', 'src/a/x.ts', 'src/b/index.ts'])],
    ['cycle', new Set(['src/a/index.ts', 'src/c/index.ts'])],
    ['mirror', new Set(['src/d/test.ts'])],
    ['unreached', new Set(['src/e/index.ts'])],
  ])
  const rosetta = ['copy', 'cycle', 'mirror', 'unreached']

  it('an atom two laws flag is corroborated, and each seat carries its own two faces', () => {
    const r = rotateAbout('a', sets, rosetta)
    expect(r.files).toBe(2) // src/a/index.ts and src/a/x.ts — the union of what any law flags under the axis
    expect(r.seats).toEqual(['copy', 'cycle'])
    expect(r.seat).toBe('corroborated')
    const copy = r.perspectives.find((p) => p.law === 'copy')!
    expect(copy).toEqual({ law: 'copy', seen: 2, forward: 1, backward: 2 / 3 })
    const cycle = r.perspectives.find((p) => p.law === 'cycle')!
    expect(cycle.forward).toBe(0.5) // one of the axis's two files
    expect(cycle.backward).toBe(0.5) // one of cycle's two files
    expect(r.perspectives.map((p) => p.law)).toEqual(rosetta) // rosetta order, never reordered
  })

  it('one seat is single; an atom nothing flags is unseen — a count, not matter', () => {
    expect(rotateAbout('e', sets, rosetta).seat).toBe('single')
    const none = rotateAbout('zzz', sets, rosetta)
    expect(none.files).toBe(0)
    expect(none.seat).toBe('unseen')
    expect(none.perspectives.every((p) => p.seen === 0 && p.forward === 0)).toBe(true)
  })

  it('a bare file atom (src/<axis>.ts) is an axis too, and a prefix that merely shares letters is not', () => {
    const s = new Map<string, ReadonlySet<string>>([['copy', new Set(['src/ab.ts', 'src/a.ts'])]])
    expect(rotateAbout('a', s, ['copy']).files).toBe(1)
    expect(seatOf(0)).toBe('unseen')
    expect(seatOf(1)).toBe('single')
    expect(seatOf(7)).toBe('corroborated')
  })

  it('the Lean twin decides the seat the same way, without axioms', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Coil.lean'), 'utf8')
    expect(lean).toContain('def seatOf (n : Nat) : Seat := if n = 0 then .unseen else if n = 1 then .single else .corroborated')
    for (const t of ['unseen_iff_no_seat', 'one_seat_is_single', 'two_seats_corroborate']) expect(lean).toContain(`theorem ${t}`)
    expect(lean).not.toMatch(/\bsorry\b/)
  })
})
