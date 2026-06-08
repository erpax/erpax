/**
 * quantum/entanglement/direction-bus — immediate direction collapse (same-tick entanglement).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  DIRECTION_COLLAPSE_EVENT,
  __resetDirectionBusForTests,
  improveDirectionPath,
  cleanDirectionPath,
  interruptTokenFor,
  isDirectionStale,
  peekDirection,
  publishDirection,
  subscribeDirection,
} from './direction-bus'

describe('quantum/entanglement/direction-bus — immediate collapse', () => {
  beforeEach(() => {
    __resetDirectionBusForTests()
  })

  it('publish notifies subscriber synchronously in the same tick', () => {
    const path = 'agent/test-worker'
    let notified: ReturnType<typeof publishDirection> | null = null
    subscribeDirection(path, (d) => {
      notified = d
    })
    const dir = publishDirection(path, { instruction: 'pivot to seal', issuer: 'coordinator' })
    expect(notified).toBe(dir)
    expect(notified!.seal).toMatch(/^[0-9a-f-]{36}$/)
    expect(notified!.payload.instruction).toBe('pivot to seal')
    expect(peekDirection(path)).toBe(dir)
  })

  it('interruptToken becomes stale on publish before the next wave step', () => {
    const path = improveDirectionPath()
    const token = interruptTokenFor(path, 'worker-b2f75a6f')
    expect(isDirectionStale(token)).toBe(false)
    publishDirection(path, { instruction: 'stop improve; audit cross instead', issuer: 'parent' })
    expect(isDirectionStale(token)).toBe(true)
    expect(peekDirection(path)!.generation).toBeGreaterThan(token.generation)
  })

  it('seal is content-uuid of collapse event + path + generation', () => {
    const path = 'monitor/violations/improve'
    const a = publishDirection(path, { instruction: 'a', issuer: 'p' })
    const b = publishDirection(path, { instruction: 'b', issuer: 'p' })
    expect(a.seal).not.toBe(b.seal)
    expect(a.generation).toBe(1)
    expect(b.generation).toBe(2)
    expect(DIRECTION_COLLAPSE_EVENT).toBe('agent:direction:collapse')
  })

  it('cleanDirectionPath resolves apply clean atom', () => {
    expect(cleanDirectionPath()).toMatch(/^apply/)
  })

  it('unsubscribe stops notifications', () => {
    const path = 'agent/x'
    let count = 0
    const off = subscribeDirection(path, () => {
      count++
    })
    publishDirection(path, { instruction: 'one', issuer: 'p' })
    off()
    publishDirection(path, { instruction: 'two', issuer: 'p' })
    expect(count).toBe(1)
  })
})
