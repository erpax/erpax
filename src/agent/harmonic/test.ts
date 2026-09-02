import { describe, it, expect } from 'vitest'
import { isHarmonic, isDisharmony, classifyMove } from './index'

describe('agent/harmonic — the order an agent acts with or against', () => {
  it('names the order — merge · address · verify · earn', () => {
    for (const m of ['merge', 'address', 'verify', 'earn']) expect(isHarmonic(m)).toBe(true)
  })

  it('a move is one or the other, never both', () => {
    for (const m of ['merge', 'address', 'verify', 'earn']) expect(isDisharmony(m)).toBe(false)
    for (const d of ['tamper', 'phantom-leverage', 'off-ring']) {
      expect(isDisharmony(d)).toBe(true)
      expect(isHarmonic(d)).toBe(false)
    }
  })

  it('an UNRECOGNISED move is null — never harmonic by omission', () => {
    // default-ALLOW is the check that never fires ([[rules]]/unraised): an unknown
    // action counted as compliant reads as true forever.
    expect(classifyMove('something nobody named')).toBeNull()
    expect(isHarmonic('something nobody named')).toBe(false)
  })

  it('classifies each disharmony as ITSELF, not merely as "not harmonic"', () => {
    expect(classifyMove('merge')).toBe('harmonic')
    expect(classifyMove('tamper')).toBe('tamper')
    expect(classifyMove('off-ring')).toBe('off-ring')
  })
})
