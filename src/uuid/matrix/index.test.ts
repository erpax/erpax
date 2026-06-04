/**
 * uuid-matrix query surface — green by construction. These tests ARE the proof
 * that the generated matrix is queryable and that the band assignment landed.
 * @see ./index.ts, ./matrix.generated.ts
 */
import { describe, it, expect } from 'vitest'
import {
  nodeOf, neighborsOf, backlinksOf, bindingOf, matrixDigest,
  UUID_MATRIX_NODES, UUID_MATRIX_EDGES, UUID_MATRIX_ROOT,
} from '@/uuid/matrix'

describe('uuid-matrix: the corpus is queryable as a content-addressed matrix', () => {
  it('nodeOf resolves any link spelling to a node with a v8 content-uuid', () => {
    const n = nodeOf('access')
    expect(n).toBeDefined()
    expect(n?.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it('the band assignment landed: a control atom → control, a noble-0 atom → source', () => {
    expect(nodeOf('access')?.band).toBe('control') // atom-skill control-axis group
    expect(nodeOf('whole')?.band).toBe('source') // atom-skill noble-0 group
  })

  it('neighborsOf (out) and backlinksOf (in) are inverse directions of the edge set', () => {
    const seed = nodeOf('merge')
    expect(seed).toBeDefined()
    for (const nb of neighborsOf('merge')) {
      expect(backlinksOf(nb.atom).some((x) => x.atom === 'merge')).toBe(true)
    }
  })

  it('bindingOf returns the stored binding-uuid of an actual edge', () => {
    const [e] = UUID_MATRIX_EDGES
    expect(e).toBeDefined()
    if (!e) return
    const from = UUID_MATRIX_NODES[e.f]?.atom ?? ''
    const to = UUID_MATRIX_NODES[e.t]?.atom ?? ''
    expect(bindingOf(from, to)).toBe(e.binding)
  })

  it('bindingOf is undefined for a non-edge', () => {
    expect(bindingOf('access', 'whole')).toBeUndefined()
  })

  it('matrixDigest is the single 128-bit root + counts (the holographic collapse)', () => {
    const d = matrixDigest()
    expect(d.root).toBe(UUID_MATRIX_ROOT)
    expect(d.nodes).toBe(UUID_MATRIX_NODES.length)
    expect(d.edges).toBe(UUID_MATRIX_EDGES.length)
  })
})
