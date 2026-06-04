import { describe, it, expect } from 'vitest'
import { harmonicFirst, consistent, entails, type Claim } from '@/logic'

const claim = (uuid: string, harmonic: boolean): Claim => ({ uuid, harmonic })

describe('logic — consistency is harmony; the harmonic resolve first', () => {
  it('harmonicFirst orders the self-consistent first, stably within each class', () => {
    const items = [
      { id: 'a', harmonic: false },
      { id: 'b', harmonic: true },
      { id: 'c', harmonic: false },
      { id: 'd', harmonic: true },
    ]
    expect(harmonicFirst(items).map((x) => x.id)).toEqual(['b', 'd', 'a', 'c']) // harmonic first; order kept within class
    expect(harmonicFirst([]).length).toBe(0)
  })

  it('consistent: no proposition asserted both harmonic and disharmonic (no P ∧ ¬P)', () => {
    expect(consistent([claim('p', true), claim('q', true)])).toBe(true)
    expect(consistent([claim('p', true), claim('p', true)])).toBe(true) // same assertion twice is fine
    expect(consistent([claim('p', true), claim('p', false)])).toBe(false) // contradiction
    expect(consistent([])).toBe(true)
    // a disharmonic claim alone is consistent (it just asserts ¬p); contradiction needs both
    expect(consistent([claim('p', false)])).toBe(true)
  })

  it('entails: sound, harmony-preserving inference — supported and consistent', () => {
    const premises = [claim('p', true), claim('q', true)]
    expect(entails(premises, claim('p', true))).toBe(true) // supported + consistent
    expect(entails(premises, claim('r', true))).toBe(false) // unsupported (not among premises)
    expect(entails(premises, claim('p', false))).toBe(false) // contradicts the premises
    expect(entails([claim('p', true), claim('p', false)], claim('p', true))).toBe(false) // premises inconsistent
  })
})
