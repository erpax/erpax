import { describe, it, expect } from 'vitest'
import { sharedKey, eavesdropDetected } from '@/quantum/communication/key'
import { communicate } from '@/communication'

const CU = '0fa7a355-0000-8000-8000-000000000000'

describe('quantum/communication/key — shared secret + eavesdrop detection', () => {
  it('the shared key is symmetric: sharedKey(a,b) === sharedKey(b,a)', () => {
    expect(sharedKey('alice', 'bob')).toBe(sharedKey('bob', 'alice'))
  })

  it('distinct peer pairs derive distinct secrets', () => {
    expect(sharedKey('alice', 'bob')).not.toBe(sharedKey('alice', 'carol'))
  })

  it('an intact relay (same content-uuid) is NOT flagged as eavesdropping', () => {
    const original = communicate('alice', 'bob', CU)
    const relayed = communicate('alice', 'bob', CU)
    expect(eavesdropDetected(original, relayed)).toBe(false)
  })

  it('an intercept-resend yields a different uuid and IS detected (no-cloning)', () => {
    const original = communicate('alice', 'bob', CU)
    const tampered = communicate('alice', 'bob', '22222222-0000-8000-8000-000000000000')
    expect(eavesdropDetected(original, tampered)).toBe(true)
  })

  it('key derivation is deterministic', () => {
    expect(sharedKey('alice', 'bob')).toBe(sharedKey('alice', 'bob'))
  })
})
