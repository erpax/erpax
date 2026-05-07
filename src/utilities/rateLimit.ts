/**
 * Simple in-memory rate limiter for login attempts
 * Production: Consider using Cloudflare KV or Redis for distributed rate limiting
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
 * Generate rate limit key from email and IP address
 */
export function getRateLimitKey(email: string, ip: string | null): string {
  return `${email}:${ip || 'unknown'}`
}

/**
 * Check if request is within rate limit
 * Returns { allowed: boolean, remaining: number, resetAt: number }
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
 * Clear rate limit entry (call after successful login to reset counter)
 */
export function clearRateLimit(key: string): void {
  attempts.delete(key)
}

/**
 * Get remaining time in seconds until rate limit resets
 */
export function getRateLimitResetSeconds(resetAt: number): number {
  const now = Date.now()
  return Math.max(0, Math.ceil((resetAt - now) / 1000))
}
