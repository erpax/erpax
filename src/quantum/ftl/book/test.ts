import { describe, it, expect } from 'vitest'
import { BOOK, seal, sealScore, chatLocal, searchSealed } from './index'

describe('quantum/ftl/book — the answer was already folded', () => {
  it('seal folds pairs into a book keyed by the question', () => {
    const b = seal([['what is a fold', 'reuse']])
    expect(b.size).toBe(1)
    expect([...b.values()][0]).toBe('reuse')
  })

  it('the shipped book is non-empty — an empty book answers nothing', () => {
    expect(BOOK.size).toBeGreaterThan(0)
  })

  it('chatLocal answers by ADDRESS and REFUSES what is not sealed', () => {
    // the book is keyed by the question's content-address, not its text — `seal` folds
    // the pair, so a lookup must come back through the same fold
    const q = 'what is a fold'
    const b = seal([[q, 'reuse']])
    const hit = chatLocal(q, b)
    expect(hit?.answer).toBe('reuse')
    expect(hit?.lane).toBe('seal')
    expect(hit?.tokens).toBe(0)
    expect(chatLocal('a question nobody ever sealed here', b)).toBeUndefined()
  })

  it('a score ranks by overlap, and search returns what it scored', () => {
    const hits = searchSealed('fold')
    for (const h of hits) expect(sealScore('fold', h)).toBeGreaterThan(0)
  })
})
