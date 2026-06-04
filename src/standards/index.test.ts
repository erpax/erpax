/**
 * Unified-node invariant test for the `standards` collection.
 * @standard ISO/IEC-29119:2022 software-testing (invariant coverage)
 * @standard ISO-19011:2018 §6.4 audit-evidence (the collection is the citation registry)
 */
import { describe, it, expect } from 'vitest'
import createAccountingCollection from '@/standards'

describe('standards collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('standards')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
