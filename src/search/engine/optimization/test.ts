import { describe, it, expect } from 'vitest'
import { KEYWORDS, TOPICS, relevance } from '@/search/engine/optimization'

describe('search/engine/optimization — SEO', () => {
  it('has a non-empty keyword + topic strategy', () => {
    expect(KEYWORDS.length).toBeGreaterThan(0)
    expect(TOPICS.length).toBeGreaterThan(0)
  })
  it('relevance is the fraction of keywords present in the text (0 → 1)', () => {
    expect(relevance('')).toBe(0)
    expect(relevance('an erp with double-entry accounting in typescript')).toBeGreaterThan(0)
    expect(relevance(KEYWORDS.join(' '))).toBe(1)
  })
})
