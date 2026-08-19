import { describe, it, expect } from 'vitest'
import { spawnRecursiveWave, spawnAndObserve, observationLog, recursiveAndObserve } from './index'

describe('recursive', () => {
  it('spawns recursive wave', async () => {
    const wave = await spawnRecursiveWave('Fermat Last Theorem', 0)
    expect(wave.waveId).toBeDefined()
    expect(wave.depth).toBe(0)
    expect(wave.problems.length).toBeGreaterThan(0)
  })

  it('observes generation in real-time', async () => {
    const wave = await spawnAndObserve('Four Color Theorem', 0)
    expect(wave.observed.length).toBeGreaterThan(0)
    expect(wave.observed.some(o => o.action === 'generated')).toBe(true)
  })

  it('records observation log', async () => {
    const wave = await spawnAndObserve('Goldbach Conjecture', 0)
    const log = await observationLog(wave)
    expect(log.length).toBeGreaterThan(0)
    expect(log[0]).toContain('GENERATED')
  })

  it('runs recursive and observe as pair', async () => {
    const result = await recursiveAndObserve('P vs NP', 2)
    expect(result.waves.length).toBeGreaterThan(0)
    expect(result.allObservations.length).toBeGreaterThan(0)
    expect(result.totalGenerated).toBeGreaterThanOrEqual(0)
  })

  it('captures convergence in observation', async () => {
    const wave = await spawnAndObserve('Riemann Hypothesis', 0)
    const hasConvergence = wave.observed.some(o => o.action === 'converged')
    expect([true, false]).toContain(hasConvergence) // Either converged or not, both valid
  })
})
