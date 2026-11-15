import { describe, expect, it } from 'vitest'

import { admitCharge, cacheKey, enqueueEmbedding, MAX_TEXT, MODEL, semanticEndpoint, textOf, vectorOf, type SemanticEnv } from '@/utilities/semantic'

/** Fake bindings that record what they were asked. */
const fakeEnv = (opts: { cached?: Record<string, number[]>; quota?: boolean; limit?: boolean } = {}) => {
  const calls = { ai: [] as string[][], puts: [] as string[], quota: [] as string[], points: [] as unknown[], sent: [] as unknown[] }
  const kv = new Map(Object.entries(opts.cached ?? {}).map(([k, v]) => [k, JSON.stringify(v)]))
  const env: SemanticEnv = {
    AI: { run: async (_model, { text }) => (calls.ai.push(text), { data: text.map(() => [0.1, 0.2, 0.3]) }) },
    AI_CACHE: { get: async (key) => (kv.has(key) ? JSON.parse(kv.get(key)!) : null), put: async (key, value) => (calls.puts.push(key), void kv.set(key, value)) },
    TENANT_QUOTA: {
      idFromName: (name) => name,
      get: (id) => ({ fetch: async (url: string) => (calls.quota.push(`${String(id)} ${url}`), Response.json({ admitted: opts.quota !== false })) }),
    },
    RATE_LIMITER_AI: { limit: async () => ({ success: opts.limit !== false }) },
    ANALYTICS_AI: { writeDataPoint: (p) => void calls.points.push(p) },
    QUEUE_AI_BATCH: { send: async (body) => void calls.sent.push(body) },
    VECTORIZE_DOCS: { upsert: async () => undefined, query: async () => ({ matches: [{ id: 's1', score: 0.9 }, { id: 's2', score: 0.5 }] }) },
  }
  return { env, calls }
}

describe('semantic — what a vector costs', () => {
  it('takes a document text from its title and markdown, cut to MAX_TEXT', () => {
    expect(textOf({ title: 'Invoice', markdown: 'Paid in full' })).toBe('Invoice\n\nPaid in full')
    expect(textOf({ title: ' ', markdown: null })).toBe('')
    expect(textOf({ markdown: 'x'.repeat(MAX_TEXT + 10) })).toHaveLength(MAX_TEXT)
  })

  it('keys a text by the uuid cross of the model and the text: equal text, equal key', () => {
    expect(cacheKey('a')).toBe(cacheKey('a'))
    expect(cacheKey('a')).not.toBe(cacheKey('b'))
    expect(cacheKey('a')).toMatch(/^embed:[0-9a-f-]{36}$/)
    expect(MODEL).toBe('@cf/google/embeddinggemma-300m')
  })

  it('serves a cached vector without Workers AI and without a charge', async () => {
    const { env, calls } = fakeEnv({ cached: { [cacheKey('hello')]: [1, 2, 3] } })
    expect(await vectorOf(env, 'hello', 'index', 10)).toEqual({ vector: [1, 2, 3], computed: false })
    expect(calls.ai).toEqual([])
    expect(calls.quota).toEqual([])
  })

  it('charges a miss against the scope, computes it once and caches it', async () => {
    const { env, calls } = fakeEnv()
    expect(await vectorOf(env, 'hello', 'tenant-1', 10)).toEqual({ vector: [0.1, 0.2, 0.3], computed: true })
    expect(calls.ai).toEqual([['hello']])
    expect(calls.puts).toEqual([cacheKey('hello')])
    expect(calls.quota[0]).toMatch(/^tenant-1:embed:\d{4}-\d{2} https:\/\/quota\/admit\?cost=1&quota=10$/)
    expect((await vectorOf(env, 'hello', 'tenant-1', 10)).computed).toBe(false)
    expect(calls.ai).toHaveLength(1)
  })

  it('computes nothing when the quota refuses', async () => {
    const { env, calls } = fakeEnv({ quota: false })
    expect(await vectorOf(env, 'hello', 'index', 10)).toEqual({ vector: null, computed: false })
    expect(calls.ai).toEqual([])
    expect(await admitCharge(env, 'index', 1, 10)).toBe(false)
  })
})

describe('semantic — indexing and asking', () => {
  const req = (over: Record<string, unknown> = {}) => {
    const queued: unknown[] = []
    return {
      queued,
      req: {
        payload: { jobs: { queue: async (job: unknown) => void queued.push(job) }, find: async () => ({ docs: [{ id: 's2', title: 'B' }, { id: 's1', title: 'A' }] }) },
        searchParams: new URLSearchParams(),
        headers: new Headers(),
        user: null,
        ...over,
      },
    }
  }

  it('queues an embedding only when the text changed, and wakes the sweep', async () => {
    const { env, calls } = fakeEnv()
    const hook = enqueueEmbedding(async () => env)
    const changed = req()
    await hook({ doc: { id: 's1', title: 'New' }, previousDoc: { id: 's1', title: 'Old' }, req: changed.req } as never)
    expect(changed.queued).toHaveLength(1)
    expect(calls.sent).toEqual([{ kind: 'sweep', task: 'embed-search-document' }])
    const same = req()
    await hook({ doc: { id: 's1', title: 'Same' }, previousDoc: { id: 's1', title: 'Same' }, req: same.req } as never)
    expect(same.queued).toHaveLength(0)
  })

  it('answers by meaning, best first, through Payload with the caller access; 400 without a question', async () => {
    const { env } = fakeEnv()
    const endpoint = semanticEndpoint(async () => env)
    const asked = req({ searchParams: new URLSearchParams({ q: 'unpaid invoices' }) })
    const body = (await (await endpoint.handler(asked.req as never)).json()) as { docs: { id: string; score: number }[] }
    expect(body.docs.map((d) => d.id)).toEqual(['s1', 's2'])
    expect((await endpoint.handler(req().req as never)).status).toBe(400)
  })

  it('refuses a caller past the AI rate limit with 429', async () => {
    const { env } = fakeEnv({ limit: false })
    const response = await semanticEndpoint(async () => env).handler(req({ searchParams: new URLSearchParams({ q: 'x' }) }).req as never)
    expect(response.status).toBe(429)
  })
})
