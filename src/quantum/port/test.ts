import { describe, it, expect } from 'vitest'
import { portUuid, alreadyPorted } from '@/quantum/port'

describe('quantum/port — content-addressed, idempotent porting', () => {
  it('portUuid is deterministic per source (same source ⇒ same identity)', () => {
    expect(portUuid('users')).toBe(portUuid('users'))
    expect(portUuid('users')).not.toBe(portUuid('invoices'))
  })
  it('alreadyPorted makes re-porting idempotent (a no-op for known sources)', () => {
    const known = new Set([portUuid('users')])
    expect(alreadyPorted('users', known)).toBe(true)
    expect(alreadyPorted('invoices', known)).toBe(false)
  })
})
