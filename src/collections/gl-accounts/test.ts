import { describe, it, expect } from 'vitest'
import GLAccounts from '@/collections/gl-accounts'

// Unified-node invariant test for the `gl-accounts` collection.
describe('gl-accounts collection node', () => {
  it('exports a valid collection config', () => {
    expect(GLAccounts.slug).toBe('gl-accounts')
    expect(Array.isArray(GLAccounts.fields)).toBe(true)
    expect(GLAccounts.fields.length).toBeGreaterThan(0)
  })
  it('carries its posting characteristics itself (the folded gl-posting-rules collection)', () => {
    const names = GLAccounts.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    for (const name of ['requiresReconciliation', 'reconciliationFrequency', 'isCashFlowRelevant', 'closesAtPeriodEnd']) expect(names, name).toContain(name)
    // what the rule set repeated is still said once, here
    for (const name of ['accountType', 'normalBalance']) expect(names.filter((n) => n === name), name).toHaveLength(1)
    for (const gone of ['normalPolarity', 'balanceSheetCategory', 'relatedGLAccounts']) expect(names, gone).not.toContain(gone)
  })
})
