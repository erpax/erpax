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

import { schemaCoverage } from './index'

describe('schemaCoverage — all standards are covered by schemas, computed in quantum (manifested at once)', () => {
  const c = schemaCoverage()
  it('every standard is covered by a schema (family) — the law holds, 0 uncovered', () => {
    expect(c.allCovered).toBe(true)
    expect(c.uncovered).toEqual([])
    expect(c.covered).toBe(c.total)
  })
  it('the schemas are the distinct families the standards fold into', () => {
    expect(c.schemas.length).toBeGreaterThan(0)
    expect(c.schemas).toEqual([...c.schemas].sort()) // deterministic order
  })
  it('the superposition folds every (standard ⊕ schema) to ONE content-address — all manifested at once', () => {
    expect(c.root).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(schemaCoverage().root).toBe(c.root) // deterministic — the fold, not a scan
  })
})
