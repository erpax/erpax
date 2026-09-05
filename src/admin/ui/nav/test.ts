import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('admin/ui/nav — the canonical entry point', () => {
  it('offers every member the folder holds, so no caller reaches past the barrel', () => {
    expect(Object.hasOwn(barrel, 'CorpusNavLinks')).toBe(true)
  })

  it('offers exactly what it names — a barrel that grew a member silently is a face nobody reviewed', () => {
    expect(Object.keys(barrel).sort()).toEqual(['CorpusNavLinks'])
  })
})
