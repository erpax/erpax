import { describe, it, expect } from 'vitest'
import { missingBooks, formatMissingBooksReport, volumeIndexTs } from './write'

describe('book/write', () => {
  it('missingBooks lists gaps', () => {
    const r = missingBooks()
    expect(r.entries.length).toBeGreaterThan(0)
    expect(r.entries.length).toBeLessThanOrEqual(40)
  })

  it('volumeIndexTs includes spreadOf', () => {
    expect(volumeIndexTs('atom')).toContain('spreadOf')
  })

  it('formatMissingBooksReport header', () => {
    expect(formatMissingBooksReport()).toContain('missing books')
  })
})
