import { describe, it, expect } from 'vitest'
import { checkErpaxObservesItself } from '@/self/reference'

// self/reference — Conservation Law 23: erpax must observe ITSELF. The genome
// (collectGenome) ⊕ the observation balance to a single verdict; a missing
// section / role / agent surfaces in `missing`. Computed from the live corpus,
// so the result is deterministic with no network/db.
describe('self/reference — erpax observes itself (Law 23)', () => {
  it('returns a verdict with a boolean ok and a string[] missing set', () => {
    const res = checkErpaxObservesItself()
    expect(typeof res.ok).toBe('boolean')
    expect(Array.isArray(res.missing)).toBe(true)
    res.missing.forEach((m) => expect(typeof m).toBe('string'))
  })

  it('ok ⇔ the missing set is empty (the balance law)', () => {
    const res = checkErpaxObservesItself()
    expect(res.ok).toBe(res.missing.length === 0)
  })

  it('is deterministic — repeated observation yields the same verdict', () => {
    const a = checkErpaxObservesItself()
    const b = checkErpaxObservesItself()
    expect(b.ok).toBe(a.ok)
    expect([...b.missing].sort()).toEqual([...a.missing].sort())
  })

  it('any reported gap is drawn from the closed set of checked sections', () => {
    const allowed = new Set([
      'collections',
      'chains',
      'agents',
      'standards',
      'role:erpax-platform',
      'agent:meta-skill',
      'agent:engineering',
    ])
    for (const m of checkErpaxObservesItself().missing) {
      expect(allowed.has(m)).toBe(true)
    }
  })
})
