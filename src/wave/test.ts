import { CONVERGENCE_THRESHOLD, rational } from '@/exact'

import { describe, it, expect } from 'vitest'
import { initWave, recordFinding, streamPublish, ledgerRecord, runWave, waveStats } from './index'

describe('wave', () => {
  it('initializes wave with problems', async () => {
    const problems = ['P vs NP', 'Riemann Hypothesis']
    const wave = await initWave(problems)

    expect(wave.state.waveId).toBeDefined()
    expect(wave.state.problems).toEqual(problems)
    expect(wave.state.ledger).toHaveLength(0)
    expect(wave.state.converged).toBe(false)
  })

  it('records finding with outcome and confidence', async () => {
    const wave = await initWave(['P vs NP'])
    const record = await recordFinding(wave, 'P vs NP', 'convergent', rational(17n, 20n))

    expect(record.problem).toBe('P vs NP')
    expect(record.outcome).toBe('convergent')
    expect(record.confidence).toEqual(rational(17n, 20n))
    expect(record.doi).toBeUndefined()
  })

  it('publishes to Zenodo when convergent', async () => {
    const record = {
      timestamp: Date.now(),
      problem: 'Riemann Hypothesis',
      outcome: 'convergent' as const,
      confidence: rational(97n, 100n),
    }

    const publication = await streamPublish(record, CONVERGENCE_THRESHOLD)
    expect(publication).toBeDefined()
    expect(publication?.doi).toMatch(/10\.5281\/zenodo\.\d+/)
    expect(publication?.zenodoId).toMatch(/zenodo-[a-z0-9]+/)
  })

  it('does not publish below threshold', async () => {
    const record = {
      timestamp: Date.now(),
      problem: 'Yang-Mills',
      outcome: 'inconclusive' as const,
      confidence: rational(1n, 2n),
    }

    const publication = await streamPublish(record, CONVERGENCE_THRESHOLD)
    expect(publication).toBeNull()
  })

  it('adds records to ledger with optional publication', async () => {
    const wave = await initWave(['P vs NP'])
    const record = await recordFinding(wave, 'P vs NP', 'convergent', rational(24n, 25n))
    const publication = await streamPublish(record, CONVERGENCE_THRESHOLD)

    const updatedState = await ledgerRecord(wave, record, publication || undefined)
    expect(updatedState.ledger).toHaveLength(1)
    expect(updatedState.ledger[0]?.doi).toBeDefined()
    expect(updatedState.published).toBe(1)
  })

  it('detects convergence at high confidence', async () => {
    const wave = await initWave(['Navier-Stokes'])
    const record = await recordFinding(wave, 'Navier-Stokes', 'convergent', rational(97n, 100n))
    const publication = await streamPublish(record, CONVERGENCE_THRESHOLD)
    const updatedState = await ledgerRecord(wave, record, publication || undefined)

    expect(updatedState.converged).toBe(true)
  })

  it('runs full wave with multiple iterations', async () => {
    const problems = ['P vs NP', 'Riemann Hypothesis']
    const wave = await runWave(problems, 50, CONVERGENCE_THRESHOLD)

    expect(wave.state.ledger.length).toBeGreaterThan(0)
    expect(wave.state.terminationReason).toBeDefined()
    expect(wave.history.length).toBeGreaterThan(1)
  })

  it('collects wave statistics', async () => {
    const wave = await runWave(['Hodge Conjecture'], 30, CONVERGENCE_THRESHOLD)
    const stats = await waveStats(wave)

    expect(stats.totalRecords).toBeGreaterThan(0)
    expect(stats.converged + stats.diverged + stats.inconclusive).toBe(stats.totalRecords)
    // Date.now() - startTime inside a synchronous test is 0 whenever the run fits in
    // one millisecond; the refutable claim is that elapsed time is never negative.
    expect(stats.timeElapsed).toBeGreaterThanOrEqual(0)
  })
})
