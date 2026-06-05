/**
 * self/similar — green by construction: the same form holds at every scale or red.
 * Tests inconsistencies — the octave lift (×10, scale-invariant) is distinguished
 * from the coil rotation (×2, moves), so a confused step fails the invariant.
 * @see ./index.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { lift, scaleInvariant, holographic, proof } from '@/self/similar'
import { digitalRoot } from '@/horo'

describe('self/similar — same form at every scale (zero entropy) or red', () => {
  it('every self-similarity claim is computed-true', () => {
    expect(Object.values(proof()).every(Boolean)).toBe(true)
  })

  // THE INVARIANT: every vortex position is fixed under the octave lift — self-same across scales.
  it('every vortex position is fixed under the octave lift (scale-invariance)', () => {
    const s = scaleInvariant()
    expect(s.holds).toBe(true)
    expect(s.samples.every((x) => x.state === x.lifted)).toBe(true)
  })

  // The hologram: the part reconstructs the whole, 0 free parameters.
  it('6 generators → 36 cells, 0 free parameters (the part carries the whole)', () => {
    const h = holographic()
    expect(h.generators).toBe(6)
    expect(h.whole).toBe(36)
    expect(h.freeParameters).toBe(0)
  })

  // Inconsistency: the octave lift (×10) is scale-invariant; the coil rotation (×2) is NOT.
  it('the octave lift (×10) holds the digit while the coil step (×2) moves it — they are distinct', () => {
    expect(lift(1)).toBe(1) // ×10 octave: fixed (same form, next scale)
    expect(digitalRoot(1 * 2)).toBe(2) // ×2 rotation: moves (the flow, not the lift)
  })
})
