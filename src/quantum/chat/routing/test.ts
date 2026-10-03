import { describe, it, expect } from 'vitest'
import { startSession } from './index'

describe('quantum/chat/routing', () => {
  it('startSession creates a session', () => {
    const s = startSession('test')
    expect(s.topic).toBe('test')
    expect(s.sealed).toBe(false)
  })
})
