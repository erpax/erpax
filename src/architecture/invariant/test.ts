import { describe, it, expect } from 'vitest'
import { runAllInvariants, formatInvariantResult } from '@/architecture/invariant'

// The single canonical architecture gate (./index.ts). `runAllInvariants`
// rolls every check up into a {totalChecks, fails, warns, passes} suite,
// partitioned by severity; `skipAxes` excludes whole axes. We assert the
// roll-up arithmetic and partitioning the orchestrator actually computes —
// no per-check semantics, which depend on the live source tree.
describe('architecture/invariant — the 5-axis roll-up gate', () => {
  it('skipping every axis runs zero checks and yields an empty suite', async () => {
    const suite = await runAllInvariants({
      skipAxes: ['standards', 'expansion', 'compression', 'fallback', 'entropy'],
    })
    expect(suite.totalChecks).toBe(0)
    expect(suite.fails).toEqual([])
    expect(suite.warns).toEqual([])
    expect(suite.passes).toEqual([])
  })

  it('totalChecks equals fails + warns + passes (severity partitions the results)', async () => {
    const suite = await runAllInvariants({ skipRuntime: true })
    expect(suite.totalChecks).toBeGreaterThan(0)
    expect(suite.fails.length + suite.warns.length + suite.passes.length).toBe(suite.totalChecks)
    for (const r of suite.fails) expect(r.severity).toBe('fail')
    for (const r of suite.warns) expect(r.severity).toBe('warn')
    for (const r of suite.passes) expect(r.severity).toBe('pass')
  })

  it('running a single axis is a subset of running all axes', async () => {
    const onlyCompression = await runAllInvariants({
      skipAxes: ['standards', 'expansion', 'fallback', 'entropy'],
    })
    const all = await runAllInvariants({ skipRuntime: true })
    expect(onlyCompression.totalChecks).toBeGreaterThan(0)
    expect(onlyCompression.totalChecks).toBeLessThanOrEqual(all.totalChecks)
  })

  it('formatInvariantResult reports the counts in its header line', async () => {
    const suite = await runAllInvariants({
      skipAxes: ['standards', 'expansion', 'compression', 'fallback', 'entropy'],
    })
    const text = formatInvariantResult(suite)
    expect(text).toContain('0 checks')
    expect(text).toContain('0 pass')
  })
})
