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

  it('the ring is CLOSED under composition, and the {3,6,9} axis is not the ring', () => {
    // composeSteps is digitalRoot(a×b), so the doubling ring {1,2,4,8,7,5} is the multiplicative
    // subgroup ⟨2⟩ of (ℤ/9ℤ)* — CLOSED: two ring poles compose to a ring third, always. The other
    // residues {3,6} are the axis (non-units, 9 ≡ 0 is the void), and a pair touching the axis
    // composes ONTO the axis — it cannot come back. The corpus carries 22 axis atoms (access, auth
    // …), so "every third lands on the ring" was never true of the data; this is the law that is.
    const ring = new Set<number>(HORO_DIGITS)
    const axis = new Set<number>([3, 6, 9])
    let closed = 0
    for (const e of emerge()) {
      const a = nodeOf(e.a)?.horo ?? 0
      const b = nodeOf(e.b)?.horo ?? 0
      const bothOnRing = ring.has(a) && ring.has(b) && a !== 9 && b !== 9
      if (bothOnRing) {
        expect(ring.has(e.step), `${e.a}⊗${e.b}: ${a}×${b} left the ring at ${e.step}`).toBe(true)
        expect(e.step).not.toBe(9)
        closed++
      } else {
        expect(axis.has(e.step), `${e.a}⊗${e.b}: an axis pole composed off the axis at ${e.step}`).toBe(true)
      }
    }
    expect(closed).toBeGreaterThan(0)
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
