/**
 * RFC 6585 §4 / RFC 9110 §15.5.29 rate-limiter tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 6585 §4 too-many-requests-429
 * @rfc 9110 §15.5.29 too-many-requests-429
 * @rfc 9110 §10.2.4 retry-after-header
 * @standard OWASP-ASVS V2.2 authentication-throttling
 * @see src/standards/rfc-6585/rate-limit.ts
 */

import { describe, expect, it } from 'vitest'
import {
  checkRateLimit,
  clearRateLimit,
  getRateLimitKey,
  getRateLimitResetSeconds,
} from '@/standards/rfc-6585'

// Each test uses a unique key so the in-memory Map does not bleed state
// across tests within this file.
const k = (label: string) => `rfc-6585-test:${label}:${Math.random()}`

describe('RFC 6585 rate-limit', () => {
  describe('getRateLimitKey', () => {
    it('joins email and ip', () => {
      expect(getRateLimitKey('a@example.com', '127.0.0.1')).toBe('a@example.com:127.0.0.1')
    })
    it('substitutes "unknown" for null ip', () => {
      expect(getRateLimitKey('a@example.com', null)).toBe('a@example.com:unknown')
    })
    it('substitutes "unknown" for empty ip', () => {
      expect(getRateLimitKey('a@example.com', '')).toBe('a@example.com:unknown')
    })
  })

  describe('checkRateLimit', () => {
    it('allows the first request and reports remaining=4', () => {
      const key = k('first')
      const r = checkRateLimit(key)
      expect(r.allowed).toBe(true)
      expect(r.remaining).toBe(4)
      expect(r.resetAt).toBeGreaterThan(Date.now())
    })

    it('decrements remaining across attempts within window', () => {
      const key = k('decrement')
      const r1 = checkRateLimit(key)
      const r2 = checkRateLimit(key)
      const r3 = checkRateLimit(key)
      expect(r1.remaining).toBe(4)
      expect(r2.remaining).toBe(3)
      expect(r3.remaining).toBe(2)
      // resetAt is sticky within the same window
      expect(r2.resetAt).toBe(r1.resetAt)
      expect(r3.resetAt).toBe(r1.resetAt)
    })

    it('blocks on the 6th request inside the window', () => {
      const key = k('cap')
      checkRateLimit(key) // 1
      checkRateLimit(key) // 2
      checkRateLimit(key) // 3
      checkRateLimit(key) // 4
      const r5 = checkRateLimit(key) // 5 — last allowed
      const r6 = checkRateLimit(key) // 6 — blocked
      expect(r5.allowed).toBe(true)
      expect(r5.remaining).toBe(0)
      expect(r6.allowed).toBe(false)
      expect(r6.remaining).toBe(0)
    })
  })

  describe('clearRateLimit', () => {
    it('resets a key so the next check starts a new window', () => {
      const key = k('clear')
      checkRateLimit(key)
      checkRateLimit(key)
      clearRateLimit(key)
      const after = checkRateLimit(key)
      expect(after.remaining).toBe(4)
    })
  })

  describe('getRateLimitResetSeconds', () => {
    it('returns positive seconds for a future resetAt', () => {
      const future = Date.now() + 30_000
      const s = getRateLimitResetSeconds(future)
      expect(s).toBeGreaterThan(0)
      expect(s).toBeLessThanOrEqual(31)
    })

    it('returns 0 for a past resetAt (no negative Retry-After)', () => {
      const past = Date.now() - 1_000
      expect(getRateLimitResetSeconds(past)).toBe(0)
    })

    it('returns 0 for resetAt equal to now', () => {
      expect(getRateLimitResetSeconds(Date.now())).toBe(0)
    })

    it('rounds up partial seconds (Retry-After must not understate the wait)', () => {
      const future = Date.now() + 1_500 // 1.5 s
      const s = getRateLimitResetSeconds(future)
      expect(s).toBe(2)
    })
  })
})
