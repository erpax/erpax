import { describe, it, expect } from 'vitest'
import { isExpired, nextGrant, scopesCovered, type OAuthToken } from '@/oauth'

const token = (over: Partial<OAuthToken> = {}): OAuthToken => ({
  accessToken: 'at',
  refreshToken: 'rt',
  expiresAtIso: '2026-06-02T01:00:00.000Z',
  scopes: ['read'],
  ...over,
})
const NOW = '2026-06-02T00:00:00.000Z' // one hour before the default expiry

describe('oauth — external credential lifecycle as pure policy', () => {
  it('isExpired honours a refresh skew (renew before it lapses)', () => {
    expect(isExpired(token(), NOW)).toBe(false) // 1h to go
    expect(isExpired(token({ expiresAtIso: '2026-06-01T23:00:00.000Z' }), NOW)).toBe(true) // already past
    expect(isExpired(token({ expiresAtIso: '2026-06-02T00:00:30.000Z' }), NOW, 60)).toBe(true) // within the 60s skew
    expect(isExpired(token({ expiresAtIso: 'not-a-date' }), NOW)).toBe(true) // unparseable ⇒ treat as expired (safe)
  })

  it('nextGrant: acquire when absent, refresh when expired+refreshable, nothing when valid', () => {
    expect(nextGrant(null, NOW)).toBe('authorization_code')
    expect(nextGrant(null, NOW, { machineToMachine: true })).toBe('client_credentials')
    expect(nextGrant(token(), NOW)).toBeNull() // valid ⇒ nothing to do
    expect(nextGrant(token({ expiresAtIso: '2026-06-01T23:00:00.000Z' }), NOW)).toBe('refresh_token')
    expect(nextGrant(token({ expiresAtIso: '2026-06-01T23:00:00.000Z', refreshToken: undefined }), NOW)).toBe('authorization_code')
  })

  it('scopesCovered enforces least-privilege', () => {
    expect(scopesCovered(['read', 'write'], ['read'])).toBe(true)
    expect(scopesCovered(['read'], ['read', 'write'])).toBe(false)
    expect(scopesCovered(['read'], [])).toBe(true)
  })
})
