import { describe, it, expect } from 'vitest'
import { pathExplain } from './index'

describe('book/compute — a path explained segment by segment', () => {
  it('names the leaf as the slug and opens with the real source path', () => {
    const e = pathExplain('rules/probe')
    expect(e.slug).toBe('probe')
    expect(e.path).toBe('rules/probe')
    expect(e.openingLine).toContain('src/rules/probe')
  })

  it('a one-segment path is its own leaf', () => {
    expect(pathExplain('law').slug).toBe('law')
  })

  it('the bond line is present for any path, so a page always has an opening', () => {
    for (const p of ['rules/probe', 'law', 'uuid/matrix']) {
      expect(pathExplain(p).bondLine).toMatch(/^bond /)
    }
  })
})
