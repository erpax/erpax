import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

// Mock localeUtils
vi.mock('@/utilities/localeUtils', () => ({
  resolveLocale: (locale: any) => {
    if (typeof locale === 'string') return locale
    if (typeof locale === 'object' && locale?.code) return locale.code
    return 'en'
  },
}))

// Mock getPreviewSecret
vi.mock('@/utilities/getPreviewSecret', () => ({
  getPreviewSecret: () => 'test-preview-secret-123',
}))

describe('generatePreviewPath', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('slug validation', () => {
    it('returns null for undefined slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: undefined,
      })
      expect(result).toBeNull()
    })

    it('returns null for null slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: null,
      })
      expect(result).toBeNull()
    })

    it('generates path for valid slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'home',
      })
      expect(result).toBeTruthy()
      expect(result).toContain('/next/preview')
    })
  })

  describe('collection handling', () => {
    it('generates posts path', () => {
      const result = generatePreviewPath({
        collection: 'posts',
        slug: 'my-post',
        locale: 'en',
      })
      expect(result).toContain('/en/posts/my-post')
    })

    it('generates products path', () => {
      const result = generatePreviewPath({
        collection: 'products',
        slug: 'product-1',
        locale: 'en',
      })
      expect(result).toContain('/en/products/product-1')
    })

    it('generates home page for pages collection with home slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'home',
        locale: 'en',
      })
      expect(result).toContain('/en/')
      expect(result).not.toContain('/en/home')
    })

    it('generates nested path for pages collection with non-home slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'en',
      })
      expect(result).toContain('/en/about')
    })
  })

  describe('locale handling', () => {
    it('uses string locale directly', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'de',
      })
      expect(result).toContain('/de/')
    })

    it('extracts code from locale object', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: { code: 'fr' },
      })
      expect(result).toContain('/fr/')
    })

    it('handles undefined locale', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: undefined,
      })
      expect(result).toBeTruthy()
      expect(result).toContain('/next/preview')
    })

    it('handles null locale', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: null,
      })
      expect(result).toBeTruthy()
      expect(result).toContain('/next/preview')
    })
  })

  describe('slug encoding', () => {
    it('encodes special characters in slug', () => {
      const result = generatePreviewPath({
        collection: 'posts',
        slug: 'post with spaces',
        locale: 'en',
      })
      expect(result).toContain('post%20with%20spaces')
    })

    it('encodes forward slashes in slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'parent/child',
        locale: 'en',
      })
      expect(result).toContain('parent%2Fchild')
    })

    it('encodes unicode characters', () => {
      const result = generatePreviewPath({
        collection: 'posts',
        slug: 'möbius',
        locale: 'de',
      })
      expect(result).toContain('m%C3%B6bius')
    })
  })

  describe('URL structure', () => {
    it('returns /next/preview URL', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'home',
      })
      expect(result?.startsWith('/next/preview')).toBe(true)
    })

    it('includes path parameter', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'en',
      })
      expect(result).toContain('path=')
    })

    it('includes previewSecret parameter', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
      })
      expect(result).toContain('previewSecret=')
      expect(result).toContain('test-preview-secret-123')
    })

    it('encodes URL parameters properly', () => {
      const result = generatePreviewPath({
        collection: 'posts',
        slug: 'post with spaces',
        locale: 'en',
      })
      expect(result).toContain('path=%2Fen%2Fposts%2Fpost%20with%20spaces')
    })
  })

  describe('request context', () => {
    it('accepts request parameter', () => {
      const req = { locale: 'es' } as any
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'contact',
        req,
      })
      expect(result).toBeTruthy()
    })

    it('uses explicit locale over request locale', () => {
      const req = { locale: 'es' } as any
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'de',
        req,
      })
      expect(result).toContain('/de/')
    })
  })

  describe('edge cases', () => {
    it('handles empty string slug as valid', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: '',
      })
      expect(result).toBeTruthy()
    })

    it('handles very long slug', () => {
      const longSlug = 'a'.repeat(500)
      const result = generatePreviewPath({
        collection: 'posts',
        slug: longSlug,
      })
      expect(result).toBeTruthy()
    })

    it('handles multiple consecutive slashes in slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'parent//child',
      })
      expect(result).toBeTruthy()
    })
  })
})
