import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import * as face from './index'

/**
 * The face is checked STRUCTURALLY — importing the router would pull a ~77MB
 * generated bundle into a unit run, which is the very thing the barrel exists to
 * prevent. So the test reads the barrel's grammar rather than executing it.
 */
const barrel = readFileSync(join(import.meta.dirname, 'index.ts'), 'utf8')
const specs = importSpecifiersOf('index.ts', barrel)

describe('skill — the face is the frontmatter gate', () => {
  it('exposes the gate', () => {
    expect(typeof face.checkSkillFrontmatter).toBe('function')
    expect(typeof face.runSkillFrontmatterGate).toBe('function')
  })

  it('the hyphen grandfather set is EMPTY — the rename plan was executed', () => {
    expect([...face.HYPHENATED_FOLDER_GRANDFATHER]).toEqual([])
  })
})

describe('skill — the barrel must not drag in the router', () => {
  it('re-exports ONLY ./frontmatter', () => {
    expect(specs).toEqual(['./frontmatter'])
  })

  it('names neither the router nor its generated index', () => {
    // A barrel reaching skills.index would make `import '@/skill'` cost ~77MB.
    for (const s of specs) expect(s).not.toMatch(/router|skills\.index/)
  })
})
