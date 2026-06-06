import { describe, it, expect } from 'vitest'
import { queryUuid, sameQuery } from '@/quantum/query'

describe('quantum/query — a query as a content-uuid', () => {
  it('normalizes whitespace + case to one identity', () => {
    expect(sameQuery('SELECT 1 ', ' select 1')).toBe(true)
  })
  it('different queries differ; the uuid is well-formed', () => {
    expect(sameQuery('select 1', 'select 2')).toBe(false)
    expect(queryUuid('select 1')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
