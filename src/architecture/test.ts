import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { importSpecifiersOf } from '@/syntax'
import * as face from './index'

/**
 * The face, checked structurally and by surface. `[[architecture]]` is cited ten
 * times; this pins that following the word actually arrives somewhere.
 */
describe('architecture — the face reaches the executable laws', () => {
  it('exposes the invariant runner the gate calls', () => {
    expect(typeof face.runAllInvariants).toBe('function')
    expect(typeof face.formatInvariantResult).toBe('function')
  })

  it('re-exports its one child and nothing else', () => {
    const barrel = readFileSync(join(import.meta.dirname, 'index.ts'), 'utf8')
    expect(importSpecifiersOf('index.ts', barrel)).toEqual(['./invariant'])
  })
})
