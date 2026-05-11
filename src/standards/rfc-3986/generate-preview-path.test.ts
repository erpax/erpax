/**
 * generatePreviewPath tests — signed admin live-preview URL builder.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 3986 uniform-resource-identifier
 * @standard W3C URL Living Standard
 * @standard BCP-47 language-tag
 * @security ISO-27002 §5.15 access-control preview-secret
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generatePreviewPath } from '@/standards/rfc-3986/generate-preview-path'

vi.mock('@/utilities/getPreviewSecret', () => ({
  getPreviewSecret: () => 'test-preview-secret-123',
}))

/** Decoded `path` value from `/next/preview?path=...` (query layer encodes once). */
function pathFromPreview(result: string | null): string {
  if (!result) return ''
  const raw = new URL(result, 'http://localhost').searchParams.get('path')
  if (!raw) return ''
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

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
      expect(pathFromPreview(result)).toBe('/en/posts/my-post')
    })

    it('generates products path', () => {
      const result = generatePreviewPath({
        collection: 'products',
        slug: 'product-1',
        locale: 'en',
      })
      expect(pathFromPreview(result)).toBe('/en/products/product-1')
    })

    it('generates home page for pages collection with home slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'home',
        locale: 'en',
      })
      expect(pathFromPreview(result)).toBe('/en')
      expect(pathFromPreview(result)).not.toContain('/home')
    })

    it('generates nested path for pages collection with non-home slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'en',
      })
      expect(pathFromPreview(result)).toBe('/en/about')
    })
  })

  describe('locale handling', () => {
    it('uses string locale directly', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: 'de',
      })
      expect(pathFromPreview(result)).toBe('/de/about')
    })

    it('extracts code from locale object', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'about',
        locale: { code: 'fr' },
      })
      expect(pathFromPreview(result)).toBe('/fr/about')
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
      expect(pathFromPreview(result)).toBe('/en/posts/post with spaces')
    })

    it('encodes forward slashes in slug', () => {
      const result = generatePreviewPath({
        collection: 'pages',
        slug: 'parent/child',
        locale: 'en',
      })
      expect(pathFromPreview(result)).toContain('parent')
      expect(pathFromPreview(result)).toContain('child')
    })

    it('encodes unicode characters', () => {
      const result = generatePreviewPath({
        collection: 'posts',
        slug: 'möbius',
        locale: 'de',
      })
      expect(pathFromPreview(result)).toBe('/de/posts/möbius')
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
      expect(result).toMatch(/path=%2Fen%2Fposts%2F/)
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
      expect(pathFromPreview(result)).toBe('/de/about')
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
