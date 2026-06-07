import { describe, it, expect } from 'vitest'
import { residual, atEquilibrium, reciprocity, type Transition } from '@/equilibrium'
import { distribution, ratio } from '@/temperature'

// Detailed balance + its reciprocity twin. Tests assert the RELATIONS — a balanced
// pair has zero residual, reciprocity = symmetry, the Boltzmann distribution sits
// at equilibrium — never a magic number.
describe('equilibrium: detailed balance = reciprocity', () => {
  it('a pair with rate·p matched both ways has zero residual; an unmatched pair does not', () => {
    const p = [0.6, 0.4]
    expect(residual({ i: 0, j: 1, forward: 0.4, reverse: 0.6 }, p)).toBeCloseTo(0, 15)
    expect(atEquilibrium([{ i: 0, j: 1, forward: 0.4, reverse: 0.6 }], p)).toBe(true)
    expect(atEquilibrium([{ i: 0, j: 1, forward: 1, reverse: 0.1 }], p)).toBe(false) // net flow
  })

  it('reciprocity is 1 for symmetric edges, below 1 for one-way, 1 for the empty graph', () => {
    expect(reciprocity([[0, 1], [1, 0]])).toBe(1)
    expect(reciprocity([[0, 1], [1, 0], [1, 2]])).toBeLessThan(1) // 1→2 has no 2→1
    expect(reciprocity([])).toBe(1)
  })

  it('the Boltzmann distribution sits at detailed balance (the thermodynamic equilibrium)', () => {
    const levels = [0, 1e-21, 2e-21]
    const T = 100
    const p = distribution(levels, T)
    // Choose rates obeying detailed balance: forward/reverse = e^(−(Ej−Ei)/kT) = p_j/p_i.
    const transitions: Transition[] = [
      { i: 0, j: 1, forward: ratio(levels[1]!, levels[0]!, T), reverse: 1 },
      { i: 1, j: 2, forward: ratio(levels[2]!, levels[1]!, T), reverse: 1 },
    ]
    expect(atEquilibrium(transitions, p, 1e-12)).toBe(true) // every rate-pair cancels
  })
})
