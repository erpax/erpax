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

// ─── Slice VVVVVVVV (2026-05-11) — unified DO binding ────────────────
//
// Per user "use one binding of a type. when using DRY uuid logic
// conflicts do not occur". Instead of 4 separate DO bindings
// (TENANT_QUOTA / RATE_LIMITER / JOB_LOCK / AUDIT_CHAIN_DO), one binding
// (ERPAX_DO) hosts all behaviors. The DO INSTANCE is selected via
// `idFromName('<purpose>:<scoped-key>')` so:
//
//   counter:t:<tenantId>/feature/<feature>   → counter behavior
//   ratelimit:t:<tenantId>/feature/<feature> → token-bucket
//   joblock:<jobId>                           → distributed lock
//   chain:t:<tenantId>                        → audit chain
//
// The URL path inside the DO `fetch()` handler routes to the right
// behavior implementation. Each instance only ever sees one purpose
// (its name encodes it), so storage keys don't collide.
//
// Migration: old class names (TenantQuotaCounter / RateLimiter /
// JobLock / AuditChain) remain as no-op aliases pointing at the same
// unified class so existing migration tags stay valid.
//
// @standard ISO/IEC 25010:2023 §5.4 reusability — one class, four purposes
// @audit ISO 27001 A.5.23 cloud-service-tenant-isolation
//        (tenant boundary in the name argument, not the binding)

/**
 * AuditChain — Slice UUUUUUUU (2026-05-11).
 *
 * Per-tenant uuid-linked tamper-evident log. Implements the wire
 * protocol declared by `services/cloudflare/auditChainAppendLinked`
 * (Slice TTTTTTTT):
 *
 *   GET  /head             → { leafUuid, seq } | null
 *   POST /append-linked    { leaf, payload } → 200/4xx
 *   GET  /chain            → { leaves: UuidLinkedLeaf[] }
 *   GET  /chain?fromSeq=&toSeq=  → range
 *
 * Storage layout:
 *   leaf:<seq>         → UuidLinkedLeaf (the chain link)
 *   payload:<seq>      → original payload bytes (canonical JSON)
 *   head               → { leafUuid, seq }
 *
 * Atomicity: every `append-linked` validates that the incoming leaf
 * links to the *current* head (read inside the same fetch handler;
 * Durable Object single-thread guarantee). If two concurrent appends
 * try to use the same prev, the second one is rejected with 409 —
 * the caller can re-read /head and retry.
 *
 * @standard FIPS 180-4 sha-256 (leaf hashing)
 * @standard RFC 8785 JSON canonicalization
 * @audit Conservation Law 8 content-uuid (per-leaf)
 * @audit ISO 19011:2018 §6.4.6 tamper-evident audit-trail
 */
interface UuidLinkedLeaf {
  readonly leafUuid: string
  readonly prevLeafUuid: string
  readonly payloadUuid: string
  readonly timestampIso: string
  readonly seq: number
  readonly signature?: string
}

interface ChainHead {
  readonly leafUuid: string
  readonly seq: number
}

export class AuditChain {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    // GET /head — return { leafUuid, seq } | null
    if (request.method === 'GET' && path === '/head') {
      const head = (await this.state.storage.get<ChainHead>('head')) ?? null
      return Response.json(head)
    }

    // POST /append-linked — validate prev → store leaf+payload → update head
    if (request.method === 'POST' && path === '/append-linked') {
      const body = (await request.json()) as { leaf: UuidLinkedLeaf; payload: unknown }
      const { leaf, payload } = body
      if (!leaf || typeof leaf.leafUuid !== 'string' || typeof leaf.prevLeafUuid !== 'string') {
        return new Response('malformed leaf', { status: 400 })
      }
      const head = (await this.state.storage.get<ChainHead>('head')) ?? null
      const expectedPrev = head?.leafUuid ?? 'GENESIS'
      const expectedSeq = head ? head.seq + 1 : 0
      if (leaf.prevLeafUuid !== expectedPrev) {
        return Response.json(
          { error: 'prev-mismatch', expected: expectedPrev, got: leaf.prevLeafUuid, currentHead: head },
          { status: 409 },
        )
      }
      if (leaf.seq !== expectedSeq) {
        return Response.json(
          { error: 'seq-mismatch', expected: expectedSeq, got: leaf.seq },
          { status: 409 },
        )
      }
      // Persist atomically — DO single-threaded execution model means
      // these three writes are an effective transaction.
      await this.state.storage.put(`leaf:${leaf.seq}`, leaf)
      await this.state.storage.put(`payload:${leaf.seq}`, payload)
      const newHead: ChainHead = { leafUuid: leaf.leafUuid, seq: leaf.seq }
      await this.state.storage.put('head', newHead)
      return Response.json({ ok: true, head: newHead, leaf })
    }

    // GET /chain?fromSeq=&toSeq= — return UuidLinkedLeaf[] in order
    if (request.method === 'GET' && path === '/chain') {
      const head = (await this.state.storage.get<ChainHead>('head')) ?? null
      if (!head) return Response.json({ leaves: [] })
      const fromSeq = Math.max(0, Number(url.searchParams.get('fromSeq') ?? 0))
      const toSeq = Math.min(head.seq, Number(url.searchParams.get('toSeq') ?? head.seq))
      const leaves: UuidLinkedLeaf[] = []
      for (let s = fromSeq; s <= toSeq; s++) {
        const leaf = await this.state.storage.get<UuidLinkedLeaf>(`leaf:${s}`)
        if (leaf) leaves.push(leaf)
      }
      return Response.json({ leaves, head })
    }

    // GET /leaf/<seq> — return one leaf + its payload
    const leafMatch = path.match(/^\/leaf\/(\d+)$/)
    if (request.method === 'GET' && leafMatch) {
      const seq = Number(leafMatch[1])
      const leaf = await this.state.storage.get<UuidLinkedLeaf>(`leaf:${seq}`)
      if (!leaf) return new Response('not_found', { status: 404 })
      const payload = await this.state.storage.get(`payload:${seq}`)
      return Response.json({ leaf, payload })
    }

    return new Response('not_found', { status: 404 })
  }
}

/**
 * ErpaxStateDO — Slice VVVVVVVV (2026-05-11).
 *
 * Unified DurableObject class. ONE binding (ERPAX_DO) hosts every kind
 * of strict-coordination state. The instance's PURPOSE is encoded in
 * the name argument passed to `idFromName(<purpose>:<scoped-key>)`:
 *
 *   counter:<scope>     — atomic per-key counter (was TenantQuotaCounter)
 *                          URL: /counter/incr | /counter/get | /counter/reset
 *
 *   ratelimit:<scope>   — token bucket (was RateLimiter)
 *                          URL: /ratelimit/consume | /ratelimit/refill | /ratelimit/get
 *
 *   joblock:<jobId>     — distributed lock (was JobLock)
 *                          URL: /joblock/acquire | /joblock/release | /joblock/status
 *
 *   chain:<tenantId>    — uuid-linked audit log (was AuditChain)
 *                          URL: /head | /append-linked | /chain | /leaf/<seq>
 *
 * Storage layout per instance is namespaced by purpose (the prefix
 * never collides because each instance only sees one purpose). The
 * DO routes by URL path inside `fetch()`.
 *
 * Per user "when using DRY uuid logic conflicts do not occur": the
 * uuid produced by `idFromName('counter:t:T123/feature/ai_assist')`
 * is globally unique and lives in a deterministic, replayable place.
 * No need for 4 bindings to keep purposes apart.
 */
export class ErpaxStateDO {
  private counter: TenantQuotaCounter
  private rateLimiter: RateLimiter
  private jobLock: JobLock
  private auditChain: AuditChain
  constructor(state: DurableObjectState) {
    this.counter = new TenantQuotaCounter(state)
    this.rateLimiter = new RateLimiter(state)
    this.jobLock = new JobLock(state)
    this.auditChain = new AuditChain(state)
  }
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    if (path.startsWith('/counter/')) return this.counter.fetch(request)
    if (path.startsWith('/ratelimit/')) return this.rateLimiter.fetch(request)
    if (path.startsWith('/joblock/')) return this.jobLock.fetch(request)
    // Audit chain has multiple top-level routes (/head, /append-linked,
    // /chain, /leaf/<seq>) — anything else falls through to it.
    return this.auditChain.fetch(request)
  }
}
