/**
 * Simple in-memory rate limiter — `429 Too Many Requests` semantics.
 *
 * Production note: in multi-worker deployments, swap the `Map<>` for KV /
 * Redis so the limit window is shared across instances.
 *
 * @rfc 6585 §4 too-many-requests-429
 * @rfc 9110 §15.5.29 too-many-requests-429 superseding-spec
 * @rfc 9110 http-semantics
 * @standard OWASP-ASVS V2.2 authentication-throttling
 * @standard NIST SP-800-63B §5.2.2 rate-limiting
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_ATTEMPTS = 5

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store for rate limit tracking
// Note: In production with multiple workers, use KV storage instead
const attempts = new Map<string, RateLimitEntry>()

/**
 * Generate rate limit key from email and IP address.
 */
export function getRateLimitKey(email: string, ip: string | null): string {
  return `${email}:${ip || 'unknown'}`
}

/**
 * Check if request is within rate limit.
 *
 * @rfc 6585 §4 enforcement
 */
export function checkRateLimit(key: string): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const record = attempts.get(key)

  if (!record || record.resetAt < now) {
    // New window or expired - allow request
    const resetAt = now + RATE_LIMIT_WINDOW
    attempts.set(key, { count: 1, resetAt })
    return {
      allowed: true,
      remaining: MAX_ATTEMPTS - 1,
      resetAt,
    }
  }

  if (record.count >= MAX_ATTEMPTS) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    }
  }

  // Increment and allow
  record.count++
  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - record.count,
    resetAt: record.resetAt,
  }
}

/**
 * Clear rate limit entry (call after successful login to reset counter).
 */
export function clearRateLimit(key: string): void {
  attempts.delete(key)
}

/**
 * Get remaining time in seconds until rate limit resets.
 *
 * @rfc 9110 §10.2.4 retry-after-header
 */
export function getRateLimitResetSeconds(resetAt: number): number {
  const now = Date.now()
  return Math.max(0, Math.ceil((resetAt - now) / 1000))
}
