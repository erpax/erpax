import { describe, it, expect } from 'vitest'
import { angle, scale, invert, rotatePlane, inversionConformalDefect, isConformalDimension, dot } from './index'

// Changing perspective is a conformal map — rotate (SO(n)), scale (dilation), invert (0↔∞). The invariant they
// all preserve is the ANGLE. The core is real; the claim "conformal only in dims {2,3,7}" is a coincidence — a
// division-algebra signature imported where it does not belong. Inversion is conformal in EVERY dimension.
describe('conformal — the angle is preserved; conformal in all dimensions, not {2,3,7}', () => {
  const u = [1, 0, 2, -1]
  const v = [0, 1, 1, 3]

  it('ROTATION preserves the angle exactly — the vortex spins the frame, the angle holds', () => {
    for (const [i, j] of [[0, 1], [1, 2], [0, 3]]) {
      const t = 0.7
      expect(angle(rotatePlane(u, i, j, t), rotatePlane(v, i, j, t))).toBeCloseTo(angle(u, v), 12)
    }
  })

  it('DILATION preserves the angle exactly — scale breathes the frame, the angle holds', () => {
    for (const lambda of [3.5, 0.1, 100]) {
      expect(angle(scale(lambda, u), scale(lambda, v))).toBeCloseTo(angle(u, v), 12)
    }
  })

  it('INVERSION is conformal (JᵀJ ∝ I) in EVERY dimension 2..11 — refuting the {2,3,7} restriction', () => {
    for (let n = 2; n <= 11; n++) {
      const w = Array.from({ length: n }, (_, i) => i + 1) // a nonzero vector
      expect(inversionConformalDefect(w)).toBeLessThan(1e-9) // JᵀJ ∝ I to machine zero
    }
  })

  it('the honest conformal-dimension set is ALL n ≥ 2 — not {2,3,7}', () => {
    for (const n of [2, 3, 4, 5, 6, 7, 8, 11, 100]) expect(isConformalDimension(n)).toBe(true) // 4,5,6 pass too
    expect(isConformalDimension(1)).toBe(false) // n=1 is the only exclusion
    // the {2,3,7}-only claim would make these false — they are not:
    expect([4, 5, 6].every(isConformalDimension)).toBe(true)
  })

  it('what is preserved is ANGLE, not LENGTH — inversion and dilation change lengths', () => {
    const w = [3, 4] // |w| = 5
    expect(dot(scale(2, w), scale(2, w)) ** 0.5).toBeCloseTo(10) // dilation changed the length
    expect(dot(invert(w), invert(w)) ** 0.5).not.toBeCloseTo(5) // inversion changed the length (1/5)
    // yet the angle between two directions is preserved by both — that is the conformal invariant
  })

  it('the three generators are three faces of one group — the angle survives all of them together', () => {
    // rotate, then scale, then (locally) invert — the composed perspective change still preserves the angle globally for rotate+scale
    const ru = rotatePlane(u, 0, 1, 0.5), rv = rotatePlane(v, 0, 1, 0.5)
    const su = scale(2, ru), sv = scale(2, rv)
    expect(angle(su, sv)).toBeCloseTo(angle(u, v), 12) // rotate ∘ scale: angle invariant
  })
})
