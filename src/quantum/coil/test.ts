import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { coil, coilCrosses, coins, coverage, rotation } from './index'

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
