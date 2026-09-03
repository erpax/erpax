import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import { toAtomPath, atomPathUuid, isValidAtomPath, PATH_SURFACES } from './index'

describe('path/fold — every surface folds to one canonical atom path', () => {
  it('folds the fs surface', () => {
    expect(toAtomPath('src/accounting/coa/index.ts')).toBe('accounting/coa')
    expect(toAtomPath('src/rules/SKILL.md')).toBe('rules')
  })

  it('folds a github url to the same address as the fs path', () => {
    const fs = toAtomPath('src/rules/echo/index.ts')
    expect(toAtomPath('https://github.com/erpax/erpax/blob/main/src/rules/echo/index.ts', 'github')).toBe(fs)
  })

  it('the uuid is a function of the folded address, not the spelling', () => {
    expect(atomPathUuid('src/rules/echo/index.ts')).toBe(atomPathUuid('src/rules/echo/SKILL.md'))
  })

  it('names every surface it can fold', () => {
    expect(PATH_SURFACES.length).toBeGreaterThan(4)
    expect(isValidAtomPath('accounting/coa')).toBe(true)
    expect(isValidAtomPath('accounting/COA')).toBe(false)
  })
})

/*
 * THE CUT. A single import of @/uuid/matrix here — directly or through the parent barrel — puts
 * 4.2 MB and 3,411 node literals back into every consumer that only wanted to fold a string.
 */
describe('path/fold — pure string work, and it must stay that way', () => {
  it('imports neither the matrix nor its own parent', () => {
    const text = readFileSync(join(import.meta.dirname, 'index.ts'), 'utf8')
    const specs = importSpecifiersOf('index.ts', text)
    expect(specs).not.toContain('@/uuid/matrix')
    expect(specs).not.toContain('../index')
    expect(specs).not.toContain('@/path')
  })
})
