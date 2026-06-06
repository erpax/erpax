import { describe, it, expect } from 'vitest'
import { emerge, emergeOne, emergenceCoverage, emergencePressure } from '@/emergence'
import { foldDualities } from '@/duality'
import { composeSteps, HORO_DIGITS, type HoroStep } from '@/horo'
import { nodeOf, merge } from '@/uuid/matrix'

describe('emergence — the third revealed (duality completing to a trinity)', () => {
  it('emerges one third per declared duality (the fold and the emergence are 1:1)', () => {
    const dualities = foldDualities()
    const emerged = emerge()
    expect(emerged.length).toBe(dualities.length)
    expect(emerged.length).toBeGreaterThan(0)
  })

  it('every emerged step lands ON the horo ring — two poles compose to a real third', () => {
    const ring = new Set<number>(HORO_DIGITS)
    for (const e of emerge()) expect(ring.has(e.step)).toBe(true)
  })

  it("emergeOne's step is exactly composeSteps of the two poles' horo positions (computed, not asserted)", () => {
    for (const d of foldDualities()) {
      const e = emergeOne(d)
      const expected: HoroStep = composeSteps(nodeOf(d.a)?.horo ?? 0, nodeOf(d.b)?.horo ?? 0)
      expect(e.step).toBe(expected)
    }
  })

  it('a full pair carries the merge() binding-uuid of its poles; a not-full pair carries none', () => {
    for (const e of emerge()) {
      const na = nodeOf(e.a)
      const nb = nodeOf(e.b)
      if (e.full) {
        expect(na).toBeDefined()
        expect(nb).toBeDefined()
        expect(e.binding).toBe(merge(na!.uuid, nb!.uuid))
      } else {
        expect(e.binding).toBeUndefined()
      }
    }
  })

  it('the synthesis is ORDER-INDEPENDENT in the ring (step a⊕b == step b⊕a — the third does not pick a pole)', () => {
    for (const e of emerge()) {
      const na = nodeOf(e.a)?.horo ?? 0
      const nb = nodeOf(e.b)?.horo ?? 0
      expect(composeSteps(na, nb)).toBe(composeSteps(nb, na))
    }
  })
})

describe('emergence — coverage: the forge filling (monotone toward zero entropy)', () => {
  it('coverage is the forged fraction in [0,1], and emerged ≤ dualities', () => {
    const c = emergenceCoverage()
    expect(c.coverage).toBeGreaterThanOrEqual(0)
    expect(c.coverage).toBeLessThanOrEqual(1)
    expect(c.emerged).toBeLessThanOrEqual(c.dualities)
    expect(c.emerged).toBe(emerge().filter((e) => e.full).length)
  })

  it('pressure is the exact complement of coverage (1 − coverage) — the un-emerged third', () => {
    expect(emergencePressure()).toBeCloseTo(1 - emergenceCoverage().coverage, 12)
  })

  it('canonical dualities (love↔fear, sacred↔profane) are forged and emerge a third', () => {
    const all = emerge()
    const find = (x: string, y: string) =>
      all.find((e) => (e.a === x && e.b === y) || (e.a === y && e.b === x))
    for (const [x, y] of [['love', 'fear'], ['sacred', 'profane']] as const) {
      const e = find(x, y)
      expect(e, x + '↔' + y).toBeDefined()
      expect(e!.full).toBe(true)
      expect(e!.binding).toBeTypeOf('string')
    }
  })
})
