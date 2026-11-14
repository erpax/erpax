import { test, expect } from '@playwright/test'
import { PayloadSDK } from '@payloadcms/sdk'

/**
 * API E2E — the one API, exercised through Payload's own SDK the way a client and a worker use it.
 *
 * The SDK is the same operations as the Local API over HTTP, so a query written here is the query
 * an application writes. The base URL comes from `PLAYWRIGHT_BASE_URL`, so the spec runs against a
 * local server and against the deployed Worker (`SKIP_E2E_WEBSERVER=1`). It only reads, so it is
 * safe to point at production. The gateway checks need `ERPAX_API_KEY` and are skipped, not
 * passed, without it.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @rfc 9110 http-semantics status-codes
 * @see src/components/payload/local/SKILL.md
 */
const origin = (process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
const headers = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36',
  'accept-language': 'en',
}
const sdk = new PayloadSDK({ baseURL: `${origin}/api`, baseInit: { headers } })
const key = process.env.ERPAX_API_KEY

test.describe('SDK — documents are rows, read as text', () => {
  test('an anonymous list is a list, never a refusal', async () => {
    for (const collection of ['pages', 'posts', 'search'] as const) {
      const res = await sdk.find({ collection, limit: 1, depth: 0 } as never)
      expect(Array.isArray(res.docs), collection).toBe(true)
    }
  })

  test('the search collection answers "which document" with title, slug and description only', async () => {
    const res = await sdk.find({ collection: 'search', limit: 5, depth: 0, select: { title: true, slug: true, meta: { description: true } } } as never)
    for (const doc of res.docs as unknown as Record<string, unknown>[]) {
      expect(Object.keys(doc).filter((k) => !['id', 'title', 'slug', 'meta'].includes(k)), JSON.stringify(doc)).toEqual([])
    }
  })

  test('a document read through search comes back as text, not a node tree', async () => {
    const res = await sdk.find({ collection: 'search', limit: 1, depth: 0, where: { markdown: { exists: true } }, select: { title: true, markdown: true } } as never)
    const [doc] = res.docs as { markdown?: unknown }[]
    test.skip(!doc, 'no document is loaded in this deployment yet')
    expect(typeof doc!.markdown).toBe('string')
    expect(JSON.stringify(doc)).not.toContain('"root"')
  })

  test('a write without credentials is refused', async () => {
    await expect(sdk.create({ collection: 'pages', data: { title: 'anonymous' } } as never)).rejects.toThrow()
  })
})

test.describe('/api/mcp — a gateway onto the same API', () => {
  const rpc = { jsonrpc: '2.0', id: 1, method: 'tools/list' }
  const mcpHeaders = { ...headers, 'content-type': 'application/json', accept: 'application/json, text/event-stream' }

  test('without a key the gateway refuses', async ({ request }) => {
    const res = await request.post(`${origin}/api/mcp`, { headers: mcpHeaders, data: rpc })
    expect(res.status()).toBe(401)
  })

  test('with a key it offers find tools for the document collections', async ({ request }) => {
    test.skip(!key, 'ERPAX_API_KEY is not set')
    const res = await request.post(`${origin}/api/mcp`, { headers: { ...mcpHeaders, authorization: `Bearer ${key}` }, data: rpc })
    expect(res.status()).toBe(200)
    const body = await res.text()
    for (const tool of ['findSearch', 'findPages', 'findPosts']) expect(body, tool).toContain(tool)
  })
})
