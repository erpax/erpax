import { describe, it, expect } from 'vitest'
import { childWordFromBasename, listAtomPaths, pathWireViolations } from './index'

describe('index/cross — the child word a stray sibling would become', () => {
  it('takes the LAST segment, because that is the word the child atom is named for', () => {
    expect(childWordFromBasename('probe.ts')).toBe('probe')
    expect(childWordFromBasename('cost-policy.ts')).toBe('policy')
    expect(childWordFromBasename('a.b.c.ts')).toBe('c')
  })

  it('sees through the test suffix, so a proof does not propose its own atom', () => {
    expect(childWordFromBasename('probe.test.ts')).toBe('probe')
  })

  it('refuses what cannot be an atom name', () => {
    expect(childWordFromBasename('Component.tsx')).toBeNull()
    expect(childWordFromBasename('README.md')).toBeNull()
    expect(childWordFromBasename('Thing.ts')).toBeNull()
    expect(childWordFromBasename('_.ts')).toBeNull()
  })
})

describe('index/cross — the live audit', () => {
  it('reads real atom paths and returns violations shaped for a reader', () => {
    expect(listAtomPaths(process.cwd()).length).toBeGreaterThan(100)
    for (const v of pathWireViolations(process.cwd()).slice(0, 5)) {
      expect(typeof v.atomPath).toBe('string')
    }
  })
})
