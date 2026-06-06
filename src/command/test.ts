import { describe, it, expect } from 'vitest'
import { COMMANDS, isCommand } from '@/command'
import { nodeOf } from '@/uuid/matrix'

// The command role is a REFERENCE into the corpus, not a copy — so every command
// must resolve to a real atom (groundedness = zero entropy).
describe('command — the imperative-verb role of an autonomous workflow', () => {
  it('every command in the C-set is a real corpus atom (the role references, never copies)', () => {
    const unresolved = COMMANDS.filter((c) => nodeOf(c) === undefined)
    expect(unresolved).toEqual([])
  })
  it('isCommand recognizes the C-set and rejects a non-command (a question is not a command)', () => {
    expect(isCommand('generate')).toBe(true)
    expect(isCommand('aura')).toBe(false)
  })
  it('the C-set is non-empty and distinct', () => {
    expect(COMMANDS.length).toBeGreaterThan(0)
    expect(new Set(COMMANDS).size).toBe(COMMANDS.length)
  })
})
