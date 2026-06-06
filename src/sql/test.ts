import { describe, it, expect } from 'vitest'
import { toSql, normalize } from '@/sql'

describe('sql — a pure SELECT model with canonical normalization', () => {
  it('toSql renders SELECT with sorted columns + optional WHERE', () => {
    expect(toSql({ table: 'users', columns: ['name', 'id'] })).toBe('SELECT id, name FROM users')
    expect(toSql({ table: 'users', columns: [] })).toBe('SELECT * FROM users')
    expect(toSql({ table: 'u', columns: ['a'], where: 'x = 1' })).toBe('SELECT a FROM u WHERE x = 1')
  })
  it('normalize is order-independent in columns (equivalent queries canonicalize equal)', () => {
    expect(normalize({ table: 'u', columns: ['b', 'a'] })).toBe(normalize({ table: 'u', columns: ['a', 'b'] }))
  })
})
