import { describe, it, expect } from 'vitest'
import * as digitModule from '@/digit'
import { digitOf, digitalRootOfUuid, digitAddress, digitTrace, offSequence } from '@/digit'
import { digitalRoot as horoDigitalRoot } from '@/horo'

// digit is the computed dual of word: word . digit . uuid is the trinity that
// completes the aura. Off-sequence does not fold (tamper-evident).
describe('digit: the digit-space dual of word (word . digit . uuid)', () => {
  it('digitalRootOfUuid is a deterministic base-10 root in 1..9', () => {
    const r = digitalRootOfUuid('5e6c7fd0-1313-8330-9938-dbb369e8b326')
    expect(r).toBeGreaterThanOrEqual(1)
    expect(r).toBeLessThanOrEqual(9)
    expect(digitalRootOfUuid('5e6c7fd0-1313-8330-9938-dbb369e8b326')).toBe(r)
    // the nil uuid reduces to 0; the canonical name is the self-describing one.
    expect(digitalRootOfUuid('00000000-0000-0000-0000-000000000000')).toBe(0)
  })

  it('the uuid-form is named distinctly from the @/horo integer reduction (no collision)', () => {
    // @/digit's uuid-content root and @/horo's integer root are DIFFERENT functions
    // that must not share the canonical name — the rename removes the alias burden.
    expect(typeof digitModule.digitalRootOfUuid).toBe('function')
    expect(digitalRootOfUuid).not.toBe(horoDigitalRoot)
    // The bare `digitalRoot` export is GONE — the @deprecated alias was deleted once the three
    // external callers (@/mirror, @/quantum/particle, @/quantum/math) migrated to digitalRootOfUuid.
    expect((digitModule as Record<string, unknown>).digitalRoot).toBeUndefined()
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
