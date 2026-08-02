import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { ancestorPaths, parentAtomPath } from './index'

describe('seal/parent — the ancestor, in a module that depends on nothing', () => {
  it('ZERO IMPORTS — the property that makes it importable from anywhere', () => {
    const src = readFileSync(join(process.cwd(), 'src/seal/parent/index.ts'), 'utf8')
    expect(src).not.toMatch(/^\s*import\s/m)
  })

  it('a root has no parent — null, never the empty string', () => {
    expect(parentAtomPath('rules')).toBeNull()
    expect(parentAtomPath('')).toBeNull()
    expect(parentAtomPath('/leading')).toBeNull() // index 0 is not a parent boundary
  })

  it('the parent is one level up, and nesting composes', () => {
    expect(parentAtomPath('rules/bypass')).toBe('rules')
    expect(parentAtomPath('gl/accounts/period')).toBe('gl/accounts')
  })

  it('ancestorPaths walks nearest-first and terminates at the root', () => {
    expect(ancestorPaths('a/b/c/d')).toEqual(['a/b/c', 'a/b', 'a'])
    expect(ancestorPaths('a')).toEqual([])
  })

  it('the public surface is unchanged — @/seal still exports it', async () => {
    const { parentAtomPath: viaBarrel } = await import('@/seal')
    expect(viaBarrel('x/y')).toBe(parentAtomPath('x/y'))
  })
})
