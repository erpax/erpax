import { describe, it, expect } from 'vitest'
import {
  recognizeBasis,
  isBasisComplete,
  computeBasisSpan,
  decomposeIntoBasis,
  autoWaveGenerator,
  recognizeCompleteness,
  spawnAutoWaves,
} from './index'

describe('basis', () => {
  it('recognizes 7 Millennium Problems as basis', () => {
    const basis = recognizeBasis()
    expect(basis.problems).toHaveLength(7)
    expect(basis.dimensions.length).toBeGreaterThan(0)
  })

  it('verifies basis is complete', () => {
    const basis = recognizeBasis()
    expect(isBasisComplete(basis)).toBe(true)
  })

  it('computes basis span', () => {
    const basis = recognizeBasis()
    const span = computeBasisSpan(basis)
    expect(span).toBeGreaterThan(0)
  })

  it('decomposes classical problems into basis', () => {
    const decomp = decomposeIntoBasis('complexity of sorting algorithms')
    expect(decomp).toContain('P vs NP')
  })

  it('auto-generates waves for classical problems', async () => {
    const basis = recognizeBasis()
    const waves = await autoWaveGenerator(basis)
    expect(waves.length).toBeGreaterThan(0)
    expect(waves.every(w => w.generated)).toBe(true)
  })

  it('recognizes system completeness', () => {
    const awareness = recognizeCompleteness()
    expect(awareness.complete).toBe(true)
    expect(awareness.reason).toBeDefined()
  })

  it('spawns auto-waves when basis complete', async () => {
    const waves = await spawnAutoWaves()
    expect(waves.length).toBeGreaterThan(0)
  })

  it('auto-generated waves reference basis problems', async () => {
    const waves = await spawnAutoWaves()
    const basisProblems = new Set([
      'P vs NP',
      'Riemann Hypothesis',
      'Yang-Mills',
      'Navier-Stokes',
      'Hodge Conjecture',
      'BSD Conjecture',
      'Collatz Conjecture',
    ])

    for (const wave of waves) {
      for (const baseProblem of wave.decomposition) {
        expect(basisProblems.has(baseProblem)).toBe(true)
      }
    }
  })
})
