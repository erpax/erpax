import { describe, it, expect } from 'vitest'
import { erpaxMetaOf } from './index'
import { COLLECTION_DIAMOND_KEY } from '@/factory/collection/base'

describe('admin/ui — how a collection presents itself in the panel', () => {
  it('derives the atom path from the slug when the collection carries no diamond', () => {
    expect(erpaxMetaOf({ slug: 'bank-statements', fields: [] } as never).atomPath).toBe('bank/statements')
    expect(erpaxMetaOf({ slug: 'users', fields: [] } as never).atomPath).toBe('users')
  })

  it('prefers the diamond the collection declares over the slug guess', () => {
    const meta = erpaxMetaOf({ slug: 'anything-at-all', fields: [], [COLLECTION_DIAMOND_KEY]: { atomPath: 'rules/probe' } } as never)
    expect(meta.atomPath).toBe('rules/probe')
  })
})
