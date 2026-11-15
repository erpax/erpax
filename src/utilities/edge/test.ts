import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { CLASSES, classify, keyOf, limited, meter, METHODS, refuse, shapeOf, type Shape } from '@/utilities/edge'

const shapes: Shape[] = [false, true].flatMap((api) =>
  [false, true].flatMap((mcp) => [false, true].flatMap((auth) => METHODS.map((method) => ({ api, mcp, auth, method })))),
)

describe('edge — the twin of Edge.lean', () => {
  it('relies on theorems Edge.lean proves', () => {
    const lean = readFileSync(join(import.meta.dirname, '..', 'verify', 'lean', 'Edge.lean'), 'utf8')
    for (const name of ['every_shape_counted', 'sign_in_is_auth_whatever_the_method', 'pages_and_reads_are_never_limited', 'auth_agent_write_are_limited', 'api_writes_are_limited', 'class_keys_never_mix'])
      expect(lean, name).toContain(`theorem ${name}`)
  })

  it('holds the same laws over all 56 shapes', () => {
    expect(shapes).toHaveLength(56)
    for (const s of shapes) {
      const cls = classify(s)
      if (s.auth) expect(cls).toBe('auth')
      if (cls === 'page' || cls === 'read') expect(limited(cls)).toBe(false)
      if (cls === 'auth' || cls === 'agent' || cls === 'write') expect(limited(cls)).toBe(true)
      if (s.api && !s.auth && !s.mcp && s.method !== 'get' && s.method !== 'head') expect(limited(cls)).toBe(true)
    }
    expect(new Set(CLASSES.map((c) => keyOf(c, 'x'))).size).toBe(CLASSES.length)
  })

  it('parses requests into their class', () => {
    const cls = (path: string, method = 'GET') => classify(shapeOf(path, method))
    expect(cls('/api/users/login', 'POST')).toBe('auth')
    expect(cls('/api/users/login', 'GET')).toBe('auth')
    expect(cls('/api/users/first-register', 'POST')).toBe('auth')
    expect(cls('/api/mcp/oauth/token', 'POST')).toBe('auth')
    expect(cls('/api/mcp', 'POST')).toBe('agent')
    expect(cls('/mcp', 'POST')).toBe('agent')
    expect(cls('/api/pages', 'GET')).toBe('read')
    expect(cls('/api/mcp-tool-metadata', 'GET')).toBe('read')
    expect(cls('/api/pages', 'POST')).toBe('write')
    expect(cls('/api/pages/1', 'TRACE')).toBe('write')
    expect(cls('/admin', 'GET')).toBe('page')
    expect(cls('/', 'GET')).toBe('page')
  })
})

describe('edge — at the Worker', () => {
  const limiter = (success: boolean, keys: string[]) => ({ limit: async ({ key }: { key: string }) => (keys.push(key), { success }) })

  it('refuses a limited request past its budget with 429 and Retry-After, keyed by class and client', async () => {
    const keys: string[] = []
    const request = new Request('https://erpax.test/api/pages', { method: 'POST', headers: { 'cf-connecting-ip': '203.0.113.7' } })
    const { cls, response } = await refuse(request, { RATE_LIMITER_API: limiter(false, keys) })
    expect(cls).toBe('write')
    expect(response?.status).toBe(429)
    expect(response?.headers.get('retry-after')).toBe('60')
    expect(keys).toEqual(['write:203.0.113.7'])
  })

  it('never spends a budget on a read or a page, and passes everything when the binding is absent', async () => {
    const keys: string[] = []
    expect((await refuse(new Request('https://erpax.test/api/pages'), { RATE_LIMITER_API: limiter(false, keys) })).response).toBeNull()
    expect((await refuse(new Request('https://erpax.test/admin'), { RATE_LIMITER_API: limiter(false, keys) })).response).toBeNull()
    expect(keys).toEqual([])
    expect((await refuse(new Request('https://erpax.test/api/pages', { method: 'POST' }), {})).response).toBeNull()
  })

  it('counts every request as one data point: class, method, status', () => {
    const points: unknown[] = []
    meter({ ANALYTICS_API: { writeDataPoint: (p) => points.push(p) } }, 'read', 'get', 200)
    expect(points).toEqual([{ blobs: ['read', 'GET', '200'], doubles: [1], indexes: ['read'] }])
  })
})
