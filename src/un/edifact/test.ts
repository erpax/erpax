import { describe, it, expect } from 'vitest'
import {
  isEdifactSyntaxId,
  isEdifactMessageType,
  isBalancedInvoicNet,
} from '@/un/edifact'

// UN/EDIFACT D.96A semantic structure — the barrel surfaces the runtime
// guards. SKILL law: every message bracketed by a matching envelope; here
// we prove the enum guards + the INVOIC net-balance invariant gateways use.
describe('un/edifact — D.96A runtime guards', () => {
  it('isEdifactSyntaxId accepts the ISO-9735 syntax ids', () => {
    for (const id of ['UNOA', 'UNOB', 'UNOC', 'UNOD', 'UNOY']) {
      expect(isEdifactSyntaxId(id)).toBe(true)
    }
    expect(isEdifactSyntaxId('UNOZ')).toBe(false)
    expect(isEdifactSyntaxId('unoa')).toBe(false) // case-sensitive
    expect(isEdifactSyntaxId('')).toBe(false)
    expect(isEdifactSyntaxId(4)).toBe(false)
    expect(isEdifactSyntaxId(null)).toBe(false)
  })

  it('isEdifactMessageType accepts the three covered message families', () => {
    for (const t of ['INVOIC', 'DESADV', 'PAYMUL']) {
      expect(isEdifactMessageType(t)).toBe(true)
    }
    expect(isEdifactMessageType('ORDERS')).toBe(false) // out of scope
    expect(isEdifactMessageType('invoic')).toBe(false) // case-sensitive
    expect(isEdifactMessageType('')).toBe(false)
    expect(isEdifactMessageType(undefined)).toBe(false)
  })

  it('isBalancedInvoicNet — Σ line nets ≈ document net (within 1 minor unit)', () => {
    expect(isBalancedInvoicNet([1000], 1000)).toBe(true)
    expect(isBalancedInvoicNet([600, 400], 1000)).toBe(true)
    // sub-unit rounding tolerance: difference strictly < 1 passes
    expect(isBalancedInvoicNet([333.33, 333.33, 333.33], 999.99)).toBe(true)
    // a divergence of 1 or more is rejected (gateways reject malformed INVOIC)
    expect(isBalancedInvoicNet([1000], 1001)).toBe(false)
    expect(isBalancedInvoicNet([600, 400], 1002)).toBe(false)
  })

  it('an empty line set balances only against a zero net total', () => {
    expect(isBalancedInvoicNet([], 0)).toBe(true)
    expect(isBalancedInvoicNet([], 5)).toBe(false)
  })
})
