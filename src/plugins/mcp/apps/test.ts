import type { Config, PayloadRequest } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { appMcp, appSlugs } from '@/plugins/mcp/apps'

const apps = [
  { slug: 'sales', title: 'Sales', anchors: ['orders'] },
  { slug: 'stock', title: 'Stock', anchors: ['products'] },
]
const collections = [
  { slug: 'orders', fields: [] },
  { slug: 'products', fields: [] },
]
const request = (host: string): PayloadRequest => ({ headers: new Headers({ host }) }) as unknown as PayloadRequest

describe('appMcp — one server per app, chosen by host', () => {
  it('gives every collection to exactly one app', () => {
    const slugs = appSlugs(collections, apps)
    expect(slugs.get('sales')).toEqual(['orders'])
    expect(slugs.get('stock')).toEqual(['products'])
  })

  it('runs after mcpPlugin (order 10), which adds the /mcp endpoint it wraps', () => {
    expect((appMcp(apps) as unknown as { order: number }).order).toBeGreaterThan(10)
  })

  it('keeps the endpoint list and sends a non-app host to the gateway handler', async () => {
    const gateway = vi.fn(async () => new Response('gateway'))
    const config = { admin: { user: 'users' }, collections, endpoints: [{ path: '/mcp', method: 'post', handler: gateway }, { path: '/other', method: 'get', handler: gateway }] } as unknown as Config
    const out = appMcp(apps)(config) as Config
    expect((out.endpoints ?? []).map((e) => `${e.method} ${e.path}`)).toEqual(['post /mcp', 'get /other'])
    expect(out.collections).toBe(config.collections)
    const mcp = out.endpoints![0]!
    expect(await (await mcp.handler(request('erpax.com'))).text()).toBe('gateway')
    expect(gateway).toHaveBeenCalledTimes(1)
  })
})
