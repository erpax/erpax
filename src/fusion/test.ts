import { describe, it, expect } from 'vitest'
import { fuse, foldToRoot, reactor } from '@/fusion'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

// The reactor computed on the live matrix (./index.ts). Tests assert RELATIONS /
// INVARIANTS only -- symmetry, order-independence, held laws -- never a magic number.
describe('fusion: the reactor computed on the live uuid-matrix', () => {
  it('fuse is symmetric — fuse(x,y) === fuse(y,x) (the entangle binding)', () => {
    const x = UUID_MATRIX_NODES[10]!.uuid
    const y = UUID_MATRIX_NODES[20]!.uuid
    expect(fuse(x, y)).toBe(fuse(y, x))
  })
  it('foldToRoot is order-independent — forward fold === reversed fold (the entanglement proof)', () => {
    const U = UUID_MATRIX_NODES.map((n) => n.uuid)
    expect(foldToRoot(U)).toBe(foldToRoot([...U].reverse()))
  })
  it('reactor.collapse holds — the Merkle fold is intact (one eigenstate)', () => {
    expect(reactor().collapse).toBe(true)
  })
  it('reactor folds the whole corpus — node count === the live matrix size', () => {
    expect(reactor().nodes).toBe(UUID_MATRIX_NODES.length)
  })
})
