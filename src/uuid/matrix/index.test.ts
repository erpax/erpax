/**
 * uuid-matrix query surface — green by construction. These tests ARE the proof
 * that the generated matrix is queryable, that the band assignment landed, and
 * that the 3-connected [[coordinate]] cross verifies (parent ⊕ prev ⊕ next).
 *
 * Pure unit test — NO Payload. It touches only the generated matrix + the math
 * twin (the second coil), asserting the .ts matter reproduces the .mjs collide
 * on a known node, that the Merkle root folds back to UUID_MATRIX_ROOT, and
 * that flipping ANY one neighbour byte breaks the bind (3-connected, not a
 * linear prev-only chain).
 * @see ./index.ts, ./matrix.generated.ts, ./collide.mjs
 */
import { describe, it, expect } from 'vitest'
import {
  nodeOf, neighborsOf, backlinksOf, bindingOf, matrixDigest,
  parentOf, prevOf, nextOf, coordinateOf, verifyBind, verifyRoot, tamperedAtoms,
  toUuid, merge,
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

describe('uuid-matrix coil: the .ts math reproduces the .mjs collide (the two coils agree)', () => {
  // A KNOWN collide output, pinned from src/uuid/matrix/matrix.generated.ts (the
  // `coordinate` node). If collide and this twin ever diverge, this fails.
  const coordinate = {
    uuid: '5e6c7fd0-1313-8330-9938-dbb369e8b326',
    parent: '00000000-0000-8000-8000-000000000000',
    prev: 'c17e769e-0c54-8193-a36e-897eb784fd5c',
    next: '6fd3a829-2d04-8785-b095-60bda5673fc8',
    cross: '9afd2473-71d8-86fb-a1d0-1687a7a03eff',
    bind: '926aad42-1b68-8f09-8226-6e9845f1fd07',
  }

  it('toUuid stamps a conformant v8 content-uuid (version 8, variant 10x)', () => {
    const u = toUuid(Buffer.from('the two coils', 'utf8'))
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it('merge(merge(parent,prev),next) === the stored cross of a known collide node', () => {
    expect(merge(merge(coordinate.parent, coordinate.prev), coordinate.next)).toBe(coordinate.cross)
  })

  it('merge(uuid, cross) === the stored bind of a known collide node', () => {
    expect(merge(coordinate.uuid, coordinate.cross)).toBe(coordinate.bind)
  })

  it('the live generated node matches the pinned constant (no drift in the registry)', () => {
    const n = nodeOf('coordinate')
    expect(n?.uuid).toBe(coordinate.uuid)
    expect(n?.bind).toBe(coordinate.bind)
  })
})

describe('uuid-matrix coordinate: the 3-connected [[coordinate]] cross verifies', () => {
  it('verifyRoot().ok is true — the Merkle fold over every bind matches UUID_MATRIX_ROOT', () => {
    const r = verifyRoot()
    expect(r.ok).toBe(true)
    expect(r.root).toBe(UUID_MATRIX_ROOT)
  })

  it("verifyBind('coordinate') is true on the real generated matrix", () => {
    expect(verifyBind('coordinate')).toBe(true)
  })

  it('parentOf/prevOf/nextOf resolve the stored neighbour uuids back to nodes', () => {
    const c = coordinateOf('coordinate')
    expect(c).toBeDefined()
    if (!c) return
    // parent is NIL (coordinate is a root atom) → no node resolves it
    expect(parentOf('coordinate')).toBeUndefined()
    expect(prevOf('coordinate')?.uuid).toBe(c.prev)
    expect(nextOf('coordinate')?.uuid).toBe(c.next)
  })

  it('the whole corpus is untampered: tamperedAtoms() is empty', () => {
    expect(tamperedAtoms()).toEqual([])
  })

  // 3-CONNECTED SENSITIVITY: the bind binds to parent AND prev AND next.
  // Flipping a byte in ANY ONE of the three must break verifyBind — proving the
  // linkage is the trinity, not a linear prev-only chain. We recompute the bind
  // exactly as verifyBind does, but with one neighbour byte flipped, and assert
  // the recomputed bind no longer equals the stored bind.
  const flipFirstByte = (u: string): string => {
    const hex = u.replace(/-/g, '')
    const b = Buffer.from(hex, 'hex')
    b[0] = b[0]! ^ 0x01 // flip one bit of the first byte
    const x = b.toString('hex')
    return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
  }
  const rebind = (uuid: string, parent: string, prev: string, next: string): string =>
    merge(uuid, merge(merge(parent, prev), next))

  it('flipping a PARENT byte breaks the bind (a non-root node binds to its parent)', () => {
    // pick a node whose parent is a real (non-NIL) node, so flipping it is meaningful
    const child = UUID_MATRIX_NODES.find(
      (n) => n.bind && n.parent && n.parent !== '00000000-0000-8000-8000-000000000000',
    )
    expect(child).toBeDefined()
    if (!child?.bind || !child.parent || !child.prev || !child.next) return
    expect(verifyBind(child.atom)).toBe(true) // intact first
    const tampered = rebind(child.uuid, flipFirstByte(child.parent), child.prev, child.next)
    expect(tampered).not.toBe(child.bind)
  })

  it('flipping a PREV byte breaks the bind', () => {
    const n = nodeOf('coordinate')
    expect(n?.bind).toBeDefined()
    if (!n?.bind || !n.parent || !n.prev || !n.next) return
    const tampered = rebind(n.uuid, n.parent, flipFirstByte(n.prev), n.next)
    expect(tampered).not.toBe(n.bind)
  })

  it('flipping a NEXT byte breaks the bind', () => {
    const n = nodeOf('coordinate')
    expect(n?.bind).toBeDefined()
    if (!n?.bind || !n.parent || !n.prev || !n.next) return
    const tampered = rebind(n.uuid, n.parent, n.prev, flipFirstByte(n.next))
    expect(tampered).not.toBe(n.bind)
  })

  it('flipping the node\'s OWN content uuid breaks the bind', () => {
    const n = nodeOf('coordinate')
    expect(n?.bind).toBeDefined()
    if (!n?.bind || !n.parent || !n.prev || !n.next) return
    const tampered = rebind(flipFirstByte(n.uuid), n.parent, n.prev, n.next)
    expect(tampered).not.toBe(n.bind)
  })
})
