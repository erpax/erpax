import { describe, it, expect } from 'vitest'
import { given, FOLDED_ASSUMPTIONS, atomPath } from './index'

describe('conditional — the unprovable folded proves another thing', () => {
  it('names its path', () => {
    expect(atomPath).toBe('conditional')
  })

  // The implication H ⇒ Y is a THEOREM even when H is unproven. given(H).proves(Y, ⇒) evaluates the fold.
  it('folds an unproven hypothesis into a proven implication', () => {
    const t = given('collisions cost 2^(b/2)').proves('tamper-cost is 2^(b/2)', () => 122 / 2)
    expect(t.hypothesis).toMatch(/collisions cost/)
    expect(t.value).toBe(61) // the arithmetic follows unconditionally — the implication is real
  })

  // The one bit that separates a conditional theorem from a lie: H is NAMED. A consequence with no disclosed
  // condition is either a theorem or the unfalsifiable assertion rules/refutable refuses.
  it('every folded assumption DISCLOSES its hypothesis — the disclosure is the honesty', () => {
    expect(FOLDED_ASSUMPTIONS.length).toBeGreaterThan(0)
    for (const a of FOLDED_ASSUMPTIONS) {
      expect(a.hypothesis.length).toBeGreaterThan(20)
      expect(a.hypothesis).toMatch(/unproven|open|assumption/i) // it says, in the open, that it is not proven
      expect(a.consequence.length).toBeGreaterThan(20)
    }
  })

  it('the corpus discloses the SHA-256 assumption its tamper-cost rests on', () => {
    const sha = FOLDED_ASSUMPTIONS.find((a) => /SHA-256/.test(a.hypothesis))
    expect(sha).toBeDefined()
    expect(sha!.consequence).toMatch(/forge floor|tamper/i)
  })

  // The value is the same unprovable core, opposite honesty: the implication is proven, H is not — so if H
  // falls, Y falls, and the disclosure is what lets you see it in advance.
  it('proves the IMPLICATION, never the HYPOTHESIS — disclosure is not proof', () => {
    const t = given('P ≠ NP (open)').proves('this reduction holds', () => true)
    expect(t.value).toBe(true) // the implication evaluates
    expect(t.hypothesis).toMatch(/open/) // but H is disclosed as unproven, not asserted as fact
  })
})
