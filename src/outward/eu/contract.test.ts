import { describe, it, expect } from 'vitest'
import { contractOffline, checkVies, checkEcb, checkPeppol } from './contract'

/**
 * The RELEASE-GATE half: our parsers against frozen fixtures. Deterministic, offline,
 * cannot flake — a correct erpax must never fail its own release because someone
 * else's server is down. The sanctions 403 that first motivated this split turned out
 * to be OUR bug (a missing public token), which is the case FOR the split, not against
 * it: the offline half kept the release honest while the live half named the break.
 */

describe('outward/eu contract — the frozen fixtures satisfy what erpax parses', () => {
  it('every rail holds against its captured response', () => {
    for (const c of contractOffline()) {
      expect(c.holds, `${c.rail}: ${c.detail}`).toBe(true)
    }
  })

  it('covers each reachable rail exactly once', () => {
    expect(contractOffline().map((c) => c.rail).sort()).toEqual(['ecb', 'peppol', 'sanctions', 'vies'])
  })
})

describe('outward/eu contract — each check FAILS on a real break', () => {
  it('vies: a renamed/removed checkVat operation breaks it', () => {
    expect(checkVies('<wsdl:operation name="checkVat"/>').holds).toBe(true)
    expect(checkVies('<wsdl:operation name="validateVat"/>').holds).toBe(false)
    expect(checkVies('').holds).toBe(false)
  })

  it('ecb: a moved rate SHAPE breaks it; a moved rate VALUE does not', () => {
    const shape = (r: string) => `<Cube currency='BGN' rate='${r}'/>`
    expect(checkEcb(shape('1.95583')).holds).toBe(true)
    expect(checkEcb(shape('1.96')).holds).toBe(true) // value moved — NOT a contract break
    expect(checkEcb('<rate ccy="BGN">1.95583</rate>').holds).toBe(false) // shape moved
    // A currency LEAVING the list is a world fact, not a contract break — Bulgaria
    // adopting the euro must not fail erpax's release (it did, in the first draft).
    expect(checkEcb(`<Cube currency='USD' rate='1.1'/>`).holds).toBe(true)
    expect(checkEcb(`<Cube currency='USD' rate='abc'/>`).holds).toBe(false) // unparseable
  })

  it('peppol: a missing matches[] or non-numeric count breaks it', () => {
    expect(checkPeppol('{"matches":[],"total-result-count":0}').holds).toBe(true)
    expect(checkPeppol('{"total-result-count":0}').holds).toBe(false)
    expect(checkPeppol('{"matches":[],"total-result-count":"0"}').holds).toBe(false)
    expect(checkPeppol('<html>502</html>').holds).toBe(false)
  })
})
