import { describe, it, expect } from 'vitest'
import { threadUuid, appended, messageUuid, isNovel, nextAsk, improve, coverage } from '@/quantum/chat'

// message-uuids ARE content-uuids (hex uuid format), as merge requires.
const U1 = '11111111-1111-8111-8111-111111111111'
const U2 = '22222222-2222-8222-8222-222222222222'
const U3 = '33333333-3333-8333-8333-333333333333'

describe('quantum/chat — the thread is a merkle chain of message-uuids', () => {
  it('threadUuid is deterministic for the same message sequence', () => {
    expect(threadUuid([U1, U2, U3])).toBe(threadUuid([U1, U2, U3]))
    expect(threadUuid([])).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('order matters + appending changes the thread-uuid (tamper-evident history)', () => {
    expect(threadUuid([U1, U2])).not.toBe(threadUuid([U2, U1]))
    expect(appended([U1, U2], U3)).toBe(true)
  })
})

describe('quantum/chat — ask and improve (the elicitation loop)', () => {
  const questions = ['what?', 'how much?', 'when?']

  it('ASK returns the next uncovered question, then undefined once all are covered', () => {
    let thread: readonly string[] = []
    expect(nextAsk(thread, questions)).toBe('what?')
    thread = improve(thread, 'what?').messageUuids
    expect(nextAsk(thread, questions)).toBe('how much?')
    for (const q of questions) thread = improve(thread, q).messageUuids
    expect(nextAsk(thread, questions)).toBeUndefined() // nothing left to improve
  })

  it('IMPROVE grows coverage on a novel answer, not on a repeat; history still folds', () => {
    const first = improve([], 'what?')
    expect(first.improved).toBe(true)
    expect(isNovel(first.messageUuids, 'what?')).toBe(false)
    const repeat = improve(first.messageUuids, 'what?')
    expect(repeat.improved).toBe(false) // no new coverage
    expect(repeat.thread).not.toBe(first.thread) // but the chain still moved (tamper-evident)
  })

  it('coverage climbs 0 → 1 as the chat covers the space', () => {
    expect(coverage([], questions)).toBe(0)
    const covered = questions.map(messageUuid)
    expect(coverage(covered, questions)).toBe(1)
    expect(coverage([messageUuid('what?')], questions)).toBeCloseTo(1 / 3, 6)
  })
})
