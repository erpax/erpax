/**
 * Durable Object stubs for Slice YYY deep-AI coordination.
 *
 *   `TenantQuotaCounter` — atomic per-tenant per-feature counter.
 *     Replaces the soft `usage-records` count in `getFeatureLimit`
 *     with a race-free counter that survives concurrent inferences.
 *     One DO instance per `(tenant, feature, billingPeriod)` triple.
 *
 *   `RateLimiter` — token-bucket per-tenant per-feature with
 *     exponential backoff. Used by the AI service to refuse calls
 *     when the tenant is hammering the model (cost guard).
 *
 *   `JobLock` — distributed lock for serialised execution of
 *     period-close + JE-post + payroll-run. SOX §404 demands these
 *     run race-free.
 *
 * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties race-free
 * @compliance SOX §404 internal-controls atomic-state
 * @audit ISO-19011:2018 audit-trail coordination-evidence
 */

interface DurableObjectState {
  storage: {
    get<T = unknown>(key: string): Promise<T | undefined>
    put(key: string, value: unknown): Promise<void>
    delete(key: string): Promise<boolean>
  }
}

/**
 * Per-(tenant, feature, billingPeriod) atomic counter for AI usage.
 * Beats the soft `usage-records` aggregation by being race-free.
 */
export class TenantQuotaCounter {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const action = url.pathname.split('/').pop()
    if (action === 'increment') {
      const current = (await this.state.storage.get<number>('count')) ?? 0
      const next = current + 1
      await this.state.storage.put('count', next)
      return Response.json({ count: next })
    }
    if (action === 'get') {
      const count = (await this.state.storage.get<number>('count')) ?? 0
      return Response.json({ count })
    }
    if (action === 'reset') {
      await this.state.storage.put('count', 0)
      return Response.json({ count: 0 })
    }
    return new Response('not_found', { status: 404 })
  }
}

/**
 * Token-bucket rate limiter per-(tenant, feature) — refills `refillRate`
 * tokens per minute up to `bucketSize`. Returns 429 when exhausted.
 */
export class RateLimiter {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    const { bucketSize = 30, refillRate = 30, cost = 1 } = (await request.json()) as {
      bucketSize?: number
      refillRate?: number
      cost?: number
    }
    const now = Date.now()
    const bucket = (await this.state.storage.get<{ tokens: number; lastRefill: number }>('bucket')) ?? {
      tokens: bucketSize,
      lastRefill: now,
    }
    // Refill since last call.
    const elapsedMin = (now - bucket.lastRefill) / 60000
    bucket.tokens = Math.min(bucketSize, bucket.tokens + elapsedMin * refillRate)
    bucket.lastRefill = now
    if (bucket.tokens < cost) {
      await this.state.storage.put('bucket', bucket)
      return Response.json({ allowed: false, retryAfterSeconds: Math.ceil((cost - bucket.tokens) * (60 / refillRate)) }, { status: 429 })
    }
    bucket.tokens -= cost
    await this.state.storage.put('bucket', bucket)
    return Response.json({ allowed: true, remaining: Math.floor(bucket.tokens) })
  }
}

/**
 * Distributed lock — caller passes the lock id (e.g. `period-close:tenant-42:2026-04`)
 * and TTL; second caller during the lock window gets `held`.
 *
 * Used by SOX §404-controlled jobs: period-close, JE-post-batch,
 * payroll-run-finalise — no two concurrent runs allowed.
 */
export class JobLock {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const action = url.pathname.split('/').pop()
    const now = Date.now()
    if (action === 'acquire') {
      const { ttlMs = 60_000 } = (await request.json()) as { ttlMs?: number }
      const heldUntil = await this.state.storage.get<number>('heldUntil')
      if (heldUntil && heldUntil > now) {
        return Response.json({ acquired: false, heldUntil }, { status: 409 })
      }
      await this.state.storage.put('heldUntil', now + ttlMs)
      return Response.json({ acquired: true, heldUntil: now + ttlMs })
    }
    if (action === 'release') {
      await this.state.storage.delete('heldUntil')
      return Response.json({ released: true })
    }
    if (action === 'status') {
      const heldUntil = (await this.state.storage.get<number>('heldUntil')) ?? 0
      return Response.json({ heldUntil, isHeld: heldUntil > now })
    }
    return new Response('not_found', { status: 404 })
  }
}
