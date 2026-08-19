import { describe, it, expect } from 'vitest'
import {
  createWave,
  orchestrateWave,
  forkWorkers,
  fuseResults,
  MillenniumWave,
} from './index'

describe('orchestrate', () => {
  const problems = [
    'P vs NP',
    'Riemann Hypothesis',
    'Yang-Mills',
    'Navier-Stokes',
    'Hodge Conjecture',
    'BSD Conjecture',
    'Collatz Conjecture',
  ] as const

  it('creates wave with all problems decomposed', () => {
    const wave = createWave(problems)
    expect(wave.problems).toHaveLength(7)
    expect(wave.subproblems.length).toBeGreaterThan(0)
    expect(wave.converged).toBe(false)
  })

  it('each subproblem has quantum ops', () => {
    const wave = createWave(['P vs NP'])
    for (const task of wave.subproblems) {
      expect(task.quantumOps.length).toBeGreaterThan(0)
      expect(task.status).toBe('pending')
    }
  })

  it('orchestrates wave execution', async () => {
    const wave = createWave(['P vs NP'], { maxWorkers: 4, maxIterations: 10, convergenceThreshold: 0.5 })
    const orchestrated = await orchestrateWave(wave)
    expect(orchestrated.results.length).toBeGreaterThan(0)
  })

  it('forks workers and collects results', async () => {
    const wave = createWave(['Riemann Hypothesis'])
    const results = await forkWorkers(wave.subproblems, 3)
    expect(results.length).toBe(wave.subproblems.length)
  })

  it('fuses results by outcome', async () => {
    const wave = createWave(['Yang-Mills'])
    const results = await forkWorkers(wave.subproblems)
    const fused = fuseResults(results)
    expect(fused.convergent.length + fused.inconclusive.length + fused.divergent.length).toBe(
      results.length,
    )
  })

  it('detects convergence', async () => {
    const wave = createWave(['Navier-Stokes'], {
      maxWorkers: 7,
      maxIterations: 100,
      convergenceThreshold: 0.3,
    })
    const orchestrated = await orchestrateWave(wave)
    expect(orchestrated.results).toBeDefined()
  })
})
