import { describe, expect, it } from 'vitest'

import { createAccountingCollection } from '@/factory/collection-factory'
import type { Config } from 'payload'
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
    const config = plugin({ collections: [base], secret: 'test' } as Config) as Config

    const c = config.collections![0]!
    expect(c.admin?.defaultColumns?.slice(0, 4)).toEqual([
      'erpaxPathAccount',
      'erpaxSeal',
      'erpaxHoro',
      'uuid',
    ])
    const uuidField = c.fields?.find((f) => 'name' in f && (f as { name: string }).name === 'uuid')
    expect(uuidField?.admin?.components?.Cell).toBe('@/admin/ui/cells/ContentUuidChipCell')
    const uiField = c.fields?.find((f) => 'name' in f && (f as { name: string }).name === 'erpaxPathAccount')
    expect(uiField?.type).toBe('ui')
  })

  it('FTL admin boot: dashboard panels own heavy providers; root is CSS-only', () => {
    const plugin = adminUiPlugin()
    const config = plugin({ collections: [], secret: 'test' } as unknown as Config) as Config
    expect(config.admin?.components?.providers).toContain('@/admin/ui/ComputedCssAdminRoot')
    expect(config.admin?.components?.afterDashboard).toEqual(
      expect.arrayContaining([
        '@/admin/ui/dashboard/CorpusEntropyDashboard',
        '@/admin/ui/dashboard/AdminQuantumDashboard',
        '@/admin/ui/violations/AdminViolationDashboard',
      ]),
    )
    expect(config.admin?.components?.afterDashboard).not.toContain('@/quantum/RadixDimensionPanel')
    expect(config.admin?.components?.afterDashboard).not.toContain(
      '@/admin/ui/violations/ViolationMonitorPanel',
    )
  })
})
