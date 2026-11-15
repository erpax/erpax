/**
 * semantic — meaning search over erpax's documents, on Cloudflare's own bindings.
 *
 * Every search document (the search plugin's index of every collection) gets one vector:
 *   · a change queues the embed task and sends QUEUE_AI_BATCH a message, so the jobs sweep runs it now
 *     instead of at the next cron; it is queued only when the text's content key changed (Embed.lean
 *     `stale`)
 *   · the task embeds with Workers AI (AI), caching each vector in KV (AI_CACHE) under the uuid cross of
 *     the model and the text, so equal text is never paid for twice; a cache miss is charged against
 *     the index quota in TENANT_QUOTA, where admitting and counting are one atomic step (Embed.lean
 *     `admit`), and every call is metered to ANALYTICS_AI
 *   · the vector is upserted into Vectorize (VECTORIZE_DOCS, 768 dimensions, cosine)
 * GET /api/search/semantic?q= embeds the question (rate-limited per caller by RATE_LIMITER_AI, charged
 * against the caller's tenant), asks Vectorize for the nearest documents and reads them back through
 * Payload with the caller's own access, so a result never shows what the caller could not read.
 *
 * Without the bindings (local runs, tests) indexing is skipped and the endpoint says so.
 *
 * @standard RFC 9110 §15.5.1 400-bad-request
 * @standard RFC 6585 §4 429-too-many-requests
 */
import type { CollectionAfterChangeHook, Endpoint, PayloadRequest } from 'payload'

import { cross } from '@/utilities/crypto'
import { admit, stale } from '@/utilities/embed'
import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

/** Multilingual (erpax's documents are English and Bulgarian), 768 dimensions like the erpax-docs index. */
export const MODEL = '@cf/google/embeddinggemma-300m'
export const DIMENSIONS = 768
/** Characters of a document's text that are embedded. */
export const MAX_TEXT = 6000
/** Embeddings computed for the index in a month (cache hits are free). */
export const INDEX_QUOTA = 100_000
/** Questions embedded for one tenant in a month. */
export const QUERY_QUOTA = 10_000
/** The Payload task that embeds one search document. */
export const TASK = 'embed-search-document'

interface Ai {
  run(model: string, input: { text: string[] }): Promise<{ data: number[][] }>
}
interface Kv {
  get(key: string, type: 'json'): Promise<unknown>
  put(key: string, value: string): Promise<void>
}
interface VectorIndex {
  upsert(vectors: { id: string; values: number[]; metadata?: Record<string, string> }[]): Promise<unknown>
  query(values: number[], options: { topK: number }): Promise<{ matches: { id: string; score: number }[] }>
}
interface Queue {
  send(body: unknown): Promise<void>
}
interface QuotaNamespace {
  idFromName(name: string): unknown
  get(id: unknown): { fetch(input: string): Promise<Response> }
}
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>
}
interface Analytics {
  writeDataPoint(point: { blobs?: string[]; doubles?: number[]; indexes?: string[] }): void
}

/** The bindings semantic search uses, each optional. */
export interface SemanticEnv {
  AI?: Ai
  AI_CACHE?: Kv
  VECTORIZE_DOCS?: VectorIndex
  QUEUE_AI_BATCH?: Queue
  TENANT_QUOTA?: QuotaNamespace
  RATE_LIMITER_AI?: RateLimit
  ANALYTICS_AI?: Analytics
}
export type EnvGetter = () => Promise<SemanticEnv>

/** A search document's text: its title and its markdown, cut to MAX_TEXT. */
export const textOf = (doc: { title?: string | null; markdown?: string | null } | null | undefined): string =>
  [doc?.title, doc?.markdown].filter((part): part is string => Boolean(part?.trim())).join('\n\n').slice(0, MAX_TEXT)

/** The content key of a text: the uuid cross of the model and the text. */
export const cacheKey = (text: string): string => `embed:${cross(MODEL, '\n', text)}`

const month = (now = new Date()): string => now.toISOString().slice(0, 7)

/** Admit and count a charge in the scope's monthly quota object (the Embed.lean decision runs inside it). */
export const admitCharge = async (env: SemanticEnv, scope: string, cost: number, quota: number): Promise<boolean> => {
  if (!env.TENANT_QUOTA) return admit(0, cost, quota)
  const stub = env.TENANT_QUOTA.get(env.TENANT_QUOTA.idFromName(`${scope}:embed:${month()}`))
  const response = await stub.fetch(`https://quota/admit?cost=${cost}&quota=${quota}`)
  return ((await response.json()) as { admitted?: boolean }).admitted === true
}

/**
 * The vector of a text: from the cache when present; otherwise charged against `scope`'s quota and
 * computed by Workers AI, then cached. `computed` says whether Workers AI ran; `vector` is null when
 * the quota refused.
 */
export const vectorOf = async (env: SemanticEnv, text: string, scope: string, quota: number): Promise<{ vector: number[] | null; computed: boolean }> => {
  const key = cacheKey(text)
  const cached = (await env.AI_CACHE?.get(key, 'json')) as number[] | null | undefined
  if (cached) return { vector: cached, computed: false }
  if (!env.AI || !(await admitCharge(env, scope, 1, quota))) return { vector: null, computed: false }
  const { data } = await env.AI.run(MODEL, { text: [text] })
  const vector = data[0] ?? null
  if (vector) await env.AI_CACHE?.put(key, JSON.stringify(vector))
  return { vector, computed: true }
}

/** One data point per embedding: purpose, model, scope; computed (1) or cached (0). */
const meter = (env: SemanticEnv, purpose: string, scope: string, computed: boolean): void => {
  env.ANALYTICS_AI?.writeDataPoint({ blobs: [purpose, MODEL, scope], doubles: [computed ? 1 : 0], indexes: [purpose] })
}

/** afterChange on search: queue the embed task when the text's content key changed, and wake the sweep. */
export const enqueueEmbedding =
  (getEnv: EnvGetter): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const text = textOf(doc as { title?: string; markdown?: string })
    const before = previousDoc && 'id' in (previousDoc as object) ? cacheKey(textOf(previousDoc as { title?: string; markdown?: string })) : null
    if (!text || !stale(before, cacheKey(text))) return doc
    await req.payload.jobs.queue({ task: TASK as never, input: { id: String((doc as { id: unknown }).id) } as never, req })
    const env = await getEnv().catch(() => ({}) as SemanticEnv)
    await env.QUEUE_AI_BATCH?.send({ kind: 'sweep', task: TASK }).catch(() => undefined)
    return doc
  }

/** The embed task: one search document's vector into Vectorize. */
export const embedSearchDocument = async (getEnv: EnvGetter, id: string, req: PayloadRequest): Promise<string> => {
  const env = await getEnv()
  if (!env.AI || !env.VECTORIZE_DOCS) return 'skipped: no Workers AI or Vectorize binding'
  const doc = (await req.payload.findByID({ collection: 'search', id, depth: 0, overrideAccess: true, req }).catch(() => null)) as {
    id: unknown
    title?: string | null
    markdown?: string | null
    doc?: { relationTo?: string; value?: unknown }
  } | null
  const text = textOf(doc)
  if (!doc || !text) return 'skipped: no text'
  const { vector, computed } = await vectorOf(env, text, 'index', INDEX_QUOTA)
  if (!vector) return 'skipped: index quota reached'
  await env.VECTORIZE_DOCS.upsert([{ id: String(doc.id), values: vector, metadata: { collection: doc.doc?.relationTo ?? '', value: String(doc.doc?.value ?? '') } }])
  meter(env, 'index', 'index', computed)
  return computed ? 'embedded' : 'embedded from cache'
}

const fail = (status: number, message: string): Response => Response.json({ errors: [{ message }] }, { status })

/** GET /api/search/semantic?q=…&limit=… */
export const semanticEndpoint = (getEnv: EnvGetter): Endpoint => ({
  path: '/semantic',
  method: 'get',
  handler: async (req) => {
    const q = (req.searchParams?.get('q') ?? '').trim().slice(0, MAX_TEXT)
    if (!q) return fail(400, 'Ask with ?q=')
    const env = await getEnv()
    if (!env.AI || !env.VECTORIZE_DOCS) return Response.json({ docs: [], note: 'Semantic search needs the Workers AI and Vectorize bindings.' })
    const caller = req.user ? `user:${req.user.id}` : `ip:${req.headers.get('cf-connecting-ip') ?? 'unknown'}`
    if (env.RATE_LIMITER_AI && !(await env.RATE_LIMITER_AI.limit({ key: caller })).success) return fail(429, 'Too many questions. Try again in a minute.')
    const scope = String(getUserTenantIDs(req.user as never)[0] ?? 'public')
    const { vector, computed } = await vectorOf(env, q, scope, QUERY_QUOTA)
    if (!vector) return fail(429, 'This tenant has used its semantic search quota for the month.')
    meter(env, 'query', scope, computed)
    const limit = Math.min(Math.max(Number(req.searchParams?.get('limit') ?? 10) || 10, 1), 50)
    const { matches } = await env.VECTORIZE_DOCS.query(vector, { topK: limit })
    if (!matches.length) return Response.json({ docs: [] })
    const found = await req.payload.find({ collection: 'search', where: { id: { in: matches.map((m) => m.id) } }, limit: matches.length, depth: 0, overrideAccess: false, req })
    const score = new Map(matches.map((m) => [m.id, m.score]))
    const docs = found.docs
      .map((d) => ({ ...d, score: score.get(String(d.id)) ?? 0 }))
      .sort((a, b) => b.score - a.score)
    return Response.json({ docs })
  },
})
