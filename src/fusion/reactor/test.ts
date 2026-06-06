import { describe, it, expect } from 'vitest'
import { reactor } from '@/fusion/reactor'

// The reactor readout, computed live: the three forces (gravity ⊕ entropy ⊕ quantum)
// composed over the matrix; the quantum laws must hold and the well must carry mass.
describe('fusion/reactor — the reactor readout (gravity ⊕ entropy ⊕ quantum)', () => {
  const r = reactor()
  it('reads the live matrix: nodes, edges, root uuid', () => {
    expect(r.nodes).toBeGreaterThan(0)
    expect(r.edges).toBeGreaterThan(0)
    expect(r.root).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('the well carries positive mass; concentration (Gini) is in (0,1]', () => {
    expect(r.well.mass).toBeGreaterThan(0)
    expect(r.concentration).toBeGreaterThan(0)
    expect(r.concentration).toBeLessThanOrEqual(1)
  })
  it('the quantum laws hold — collapse intact, every atom quantized onto the ring', () => {
    expect(r.collapse).toBe(true)
    expect(r.quantized).toBe(true)
  })
})
