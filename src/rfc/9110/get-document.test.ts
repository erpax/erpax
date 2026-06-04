/**
 * getDocument tests — cached single-document fetcher.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 9110 §13 caching
 * @standard BCP-47 language-tag locale-keyed-cache
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCachedDocument } from '@/rfc/9110/get-document'

// Mock the payloadCache module
vi.mock('@/utilities/payloadCache', () => ({
  getCachedPayloadDocument: vi.fn((collection, slug) => {
    return async () => ({
      id: '1',
      slug,
      title: `Document: ${slug}`,
      collection,
    })
  }),
}))

describe('getDocument', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a cached fetcher function', () => {
    const fetcher = getCachedDocument('pages', 'home')
    expect(typeof fetcher).toBe('function')
  })

  it('works with different collections', () => {
    const pagesFetcher = getCachedDocument('pages', 'home')
    const postsFetcher = getCachedDocument('posts', 'first-post')
    const productsFetcher = getCachedDocument('products', 'item-1')

    expect(typeof pagesFetcher).toBe('function')
    expect(typeof postsFetcher).toBe('function')
    expect(typeof productsFetcher).toBe('function')
  })

  it('uses getCachedPayloadDocument under the hood', async () => {
    const fetcher = getCachedDocument('pages', 'about')
    const result = await fetcher()

    expect(result).toBeDefined()
    const doc = result as { slug?: string; collection?: string }
    expect(doc.slug).toBe('about')
    expect(doc.collection).toBe('pages')
  })

  it('works with special slug values', () => {
    const homeFetcher = getCachedDocument('pages', 'home')
    const rootFetcher = getCachedDocument('pages', '/')

    expect(typeof homeFetcher).toBe('function')
    expect(typeof rootFetcher).toBe('function')
  })
})
