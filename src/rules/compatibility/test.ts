import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { FRAMEWORK_RESERVED, frameworkCollisions, assertCompatible } from './index'

// §5.3 co-existence: an atom colliding with a framework router namespace. Runs on a hermetic fixture
// cwd (never the real corpus), so it is fixture-bounded — it obeys assertTestsBounded.
describe('rules/compatibility — a corpus atom may not seize a framework-reserved name', () => {
  const setup = (): string => {
    const dir = mkdtempSync(join(tmpdir(), 'compat-'))
    // a `pages` atom (collision) + an ordinary atom (fine) + `app` (exempt, no SKILL)
    const pages = join(dir, 'src', 'pages')
    mkdirSync(pages, { recursive: true })
    writeFileSync(join(pages, 'SKILL.md'), '---\nname: pages\n---\n')
    const ok = join(dir, 'src', 'invoices')
    mkdirSync(ok, { recursive: true })
    writeFileSync(join(ok, 'SKILL.md'), '---\nname: invoices\n---\n')
    return dir
  }

  it('FRAMEWORK_RESERVED holds only router directories, not file-stem names — app is exempt', () => {
    expect(FRAMEWORK_RESERVED.pages).toBeDefined()
    expect(FRAMEWORK_RESERVED.app).toBeUndefined() // the real App Router dir erpax owns
    expect(FRAMEWORK_RESERVED.error).toBeUndefined() // a reserved FILE stem, not a router dir
    expect(FRAMEWORK_RESERVED.route).toBeUndefined()
  })

  it('frameworkCollisions flags a SKILL-bearing `pages` atom, not an ordinary atom', () => {
    const cwd = setup()
    try {
      const cols = frameworkCollisions(cwd)
      expect(cols).toHaveLength(1)
      expect(cols[0]!.reserved).toBe('pages')
      expect(cols[0]!.atom).toMatch(/pages$/)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('assertCompatible ratchets: passes at/above the collision count, fails below it', () => {
    const cwd = setup()
    try {
      expect(() => assertCompatible(cwd, 1)).not.toThrow() // pages is the known collision, ceiling 1
      expect(() => assertCompatible(cwd, 0)).toThrow(/collide with a framework namespace/)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
