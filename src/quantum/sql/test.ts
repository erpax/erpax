import { describe, it, expect } from 'vitest'
import { queryUuid, sameQuery } from '@/quantum/sql'

describe('quantum/sql — a query as a content-uuid', () => {
  it('equivalent queries (column order) share one uuid', () => {
    expect(sameQuery({ table: 'u', columns: ['a', 'b'] }, { table: 'u', columns: ['b', 'a'] })).toBe(true)
  })
  it('different queries get different uuids', () => {
    expect(sameQuery({ table: 'u', columns: ['a'] }, { table: 'v', columns: ['a'] })).toBe(false)
    expect(queryUuid({ table: 'u', columns: ['a'] })).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
