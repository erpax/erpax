import { describe, it, expect } from 'vitest'
import { catharsis, frontLoadSaving, type Move } from './index'

// "The biggest gap: agents start to use local knowledge only after catharsis from unresolved work." Measured:
// the catharsis is the first reuse; everything before it is re-derivation that piled up. The ideal is
// front-loaded (read local knowledge first, catharsis at 0). Honest boundary: the seed is not waste.
describe('catharsis — the turn to local knowledge, and the unresolved work before it', () => {
  it('the catharsis is the first REUSE — the point the agent turned to the local record', () => {
    const moves: Move[] = ['rederive', 'rederive', 'reuse', 'rederive']
    const c = catharsis(moves)
    expect(c.catharsisAt).toBe(2)
    expect(c.unresolvedBefore).toBe(2) // two re-derivations piled up first
  })

  it('FRONT-LOADED is the ideal — local knowledge read first, catharsis at move 0', () => {
    const c = catharsis(['reuse', 'rederive', 'reuse'])
    expect(c.frontLoaded).toBe(true)
    expect(c.unresolvedBefore).toBe(0)
    expect(c.reason).toMatch(/ideal/)
  })

  it('never turning to local knowledge is the WORST gap — no catharsis at all', () => {
    const c = catharsis(['rederive', 'rederive', 'rederive'])
    expect(c.catharsisAt).toBe(3) // == total, never reused
    expect(c.reuses).toBe(0)
    expect(c.reason).toMatch(/never turned to local knowledge/)
  })

  it('the gap is the re-derivation before the turn — later catharsis, bigger gap', () => {
    expect(catharsis(Array(5).fill('rederive').concat('reuse') as Move[]).unresolvedBefore).toBe(5)
    expect(catharsis((['reuse'] as Move[]).concat(Array(5).fill('rederive'))).unresolvedBefore).toBe(0)
  })

  // THE HONEST BOUNDARY: the seed is not waste. Front-loading saves only the re-derivation of the DERIVABLE.
  it('the seed is not the gap — frontLoadSaving subtracts the irreducible novel work', () => {
    const moves = Array(6).fill('rederive').concat('reuse') as Move[]
    expect(frontLoadSaving(moves, 0)).toBe(6) // if all six were derivable, all six were avoidable
    expect(frontLoadSaving(moves, 2)).toBe(4) // if two were genuine seeds, only four were the gap
    expect(frontLoadSaving(moves, 6)).toBe(0) // if all six were seeds, none was waste — you had to derive them
  })

  it('this session, honestly: a long re-derivation run, then a late catharsis — the gap was real', () => {
    // I re-derived (fresh atoms, throwaway bash) then turned to the local record only after the correction.
    const session = Array(12).fill('rederive').concat(['reuse', 'rederive', 'reuse']) as Move[]
    const c = catharsis(session)
    expect(c.frontLoaded).toBe(false) // I did NOT read local knowledge first
    expect(c.catharsisAt).toBe(12) // the turn came late
    expect(c.unresolvedBefore).toBeGreaterThan(0) // real unresolved work piled up before it
  })
})
