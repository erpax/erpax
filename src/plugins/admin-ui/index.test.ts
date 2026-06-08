import { describe, expect, it } from 'vitest'

import { createAccountingCollection } from '@/factory/collection-factory'
import { adminUiPlugin } from './index'

describe('plugins/admin-ui — collection enhancement', () => {
  it('injects erpax ui list columns and uuid cell on factory collections', () => {
    const base = createAccountingCollection({
      slug: 'memories',
      atomPath: 'memory',
      labels: { singular: 'Memory', plural: 'Memories' },
      useAsTitle: 'title',
      defaultColumns: ['title'],
      fields: () => [{ name: 'title', type: 'text', required: true }],
    })

    const plugin = adminUiPlugin()
    const config = plugin({
      collections: [base],
    })

    const c = config.collections![0]!
    expect(c.admin?.defaultColumns?.slice(0, 4)).toEqual([
      'erpaxPathAccount',
      'erpaxSeal',
      'erpaxHoro',
      'uuid',
    ])
    const uuidField = c.fields?.find((f) => 'name' in f && f.name === 'uuid')
    expect(uuidField?.admin?.components?.Cell).toBe('@/admin/ui/cells/ContentUuidChipCell')
    const uiField = c.fields?.find((f) => 'name' in f && f.name === 'erpaxPathAccount')
    expect(uiField?.type).toBe('ui')
  })
})
