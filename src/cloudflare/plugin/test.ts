import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'

/**
 * The atom's FACE, checked structurally — no runtime import, so this stays fast and
 * cannot drag the framework into a unit run.
 *
 * A member that silently falls off the barrel is invisible: callers importing
 * `@/cloudflare/plugin` simply stop seeing it, with no error anywhere. This folder was assembled
 * by a rename campaign, which is exactly when that happens.
 */
const dir = join(import.meta.dirname, '.')
const members = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'test.ts' && !f.endsWith('.test.ts'))
  .map((f) => f.replace(/\.ts$/, ''))
  .sort()
const faced = importSpecifiersOf('index.ts', readFileSync(join(dir, 'index.ts'), 'utf8'))
  .filter((s) => s.startsWith('./'))
  .map((s) => s.slice(2))
  .sort()

describe('cloudflare/plugin — the barrel is the one face', () => {
  it('has members to face at all', () => {
    expect(members.length).toBeGreaterThan(1) // a one-member folder would be an invented atom
  })

  it('re-exports EVERY member — none silently off the face', () => {
    expect(faced).toEqual(members)
  })

  it('faces nothing that is not there', () => {
    for (const s of faced) expect(members).toContain(s)
  })
})
