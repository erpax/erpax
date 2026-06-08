import { describe, expect, it } from 'vitest'

import { boundedPopulation, isHarmonic, recursivePopulation, steadyStatePopulation } from './population'

describe('population — born/live/die, harmonic + hardware-bounded', () => {
  it("steady-state = birth × lifespan (Little's law)", () => {
    expect(steadyStatePopulation(10, 3)).toBe(30)
    expect(steadyStatePopulation(0, 5)).toBe(0)
  })

  it('bounded by the hardware cap — the live count never exceeds it', () => {
    expect(boundedPopulation(100, 100, 16)).toBe(16) // wants 10000, 16 slots allowed
    expect(boundedPopulation(2, 3, 1000)).toBe(6) // under cap ⇒ the natural count
  })

  it('recursive spawning "to infinity" stays bounded by hardware (never runs away)', () => {
    expect(recursivePopulation(2, 1000, 1000)).toBe(1000) // a depth-1000 binary tree, held to 1000
    expect(recursivePopulation(2, 3, 1000)).toBe(15) // (2^4−1) = 15, under cap ⇒ exact
    expect(recursivePopulation(1, 1_000_000, 1000)).toBe(1000) // a linear chain is capped too
    expect(Number.isFinite(recursivePopulation(10, 10_000, 1000))).toBe(true) // no Infinity overflow
  })

  it('harmonic iff bounded AND birth = death (conserved, no runaway)', () => {
    expect(isHarmonic(10, 10, 30, 1000)).toBe(true) // birth=death, bounded ⇒ harmonic
    expect(isHarmonic(10, 5, 30, 1000)).toBe(false) // birth>death ⇒ growth, not harmonic
    expect(isHarmonic(10, 10, 2000, 1000)).toBe(false) // over cap ⇒ not within hardware
  })
})
