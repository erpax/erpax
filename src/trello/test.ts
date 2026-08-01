import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import {
  authedUrl,
  createTrelloClient,
  TokenBucket,
  TRELLO_BASE,
  TRELLO_LIMITS,
  TrelloError,
  TrelloRateLimiter,
  trelloConfigFromEnv,
  trelloMcpEnabled,
  type TrelloConfig,
} from './index'

const config: TrelloConfig = { key: 'K', token: 'T' }

/** A fetch that records every call and answers from a script — the whole proof, no network. */
const stubFetch = (
  respond: (url: string, init?: RequestInit) => { status?: number; body?: unknown },
): { impl: typeof fetch; calls: string[] } => {
  const calls: string[] = []
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input)
    calls.push(`${init?.method ?? 'GET'} ${url}`)
    const { status = 200, body = {} } = respond(url, init)
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
      text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
    } as Response
  }) as unknown as typeof fetch
  return { impl, calls }
}

describe('trello — the client builds correct, authed URLs', () => {
  it('every call carries key + token on the published base', () => {
    const url = new URL(authedUrl(config, '/cards', { idList: 'L1', name: 'a card' }))
    expect(`${url.origin}${url.pathname}`).toBe(`${TRELLO_BASE}/cards`)
    expect(url.searchParams.get('key')).toBe('K')
    expect(url.searchParams.get('token')).toBe('T')
    expect(url.searchParams.get('idList')).toBe('L1')
    expect(url.searchParams.get('name')).toBe('a card')
    // an absent optional is omitted, not sent as the string "undefined"
    expect(authedUrl(config, '/cards', { desc: undefined })).not.toContain('desc=')
  })

  it('each method hits its documented endpoint and verb', async () => {
    const { impl, calls } = stubFetch(() => ({ body: { id: 'C1', name: 'n', idList: 'L2' } }))
    const client = createTrelloClient({ ...config, fetchImpl: impl })
    await client.getBoards()
    await client.getLists('B1')
    await client.createCard({ idList: 'L1', name: 'n' })
    await client.updateCard('C1', { name: 'renamed' })
    await client.moveCard('C1', 'L2')
    await client.addComment('C1', 'hello')
    const paths = calls.map((c) => {
      const [method, url] = c.split(' ')
      return `${method} ${new URL(url).pathname}`
    })
    expect(paths).toEqual([
      'GET /1/members/me/boards',
      'GET /1/boards/B1/lists',
      'POST /1/cards',
      'PUT /1/cards/C1',
      'PUT /1/cards/C1',
      'POST /1/cards/C1/actions/comments',
    ])
    // a move is an update of idList — the same write path, so the two cannot drift
    expect(new URL(calls[4].split(' ')[1]).searchParams.get('idList')).toBe('L2')
    expect(new URL(calls[5].split(' ')[1]).searchParams.get('text')).toBe('hello')
  })

  it('credentials are env-only and fail CLOSED when absent', () => {
    expect(() => trelloConfigFromEnv({})).toThrow(/TRELLO_API_KEY and TRELLO_TOKEN are required/)
    expect(() => trelloConfigFromEnv({ TRELLO_API_KEY: 'K' })).toThrow(/required/)
    expect(trelloConfigFromEnv({ TRELLO_API_KEY: 'K', TRELLO_TOKEN: 'T' })).toEqual({ key: 'K', token: 'T' })
    // the MCP server is OFF unless explicitly opted in
    expect(trelloMcpEnabled({})).toBe(false)
    expect(trelloMcpEnabled({ TRELLO_MCP_ENABLED: '0' })).toBe(false)
    expect(trelloMcpEnabled({ TRELLO_MCP_ENABLED: '1' })).toBe(true)
  })
})

describe('trello — a burst above the published limit QUEUES, it does not drop', () => {
  it('the per-token bucket (100/10s) admits 100 immediately and makes the 101st wait', () => {
    const clock = { t: 0 }
    const bucket = new TokenBucket(TRELLO_LIMITS.token, () => clock.t)
    const waits = Array.from({ length: 100 }, () => bucket.reserve())
    expect(waits.every((w) => w === 0)).toBe(true)
    // the 101st is past the line — it is made to wait, and the wait is a real number of ms
    const owed = bucket.reserve()
    expect(owed).toBeGreaterThan(0)
    // 100 tokens per 10_000ms ⇒ one token every 100ms
    expect(owed).toBe(100)
    // and the debt accumulates across the burst rather than being forgotten
    expect(bucket.reserve()).toBe(200)
  })

  it('refill is continuous — waiting the window back restores the burst', () => {
    const clock = { t: 0 }
    const bucket = new TokenBucket(TRELLO_LIMITS.token, () => clock.t)
    for (let i = 0; i < 100; i++) bucket.reserve()
    expect(bucket.reserve()).toBeGreaterThan(0)
    clock.t += TRELLO_LIMITS.token.windowMs
    expect(bucket.reserve()).toBe(0)
  })

  it('both published limits bind at once — the wait is the larger of key and token', () => {
    const clock = { t: 0 }
    const limiter = new TrelloRateLimiter(TRELLO_LIMITS, () => clock.t)
    // the token bucket (100) is the tighter of the two, so it is what bites first
    const waits = Array.from({ length: 101 }, () => limiter.reserve())
    expect(waits.slice(0, 100).every((w) => w === 0)).toBe(true)
    expect(waits[100]).toBe(100)
  })

  it('the client actually WAITS the ms it owes before the request goes out', async () => {
    const clock = { t: 0 }
    const slept: number[] = []
    const { impl } = stubFetch(() => ({ body: { id: 'C1', name: 'n', idList: 'L1' } }))
    const client = createTrelloClient({
      ...config,
      fetchImpl: impl,
      limiter: new TrelloRateLimiter(TRELLO_LIMITS, () => clock.t),
      sleep: async (ms) => {
        slept.push(ms)
      },
    })
    for (let i = 0; i < 100; i++) await client.createCard({ idList: 'L1', name: 'n' })
    expect(slept).toEqual([]) // inside the burst, nothing waits
    await client.createCard({ idList: 'L1', name: 'n' })
    expect(slept).toEqual([100]) // past it, the queueing is a real, observed wait
  })
})

describe('trello — a Trello error SURFACES; nothing is swallowed', () => {
  it('a 4xx throws TrelloError carrying status, verb, path and body', async () => {
    const { impl } = stubFetch(() => ({ status: 401, body: 'invalid token' }))
    const client = createTrelloClient({ ...config, fetchImpl: impl })
    await expect(client.getBoards()).rejects.toBeInstanceOf(TrelloError)
    await expect(client.getBoards()).rejects.toThrow(/HTTP 401/)
    await expect(client.getBoards()).rejects.toThrow(/invalid token/)
  })

  it('a 5xx re-throws too — an outage is not an empty result', async () => {
    const { impl } = stubFetch(() => ({ status: 503, body: 'service unavailable' }))
    const client = createTrelloClient({ ...config, fetchImpl: impl })
    await expect(client.createCard({ idList: 'L1', name: 'n' })).rejects.toThrow(/HTTP 503/)
    // the status is readable, not just a message — a caller can tell 401 from 503
    const err = await client.moveCard('C1', 'L2').catch((e: unknown) => e)
    expect((err as TrelloError).status).toBe(503)
    expect((err as TrelloError).name).toBe('TrelloError')
  })

  it('a transport failure propagates unchanged — this atom adds no catch', async () => {
    const boom = (async () => {
      throw new Error('network down')
    }) as unknown as typeof fetch
    const client = createTrelloClient({ ...config, fetchImpl: boom })
    await expect(client.getLists('B1')).rejects.toThrow('network down')
  })
})

describe('trello — the atom passes the constitution it was built under', () => {
  /**
   * The change this atom IS, declared for judgement. Every field points at something real in this
   * directory; the constitution proves the obligations are PRESENT (its own honest boundary), and
   * the suites above prove they are met.
   */
  const change: Change = {
    atom: 'trello',
    dualities: [
      { builds: 'createTrelloClient', breaks: 'a 4xx/5xx surfaces as TrelloError — trello/test.ts' },
      { builds: 'TrelloRateLimiter', breaks: 'a burst past the limit queues — trello/test.ts' },
      { builds: 'trelloPlugin', breaks: 'the same record twice yields one card — trello/plugin/test.ts' },
    ],
    anchors: ['RFC 6749 §1.4', 'ISO/IEC 25010:2023 §5.7.2'],
    claims: [
      {
        text: 'a burst above the limit never drops a request',
        boundary: 'within one process — the bucket is in-memory, so N workers hold N buckets',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'read⊕write', ring: [2, 2] },
    ],
    served: [
      { result: 'rate-limit wait (ms)', recompute: 'src/trello/index.ts' },
      { result: 'record→card sync', recompute: 'src/trello/plugin/index.ts' },
    ],
    postings: [
      { debit: 'trello/card', credit: 'erpax/record', amount: 1 },
      { debit: 'erpax/record', credit: 'trello/card', amount: 1 },
    ],
    edges: [
      { from: 'erpax', to: 'trello' },
      { from: 'trello', to: 'erpax' },
    ],
    quantities: [
      { name: 'perTokenBurst', value: TRELLO_LIMITS.token.capacity, derivation: 'src/trello/index.ts' },
      { name: 'perKeyBurst', value: TRELLO_LIMITS.key.capacity, derivation: 'src/trello/index.ts' },
    ],
    keepers: [],
    seed: ['src/trello/index.ts', 'src/trello/plugin/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const verdict = judge(change)
    expect(verdict.verdicts.filter((v) => !v.holds)).toEqual([])
    expect(verdict.sealed).toBe(true)
    expect(verdict.coverage).toBe(1)
  })

  it('would be REFUSED if the client shipped with no adversarial counterpart', () => {
    const buildOnly = judge({ ...change, dualities: change.dualities.map(({ builds }) => ({ builds })) })
    expect(buildOnly.holds).toBe(false)
    expect(buildOnly.verdicts.find((v) => v.law === 'duality')!.reason).toContain('build-only')
  })

  it('would be REFUSED if the rate-limit claim dropped its boundary', () => {
    const naked = judge({ ...change, claims: change.claims.map(({ text }) => ({ text })) })
    expect(naked.holds).toBe(false)
    expect(naked.verdicts.find((v) => v.law === 'boundary')!.holds).toBe(false)
  })
})
