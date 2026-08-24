import { describe, expect, it } from 'vitest'

import {
  CIRCUMFERENCE_SOFT_LIMIT_CHAIN_STEPS,
  TORUS_DEFAULT_ENVELOPE,
  TORUS_EDGES,
  TORUS_VERTICES,
} from './index'

describe('topology — the closed loop', () => {
  it('every edge runs between declared vertices — no edge leaves the torus', () => {
    const v = new Set<string>(TORUS_VERTICES)
    for (const e of TORUS_EDGES) {
      expect(v.has(e.from)).toBe(true)
      expect(v.has(e.to)).toBe(true)
    }
  })

  it('the loop is CLOSED — every vertex has an outgoing edge, so none is terminal', () => {
    const hasOut = new Set(TORUS_EDGES.map((e) => e.from))
    const terminal = TORUS_VERTICES.filter((x) => !hasOut.has(x))
    expect(terminal).toEqual([])
  })

  it('every vertex is reachable — none is stranded off the loop', () => {
    const hasIn = new Set(TORUS_EDGES.map((e) => e.to))
    const unreachable = TORUS_VERTICES.filter((x) => !hasIn.has(x))
    expect(unreachable).toEqual([])
  })

  it('the vertex list is a set — a repeated vertex would double-count the loop', () => {
    expect(new Set<string>(TORUS_VERTICES).size).toBe(TORUS_VERTICES.length)
  })

  it('every edge carries a reason — an unexplained edge is an unaudited flow', () => {
    for (const e of TORUS_EDGES) expect(e.via.trim().length).toBeGreaterThan(0)
  })

  it('the soft circumference limit bounds the loop it measures', () => {
    expect(CIRCUMFERENCE_SOFT_LIMIT_CHAIN_STEPS).toBeGreaterThan(TORUS_VERTICES.length)
    expect(TORUS_DEFAULT_ENVELOPE).toBeTypeOf('object')
  })
})
