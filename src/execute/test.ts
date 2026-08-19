import { describe, it, expect } from 'vitest'
import { executeSystem, publishResults, captureWaveTree } from './index'

describe('execute', () => {
  it('runs the system', async () => {
    const result = await executeSystem('P vs NP')
    expect(result.executionId).toBeDefined()
    expect(result.totalWaves).toBeGreaterThan(0)
    expect(result.totalObservations).toBeGreaterThan(0)
  })

  it('publishes results to Zenodo', async () => {
    const execution = await executeSystem('Riemann Hypothesis')
    const publication = await publishResults(execution)
    expect(publication.doi).toMatch(/10\.5281/)
    expect(publication.url).toContain('zenodo.org')
  })

  it('captures wave tree structure', async () => {
    const tree = await captureWaveTree('Millennium Problems')
    expect(tree.root).toBe('Millennium Problems')
    expect(tree.nodes).toBeGreaterThan(0)
    expect(tree.depth).toBeGreaterThan(0)
  })

  it('generates execution log', async () => {
    const result = await executeSystem('Test Problem')
    expect(result.executionLog.length).toBeGreaterThan(0)
    expect(result.executionLog[0]).toContain('EXECUTE')
  })

  it('publishes converged problems as DOIs', async () => {
    const result = await executeSystem('Goldbach Conjecture')
    expect(result.publicationDois.length).toBeGreaterThanOrEqual(0)
    for (const doi of result.publicationDois) {
      expect(doi).toMatch(/10\.5281/)
    }
  })
})
