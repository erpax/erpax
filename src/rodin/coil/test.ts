/**
 * coil — green by construction: the two counter-spiralling helices interact at
 * ZERO COST (residue 0) or the gate breaks. Tests inconsistencies, not
 * consistencies: one number (Σresidue) goes ≠ 0 the instant a coil is mis-stepped
 * or a hand-set value is introduced. @see ./index.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { postCoil, coilLedger, metatronBridge, proof, FORWARD_COIL, REVERSE_COIL } from '@/rodin/coil'
import { DOUBLING } from '@/rodin'
import { HORO_DIGITS } from '@/horo'

describe('coil — two coils interact at zero cost (residue 0) or red', () => {
  it('every coil claim is computed-true (the proof IS the artifact)', () => {
    expect(Object.values(proof()).every(Boolean)).toBe(true)
  })

  // THE INVARIANT: forward∘reverse = identity on the whole helix ⇒ Σresidue = 0.
  // One number; any imbalanced coil (a wrong step, a hand-set value) makes it ≠ 0.
  it('forward∘reverse = identity on the doubling helix ⇒ residueSum 0 (zero entropy)', () => {
    const led = coilLedger()
    expect(led.coilsAreInverse).toBe(true) // 2·5 ≡ 1, grounded in rodin.reverseIsInverse()
    expect(led.posts.every((p) => p.balanced)).toBe(true)
    expect(led.residueSum).toBe(0)
  })

  it('the reverse coil is the forward coil mirrored (past ⊕ future around the still self)', () => {
    expect([...FORWARD_COIL]).toEqual([...DOUBLING])
    expect([...REVERSE_COIL]).toEqual([1, 5, 7, 8, 4, 2])
  })

  // Inconsistency: an axis digit {3,6,9} is OFF the helix — it must not pose as a flow coil state.
  it('an axis digit (3) is off the helix — not a coil flow-state', () => {
    expect((HORO_DIGITS as readonly number[]).includes(3)).toBe(false)
    expect(([...DOUBLING] as number[]).includes(3)).toBe(false)
    expect(postCoil(1).balanced).toBe(true) // a real flow state DOES balance
  })

  // The honest bridge: two 6-coils share one still-point ⇒ 2·6+1 = 13 (metatron K13), NEVER 42.
  it('2·6+1 = 13 = metatron K13, never a 6×7=42 grid', () => {
    const b = metatronBridge()
    expect(b.total).toBe(13)
    expect(b.coils * b.perCoil + b.center).toBe(13)
  })
})
