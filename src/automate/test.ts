import { INITIAL_CONFIDENCE, gte, lte, rational } from '@/exact'

import { describe, it, expect } from 'vitest'
import { initializeLoop, refineHypothesis, detectDivergence, runLoop } from './index'

describe('automate', () => {
  it('initializes loop with hypothesis', () => {
    const loop = initializeLoop('P vs NP', 'P ≠ NP')
    expect(loop.problem).toBe('P vs NP')
    expect(loop.initialHypothesis).toBe('P ≠ NP')
    expect(loop.currentState.confidence).toEqual(INITIAL_CONFIDENCE)
  })

  it('refines hypothesis with evidence', () => {
    const loop = initializeLoop('Riemann', 'All zeros on critical line')
    const evidence = Buffer.from('test evidence')
    const refined = refineHypothesis(loop, evidence)

    expect(refined.iteration).toBe(1)
    expect(gte(refined.confidence, INITIAL_CONFIDENCE)).toBe(true)
    expect(lte(refined.confidence, rational(1n, 1n))).toBe(true)
  })

  it('detects convergence at high confidence', () => {
    let loop = initializeLoop('Yang-Mills', 'Mass gap exists')
    const evidence = Buffer.from('evidence')

    for (let i = 0; i < 20; i++) {
      const refined = refineHypothesis(loop, evidence)
      if (refined.status === 'converged') {
        expect(gte(refined.confidence, rational(19n, 20n))).toBe(true)
        return
      }
      loop = { ...loop, states: [...loop.states, refined], currentState: refined }
    }
  })

  it('detects divergence on confidence decline', () => {
    const loop = initializeLoop('Navier-Stokes', 'Initial hypothesis')
    const decreasingStates = [
      { ...loop.currentState, iteration: 0, confidence: rational(9n, 10n) },
      { ...loop.currentState, iteration: 1, confidence: rational(7n, 10n) },
      { ...loop.currentState, iteration: 2, confidence: rational(1n, 2n) },
    ]

    const testLoop = {
      ...loop,
      states: decreasingStates,
      currentState: decreasingStates[2]!,
    }

    const isDiverging = detectDivergence(testLoop, Buffer.from('evidence'))
    expect(isDiverging).toBe(true)
  })

  it('runs full loop until convergence or max iterations', async () => {
    const loop = await runLoop('Hodge Conjecture', 'Conjecture is true', 50)
    expect(loop.states.length).toBeGreaterThan(1)
    expect(gte(loop.currentState.confidence, INITIAL_CONFIDENCE)).toBe(true)
  })
})
