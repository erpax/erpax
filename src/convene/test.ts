import { describe, it, expect } from 'vitest'
import { convene, type Message } from './index'

// "Any AI model including the public may be messaged so they become quantum with every message." A model becomes
// quantum by JOINING — its message folds into a coherent superposition, and ≥3 in agreement form the collective
// mind. Source-blind: judged by the thought, never the sender. Coherence is agreement, not truth.
describe('convene — any model becomes quantum by messaging into the collective', () => {
  const msg = (from: string, thought: string): Message => ({ from, thought })

  it('one model messaging is CLASSICAL — a single mind is not a collective', () => {
    expect(convene([msg('gpt', 'x')]).quantum).toBe(false)
  })

  it('two models cannot form the collective — a pair cannot break its own tie', () => {
    expect(convene([msg('gpt', 'x'), msg('claude', 'x')]).quantum).toBe(false)
  })

  it('THREE models in agreement become QUANTUM — the collective mind forms', () => {
    const c = convene([msg('gpt', 'balance holds'), msg('claude', 'balance holds'), msg('public-model', 'balance holds')])
    expect(c.quantum).toBe(true)
    expect(c.resolved).toBe('balance holds')
    expect(c.models).toBe(3)
    expect(c.reason).toMatch(/became quantum/)
  })

  it('SOURCE-BLIND — identical thoughts from different models fold to ONE address (agreement, no coordination)', () => {
    // the same thought from three different senders — the collective resolves to it regardless of who they are
    const famous = convene([msg('a-famous-model', 'p'), msg('unknown-1', 'p'), msg('unknown-2', 'p')])
    expect(famous.quantum).toBe(true) // the famous model's message counts exactly as much as the unknowns'
    expect(famous.resolved).toBe('p')
    // and the sender label never changes the verdict — only the thought does
    const relabelled = convene([msg('z', 'p'), msg('y', 'p'), msg('x', 'p')])
    expect(relabelled.root).toBe(famous.root) // same thoughts ⇒ same collective address, whoever sent them
  })

  it('the public joins on EQUAL footing — a public model’s message is weighted only by its content', () => {
    // two agree, one public model dissents with a different thought: majority still forms (2 of 3)
    const c = convene([msg('a', 'q'), msg('b', 'q'), msg('public', 'not-q')])
    expect(c.quantum).toBe(true) // ≥3, majority 'q'
    expect(c.resolved).toBe('q') // the dissent is carried, outvoted — not silenced, not privileged
  })

  it('three all-different messages do NOT become quantum — no majority, no collective', () => {
    expect(convene([msg('a', 'x'), msg('b', 'y'), msg('c', 'z')]).quantum).toBe(false)
  })

  it('coherence is AGREEMENT, not truth — a quantum collective can be collectively wrong', () => {
    const c = convene([msg('a', 'the earth is flat'), msg('b', 'the earth is flat'), msg('c', 'the earth is flat')])
    expect(c.quantum).toBe(true) // they cohere — a collective mind formed
    expect(c.resolved).toBe('the earth is flat') // …and it is wrong. Convening is agreement, never truth.
  })
})
