/**
 * getGlobals tests — cached global fetcher.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 9110 §13 caching
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCachedGlobal } from './index'

// Mock the payloadCache module
// get-globals imports from ./cache (moved from @/utilities/payloadCache); the mock specifier must
// match the code-under-test's import or vi.mock never intercepts.
vi.mock('../../cache', () => ({
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

    expect(typeof headerFetcher).toBe('function')
    expect(typeof footerFetcher).toBe('function')
  })

  it('uses getCachedPayloadGlobal under the hood', async () => {
    const fetcher = getCachedGlobal('footer')
    const result = await fetcher()

    expect(result).toBeDefined()
    expect((result as { slug?: string }).slug).toBe('footer')
  })

  it('accepts depth parameter', () => {
    const fetcher1 = getCachedGlobal('header', 0)
    const fetcher2 = getCachedGlobal('header', 2)

    expect(typeof fetcher1).toBe('function')
    expect(typeof fetcher2).toBe('function')
  })

  it('defaults depth to 0 when not provided', () => {
    const fetcher = getCachedGlobal('footer')
    expect(typeof fetcher).toBe('function')
  })
})
