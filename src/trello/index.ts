/**
 * trello — an external system becomes an entangled atom, not a swallowed dependency.
 *
 * The first worked proof of the pattern: a third-party REST API enters the corpus as a one-word
 * atom that answers to the same law as every other atom ([[constitution]]) — build ⊕ break, a
 * normative anchor, a recompute path, and errors that PROPAGATE. Trello is chosen because it is
 * ordinary: a keyed REST surface with published rate limits and no erpax affinity whatsoever. If
 * the pattern holds here it holds for the next one.
 *
 * Two things this atom refuses to do, both of which are the usual way:
 *
 *   - It does not swallow a 4xx/5xx. A `fetch` that returns `!ok` throws `TrelloError` carrying the
 *     status and the body ([[convention]]/sealed): entropy leaves through error handling, and a
 *     defaulted catch makes the remote state unverifiable from here.
 *   - It does not DROP a burst. Trello publishes 300 requests / 10s per key and 100 / 10s per token;
 *     the limiter is a continuous-refill token bucket over BOTH, and a call past the line is made to
 *     WAIT rather than fail — `reserve()` returns the ms owed, so the queueing is a number a test
 *     can read rather than a behaviour a comment claims.
 *
 * The credential is env-only. The Trello token grants full account access, so it is never a field,
 * never a default, and `trelloConfigFromEnv` fails closed when it is absent.
 *
 *   TRELLO_API_KEY · TRELLO_TOKEN — trello.com/power-ups/admin → API Key tab
 *
 * @standard RFC 6749 §1.4 bearer-credential (the token is the whole authority — env-only, never stored)
 * @standard ISO/IEC 25010:2023 §5.7.2 fault-tolerance (a rate-limited burst queues; it does not drop)
 * @invariant reserve() returns 0 while a bucket has a token and a positive wait once it is spent.
 * @invariant upsertCard is idempotent — a record carrying a cardId updates, it never creates a second.
 * @see ./SKILL.md -- ./plugin -- ../constitution -- ../convention/sealed
 */

import { exactCeil, exactMax, exactMin } from '@/algebra'

/** Trello's REST root. Every call is `<base>/<path>?key=&token=`. */
export const TRELLO_BASE = 'https://api.trello.com/1'

/** A published rate limit — `capacity` requests per `windowMs`, refilled continuously. */
export interface RateLimit {
  readonly capacity: number
  readonly windowMs: number
}

/**
 * Trello's published limits: 300 requests per 10 seconds per API KEY, and 100 per 10 seconds per
 * TOKEN. Both apply at once, so the effective wait is the larger of the two.
 * @see https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/
 */
export const TRELLO_LIMITS: { readonly key: RateLimit; readonly token: RateLimit } = {
  key: { capacity: 300, windowMs: 10_000 },
  token: { capacity: 100, windowMs: 10_000 },
}

/**
 * A continuous-refill token bucket. It never rejects: past the line `reserve()` returns the number
 * of milliseconds the caller owes, and the debt is carried in the bucket, so a burst of N QUEUES
 * into a schedule rather than failing. Dropping is the easy behaviour and the wrong one — the caller
 * loses work it already decided to do.
 */
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

  /** Refill rate in tokens per millisecond — capacity spread continuously across the window. */
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

/** Both published limits at once — the wait is the larger, because both must be satisfied. */
export class TrelloRateLimiter {
  private readonly key: TokenBucket
  private readonly token: TokenBucket

  constructor(limits: { key: RateLimit; token: RateLimit } = TRELLO_LIMITS, now: () => number = Date.now) {
    this.key = new TokenBucket(limits.key, now)
    this.token = new TokenBucket(limits.token, now)
  }

  /** Ms the next request must wait to satisfy BOTH the per-key and the per-token limit. */
  reserve(): number {
    return exactMax(this.key.reserve(), this.token.reserve())
  }
}

/**
 * A non-2xx from Trello, carried whole. The status and body are the evidence a caller needs to tell
 * a revoked token from a missing list from an outage — swallowing it makes all three look alike.
 */
export class TrelloError extends Error {
  constructor(
    readonly status: number,
    readonly method: string,
    readonly path: string,
    readonly body: string,
  ) {
    super(`trello ${method} ${path} — HTTP ${status}: ${body.slice(0, 500)}`)
    this.name = 'TrelloError'
  }
}

/** The credentials and seams. Everything injectable is injected so the proof needs no network. */
export interface TrelloConfig {
  readonly key: string
  readonly token: string
  readonly baseUrl?: string
  readonly fetchImpl?: typeof fetch
  readonly limiter?: TrelloRateLimiter
  readonly sleep?: (ms: number) => Promise<void>
}

/** The env surface this atom reads — a narrow face over process.env or the Worker env. */
export interface TrelloEnv {
  readonly TRELLO_API_KEY?: string
  readonly TRELLO_TOKEN?: string
  readonly TRELLO_BOARD_ID?: string
  readonly TRELLO_MCP_ENABLED?: string
}

/**
 * Read the credentials from the environment, failing CLOSED when either is absent. A default here
 * would be a silent unauthenticated client — the assumption that leaks entropy.
 */
export function trelloConfigFromEnv(env: TrelloEnv = process.env as TrelloEnv): TrelloConfig {
  const key = env.TRELLO_API_KEY
  const token = env.TRELLO_TOKEN
  if (!key || !token) {
    throw new Error(
      'trello: TRELLO_API_KEY and TRELLO_TOKEN are required (trello.com/power-ups/admin → API Key). ' +
        'The token grants full account access — set it in the environment, never in the repo.',
    )
  }
  return { key, token }
}

/**
 * The client the plugin syncs through, or `undefined` when the credential is absent — an explicit
 * absence, never a caught error. A config with no Trello credential leaves the plugin INERT rather
 * than half-wired; see the plugin's `enabled` seam.
 */
export function trelloClientFromEnv(env: TrelloEnv = process.env as TrelloEnv): TrelloClient | undefined {
  if (!env.TRELLO_API_KEY || !env.TRELLO_TOKEN) return undefined
  return createTrelloClient(trelloConfigFromEnv(env))
}

/** Is the Trello MCP server opted in? Off unless the flag is explicitly truthy. */
export function trelloMcpEnabled(env: TrelloEnv = process.env as TrelloEnv): boolean {
  return env.TRELLO_MCP_ENABLED === '1' || env.TRELLO_MCP_ENABLED === 'true'
}

/** Build the authed URL — every Trello call carries `key` and `token` as query params. */
export function authedUrl(
  config: TrelloConfig,
  path: string,
  params: Readonly<Record<string, string | undefined>> = {},
): string {
  const url = new URL(`${config.baseUrl ?? TRELLO_BASE}${path}`)
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v)
  url.searchParams.set('key', config.key)
  url.searchParams.set('token', config.token)
  return url.toString()
}

export interface TrelloBoard {
  readonly id: string
  readonly name: string
}

export interface TrelloList {
  readonly id: string
  readonly name: string
  readonly idBoard?: string
}

export interface TrelloCard {
  readonly id: string
  readonly name: string
  readonly idList: string
  readonly desc?: string
  readonly url?: string
}

/** The card fields a caller may create or change. */
export interface CardInput {
  readonly idList: string
  readonly name: string
  readonly desc?: string
}

export interface TrelloClient {
  getBoards(): Promise<readonly TrelloBoard[]>
  getLists(boardId: string): Promise<readonly TrelloList[]>
  createCard(input: CardInput): Promise<TrelloCard>
  updateCard(cardId: string, patch: Partial<CardInput>): Promise<TrelloCard>
  moveCard(cardId: string, idList: string): Promise<TrelloCard>
  addComment(cardId: string, text: string): Promise<{ readonly id: string }>
}

const defaultSleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

/**
 * The typed REST client. One `request` seam: reserve a rate-limit slot, wait the ms it owes, call,
 * and PROPAGATE anything that is not 2xx. There is no catch in this file — nothing to swallow.
 */
export function createTrelloClient(config: TrelloConfig): TrelloClient {
  const doFetch = config.fetchImpl ?? fetch
  const limiter = config.limiter ?? new TrelloRateLimiter()
  const sleep = config.sleep ?? defaultSleep

  const request = async <T>(
    method: 'GET' | 'POST' | 'PUT',
    path: string,
    params: Readonly<Record<string, string | undefined>> = {},
  ): Promise<T> => {
    const owed = limiter.reserve()
    if (owed > 0) await sleep(owed)
    const res = await doFetch(authedUrl(config, path, params), { method })
    if (!res.ok) throw new TrelloError(res.status, method, path, await res.text())
    return (await res.json()) as T
  }

  const writeCard = (cardId: string, patch: Partial<CardInput>): Promise<TrelloCard> =>
    request<TrelloCard>('PUT', `/cards/${cardId}`, patch)

  return {
    getBoards: () => request<readonly TrelloBoard[]>('GET', '/members/me/boards'),
    getLists: (boardId) => request<readonly TrelloList[]>('GET', `/boards/${boardId}/lists`),
    createCard: (input) => request<TrelloCard>('POST', '/cards', { ...input }),
    updateCard: writeCard,
    // A move IS an update of `idList` — one write path, so the two can never drift apart.
    moveCard: (cardId, idList) => writeCard(cardId, { idList }),
    addComment: (cardId, text) =>
      request<{ id: string }>('POST', `/cards/${cardId}/actions/comments`, { text }),
  }
}

export * from './plugin'
