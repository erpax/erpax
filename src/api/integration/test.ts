import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { TRELLO_LIMITS } from '@/trello'

import {
  authedUrl,
  authorize,
  bindingLimit,
  burstCapacity,
  configFromEnv,
  createIntegrationClient,
  foldingClient,
  requestAddress,
  credentialed,
  IntegrationError,
  RateLimiter,
  TokenBucket,
  type IntegrationConfig,
} from './index'
import { POLLINATIONS, RESEND, SPECS, STRIPE, TRELLO, specOf } from './seed'

const cfg = (spec = TRELLO, values = ['K', 'T']): IntegrationConfig => ({ spec, values })

/** A fetch that records every call and answers from a script — the whole proof, no network. */
const stubFetch = (respond: (url: string) => { status?: number; body?: unknown }) => {
  const calls: { url: string; method: string; headers: Record<string, string> }[] = []
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({
      url: String(input),
      method: init?.method ?? 'GET',
      headers: (init?.headers ?? {}) as Record<string, string>,
    })
    const { status = 200, body = {} } = respond(String(input))
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
      text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
    } as Response
  }) as unknown as typeof fetch
  return { impl, calls }
}

describe('api/integration — one seam, auth DECLARED per vendor', () => {
  it('query auth writes params; bearer writes one header; header auth writes one per credential', () => {
    // query — Trello's shape
    const q = new URL(authedUrl(cfg(), '/cards', { idList: 'L1' }))
    expect(q.searchParams.get('key')).toBe('K')
    expect(q.searchParams.get('token')).toBe('T')
    expect(q.searchParams.get('idList')).toBe('L1')

    // bearer — Stripe's shape: nothing on the URL, one Authorization header
    const b = authorize(cfg(STRIPE, ['sk_test']), new URL('https://api.stripe.com/v1/charges'), {})
    expect(b.headers.Authorization).toBe('Bearer sk_test')
    expect(b.url.searchParams.get('key')).toBeNull()

    // header — one header per credential, named by the spec
    const h = authorize(
      { spec: { ...TRELLO, auth: 'header', authNames: ['X-Key', 'X-Token'] }, values: ['K', 'T'] },
      new URL('https://x/y'),
      {},
    )
    expect(h.headers['X-Key']).toBe('K')
    expect(h.headers['X-Token']).toBe('T')
  })

  it('credentials fail CLOSED, and the error names every missing variable at once', () => {
    expect(() => configFromEnv(TRELLO, {})).toThrow(/TRELLO_API_KEY, TRELLO_TOKEN are required/)
    expect(() => configFromEnv(TRELLO, { TRELLO_API_KEY: 'K' })).toThrow(/TRELLO_TOKEN is required/)
    expect(configFromEnv(TRELLO, { TRELLO_API_KEY: 'K', TRELLO_TOKEN: 'T' }).values).toEqual(['K', 'T'])
    expect(credentialed(TRELLO, {})).toBe(false)
    expect(credentialed(TRELLO, { TRELLO_API_KEY: 'K', TRELLO_TOKEN: 'T' })).toBe(true)
    // a public endpoint needs none — an honest empty list, not a missing key
    expect(credentialed(POLLINATIONS, {})).toBe(true)
  })

  it('EVERY published limit binds at once — the wait is the largest, not the first', () => {
    const clock = { t: 0 }
    const limiter = new RateLimiter(TRELLO.limits, () => clock.t)
    const waits = Array.from({ length: 101 }, () => limiter.reserve())
    expect(waits.slice(0, 100).every((w) => w === 0)).toBe(true)
    expect(waits[100]).toBe(100) // the 100/10s token limit bites before the 300/10s key limit
    // the tightest limit is COMPUTED, not declared
    expect(bindingLimit(TRELLO)?.scope).toBe('token')
    expect(burstCapacity(TRELLO)).toBe(100)
    expect(bindingLimit({ ...TRELLO, limits: [] })).toBeUndefined()
  })

  it('a burst QUEUES and the debt accumulates — it is never dropped', () => {
    const clock = { t: 0 }
    const b = new TokenBucket({ scope: 'token', capacity: 100, windowMs: 10_000 }, () => clock.t)
    for (let i = 0; i < 100; i++) expect(b.reserve()).toBe(0)
    expect(b.reserve()).toBe(100)
    expect(b.reserve()).toBe(200) // the debt carries
    clock.t += 10_000
    expect(b.reserve()).toBe(0) // continuous refill restores the burst
  })

  it('a 4xx/5xx SURFACES with the vendor named — nothing is swallowed', async () => {
    const { impl } = stubFetch(() => ({ status: 401, body: 'invalid token' }))
    const client = createIntegrationClient({ ...cfg(), fetchImpl: impl })
    await expect(client.request('GET', '/members/me/boards')).rejects.toBeInstanceOf(IntegrationError)
    const err = (await client.request('GET', '/x').catch((e: unknown) => e)) as IntegrationError
    expect(err.vendor).toBe('trello')
    expect(err.status).toBe(401)
    expect(err.message).toMatch(/trello GET \/x — HTTP 401/)
    // a transport failure propagates unchanged — this module adds no catch
    const boom = (async () => {
      throw new Error('network down')
    }) as unknown as typeof fetch
    await expect(createIntegrationClient({ ...cfg(), fetchImpl: boom }).request('GET', '/y')).rejects.toThrow(
      'network down',
    )
  })

  it('the client WAITS the ms it owes before the request goes out', async () => {
    const clock = { t: 0 }
    const slept: number[] = []
    const { impl } = stubFetch(() => ({ body: {} }))
    const client = createIntegrationClient({
      ...cfg(),
      fetchImpl: impl,
      limiter: new RateLimiter(TRELLO.limits, () => clock.t),
      sleep: async (ms) => {
        slept.push(ms)
      },
    })
    for (let i = 0; i < 100; i++) await client.request('GET', '/x')
    expect(slept).toEqual([])
    await client.request('GET', '/x')
    expect(slept).toEqual([100])
  })
})

describe('api/integration — the vendor dissolves into a spec', () => {
  it('trello is now DATA, and it still agrees with the atom it was lifted from', () => {
    expect(TRELLO.baseUrl).toBe('https://api.trello.com/1')
    expect(TRELLO.auth).toBe('query')
    // the spec and the original atom must not drift about the published limits
    expect(TRELLO.limits.find((l) => l.scope === 'key')!.capacity).toBe(TRELLO_LIMITS.key.capacity)
    expect(TRELLO.limits.find((l) => l.scope === 'token')!.capacity).toBe(TRELLO_LIMITS.token.capacity)
    expect(TRELLO.limits.find((l) => l.scope === 'token')!.windowMs).toBe(TRELLO_LIMITS.token.windowMs)
  })

  it('every discovered spec is well-formed — a limit and the source that documents it', () => {
    expect(SPECS.length).toBeGreaterThanOrEqual(4)
    for (const s of SPECS) {
      expect(s.vendor).toMatch(/^[a-z]+$/) // one lowercase word, the folder law
      expect(s.baseUrl.startsWith('https://')).toBe(true)
      expect(s.limits.length).toBeGreaterThan(0) // no vendor without a published limit
      expect(s.limitsSource.length).toBeGreaterThan(0) // Law 5: every served number ships its origin
      if (s.auth === 'query') expect(s.authNames?.length).toBe(s.credentials.length)
    }
    expect(specOf('stripe')).toBe(STRIPE)
    expect(specOf('resend')).toBe(RESEND)
    expect(specOf('nobody')).toBeUndefined() // refused, never guessed
  })

  it('the specs are DISCOVERED — every credential exists in the repo, none invented', () => {
    const declared = SPECS.flatMap((s) => s.credentials)
    for (const c of declared) expect(c).toMatch(/^[A-Z][A-Z0-9_]*$/)
    // the four the repo actually carries
    expect(declared).toContain('TRELLO_API_KEY')
    expect(declared).toContain('STRIPE_SECRET_KEY')
    expect(declared).toContain('RESEND_API_KEY')
    // and the free lane honestly declares none
    expect(POLLINATIONS.credentials).toEqual([])
  })
})

describe('api/integration — judged by the constitution it was built under', () => {
  const change: Change = {
    atom: 'api/integration',
    dualities: [
      { builds: 'createIntegrationClient', breaks: 'a 4xx/5xx surfaces as IntegrationError' },
      { builds: 'RateLimiter', breaks: 'a burst past every limit queues and the debt carries' },
      { builds: 'authorize', breaks: 'each auth style asserted on its own wire shape' },
      { builds: 'configFromEnv', breaks: 'absent credentials fail closed, naming all of them' },
    ],
    anchors: ['RFC 9110 §9', 'RFC 6749 §1.4', 'ISO/IEC 25010:2023 §5.7.2'],
    claims: [
      {
        text: 'a burst never drops a request',
        boundary: 'within one process — the buckets are in-memory, so N workers hold N limiters',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [4, 4] },
      { name: 'inbound⊕outbound', ring: [1, 1] },
    ],
    served: [
      { result: 'rate-limit wait (ms)', recompute: 'src/api/integration/index.ts' },
      { result: 'the discovered spec registry', recompute: 'src/api/integration/seed.ts' },
    ],
    postings: [
      { debit: 'vendor/call', credit: 'erpax/record', amount: 1 },
      { debit: 'erpax/record', credit: 'vendor/call', amount: 1 },
    ],
    edges: [
      { from: 'erpax', to: 'vendor' },
      { from: 'vendor', to: 'erpax' },
    ],
    quantities: [
      { name: 'discovered specs', value: SPECS.length, derivation: 'src/api/integration/seed.ts' },
      { name: 'trello burst', value: burstCapacity(TRELLO), derivation: 'src/api/integration/index.ts' },
    ],
    keepers: [],
    seed: ['src/api/integration/seed.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })

  it('would be REFUSED if a spec shipped without the source that documents its limits', () => {
    const unsourced = judge({ ...change, served: change.served.map(({ result }) => ({ result })) })
    expect(unsourced.holds).toBe(false)
    expect(unsourced.verdicts.find((v) => v.law === 'service')!.reason).toContain('belief')
  })
})

describe('api/integration — the reuse fold: one instrument, every vendor', () => {
  const client = (respond = () => ({ body: { ok: true } })) => {
    const { impl, calls } = stubFetch(respond)
    return { client: foldingClient(createIntegrationClient({ ...cfg(), fetchImpl: impl })), wire: calls }
  }

  it('a repeated SAFE request costs no upstream call — reuse, not search', async () => {
    const { client: c, wire } = client()
    for (let i = 0; i < 8; i++) await c.request('GET', '/boards', { id: 'B1' })
    const f = c.ftl()
    expect(f.answers).toBe(8)
    expect(f.calls).toBe(1) // one fetch served eight answers
    expect(f.reuses).toBe(7)
    expect(wire).toHaveLength(1) // measured at the wire, not just the counter
    expect(f.holds).toBe(true)
    expect(f.speedupLog2).toBeCloseTo(3, 10) // log2(8/1)
    expect(f.calls + f.reuses).toBe(f.answers)
  })

  it('a WRITE never folds — deduping one would drop it', async () => {
    const { client: c, wire } = client()
    for (let i = 0; i < 5; i++) await c.request('POST', '/cards', { name: 'same' })
    expect(c.ftl().calls).toBe(5) // every write reached the wire
    expect(c.ftl().reuses).toBe(0)
    expect(c.ftl().holds).toBe(false) // and a write-heavy client honestly shows NO speedup
    expect(wire).toHaveLength(5)
  })

  it('the address is key-order independent, and distinct requests do not collide', async () => {
    expect(requestAddress('GET', '/x', { b: '2', a: '1' })).toBe(requestAddress('GET', '/x', { a: '1', b: '2' }))
    expect(requestAddress('GET', '/x', { a: '1' })).not.toBe(requestAddress('GET', '/x', { a: '2' }))
    expect(requestAddress('GET', '/x', {})).not.toBe(requestAddress('POST', '/x', {}))
    const { client: c } = client()
    await c.request('GET', '/a')
    await c.request('GET', '/b')
    expect(c.ftl().calls).toBe(2) // two addresses, two calls — no false fold
    expect(c.ftl().reuses).toBe(0)
  })

  it('the SAME instrument reports every vendor — that is what standardising the seam buys', async () => {
    for (const spec of SPECS) {
      const { impl } = stubFetch(() => ({ body: {} }))
      const c = foldingClient(createIntegrationClient({ spec, values: spec.credentials.map(() => 'x'), fetchImpl: impl }))
      await c.request('GET', '/ping')
      await c.request('GET', '/ping')
      const f = c.ftl()
      expect(f.answers).toBe(2)
      expect(f.calls).toBe(1)
      expect(f.holds).toBe(true)
    }
  })

  it('nothing reused ⇒ holds is FALSE and speedup is 0 — no free number', () => {
    const { client: c } = client()
    expect(c.ftl()).toEqual({ answers: 0, calls: 0, reuses: 0, holds: false, speedupLog2: 0 })
  })
})
