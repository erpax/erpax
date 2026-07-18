import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  ACCOUNT_TYPE_TO_PREFIX,
  GL_ACCOUNT_RULES,
  STANDARD_ACCOUNT_CODES,
  type AccountType,
  type GLAccount,
  type AccountAction,
} from './index'

// A pure-type atom is proven by TSC, but its runtime constants carry REFUTABLE invariants — the chart-of-accounts
// contract an ERP posts against. An empty test would game the trinity ledger ([[rules]]/unfolded law); these are
// real claims that reality can break: the code pattern the GLAccount comment promises, the ordered length bounds,
// and the exhaustive AccountType → prefix map. HARMONY ≠ TRUTH — a test that forbids nothing settles nothing.
describe('types/gl/account — the chart-of-accounts contract, proven not decorated', () => {
  it('every AccountType has a non-empty GL code prefix — the map is exhaustive (tsc) and inhabited (runtime)', () => {
    const types: AccountType[] = [
      'asset',
      'liability',
      'equity',
      'revenue',
      'cogs',
      'expense',
      'other_income',
      'other_expense',
    ]
    for (const t of types) {
      expect(ACCOUNT_TYPE_TO_PREFIX[t].length).toBeGreaterThan(0)
      for (const p of ACCOUNT_TYPE_TO_PREFIX[t]) expect(p).toMatch(/^[0-9]$/) // a single leading digit
    }
    // Record<AccountType, …> means adding a ninth AccountType without a prefix fails to compile — the type is the gate.
    expect(Object.keys(ACCOUNT_TYPE_TO_PREFIX).sort()).toEqual([...types].sort())
  })

  it('codePattern accepts the codes the GLAccount comment promises, and rejects a letter or an empty code', () => {
    const { codePattern } = GL_ACCOUNT_RULES
    for (const good of ['1000', '1010', '1010.01', '2000-1', '3_100']) expect(good).toMatch(codePattern)
    for (const bad of ['1A00', 'abc', '', '10 00', '10/1']) expect(bad).not.toMatch(codePattern)
  })

  it('the length + depth bounds are ordered — a min never exceeds its max, depth is positive', () => {
    expect(GL_ACCOUNT_RULES.minCodeLength).toBeLessThan(GL_ACCOUNT_RULES.maxCodeLength)
    expect(GL_ACCOUNT_RULES.minNameLength).toBeLessThan(GL_ACCOUNT_RULES.maxNameLength)
    expect(GL_ACCOUNT_RULES.maxHierarchyDepth).toBeGreaterThan(0)
    // the leaf-vs-header level model (0 = root) cannot exceed the declared max depth
    expect(GL_ACCOUNT_RULES.maxHierarchyDepth).toBeLessThanOrEqual(9)
  })

  it('the standard chart templates all agree on the asset/liability/equity spine (1/2/3)', () => {
    for (const std of Object.values(STANDARD_ACCOUNT_CODES)) {
      expect(std.assets).toMatch(/^1/)
      expect(std.liabilities).toMatch(/^2/)
      expect(std.equity).toMatch(/^3/)
    }
  })

  it('GLAccount.normalBalance and AccountAction are closed unions — the type is the proof', () => {
    expectTypeOf<GLAccount['normalBalance']>().toEqualTypeOf<'debit' | 'credit'>()
    expectTypeOf<AccountAction['action']>().toEqualTypeOf<'lock' | 'unlock' | 'merge' | 'rebalance'>()
  })
})
