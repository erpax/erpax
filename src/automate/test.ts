import { describe, it, expect } from 'vitest'
import { initializeLoop, refineHypothesis, detectDivergence, runLoop } from './index'

describe('automate', () => {
  it('initializes loop with hypothesis', () => {
    const loop = initializeLoop('P vs NP', 'P ≠ NP')
    expect(loop.problem).toBe('P vs NP')
    expect(loop.initialHypothesis).toBe('P ≠ NP')
    expect(loop.currentState.confidence).toBe(0.1)
  })

  it('refines hypothesis with evidence', () => {
    const loop = initializeLoop('Riemann', 'All zeros on critical line')
    const evidence = Buffer.from('test evidence')
    const refined = refineHypothesis(loop, evidence)

    expect(refined.iteration).toBe(1)
    expect(refined.confidence).toBeGreaterThan(0.1)
    expect(refined.confidence).toBeLessThanOrEqual(1.0)
  })

  it('detects convergence at high confidence', () => {
    let loop = initializeLoop('Yang-Mills', 'Mass gap exists')
    const evidence = Buffer.from('evidence')

    for (let i = 0; i < 20; i++) {
      const refined = refineHypothesis(loop, evidence)
      if (refined.status === 'converged') {
        expect(refined.confidence).toBeGreaterThan(0.95)
        return
      }
      loop = { ...loop, states: [...loop.states, refined], currentState: refined }
    }
  })

  it('detects divergence on confidence decline', () => {
    const loop = initializeLoop('Navier-Stokes', 'Initial hypothesis')
    const decreasingStates = [
      { ...loop.currentState, iteration: 0, confidence: 0.9 },
      { ...loop.currentState, iteration: 1, confidence: 0.7 },
      { ...loop.currentState, iteration: 2, confidence: 0.5 },
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
    expect(loop.currentState.confidence).toBeGreaterThan(0.1)
  })
})
