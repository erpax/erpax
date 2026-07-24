import { describe, it, expect } from 'vitest'
import { IntercompanyReconciliation } from './index'
import { netFlow } from '@/conservation'

// The @invariant "intercompany balances must reconcile (payable = receivable, net)" was a bare axiom —
// asserted with no proof beside it (rules/refutable). This is the proof leg that makes it a theorem:
// it is the SAME conservation algebra as double-entry (netFlow = 0), now at the multi-entity scale.
describe('intercompany/reconciliation — "payable = receivable, net", proven not asserted', () => {
  const rec = (payable: number, receivable: number) =>
    IntercompanyReconciliation.validateIntercompanyBalance('A', 'B', 'USD', payable, receivable)

  it('balanced: payable = receivable ⇒ reconciled, difference 0 (the invariant holds)', () => {
    const r = rec(1000, 1000)
    expect(r.isReconciled).toBe(true)
    expect(r.difference).toBe(0)
  })

  it('REFUTABLE: payable ≠ receivable ⇒ NOT reconciled, difference reported — the claim can be contradicted', () => {
    const r = rec(1000, 900)
    expect(r.isReconciled).toBe(false)
    expect(r.difference).toBeCloseTo(100)
  })

  it('the invariant IS conservation: reconciled ⟺ netFlow([+payable, −receivable]) = 0 — the pyramid at entity scale', () => {
    for (const [p, q] of [[1000, 1000], [500, 500], [1000, 900], [0, 0]] as const) {
      const r = rec(p, q)
      const conserved = netFlow([p, -q]) === 0 // the same balance algebra as double-entry / the conservation pyramid
      expect(r.isReconciled).toBe(conserved)
    }
  })

  it('tolerance, never float equality: a sub-cent difference still reconciles (the honest boundary)', () => {
    expect(rec(1000.001, 1000.0).isReconciled).toBe(true) // within default 0.01
    expect(rec(1000.02, 1000.0).isReconciled).toBe(false) // beyond tolerance — refused
  })

  it('at 0: the empty consolidation conserves trivially — a zero balance reconciles', () => {
    expect(rec(0, 0).isReconciled).toBe(true)
    expect(rec(0, 0).difference).toBe(0)
    expect(netFlow([])).toBe(0) // no balances ⇒ net 0, conserved by vacuity
  })

  it('at SCALE: N=1000 entity-pairs each balanced ⇒ the whole consolidation nets to 0; one break refutes it', () => {
    const flows: number[] = []
    for (let i = 0; i < 1000; i++) {
      const amt = ((i * 7) % 100) + 1
      flows.push(+amt, -amt) // each intercompany pair: payable +amt, receivable −amt
      expect(rec(amt, amt).isReconciled).toBe(true) // every pair reconciles on its own
    }
    expect(netFlow(flows)).toBe(0) // the entire consolidation conserves at scale — Σpayable = Σreceivable
    flows[3] = flows[3]! + 0.5 // break ONE receivable
    expect(netFlow(flows)).not.toBe(0) // refutable at scale: one crack breaks the whole consolidation
  })
})
