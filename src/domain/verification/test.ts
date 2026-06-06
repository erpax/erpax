import { describe, it, expect } from 'vitest'
import { challenge, verifyDomain, needsReverification } from '@/domain/verification'

// Content-addressed domain-control validation (ACME DNS-01 pattern): the published record
// value IS the object's content-uuid, so any change to the object self-invalidates the proof.
describe('domain/verification — content-addressed DCV, re-verify on change', () => {
  it('challenge publishes the content-uuid token at the _erpax-challenge label', () => {
    const c = challenge('acme.example', 'manifest-v1')
    expect(c.record).toBe('_erpax-challenge.acme.example')
    expect(c.type).toBe('TXT')
    expect(c.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('verification holds while the proven object is unchanged', () => {
    const c = challenge('acme.example', 'manifest-v1')
    expect(verifyDomain(c.value, 'manifest-v1')).toBe(true)
    expect(needsReverification(c.value, 'manifest-v1')).toBe(false)
  })
  it('any change to the object requires re-verification (by architecture, not by expiry)', () => {
    const c = challenge('acme.example', 'manifest-v1')
    expect(verifyDomain(c.value, 'manifest-v2')).toBe(false)
    expect(needsReverification(c.value, 'manifest-v2')).toBe(true)
  })
})
