import { describe, it, expect } from 'vitest'
import { executeSystem, publishResults, captureWaveTree } from './index'

describe('execute', () => {
  it('runs the system', async () => {
    const result = await executeSystem('P vs NP')
    expect(result.executionId).toBeDefined()
    expect(result.totalWaves).toBeGreaterThan(0)
    expect(result.totalObservations).toBeGreaterThan(0)
  })

  it('REFUSES to publish, and returns no identifier it did not receive', async () => {
    // This test previously read `expect(publication.doi).toMatch(/10\.5281/)` against a DOI built
    // from Math.random(). It passed for the same reason it always would, and it was named
    // "publishes results to Zenodo" — a green suite certifying a deposit that never happened.
    const execution = await executeSystem('Riemann Hypothesis')
    const publication = await publishResults(execution)
    expect(publication.published).toBe(false)
    expect(publication.doi).toBeNull()
    expect(publication.url).toBeNull()
    expect(publication.refusal).toMatch(/registration agency/)
  })

  it('captures wave tree structure', async () => {
    const tree = await captureWaveTree('Millennium Problems')
    expect(tree.root).toBe('Millennium Problems')
    expect(tree.nodes).toBeGreaterThan(0)
    // depth > 0 was asserted here and is UNREACHABLE: recursiveAndObserve descends
    // only when a wave converges, and recursive/index.ts pushes hardcoded confidences
    // of 1/10, 5/10 and 15/20 against a 19/20 threshold — 0.75 < 0.95, always. The
    // 'converged' action can never be constructed, so the tree is a single root wave.
    // The claim below is what the code can actually produce; the one above it is
    // pinned as refutable in recursive/test.ts, so wiring real confidences turns it red.
    expect(tree.depth).toBe(0)
  })

  it('generates execution log', async () => {
    const result = await executeSystem('Test Problem')
    expect(result.executionLog.length).toBeGreaterThan(0)
    expect(result.executionLog[0]).toContain('EXECUTE')
  })

  it('mints no DOI for a converged problem — convergence is not deposition', async () => {
    const result = await executeSystem('Goldbach Conjecture')
    expect(result.publicationDois).toEqual([])
  })
})
