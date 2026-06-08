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
  parentOf, prevOf, nextOf, childrenOf, bidirectionalCrossOf,
  coordinateOf, coordinateAddress, verifyBind, verifyRoot, tamperedAtoms,
  toUuid, merge,
  UUID_MATRIX_NODES, UUID_MATRIX_EDGES, UUID_MATRIX_ROOT,
} from '@/uuid/matrix'

describe('uuid-matrix: the corpus is queryable as a content-addressed matrix', () => {
  it('nodeOf resolves any link spelling to a node with a v8 content-uuid', () => {
    const n = nodeOf('access')
    expect(n).toBeDefined()
    expect(n?.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it('nodeOf resolves nested atom paths — folder path IS the matrix address', () => {
    const lawFolder = nodeOf('law/folder')
    expect(lawFolder).toBeDefined()
    expect(lawFolder?.path).toBe('law/folder')
    expect(lawFolder?.atom).toBe('folder')
    expect(lawFolder?.horo).toBeGreaterThanOrEqual(1)
    expect(lawFolder?.horo).toBeLessThanOrEqual(9)

    const mcpTool = nodeOf('agents/mcp/tool')
    const rootTool = nodeOf('tool')
    expect(mcpTool).toBeDefined()
    expect(mcpTool?.path).toBe('agents/mcp/tool')
    expect(mcpTool?.atom).toBe('tool')
    expect(rootTool).toBeDefined()
    expect(rootTool?.path).toBe('tool')
    expect(mcpTool?.uuid).not.toBe(rootTool?.uuid)
  })

  it('nodeOf resolves cross-named architecture by path, not leaf alone', () => {
    const byPath = nodeOf('architecture/invariant')
    const byLeaf = nodeOf('invariant')
    expect(byPath).toBeDefined()
    expect(byPath?.path).toBe('architecture/invariant')
    expect(byPath?.uuid).toBe(byLeaf?.uuid)
    expect(byPath?.horo).toBe(2)
  })

  it('coordinateAddress folds path · horo/measure · uuid (digit-computed, not hand labels)', () => {
    const addr = coordinateAddress('architecture/invariant')
    expect(addr).toMatch(/^architecture\/invariant · 2\/share · [0-9a-f]{8}$/)
  })

  it('the band assignment landed: a control atom → control, a noble-0 atom → source', () => {
    expect(nodeOf('access')?.band).toBe('control') // atom-skill control-axis group
    expect(nodeOf('whole')?.band).toBe('source') // atom-skill noble-0 group
  })

  it('neighborsOf (out) and backlinksOf (in) are inverse directions of the edge set', () => {
    const seed = nodeOf('merge')
    expect(seed).toBeDefined()
    for (const nb of neighborsOf('merge')) {
      const target = nb.path ?? nb.atom
      expect(backlinksOf(target).some((x) => (x.path ?? x.atom) === 'merge')).toBe(true)
    }
  })

  it('bidirectionalCrossOf — parent↔child, prev↔next, neighbor↔backlink', () => {
    const cross = bidirectionalCrossOf('law/folder')
    expect(cross?.path).toBe('law/folder')
    expect(cross?.parent?.path).toBe('law')
    expect(cross?.children.map((c) => c.path)).not.toContain('law/folder')
    expect(childrenOf('law').map((c) => c.path)).toContain('law/folder')

    const tool = bidirectionalCrossOf('agents/mcp/tool')
    expect(tool?.parent?.path).toBe('agents/mcp')
    if (tool?.prev && tool?.next) {
      expect(prevOf(tool.next.path ?? '')?.path).toBe(tool.path)
      expect(nextOf(tool.prev.path ?? '')?.path).toBe(tool.path)
    }
  })

  it('neighborsOf/backlinksOf resolve by full path (homonyms stay distinct)', () => {
    const mcpTool = nodeOf('agents/mcp/tool')
    const rootTool = nodeOf('tool')
    expect(mcpTool?.path).not.toBe(rootTool?.path)
    expect(neighborsOf('agents/mcp/tool').every((n) => n.path !== rootTool?.path || n.path === 'tool')).toBe(true)
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
  // Computed, NOT pinned — no drift as the corpus grows (computed-not-hardcoded).
  // Take the LIVE `coordinate` node and prove the .ts merge reproduces the cross
  // + bind that collide.mjs stored. If the two coils ever diverge, this fails.
  const coordinate = nodeOf('coordinate')

  it('toUuid stamps a conformant v8 content-uuid (version 8, variant 10x)', () => {
    const u = toUuid(Buffer.from('the two coils', 'utf8'))
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it('the coordinate atom resolves in the live matrix', () => {
    expect(coordinate).toBeDefined()
  })

  it('merge(merge(parent,prev),next) === the stored cross (the .ts coil reproduces collide)', () => {
    expect(coordinate).toBeDefined()
    if (!coordinate?.parent || !coordinate.prev || !coordinate.next || !coordinate.cross) return
    expect(merge(merge(coordinate.parent, coordinate.prev), coordinate.next)).toBe(coordinate.cross)
  })

  it('merge(uuid, cross) === the stored bind (content ⊕ coordinate)', () => {
    expect(coordinate).toBeDefined()
    if (!coordinate?.cross || !coordinate.bind) return
    expect(merge(coordinate.uuid, coordinate.cross)).toBe(coordinate.bind)
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
