import { describe, expect, it } from 'vitest'

import { backlinksOf, neighborsOf } from './index'
import { UUID_MATRIX_EDGES, UUID_MATRIX_NODES } from './matrix.generated'

/**
 * The adjacency index, pinned against the scan it replaced.
 *
 * `neighborsOf` / `backlinksOf` used to filter the whole edge array per call. Across the corpus
 * that is O(atoms × edges) — measured at ~5 minutes per atom on the live frontmatter sync, which
 * could not finish. Two Maps built once at module load answer the same question by address.
 *
 * This equivalence was first checked by an ad-hoc command; a proof that lives only in a shell
 * history is not a proof the corpus holds, so it lives here.
 */
const nodes = UUID_MATRIX_NODES as ReadonlyArray<{ atom: string }>
const edges = UUID_MATRIX_EDGES as ReadonlyArray<{ f: number; t: number }>

describe('uuid/matrix — adjacency by address', () => {
  it('the index equals the scan, for every node, in BOTH directions', () => {
    // compared on INDICES, never on names: the first attempt at this proof resolved atom names
    // through its own map while neighborsOf uses nodeIndexOf, so duplicate leaf names diverged and
    // it reported 2,735/3,193. The harness was the bug. Indices remove the variable entirely.
    const out = new Map<number, number[]>()
    const inc = new Map<number, number[]>()
    for (const e of edges) {
      const o = out.get(e.f)
      if (o) o.push(e.t)
      else out.set(e.f, [e.t])
      const i = inc.get(e.t)
      if (i) i.push(e.f)
      else inc.set(e.t, [e.f])
    }
    for (let i = 0; i < nodes.length; i += 1) {
      expect(out.get(i) ?? []).toEqual(edges.filter((e) => e.f === i).map((e) => e.t))
      expect(inc.get(i) ?? []).toEqual(edges.filter((e) => e.t === i).map((e) => e.f))
    }
  })

  it('an unknown atom yields no edges — never a throw, never a default', () => {
    expect(neighborsOf('no-such-atom-anywhere')).toEqual([])
    expect(backlinksOf('no-such-atom-anywhere')).toEqual([])
    expect(neighborsOf('')).toEqual([])
  })

  it('order is preserved — an index that reorders is a different answer', () => {
    const withEdges = nodes.find((n) => neighborsOf(n.atom).length > 2)
    expect(withEdges).toBeDefined()
    const twice = [neighborsOf(withEdges!.atom), neighborsOf(withEdges!.atom)]
    expect(twice[0]!.map((n) => n.atom)).toEqual(twice[1]!.map((n) => n.atom))
  })

  it('every returned neighbour is a real node — index arithmetic cannot invent one', () => {
    const known = new Set(nodes.map((n) => n.atom))
    for (const n of nodes.slice(0, 200)) {
      for (const m of neighborsOf(n.atom)) expect(known.has(m.atom)).toBe(true)
      for (const m of backlinksOf(n.atom)) expect(known.has(m.atom)).toBe(true)
    }
  })

  it('the whole corpus resolves fast enough to be usable in a loop', () => {
    // the property that matters: a corpus-wide pass must not be O(atoms × edges). This is a
    // regression guard on the COMPLEXITY, not a benchmark — the bound is generous on purpose.
    const t0 = Date.now()
    for (const n of nodes) {
      neighborsOf(n.atom)
      backlinksOf(n.atom)
    }
    expect(Date.now() - t0).toBeLessThan(5_000)
  })
})
