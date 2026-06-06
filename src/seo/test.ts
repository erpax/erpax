import { describe, it, expect } from 'vitest'
import { seo, comprehensive, headTags, seoCoverage } from '@/seo'

describe('seo — comprehensive marketing/SEO, the forcing function', () => {
  it('computes a comprehensive SEO from an atom + description', () => {
    const s = seo('deploy', 'Use when deploying — the gate-green order', ['gate', 'stack'])
    expect(comprehensive(s)).toBe(true)
    expect(s.title).toBe('deploy')
    expect((s.jsonLd as { '@type': string })['@type']).toBe('TechArticle')
  })
  it('is NOT comprehensive without a description — the gap the forcing function catches', () => {
    expect(comprehensive(seo('x', ''))).toBe(false)
  })
  it('clips the meta description to <= 160 chars', () => {
    expect(seo('a', 'x'.repeat(300)).description.length).toBeLessThanOrEqual(160)
  })
  it('headTags carry the description and the JSON-LD — what vitepress displays', () => {
    const tags = headTags(seo('deploy', 'Use when deploying'))
    expect(tags.some((t) => t[0] === 'meta' && (t[1] as { name?: string }).name === 'description')).toBe(true)
    expect(tags.some((t) => t[0] === 'script' && (t[1] as { type?: string }).type === 'application/ld+json')).toBe(true)
  })
  it('EVERY atom yields comprehensive SEO — coverage total, else the corpus is marketing-incomplete', () => {
    const c = seoCoverage()
    expect(c.atoms).toBeGreaterThan(2000)
    expect(c.incomplete).toEqual([]) // the forcing function: no atom may lack SEO
    expect(c.coverage).toBe(1)
  })
})
