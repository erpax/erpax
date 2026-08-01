/**
 * api/integration — the OUTBOUND face of the one api atom: any external system, one seam.
 *
 * Inbound and outbound coexist here rather than in two atoms, because they are one surface observed
 * twice ([[perspective]]): [[api]] already holds Local/REST/GraphQL — the three ways the world calls
 * erpax — and this is the fourth face, the one way erpax calls the world. Same law, opposite arrow.
 *
 * [[trello]] proved the pattern against a system erpax did not design. This dissolves the vendor out
 * of it: what was `TrelloRateLimiter · TrelloError · TrelloConfig · createTrelloClient` is here as
 * `RateLimiter · IntegrationError · IntegrationConfig · createIntegrationClient`, and a vendor
 * becomes a **spec** — base URL, auth strategy, published limits, endpoints. Trello is then ~40
 * lines of data rather than 200 of machinery, and the next vendor costs the same.
 *
 * The four things every keyed HTTP API needs, and the ones that are not negotiable:
 *
 *   - **Errors PROPAGATE.** A non-2xx becomes `IntegrationError` carrying vendor · status · verb ·
 *     path · body. There is no catch in this file ([[convention]]/sealed). A revoked key (401), a
 *     missing resource (404) and an outage (503) are three different repairs; a defaulted catch
 *     makes all three look like an empty result.
 *   - **A burst QUEUES, it does not drop.** Published limits are a continuous-refill token bucket,
 *     and every limit a vendor declares binds at once — the wait is the largest. Past the line
 *     `reserve()` returns the ms owed, so queueing is a number a test reads.
 *   - **The credential fails CLOSED.** `configFromEnv` throws when a required key is absent. A
 *     default here is a silent unauthenticated client — the assumption that leaks entropy.
 *   - **Auth is DECLARED, never guessed.** Query-param, Bearer and header auth are three different
 *     wire shapes; a spec says which, and `authorize` applies exactly that one.
 *
 * @standard RFC 9110 §9 http-semantics (methods, status classes, safe/idempotent)
 * @standard RFC 6749 §1.4 bearer-credential — the token is the whole authority, env-only
 * @standard ISO/IEC 25010:2023 §5.7.2 fault-tolerance — a rate-limited burst queues; it does not drop
 * @invariant reserve() returns 0 while a bucket has a token and a positive wait once it is spent.
 * @invariant a non-2xx ALWAYS throws — this module contains no catch.
 * @see ./SKILL.md -- ../../trello -- ../../convention/sealed -- ../../constitution
 */
import { algebraLog2, exactCeil, exactMax, exactMaxOf, exactMin } from '@/algebra'

/** A published rate limit — `capacity` requests per `windowMs`, refilled continuously. */
export interface RateLimit {
  /** what the limit is scoped to, as the vendor documents it (key · token · ip · account) */
  readonly scope: string
  readonly capacity: number
  readonly windowMs: number
}

/** How a vendor expects the credential on the wire. Declared per spec — never inferred from a name. */
export type AuthStyle = 'query' | 'bearer' | 'header'

/** One external system, described as data. Everything vendor-specific lives here and nowhere else. */
export interface IntegrationSpec {
  /** the one-word vendor slug — the atom that owns this spec */
  readonly vendor: string
  /** REST root; every path is appended to it */
  readonly baseUrl: string
  readonly auth: AuthStyle
  /** env var names the credential is read from, in wire order (e.g. ['TRELLO_API_KEY','TRELLO_TOKEN']) */
  readonly credentials: readonly string[]
  /** for `query`: the param names, positionally matched to `credentials`; for `header`: the header names */
  readonly authNames?: readonly string[]
  /** every published limit — all of them bind at once */
  readonly limits: readonly RateLimit[]
  /** where the vendor documents the limits — the recompute path for the numbers above */
  readonly limitsSource: string
}

/** A continuous-refill token bucket. It never rejects: past the line it returns the ms owed. */
export class TokenBucket {
  private tokens: number
  private last: number

  constructor(
    private readonly limit: RateLimit,
    private readonly now: () => number = Date.now,
  ) {
    this.tokens = limit.capacity
    this.last = now()
  }

  private get rate(): number {
    return this.limit.capacity / this.limit.windowMs
  }

  /** Reserve one slot. Returns the ms to wait before it may be used — 0 while the bucket has one. */
  reserve(): number {
    const t = this.now()
    this.tokens = exactMin(this.limit.capacity, this.tokens + (t - this.last) * this.rate)
    this.last = t
    const owed = this.tokens >= 1 ? 0 : exactCeil((1 - this.tokens) / this.rate)
    this.tokens -= 1
    return owed
  }
}

/** Every published limit at once — the wait is the largest, because all of them must be satisfied. */
export class RateLimiter {
  private readonly buckets: readonly TokenBucket[]

  constructor(limits: readonly RateLimit[], now: () => number = Date.now) {
    this.buckets = limits.map((l) => new TokenBucket(l, now))
  }

  /** Ms the next request must wait to satisfy EVERY declared limit. */
  reserve(): number {
    if (this.buckets.length === 0) return 0
    return exactMaxOf(this.buckets.map((b) => b.reserve()))
  }
}

/** A non-2xx from a vendor, carried whole — the evidence a caller needs to tell 401 from 404 from 503. */
export class IntegrationError extends Error {
  constructor(
    readonly vendor: string,
    readonly status: number,
    readonly method: string,
    readonly path: string,
    readonly body: string,
  ) {
    super(`${vendor} ${method} ${path} — HTTP ${status}: ${body.slice(0, 500)}`)
    this.name = 'IntegrationError'
  }
}

/** The env face an integration reads — narrow and readonly, so a caller passes only what it sets. */
export type IntegrationEnv = Readonly<Record<string, string | undefined>>

/** Resolved credentials plus the seams; everything injectable is injected so a proof needs no network. */
export interface IntegrationConfig {
  readonly spec: IntegrationSpec
  /** credential values, positionally matched to `spec.credentials` */
  readonly values: readonly string[]
  readonly baseUrl?: string
  readonly fetchImpl?: typeof fetch
  readonly limiter?: RateLimiter
  readonly sleep?: (ms: number) => Promise<void>
}

/**
 * Read a spec's credentials from the environment, failing CLOSED when any is absent. The error names
 * every missing variable at once, so a caller fixes the environment in one pass rather than N.
 */
export function configFromEnv(spec: IntegrationSpec, env: IntegrationEnv = process.env): IntegrationConfig {
  const missing = spec.credentials.filter((c) => !env[c])
  if (missing.length > 0) {
    throw new Error(
      `${spec.vendor}: ${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} required. ` +
        'A credential grants the holder\'s authority — set it in the environment, never in the repo.',
    )
  }
  return { spec, values: spec.credentials.map((c) => env[c]!) }
}

/** True when every credential a spec needs is present — an explicit absence, never a caught error. */
export function credentialed(spec: IntegrationSpec, env: IntegrationEnv = process.env): boolean {
  return spec.credentials.every((c) => Boolean(env[c]))
}

/**
 * Apply the DECLARED auth style to a request. Query auth writes params, bearer writes one
 * Authorization header, header auth writes one header per credential — three different wire shapes,
 * and the spec says which. An unknown style is unreachable by the type, so nothing is guessed.
 */
export function authorize(
  config: IntegrationConfig,
  url: URL,
  headers: Record<string, string>,
): { readonly url: URL; readonly headers: Record<string, string> } {
  const { spec, values } = config
  const names = spec.authNames ?? spec.credentials
  if (spec.auth === 'query') {
    values.forEach((v, i) => url.searchParams.set(names[i] ?? spec.credentials[i]!, v))
  } else if (spec.auth === 'bearer') {
    headers.Authorization = `Bearer ${values[0]}`
  } else {
    values.forEach((v, i) => {
      headers[names[i] ?? spec.credentials[i]!] = v
    })
  }
  return { url, headers }
}

/** Build the authed URL for a path — the spec's auth style decides whether the credential lands here. */
export function authedUrl(
  config: IntegrationConfig,
  path: string,
  params: Readonly<Record<string, string | undefined>> = {},
): string {
  const url = new URL(`${config.baseUrl ?? config.spec.baseUrl}${path}`)
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v)
  return authorize(config, url, {}).url.toString()
}

export interface IntegrationClient {
  readonly spec: IntegrationSpec
  request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    params?: Readonly<Record<string, string | undefined>>,
  ): Promise<T>
}

const defaultSleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

/**
 * The typed client for any spec. One seam: reserve a slot against every published limit, wait the ms
 * owed, call, and PROPAGATE anything that is not 2xx. There is no catch in this function.
 */
export function createIntegrationClient(config: IntegrationConfig): IntegrationClient {
  const doFetch = config.fetchImpl ?? fetch
  const limiter = config.limiter ?? new RateLimiter(config.spec.limits)
  const sleep = config.sleep ?? defaultSleep

  return {
    spec: config.spec,
    async request<T>(
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      path: string,
      params: Readonly<Record<string, string | undefined>> = {},
    ): Promise<T> {
      const owed = limiter.reserve()
      if (owed > 0) await sleep(owed)
      const url = new URL(`${config.baseUrl ?? config.spec.baseUrl}${path}`)
      for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v)
      const authed = authorize(config, url, {})
      const res = await doFetch(authed.url.toString(), { method, headers: authed.headers })
      if (!res.ok) throw new IntegrationError(config.spec.vendor, res.status, method, path, await res.text())
      return (await res.json()) as T
    },
  }
}

/** The tightest published limit — the one that actually bites first, computed rather than assumed. */
export function bindingLimit(spec: IntegrationSpec): RateLimit | undefined {
  if (spec.limits.length === 0) return undefined
  return spec.limits.reduce((tightest, l) =>
    l.capacity / l.windowMs < tightest.capacity / tightest.windowMs ? l : tightest,
  )
}

/** Burst size a spec admits before anything waits — the smallest capacity across its limits. */
export function burstCapacity(spec: IntegrationSpec): number {
  if (spec.limits.length === 0) return Number.POSITIVE_INFINITY
  return spec.limits.reduce((lo, l) => exactMin(lo, l.capacity), exactMax(spec.limits[0]!.capacity, 0))
}

// ── The reuse fold — every vendor's IO measured on ONE instrument ────────────────────────────────
// Standardising the seam is only worth it if the SAME number falls out of every vendor. A request
// has an address (method ⊕ path ⊕ canonical params), so a repeat of a SAFE request is answered from
// the fold at zero upstream cost — reuse, not search ([[quantum]]/ftl). The counters are MEASURED,
// never supplied: `calls` is upstream fetches actually made, and `holds` is computed from the two.
//
// ONLY SAFE METHODS FOLD. A POST/PUT/PATCH/DELETE is not idempotent (RFC 9110 §9.2.2) and deduping
// one would DROP A WRITE — the worst possible "optimisation". GET and HEAD fold; everything else
// always goes to the wire, and the honest consequence is that a write-heavy client shows no speedup.

/** What a folding client actually spent — every field measured from its own behaviour. */
export interface IntegrationFtl {
  /** requests served to the caller */
  readonly answers: number
  /** upstream fetches actually made */
  readonly calls: number
  /** answers served from the retained fold */
  readonly reuses: number
  /** reuse ≠ search: some answer cost no upstream call, and calls < answers */
  readonly holds: boolean
  /** log₂ of the search a fold replaced — 0 when nothing was reused */
  readonly speedupLog2: number
}

/** Safe methods only — folding a write would drop it (RFC 9110 §9.2.1 safe, §9.2.2 idempotent). */
const SAFE = new Set(['GET', 'HEAD'])

/** The address of a request — method ⊕ path ⊕ params, key-order independent. */
export function requestAddress(
  method: string,
  path: string,
  params: Readonly<Record<string, string | undefined>>,
): string {
  const sorted = Object.keys(params)
    .filter((k) => params[k] !== undefined)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return `${method} ${path}${sorted ? `?${sorted}` : ''}`
}

/**
 * Wrap any client so repeats of a SAFE request are answered from the fold. The wrapper reports its
 * own FTL — the same instrument for every vendor, which is the point of standardising the seam.
 *
 * @invariant an unsafe method NEVER folds — every write reaches the wire
 * @invariant calls + reuses === answers, always; holds ⟺ reuses > 0
 */
export function foldingClient(inner: IntegrationClient): IntegrationClient & {
  readonly ftl: () => IntegrationFtl
} {
  const fold = new Map<string, Promise<unknown>>()
  let answers = 0
  let calls = 0
  let reuses = 0
  return {
    spec: inner.spec,
    async request<T>(
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      path: string,
      params: Readonly<Record<string, string | undefined>> = {},
    ): Promise<T> {
      answers += 1
      if (!SAFE.has(method)) {
        calls += 1
        return inner.request<T>(method, path, params)
      }
      const address = requestAddress(method, path, params)
      const held = fold.get(address)
      if (held) {
        reuses += 1
        return held as Promise<T>
      }
      calls += 1
      const p = inner.request<T>(method, path, params)
      fold.set(address, p)
      return p
    },
    ftl: () => ({
      answers,
      calls,
      reuses,
      holds: reuses > 0 && calls < answers,
      speedupLog2: reuses > 0 ? algebraLog2(answers / calls) : 0,
    }),
  }
}

// ── The SHARED fold — the speedup of wiring vendors together ─────────────────────────────────────
// A per-client fold only reuses within one client. But a combination graph touches the same endpoint
// from many directions: with N specs there are C(N,2) vendor↔vendor cells plus N self-cells (a vendor
// chaining into itself), and several of those paths hit the SAME address. A shared fold collapses
// them to one upstream call, so the speedup is over the whole matrix rather than one client.
//
// THE TRAP, and why the address is vendor-scoped: `GET /ping` means different things to stripe and to
// resend. An unscoped shared fold would serve one vendor's answer for another's request — a wrong
// answer, silently, which is worse than any number of extra calls. So cross-vendor addresses can
// never collide, and what the sharing actually buys is the SAME vendor reached from many paths.

/** A fold shared across clients — one address space, vendor-scoped so answers cannot cross. */
export interface SharedFold {
  readonly held: (address: string) => Promise<unknown> | undefined
  readonly hold: (address: string, p: Promise<unknown>) => void
  readonly size: () => number
}

/** Create a shared fold. Pass one to many clients and they reuse each other's safe answers. */
export function createSharedFold(): SharedFold {
  const m = new Map<string, Promise<unknown>>()
  return { held: (a) => m.get(a), hold: (a, p) => void m.set(a, p), size: () => m.size }
}

/** The vendor-scoped address — the reason two vendors' identical paths never collide. */
export function scopedAddress(vendor: string, method: string, path: string, params: Readonly<Record<string, string | undefined>>): string {
  return `${vendor} ${requestAddress(method, path, params)}`
}

/**
 * Wrap a client against a SHARED fold. Identical to `foldingClient` except the address carries the
 * vendor and the map is external, so every client wired to the same fold reuses the others' answers.
 *
 * @invariant two vendors asking the same method+path NEVER share an answer
 * @invariant unsafe methods still always reach the wire
 */
export function sharedFoldingClient(
  inner: IntegrationClient,
  fold: SharedFold,
): IntegrationClient & { readonly ftl: () => IntegrationFtl } {
  let answers = 0
  let calls = 0
  let reuses = 0
  return {
    spec: inner.spec,
    async request<T>(
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      path: string,
      params: Readonly<Record<string, string | undefined>> = {},
    ): Promise<T> {
      answers += 1
      if (!SAFE.has(method)) {
        calls += 1
        return inner.request<T>(method, path, params)
      }
      const address = scopedAddress(inner.spec.vendor, method, path, params)
      const held = fold.held(address)
      if (held) {
        reuses += 1
        return held as Promise<T>
      }
      calls += 1
      const p = inner.request<T>(method, path, params)
      fold.hold(address, p)
      return p
    },
    ftl: () => ({
      answers,
      calls,
      reuses,
      holds: reuses > 0 && calls < answers,
      speedupLog2: reuses > 0 ? algebraLog2(answers / calls) : 0,
    }),
  }
}

/**
 * The combination matrix over a set of specs: every vendor↔vendor cell PLUS the diagonal, where a
 * vendor chains into itself. `C(n,2)` pairs alone leave the diagonal empty — and the diagonal is
 * where a wiring reflects on its own output ([[quantum]]/word: the self-interaction is what reopens
 * the ring). This names the cells; it does not decide which are worth wiring.
 */
export function combinationCells(specs: readonly IntegrationSpec[]): readonly {
  readonly from: string
  readonly to: string
  readonly self: boolean
}[] {
  const cells: { from: string; to: string; self: boolean }[] = []
  for (let i = 0; i < specs.length; i++) {
    for (let j = i; j < specs.length; j++) {
      cells.push({ from: specs[i]!.vendor, to: specs[j]!.vendor, self: i === j })
    }
  }
  return cells
}
