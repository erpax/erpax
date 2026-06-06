import { describe, it, expect } from 'vitest'
import { search, rank } from '@/search/engine'

describe('search/engine — query the corpus', () => {
  it('search finds atoms containing the query; empty query → empty', () => {
    expect(search('')).toEqual([])
    const r = search('quantum')
    expect(r.length).toBeGreaterThan(0)
    expect(r).toContain('quantum')
  })
  it('rank puts the exact/closest match first', () => {
    expect(rank('quantum')[0]).toBe('quantum') // exact name, position 0, shortest
  })
})
