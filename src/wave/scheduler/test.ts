import { describe, it, expect } from 'vitest'
import { maxWorkTamperPolicy } from '../policy'
import { corpusWaveOptsFromPolicy, corpusWaveOptsLiteraryPriority } from './index'

/**
 * scheduler — turns the max-work/max-tamper POLICY into wave-schedule options.
 *
 * These pin the derivation, not the corpus: `scheduleCorpusPathsInWaves` walks the
 * live tree, so asserting its wave count here would make this test a hostage to
 * whatever the corpus happens to contain today. The property that matters is that
 * the policy actually REACHES the schedule.
 */

describe('wave/scheduler — the policy reaches the schedule', () => {
  it('carries the policy’s unit ceiling through, never a hardcoded one', () => {
    const policy = maxWorkTamperPolicy()
    const opts = corpusWaveOptsFromPolicy(undefined, policy)
    expect(opts.maxUnitsPerWave).toBe(policy.maxUnitsPerWave)
  })

  it('derives items-per-wave from the policy’s DEPTH — deeper means smaller waves', () => {
    const shallow = corpusWaveOptsFromPolicy(undefined, { ...maxWorkTamperPolicy(), waveDepth: 3 })
    const deep = corpusWaveOptsFromPolicy(undefined, { ...maxWorkTamperPolicy(), waveDepth: 9 })
    expect(deep.maxItemsPerWave!).toBeLessThan(shallow.maxItemsPerWave!)
  })

  it('always supplies a weight function — an unweighted wave cannot balance', () => {
    expect(typeof corpusWaveOptsFromPolicy().weightOf).toBe('function')
  })

  it('the literary-priority variant keeps the policy’s ceilings', () => {
    const policy = maxWorkTamperPolicy()
    const base = corpusWaveOptsFromPolicy(undefined, policy)
    const literary = corpusWaveOptsLiteraryPriority(process.cwd(), undefined, policy)
    expect(literary.maxUnitsPerWave).toBe(base.maxUnitsPerWave)
    expect(literary.maxItemsPerWave).toBe(base.maxItemsPerWave)
  })
})
