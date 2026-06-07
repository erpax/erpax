import { describe, it, expect } from 'vitest'
import {
  GHG_SCOPES,
  GHG_SCOPE_LABEL,
  GHG_SCOPE_OPTIONS,
  GHG_CATEGORIES,
  GHG_CATEGORY_LABEL,
  GHG_CATEGORY_OPTIONS,
  GHG_CATEGORY_TO_SCOPE,
  GHG_METHODOLOGIES,
  GHG_METHODOLOGY_LABEL,
  GHG_METHODOLOGY_OPTIONS,
  GWP_HORIZONS,
  GWP_HORIZON_LABEL,
  GWP_HORIZON_OPTIONS,
  type GhgScope,
  type GhgCategory,
} from '@/ghg/protocol'

// GHG Protocol — the canonical Scope 1/2/3 disaggregation: 22 sub-categories
// (4 Scope 1 + 3 Scope 2 + 15 Scope 3) each rolling up to exactly one scope.
describe('ghg/protocol — scope/category taxonomy', () => {
  it('enumerates the four reporting scopes incl. biogenic', () => {
    expect(GHG_SCOPES).toEqual(['scope_1', 'scope_2', 'scope_3', 'biogenic'])
  })

  it('disaggregates into exactly 22 categories (4 + 3 + 15)', () => {
    expect(GHG_CATEGORIES).toHaveLength(22)
    const counts = { scope_1: 0, scope_2: 0, scope_3: 0, biogenic: 0 }
    for (const c of GHG_CATEGORIES) counts[GHG_CATEGORY_TO_SCOPE[c]]++
    expect(counts.scope_1).toBe(4)
    expect(counts.scope_2).toBe(3)
    expect(counts.scope_3).toBe(15)
  })

  it('every category rolls up to exactly one valid scope', () => {
    for (const c of GHG_CATEGORIES) {
      const scope = GHG_CATEGORY_TO_SCOPE[c]
      expect(GHG_SCOPES).toContain(scope)
    }
    // category prefixes match their scope mapping
    expect(GHG_CATEGORY_TO_SCOPE['s1_stationary']).toBe('scope_1')
    expect(GHG_CATEGORY_TO_SCOPE['s2_electricity_market']).toBe('scope_2')
    expect(GHG_CATEGORY_TO_SCOPE['s3_15_investments']).toBe('scope_3')
  })

  it('every scope and category has a label and an option row', () => {
    for (const s of GHG_SCOPES) expect(GHG_SCOPE_LABEL[s]).toBeTruthy()
    for (const c of GHG_CATEGORIES) expect(GHG_CATEGORY_LABEL[c]).toBeTruthy()
    expect(GHG_SCOPE_OPTIONS).toHaveLength(GHG_SCOPES.length)
    expect(GHG_CATEGORY_OPTIONS).toHaveLength(GHG_CATEGORIES.length)
  })

  it('option rows pair each value with its label', () => {
    const s0: { label: string; value: GhgScope } = GHG_SCOPE_OPTIONS[0]
    expect(s0).toEqual({ value: 'scope_1', label: GHG_SCOPE_LABEL['scope_1'] })
    const c0: { label: string; value: GhgCategory } = GHG_CATEGORY_OPTIONS[0]
    expect(c0).toEqual({
      value: 's1_stationary',
      label: GHG_CATEGORY_LABEL['s1_stationary'],
    })
  })

  it('exposes the Scope 3 §7.3 data-quality methodologies', () => {
    expect(GHG_METHODOLOGIES).toEqual([
      'activity_based',
      'hybrid',
      'spend_based',
      'supplier_specific',
      'average_data',
    ])
    expect(GHG_METHODOLOGY_OPTIONS).toHaveLength(GHG_METHODOLOGIES.length)
    for (const m of GHG_METHODOLOGIES) expect(GHG_METHODOLOGY_LABEL[m]).toBeTruthy()
  })

  it('exposes the IPCC AR6 GWP horizons', () => {
    expect(GWP_HORIZONS).toEqual(['gwp_100', 'gwp_20'])
    expect(GWP_HORIZON_OPTIONS).toHaveLength(2)
    for (const h of GWP_HORIZONS) expect(GWP_HORIZON_LABEL[h]).toBeTruthy()
  })
})
