import { describe, expect, it } from 'vitest'

import { selectBestCandidate, voteFor, type CachedCandidate } from './cache-vote'

const id = (s: string) => s

describe('cache-vote — respond from cache first, ranked by rating/voting', () => {
  it('serves the most-voted candidate', () => {
    const set: CachedCandidate<string>[] = [
      { output: 'a', votes: 1 },
      { output: 'b', votes: 3 },
      { output: 'c', votes: 2 },
    ]
    expect(selectBestCandidate(set)?.output).toBe('b')
  })

  it('breaks vote ties by confidence', () => {
    const set: CachedCandidate<string>[] = [
      { output: 'a', votes: 2, confidence: 0.6 },
      { output: 'b', votes: 2, confidence: 0.9 },
    ]
    expect(selectBestCandidate(set)?.output).toBe('b')
  })

  it('empty set ⇒ null (a true cache miss; the caller runs inference)', () => {
    expect(selectBestCandidate([])).toBeNull()
  })

  it('an identical answer accrues a vote — one slot (the merge law, no ballot stuffing)', () => {
    let set = voteFor<string>([], 'x', id, 0.5)
    set = voteFor(set, 'x', id, 0.8)
    expect(set).toHaveLength(1)
    expect(set[0].votes).toBe(2)
    expect(set[0].confidence).toBe(0.8) // lifted
  })

  it('a novel answer joins the candidate set', () => {
    let set = voteFor<string>([], 'x', id)
    set = voteFor(set, 'y', id)
    expect(set.map((c) => c.output).sort()).toEqual(['x', 'y'])
    expect(selectBestCandidate(set)?.votes).toBe(1)
  })

  it('voting then selecting serves the consensus answer', () => {
    let set: CachedCandidate<string>[] = []
    for (const a of ['x', 'y', 'x', 'x', 'z']) set = voteFor(set, a, id)
    expect(selectBestCandidate(set)?.output).toBe('x') // 3 votes
  })
})
