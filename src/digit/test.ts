import { describe, it, expect } from 'vitest'
import { digitOf, digitalRoot, digitAddress, digitTrace, offSequence } from '@/digit'

// digit is the computed dual of word: word . digit . uuid is the trinity that
// completes the aura. Off-sequence does not fold (tamper-evident).
describe('digit: the digit-space dual of word (word . digit . uuid)', () => {
  it('digitalRoot is a deterministic base-10 root in 1..9', () => {
    const r = digitalRoot('5e6c7fd0-1313-8330-9938-dbb369e8b326')
    expect(r).toBeGreaterThanOrEqual(1)
    expect(r).toBeLessThanOrEqual(9)
    expect(digitalRoot('5e6c7fd0-1313-8330-9938-dbb369e8b326')).toBe(r)
  })

  it('every atom has a digit address dual to its word (`<horo>/<root>`)', () => {
    expect(typeof digitOf('access')).toBe('number')
    expect(digitAddress('access')).toMatch(/^[1-9]\/[1-9]$/)
    expect(digitAddress('not-an-atom-xyzzy')).toBeUndefined()
  })

  it('the trace folds the whole corpus onto the ring (no off-sequence anomalies)', () => {
    const trace = digitTrace()
    const total = [...trace.values()].reduce((s, a) => s + a.length, 0)
    expect(total).toBeGreaterThan(2000)
    expect(offSequence()).toEqual([])
  })
})
