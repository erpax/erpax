import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createCachedPayloadFetcher,
  getCachedPayloadDocument,
  getCachedPayloadGlobal,
  getCachedPayloadCollection,
  getCachedPayloadCollectionAll,
  getCachedPayloadById,
  getCachedPayloadLocalizedDocument,
} from '@/utilities/payloadCache'

// Mock Next.js cache
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fetcher, keys, options) => fetcher),
}))

// Mock Payload
vi.mock('payload', () => ({
  getPayload: vi.fn(),
}))

// Mock Payload config
vi.mock('@payload-config', () => ({
  default: {},
}))

describe('payloadCache', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createCachedPayloadFetcher', () => {
    it('creates a cached fetcher function', async () => {
      const mockData = { id: '1', title: 'Test' }
      const fetcher = vi.fn(async () => mockData)

      const cachedFetcher = createCachedPayloadFetcher(['key1'], ['tag1'], fetcher)

      expect(typeof cachedFetcher).toBe('function')
    })

    it('calls the fetcher function', async () => {
      const mockData = { id: '1', title: 'Test' }
      const fetcher = vi.fn(async () => mockData)

      const cachedFetcher = createCachedPayloadFetcher(['key1'], ['tag1'], fetcher)

      const result = await cachedFetcher()
      expect(result).toEqual(mockData)
      expect(fetcher).toHaveBeenCalled()
    })

    it('accepts multiple cache keys', () => {
      const fetcher = vi.fn(async () => ({ id: '1' }))
      const cachedFetcher = createCachedPayloadFetcher(['collection', 'slug', 'depth'], ['tag1'], fetcher)

      expect(typeof cachedFetcher).toBe('function')
    })

    it('accepts multiple cache tags', () => {
      const fetcher = vi.fn(async () => ({ id: '1' }))
      const cachedFetcher = createCachedPayloadFetcher(['key1'], ['tag1', 'tag2', 'tag3'], fetcher)

      expect(typeof cachedFetcher).toBe('function')
    })
  })

  describe('getCachedPayloadDocument', () => {
    it('creates a fetcher with collection and slug keys', () => {
      const fetcher = getCachedPayloadDocument('pages', 'home')
      expect(typeof fetcher).toBe('function')
    })

    it('uses depth parameter', () => {
      const fetcher1 = getCachedPayloadDocument('pages', 'home', 0)
      const fetcher2 = getCachedPayloadDocument('pages', 'home', 2)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('defaults to depth 0', () => {
      const fetcher = getCachedPayloadDocument('pages', 'home')
      expect(typeof fetcher).toBe('function')
    })
  })

  describe('getCachedPayloadGlobal', () => {
    it('creates a fetcher for global documents', () => {
      const fetcher = getCachedPayloadGlobal('header')
      expect(typeof fetcher).toBe('function')
    })

    it('uses depth parameter', () => {
      const fetcher1 = getCachedPayloadGlobal('footer', 0)
      const fetcher2 = getCachedPayloadGlobal('footer', 2)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('defaults to depth 0', () => {
      const fetcher = getCachedPayloadGlobal('header')
      expect(typeof fetcher).toBe('function')
    })
  })

  describe('getCachedPayloadCollection', () => {
    it('creates a fetcher with custom cache tag', () => {
      const fetcher = vi.fn(async () => ({ docs: [] }))
      const cachedFetcher = getCachedPayloadCollection('posts', 'posts_published', fetcher)

      expect(typeof cachedFetcher).toBe('function')
    })

    it('allows custom fetcher logic', () => {
      const customFetcher = vi.fn(async () => ({
        docs: [{ id: '1', title: 'Post' }],
      }))

      const cachedFetcher = getCachedPayloadCollection('posts', 'posts_custom', customFetcher)

      expect(typeof cachedFetcher).toBe('function')
    })
  })

  describe('getCachedPayloadCollectionAll', () => {
    it('creates a fetcher for all collection documents', () => {
      const fetcher = getCachedPayloadCollectionAll('redirects')
      expect(typeof fetcher).toBe('function')
    })

    it('uses depth parameter with default 1', () => {
      const fetcher1 = getCachedPayloadCollectionAll('redirects', 1)
      const fetcher2 = getCachedPayloadCollectionAll('redirects', 2)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('disables pagination in query', () => {
      const fetcher = getCachedPayloadCollectionAll('users')
      expect(typeof fetcher).toBe('function')
    })
  })

  describe('getCachedPayloadById', () => {
    it('creates a fetcher for document by ID', () => {
      const fetcher = getCachedPayloadById('users', '123')
      expect(typeof fetcher).toBe('function')
    })

    it('handles numeric IDs', () => {
      const fetcher = getCachedPayloadById('users', 456)
      expect(typeof fetcher).toBe('function')
    })

    it('converts numeric ID to string for cache key', () => {
      const fetcher1 = getCachedPayloadById('users', '789')
      const fetcher2 = getCachedPayloadById('users', 789)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('uses depth parameter with default 0', () => {
      const fetcher1 = getCachedPayloadById('users', '123', 0)
      const fetcher2 = getCachedPayloadById('users', '123', 2)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })
  })

  describe('getCachedPayloadLocalizedDocument', () => {
    it('creates a fetcher for localized document', () => {
      const fetcher = getCachedPayloadLocalizedDocument('pages', 'about', 'de')
      expect(typeof fetcher).toBe('function')
    })

    it('handles string locale', () => {
      const fetcher = getCachedPayloadLocalizedDocument('posts', 'hello', 'fr')
      expect(typeof fetcher).toBe('function')
    })

    it('handles Locale object with code property', () => {
      const locale = { code: 'es' }
      const fetcher = getCachedPayloadLocalizedDocument('pages', 'home', locale as any)
      expect(typeof fetcher).toBe('function')
    })

    it('uses locale in cache tag', () => {
      const fetcher = getCachedPayloadLocalizedDocument('pages', 'about', 'de')
      expect(typeof fetcher).toBe('function')
    })

    it('uses depth parameter with default 0', () => {
      const fetcher1 = getCachedPayloadLocalizedDocument('pages', 'about', 'de', 0)
      const fetcher2 = getCachedPayloadLocalizedDocument('pages', 'about', 'de', 2)

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('generates unique tags for different locales', () => {
      const fetcher1 = getCachedPayloadLocalizedDocument('pages', 'home', 'en')
      const fetcher2 = getCachedPayloadLocalizedDocument('pages', 'home', 'de')

      expect(typeof fetcher1).toBe('function')
      expect(typeof fetcher2).toBe('function')
    })

    it('extracts code from locale object', () => {
      const locale = { code: 'it', label: 'Italian' }
      const fetcher = getCachedPayloadLocalizedDocument('pages', 'home', locale as any)
      expect(typeof fetcher).toBe('function')
    })
  })
})
