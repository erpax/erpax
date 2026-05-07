import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCachedRedirects } from '@/utilities/getRedirects'

// Mock the payloadCache module
vi.mock('@/utilities/payloadCache', () => ({
  getCachedPayloadCollectionAll: vi.fn((collection) => {
    return async () => ({
      docs: [
        { id: '1', from: '/old-path', to: '/new-path', statusCode: 301 },
        { id: '2', from: '/deprecated', to: '/current', statusCode: 302 },
      ],
      collection,
    })
  }),
}))

describe('getRedirects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a cached fetcher function', () => {
    const fetcher = getCachedRedirects()
    expect(typeof fetcher).toBe('function')
  })

  it('uses getCachedPayloadCollectionAll', async () => {
    const fetcher = getCachedRedirects()
    const result = await fetcher()

    expect(result).toBeDefined()
    expect(result.docs).toBeDefined()
  })

  it('fetches all redirects from collection', async () => {
    const fetcher = getCachedRedirects()
    const result = await fetcher()

    expect(result.docs).toHaveLength(2)
    expect(result.docs[0].from).toBe('/old-path')
    expect(result.docs[1].from).toBe('/deprecated')
  })

  it('includes redirect details', async () => {
    const fetcher = getCachedRedirects()
    const result = await fetcher()

    const redirect = result.docs[0]
    expect(redirect).toHaveProperty('from')
    expect(redirect).toHaveProperty('to')
    expect(redirect).toHaveProperty('statusCode')
    expect(redirect.statusCode).toBe(301)
  })

  it('supports different status codes', async () => {
    const fetcher = getCachedRedirects()
    const result = await fetcher()

    const codes = result.docs.map((d) => d.statusCode)
    expect(codes).toContain(301)
    expect(codes).toContain(302)
  })

  it('returns same structure on multiple calls', async () => {
    const fetcher = getCachedRedirects()
    const result1 = await fetcher()
    const result2 = await fetcher()

    expect(result1.docs).toEqual(result2.docs)
  })
})
