import { describe, it, expect } from 'vitest'
import { trialBalance, conserves, netFlow, boundaryConserves, NOETHER } from '@/conservation'
import type { Entry } from '@/conservation'

// conservation computed as pure math — asserts RELATIONS and IDENTITIES.
// Every test breaks the instant the algebra drifts; no magic numbers are
// hand-asserted without a derivation present in the assertion itself.
describe('conservation: double-entry = physical conservation (Pacioli 1494 / Noether 1918)', () => {
  // 1. Empty ledger: the trivial balanced state.
  it('empty ledger ⇒ trialBalance === 0 and conserves === true', () => {
    expect(trialBalance([])).toBe(0)
    expect(conserves([])).toBe(true)
  })

  // 2. A matched ledger conserves; injecting an unmatched debit breaks it,
  //    and the resulting trialBalance equals exactly the injected amount.
  it('balanced ledger conserves; one extra debit breaks conservation and the residual equals the injected amount', () => {
    const matched: Entry[] = [
      { debit: 300, credit: 200 },
      { debit: 100, credit: 200 },
    ]
    expect(conserves(matched)).toBe(true)
    expect(trialBalance(matched)).toBe(0)

    const injected = 57
    const broken: Entry[] = [...matched, { debit: injected, credit: 0 }]
    expect(conserves(broken)).toBe(false)
    expect(trialBalance(broken)).toBe(injected) // identity, not a magic number
  })

  // 3. netFlow identities: opposite flows cancel; a simple sum holds.
  it('netFlow([a, -a]) === 0 (closed cancellation) and netFlow([1,2,3]) === 1+2+3', () => {
    const a = 42
    expect(netFlow([a, -a])).toBe(0)
    expect(netFlow([1, 2, 3])).toBe(6) // 1+2+3, derived not guessed
  })

  // 4. boundaryConserves: deltaStock must equal Σinflows − Σoutflows.
  //    Perturbation by ±1 must flip the result.
  it('boundaryConserves is true iff deltaStock === Σinflows − Σoutflows; +1 perturbation is false', () => {
    const ins = [50, 30]   // total 80
    const outs = [20, 10]  // total 30
    const exact = 80 - 30  // = 50
    expect(boundaryConserves(exact, ins, outs)).toBe(true)
    expect(boundaryConserves(exact + 1, ins, outs)).toBe(false)
    expect(boundaryConserves(exact - 1, ins, outs)).toBe(false)
  })

  // 5. NOETHER table: correct and frozen (immutable).
  it("NOETHER['time-translation'] === 'energy' and the table is frozen", () => {
    expect(NOETHER['time-translation']).toBe('energy')
    expect(NOETHER['space-translation']).toBe('momentum')
    expect(NOETHER['rotation']).toBe('angular-momentum')
    expect(NOETHER['phase']).toBe('charge')
    expect(Object.isFrozen(NOETHER)).toBe(true)
    // mutation attempt must silently fail (strict mode throws, but the value stays)
    const key = 'time-translation'
    const original = NOETHER[key]
    try { (NOETHER as Record<string, string>)[key] = 'mutated' } catch { /* frozen */ }
    expect(NOETHER[key]).toBe(original)
  })
})
