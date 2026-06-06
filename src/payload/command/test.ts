import { describe, it, expect } from 'vitest'
import { COMMANDS, commandUuid, foldCommands, inverseOf } from '@/payload/command'

describe('payload/command — the CLI command set, folded', () => {
  it('includes the core Payload commands (from the installed bin)', () => {
    expect(COMMANDS).toContain('migrate')
    expect(COMMANDS).toContain('generate:types')
    expect(COMMANDS).toContain('migrate:create')
  })
  it('each command folds to a deterministic content-uuid', () => {
    const u = commandUuid('migrate')
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(commandUuid('migrate')).toBe(u)
  })
  it('the whole set folds to one root, deterministically', () => {
    const r = foldCommands()
    expect(r).toMatch(/^[0-9a-f]{8}-/)
    expect(foldCommands()).toBe(r)
  })
  it('both sides encoded — reversible commands pair with their inverse; generators are forward-only', () => {
    expect(inverseOf('migrate')).toBe('migrate:down')
    expect(inverseOf('migrate:down')).toBe('migrate')
    expect(inverseOf('migrate:fresh')).toBe('migrate:reset')
    expect(inverseOf('generate:types')).toBeUndefined()
  })
})
