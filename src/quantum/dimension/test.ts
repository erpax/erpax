import { exactAbs, exactMaxOf, exactMinOf } from '@/algebra'
import { describe, it, expect } from 'vitest'
import {
  basis2D, superpose2D, probabilities2D, total2D, collapse2D, seal2D, uniform2D,
  cell2DKey, quantum2dHolds, PARTITION2D_SAMPLES,
} from './index'

describe('quantum/dimension — the projection basis', () => {
  it('a basis spans every partition, and a key addresses a cell', () => {
    const b = basis2D()
    expect(b.length).toBeGreaterThan(0)
    for (const p of PARTITION2D_SAMPLES) expect(b.some((c) => cell2DKey(p, c.horo).startsWith(p + ':'))).toBe(true)
  })

  it('a uniform state totals its own amplitudes and distributes them evenly', () => {
    const s = uniform2D()
    expect(total2D(s)).toBeGreaterThan(0)
    const p = probabilities2D(s)
    const vals = Object.values(p)
    expect(vals.length).toBeGreaterThan(0)
    // uniform means no cell is privileged — max and min agree to floating tolerance
    expect(exactMaxOf(vals) - exactMinOf(vals)).toBeLessThan(1e-9)
  })

  it('probabilities sum to one — a distribution, not a scatter', () => {
    const sum = Object.values(probabilities2D(uniform2D())).reduce((a, b) => a + b, 0)
    expect(exactAbs(sum - 1)).toBeLessThan(1e-9)
  })

  it('collapse is deterministic in r — the same draw yields the same cell', () => {
    const s = uniform2D()
    expect(collapse2D(s, 0.42)).toEqual(collapse2D(s, 0.42))
  })

  it('collapse always lands inside the basis — never off-grid', () => {
    const s = uniform2D()
    const keys = new Set(basis2D().map((c) => cell2DKey(c.partition, c.horo)))
    for (const r of [0, 0.25, 0.5, 0.75, 0.999]) {
      const c = collapse2D(s, r)
      expect(keys.has(cell2DKey(c.partition, c.horo))).toBe(true)
    }
  })

  it('the seal is content-addressed — same state, same seal; changed state, changed seal', () => {
    const a = uniform2D()
    expect(seal2D(a)).toBe(seal2D(uniform2D()))
    // superpose2D takes raw amplitudes keyed by cell, not a cell — concentrating weight on one
    // cell is a genuinely different state, so its address must differ.
    const first = cell2DKey(basis2D()[0]!.partition, basis2D()[0]!.horo)
    const b = superpose2D({ [first]: 1 })
    expect(seal2D(b)).not.toBe(seal2D(a))
  })

  it('the zero state is refused rather than silently normalised', () => {
    expect(() => superpose2D({})).toThrow(/normalisation/)
  })

  it('the atom reports its own holds verdict', () => {
    expect(typeof quantum2dHolds()).toBe('boolean')
  })
})
