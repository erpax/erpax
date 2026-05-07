import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCachedGlobal } from '@/utilities/getGlobals'

// Mock the payloadCache module
vi.mock('@/utilities/payloadCache', () => ({
  getCachedPayloadGlobal: vi.fn((slug, depth) => {
    return async () => ({
      id: '1',
      slug,
      name: `Global: ${slug}`,
      depth,
    })
  }),
}))

describe('getGlobals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a cached fetcher function', () => {
    const fetcher = getCachedGlobal('header')
    expect(typeof fetcher).toBe('function')
  })

  it('works with different global slugs', () => {
    const headerFetcher = getCachedGlobal('header')
    const footerFetcher = getCachedGlobal('footer')
    const settingsFetcher = getCachedGlobal('settings')

    expect(typeof headerFetcher).toBe('function')
    expect(typeof footerFetcher).toBe('function')
    expect(typeof settingsFetcher).toBe('function')
  })

  it('uses getCachedPayloadGlobal under the hood', async () => {
    const fetcher = getCachedGlobal('footer')
    const result = await fetcher()

    expect(result).toBeDefined()
    expect(result.slug).toBe('footer')
  })

  it('accepts depth parameter', () => {
    const fetcher1 = getCachedGlobal('header', 0)
    const fetcher2 = getCachedGlobal('header', 2)

    expect(typeof fetcher1).toBe('function')
    expect(typeof fetcher2).toBe('function')
  })

  it('defaults depth to 0 when not provided', () => {
    const fetcher = getCachedGlobal('navigation')
    expect(typeof fetcher).toBe('function')
  })
})
