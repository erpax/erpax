import { describe, it, expect } from 'vitest'
import {
  getRateLimitKey,
  checkRateLimit,
  clearRateLimit,
  getRateLimitResetSeconds,
} from '@/rfc/6585'

// RFC 6585 §4 — 429 Too Many Requests: in-memory window counter (5 / minute).
describe('rfc/6585 — 429 Too Many Requests window counter', () => {
  it('getRateLimitKey composes email:ip, defaulting a null ip to "unknown"', () => {
    expect(getRateLimitKey('a@b.com', '1.2.3.4')).toBe('a@b.com:1.2.3.4')
    expect(getRateLimitKey('a@b.com', null)).toBe('a@b.com:unknown')
  })

  it('allows up to MAX_ATTEMPTS then blocks, with remaining counting down', () => {
    const key = getRateLimitKey('count@b.com', 'ip-count')
    clearRateLimit(key)
    const r1 = checkRateLimit(key)
    expect(r1.allowed).toBe(true)
    expect(r1.remaining).toBe(4)
    // exhaust the rest of the window (attempts 2..5)
    for (let i = 0; i < 4; i++) checkRateLimit(key)
    const blocked = checkRateLimit(key) // 6th attempt
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it('clearRateLimit resets the window so the next request is allowed again', () => {
    const key = getRateLimitKey('clear@b.com', 'ip-clear')
    for (let i = 0; i < 6; i++) checkRateLimit(key)
    expect(checkRateLimit(key).allowed).toBe(false)
    clearRateLimit(key)
    expect(checkRateLimit(key).allowed).toBe(true)
  })

  it('getRateLimitResetSeconds is non-negative and 0 for a past reset', () => {
    expect(getRateLimitResetSeconds(Date.now() - 5000)).toBe(0)
    expect(getRateLimitResetSeconds(Date.now() + 30_000)).toBeGreaterThan(0)
  })
})
