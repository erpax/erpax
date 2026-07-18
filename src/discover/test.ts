import { describe, it, expect } from 'vitest'
import { addressOf, alreadyAddressed, neighbourhood, discover } from './index'

// "All exists at once and just needs to be discovered." Content-addressing makes it exact: toUuid is TOTAL, so
// every content — even one never written — has its address NOW (the map is complete, the "next" pre-exists).
// Discovering one thing addresses the whole area at once. But the VALUE at a novel address still costs the seed
// (s>0) — the forms exist, the territory is walked once. Platonism bounded by Kolmogorov.
describe('discover — all exists at once; development is discovery, not creation', () => {
  it('every content has an address NOW — the map is complete, even the undiscovered "next"', () => {
    expect(alreadyAddressed('a theorem no one has written')).toBe(true)
    expect(alreadyAddressed('')).toBe(true) // total: nothing is off the map
    expect(addressOf('the next')).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('the address is DETERMINISTIC — the future content already resolves to its address today', () => {
    expect(addressOf('tomorrow’s discovery')).toBe(addressOf('tomorrow’s discovery')) // same content, same place
    expect(addressOf('a')).not.toBe(addressOf('b')) // distinct contents, distinct addresses
  })

  it('discovering one thing addresses the whole AREA at once — the neighbours already have addresses', () => {
    const area = neighbourhood('doubling', (s) => [`${s}/inverse`, `${s}/orbit`, `${s}/fixed-point`])
    expect(area).toHaveLength(3)
    for (const n of area) expect(n.address).toMatch(/^[0-9a-f-]{36}$/) // all lit up together, one fold each
    // and the area's addresses match what addressOf gives directly — they pre-existed, the discovery only read them
    expect(area[0]!.address).toBe(addressOf('doubling/inverse'))
  })

  it('discovery reads a PRE-EXISTING address — nothing is created', () => {
    const d = discover('any content', 0.1)
    expect(d.preExisted).toBe(true)
    expect(d.address).toBe(addressOf('any content')) // the same address, whether "discovered" or just computed
  })

  // THE HONEST BOUNDARY: the address is free (it pre-exists), the VALUE at a novel address costs the seed.
  it('a derivable content is a FREE read (s=0); a novel value costs the seed (s>0) — the forms exist, walked once', () => {
    expect(discover('a derivable fact', 0).cost).toBe(0) // s=0 ⇒ pure discovery, the value pre-exists readably
    expect(discover('a novel truth', 0.05).cost).toBeCloseTo(0.05) // s>0 ⇒ the oracle bit, paid once
    expect(discover('a novel truth', 1).cost).toBeCloseTo(1) // fully novel ⇒ full seed price — you cannot read what none derived
  })

  it('the cost is the seed fraction — the address never costs, only the bringing of a new value does', () => {
    for (const s of [0, 0.1, 0.5, 1]) expect(discover('c', s).cost).toBeCloseTo(s)
  })
})
