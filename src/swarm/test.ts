import { describe, expect, it } from 'vitest'
import {
  accountsForEvery,
  assign,
  conserves,
  coverage,
  makespan,
  redistribute,
  tolerableLosses,
  type Agent,
  type Task,
} from '@/swarm'

/** This repository's own CI: sixteen integration shards over a pool of runners. */
const shards: Task[] = Array.from({ length: 16 }, (_, i) => ({ id: `shard-${i + 1}`, weight: 10 }))
const runners: Agent[] = Array.from({ length: 4 }, (_, i) => ({ id: `runner-${i + 1}`, capacity: 100 }))

describe('swarm — the assignment is deterministic, because a failure must be reproducible', () => {
  it('gives the same answer twice for the same input', () => {
    expect(assign(runners, shards)).toEqual(assign(runners, shards))
  })

  it('gives the same answer whatever order the tasks arrive in', () => {
    const shuffled = [...shards].reverse()
    expect(assign(runners, shuffled)).toEqual(assign(runners, shards))
  })

  it('spreads sixteen equal shards evenly over four runners', () => {
    const a = assign(runners, shards)
    expect(a.placements.map((p) => p.tasks.length)).toEqual([4, 4, 4, 4])
    expect(makespan(a)).toBe(40)
    expect(coverage(a)).toBe(1)
  })
})

describe('swarm — work is placed or named, never dropped', () => {
  it('conserves weight and accounts for every task', () => {
    const a = assign(runners, shards)
    expect(conserves(a)).toBe(true)
    expect(accountsForEvery(a, shards)).toBe(true)
  })

  it('REFUSES a task larger than any agent rather than cramming it', () => {
    const huge: Task[] = [{ id: 'monolith', weight: 500 }]
    const a = assign(runners, huge)
    expect(a.unassigned.map((t) => t.id)).toEqual(['monolith'])
    expect(coverage(a)).toBe(0)
    expect(conserves(a)).toBe(true)
    expect(accountsForEvery(a, huge)).toBe(true)
  })

  it('names the overflow when the swarm is simply too small', () => {
    const small: Agent[] = [{ id: 'only', capacity: 35 }]
    const a = assign(small, shards)
    expect(a.placements[0]!.load).toBe(30)
    expect(a.unassigned.length).toBe(13)
    expect(coverage(a)).toBeCloseTo(30 / 160, 9)
    expect(accountsForEvery(a, shards)).toBe(true)
  })

  it('never exceeds an agent capacity — utilisation stays at or below 1', () => {
    const a = assign(runners, shards)
    for (const p of a.placements) expect(p.utilisation).toBeLessThanOrEqual(1)
  })
})

describe('swarm — losing an agent re-mixes, exactly as a hex re-mixes onto five motors', () => {
  it('survives one runner dying and still covers every shard', () => {
    const a = redistribute(runners, shards, ['runner-2'])
    expect(coverage(a)).toBe(1)
    expect(a.placements.length).toBe(3)
    expect(a.placements.map((p) => p.tasks.length).reduce((x, y) => x + y, 0)).toBe(16)
  })

  it('RE-ASSIGNS WHOLESALE rather than bolting the orphans onto one neighbour', () => {
    // The survivors end up balanced, not lopsided — which is the point of re-mixing.
    const a = redistribute(runners, shards, ['runner-2'])
    const loads = a.placements.map((p) => p.load).sort((x, y) => x - y)
    expect((loads[loads.length - 1] as number) - (loads[0] as number)).toBeLessThanOrEqual(10)
  })

  it('loses coverage once too many are gone, and says so', () => {
    const a = redistribute(runners, shards, ['runner-1', 'runner-2', 'runner-3'])
    expect(a.placements.length).toBe(1)
    expect(coverage(a)).toBeLessThan(1)
    expect(a.unassigned.length).toBeGreaterThan(0)
  })
})

describe('swarm — redundancy is COMPUTED, never read off a headcount', () => {
  it('reports how many of four runners can be lost with sixteen shards', () => {
    // 160 units of work, 100 per runner: two runners can carry it, three cannot be lost.
    expect(tolerableLosses(runners, shards)).toBe(2)
  })

  it('loses the LARGEST agents first, because that is the worst case a plan must survive', () => {
    const uneven: Agent[] = [
      { id: 'big', capacity: 200 },
      { id: 'small-a', capacity: 20 },
      { id: 'small-b', capacity: 20 },
    ]
    // Losing 'big' alone already breaks it, so the tolerable count is zero — even though
    // losing either small agent would be survivable. A headcount would have said two.
    expect(tolerableLosses(uneven, shards)).toBe(0)
  })

  it('reports zero tolerable losses for a swarm already at its limit', () => {
    const exact: Agent[] = [{ id: 'a', capacity: 80 }, { id: 'b', capacity: 80 }]
    expect(coverage(assign(exact, shards))).toBe(1)
    expect(tolerableLosses(exact, shards)).toBe(0)
  })
})
