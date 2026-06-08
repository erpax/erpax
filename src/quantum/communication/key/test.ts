import { describe, it, expect } from 'vitest'
import { sharedKey, eavesdropDetected } from '@/quantum/communication/key'
import { communicate } from '@/communication'
import { toUuid } from '@/uuid/matrix'

const CU = toUuid(Buffer.from('quantum:key:demo', 'utf8'))
const CU_TAMPERED = toUuid(Buffer.from('quantum:key:tampered', 'utf8'))

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
    const tampered = communicate('alice', 'bob', CU_TAMPERED)
    expect(eavesdropDetected(original, tampered)).toBe(true)
  })

  it('key derivation is deterministic', () => {
    expect(sharedKey('alice', 'bob')).toBe(sharedKey('alice', 'bob'))
  })
})
