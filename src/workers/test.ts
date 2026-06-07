import { describe, it, expect } from 'vitest'
import { translations } from '@/workers'

// workers — one schema.org word, content-addressed. The atom's public face is its
// massless translation projection (name + description), each message carrying its
// fold-uuid + the word-atoms it splits into.
describe('workers — content-addressed translation projection', () => {
  it('re-exports a non-empty translation table', () => {
    expect(Array.isArray(translations)).toBe(true)
    expect(translations.length).toBeGreaterThan(0)
  })

  it('carries the name message — the word is `workers`', () => {
    const name = translations.find((t) => t.key === 'name')
    expect(name).toBeDefined()
    expect(name?.values.en).toBe('workers')
    expect(name?.words).toContain('workers')
  })

  it('every message is content-addressed (a uuid) and en === source', () => {
    for (const t of translations) {
      expect(t.uuid).toMatch(/^[0-9a-f-]{36}$/)
      expect(t.values.en).toBe(t.source)
      expect(t.words.length).toBeGreaterThan(0)
    }
  })
})
