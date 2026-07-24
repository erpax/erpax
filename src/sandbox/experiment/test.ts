import { describe, it, expect } from 'vitest'
import { readdirSync, existsSync, mkdirSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { openExperiment, sealExperiment, promoteIfSealed, discardExperiment } from './index'

describe('sandbox/experiment — experiment freely; the standard holds at the seam', () => {
  it('an empty experiment seals trivially and leaves no droppings after discard', () => {
    const e = openExperiment('empty')
    expect(existsSync(join(e.dir, 'src'))).toBe(true)
    expect(sealExperiment(e).passed).toBe(true)
    discardExperiment(e)
    expect(existsSync(e.dir)).toBe(false) // no droppings
  })

  it('a well-formed atom (one word + trinity) passes the seam and PROMOTES into the target', () => {
    const e = openExperiment('good')
    const atom = join(e.dir, 'src', 'widget')
    mkdirSync(atom, { recursive: true })
    writeFileSync(join(atom, 'SKILL.md'), '---\nname: widget\n---\n# widget\n')
    writeFileSync(join(atom, 'index.ts'), 'export const widget = 1\n')
    writeFileSync(join(atom, 'test.ts'), 'export const t = 1\n')
    const seal = sealExperiment(e)
    expect(seal.passed).toBe(true)

    const target = join(mkdtempSync(join(tmpdir(), 'target-')), 'src')
    mkdirSync(target, { recursive: true })
    try {
      expect(promoteIfSealed(e, target)).toBe(true)
      expect(existsSync(join(target, 'widget', 'index.ts'))).toBe(true) // it escaped — because it obeyed
    } finally {
      rmSync(target, { recursive: true, force: true })
      discardExperiment(e)
    }
  })

  it('THE WALL: a standard-violating experiment is caught and CANNOT be promoted', () => {
    const e = openExperiment('bad')
    // a two-word folder name violates the one-word atom law
    const bad = join(e.dir, 'src', 'BadName')
    mkdirSync(bad, { recursive: true })
    writeFileSync(join(bad, 'SKILL.md'), '---\nname: BadName\n---\n')
    const seal = sealExperiment(e)
    expect(seal.passed).toBe(false) // the standard caught it in the sandbox
    expect(seal.nameViolations + seal.trinityViolations).toBeGreaterThan(0)

    const target = join(mkdtempSync(join(tmpdir(), 'target-')), 'src')
    mkdirSync(target, { recursive: true })
    try {
      // promotion refuses — the violation NEVER reaches the corpus (crackLeak sealed)
      expect(promoteIfSealed(e, target)).toBe(false)
      expect(existsSync(join(target, 'BadName'))).toBe(false)
      expect(readdirSync(target).length).toBe(0) // nothing leaked
    } finally {
      rmSync(target, { recursive: true, force: true })
      discardExperiment(e)
    }
  })
})
