import { describe, it, expect } from 'vitest'
import { invert, manifest, survives } from './index'

// "Testing through pairs of inverted development teams so they always are on the opposite sides and their
// creation manifests realtime." A prover and a refuter, duals — the refuter attacks exactly what the prover
// builds. Popper asymmetry: one refutation falls the claim; no proof verifies it. A claim STANDS = not yet
// refuted, never proven true.
describe('duel — inverted teams on opposite sides, manifesting realtime', () => {
  it('the two teams are always OPPOSITE — the anti-claim is the negation, never the same side', () => {
    const p = invert('debits equal credits')
    expect(p.claim).toBe('debits equal credits')
    expect(p.antiClaim).toBe('¬(debits equal credits)') // the refuter can never agree with the prover
    expect(p.antiClaim).not.toBe(p.claim)
  })

  it('a refutation FALLS the claim — one counterexample beats any proof (Popper asymmetry)', () => {
    const v = manifest({ proved: true, refuted: true }) // even with a proof, a single break wins
    expect(v.stands).toBe(false)
    expect(v.holder).toBe('refuter')
    expect(v.reason).toMatch(/one counterexample/)
  })

  it('proved and not refuted ⇒ STANDS — but corroborated, not proven true', () => {
    const v = manifest({ proved: true, refuted: false })
    expect(v.stands).toBe(true)
    expect(v.holder).toBe('prover')
    expect(v.reason).toMatch(/corroborated.*never proven true/)
  })

  it('neither proved nor refuted ⇒ OPEN — the untested, unbalanced state the duel exists to close', () => {
    const v = manifest({ proved: false, refuted: false })
    expect(v.stands).toBe(false)
    expect(v.holder).toBe('open')
  })

  it('the refuter holds the STRONGER side — the same round refuted vs proved goes to the refuter', () => {
    expect(manifest({ proved: true, refuted: true }).holder).toBe('refuter') // asymmetry: break beats proof
    expect(manifest({ proved: false, refuted: true }).holder).toBe('refuter')
  })

  it('survives a stream of realtime rounds iff EVER proved and NEVER refuted', () => {
    expect(survives([{ proved: true, refuted: false }, { proved: true, refuted: false }])).toBe(true)
    expect(survives([{ proved: true, refuted: false }, { proved: false, refuted: true }])).toBe(false) // one break, ever, falls it
    expect(survives([{ proved: false, refuted: false }])).toBe(false) // never proved ⇒ untested, does not survive
    expect(survives([])).toBe(false) // no rounds ⇒ no test
  })

  it('the asymmetry is not symmetric adversaries — the prover must survive EVERY round, the refuter needs ONE', () => {
    const many = Array.from({ length: 100 }, () => ({ proved: true, refuted: false }))
    expect(survives(many)).toBe(true) // 100 proofs and no break: stands
    expect(survives([...many, { proved: false, refuted: true }])).toBe(false) // one break at the end falls all of it
  })
})
