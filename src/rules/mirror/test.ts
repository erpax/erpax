import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertNoMirrors, literalConstants, mirroredAssertions } from '.'

const atom = (index: string, test: string): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-mirror-'))
  mkdirSync(join(root, 'src', 'a'), { recursive: true })
  writeFileSync(join(root, 'src', 'a', 'index.ts'), index)
  writeFileSync(join(root, 'src', 'a', 'test.ts'), test)
  return root
}

describe('rules/mirror', () => {
  it('flags an assertion that repeats the literal its own module assigns', () => {
    const root = atom(`export const atomPath = 'a'\n`, `expect(atomPath).toBe('a')\n`)
    const found = mirroredAssertions(root)
    expect(found).toHaveLength(1)
    expect(found[0]!.name).toBe('atomPath')
    expect(found[0]!.value).toBe("'a'")
  })

  it('does NOT flag an assertion about a property — that is a real claim', () => {
    const root = atom(`export const atomPath = 'a'\n`, `expect(atomPath.length).toBe(1)\n`)
    expect(mirroredAssertions(root)).toEqual([])
  })

  it('does NOT flag a comparison between two things', () => {
    const root = atom(`export const atomPath = 'a'\nexport const other = 'a'\n`, `expect(atomPath).toBe(other)\n`)
    expect(mirroredAssertions(root)).toEqual([])
  })

  it('does NOT flag a different literal — that assertion can fail', () => {
    const root = atom(`export const atomPath = 'a'\n`, `expect(atomPath).toBe('b')\n`)
    expect(mirroredAssertions(root)).toEqual([])
  })

  it('reads a computed constant as no literal at all — only typed values mirror', () => {
    const root = atom(`export const n = [1, 2].length\n`, `expect(n).toBe(2)\n`)
    expect(literalConstants(join(root, 'src/a/index.ts')).has('n')).toBe(false)
    expect(mirroredAssertions(root)).toEqual([])
  })

  it('catches the numeric form, which is how a hand-typed counter certifies itself', () => {
    const root = atom(`export const provenHere = 0\n`, `expect(provenHere).toBe(0)\n`)
    expect(mirroredAssertions(root)).toHaveLength(1)
  })

  it('fails closed above the ceiling and passes at it', () => {
    const root = atom(`export const atomPath = 'a'\n`, `expect(atomPath).toBe('a')\n`)
    expect(() => assertNoMirrors(root, 1)).not.toThrow()
    expect(() => assertNoMirrors(root, 0)).toThrow(/mirror — 1 assertion/)
  })
})
