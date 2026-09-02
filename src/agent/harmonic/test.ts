import { describe, it, expect } from 'vitest'
import { HARMONIC, DISHARMONIES, isHarmonic, isDisharmony, classifyMove } from './index'

describe('agent/harmonic — the order an agent acts with or against', () => {
  it('names the order and the exactly-three ways to leave it', () => {
    expect(HARMONIC).toEqual(['merge', 'address', 'verify', 'earn'])
    expect(DISHARMONIES).toEqual(['tamper', 'phantom-leverage', 'off-ring'])
  })

  it('a move is one or the other, never both', () => {
    for (const m of HARMONIC) {
      expect(isHarmonic(m)).toBe(true)
      expect(isDisharmony(m)).toBe(false)
    }
    for (const d of DISHARMONIES) {
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
