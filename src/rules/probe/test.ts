import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertNoBlindProbes, blindProbes } from '.'

const tree = (body: string, name = 'a/index.ts'): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-probe-'))
  const p = join(root, 'src', name)
  mkdirSync(join(p, '..'), { recursive: true })
  writeFileSync(p, body)
  return root
}

describe('rules/probe', () => {
  it('catches the shape four gates carried — existsSync(join(dir, index.ts))', () => {
    const found = blindProbes(tree(`const code = existsSync(join(dir, 'index.ts'))\n`))
    expect(found).toHaveLength(1)
    expect(found[0]!.name).toBe('index.ts')
    expect(found[0]!.missing).toBe('index.tsx')
  })

  it('catches a membership test on a directory listing', () => {
    expect(blindProbes(tree(`if (files.has('test.ts')) return true\n`))).toHaveLength(1)
  })

  it('catches an equality test on a filename', () => {
    expect(blindProbes(tree(`if (entry === 'index.ts') return true\n`))).toHaveLength(1)
  })

  it('does NOT flag a file that names the twin anywhere — it has considered it', () => {
    // The cheapest honest signal, and why fixing a file clears every probe in it at once.
    expect(blindProbes(tree(`const c = existsSync(join(d, 'index.ts')) || existsSync(join(d, 'index.tsx'))\n`))).toEqual([])
  })

  it('does NOT flag a name being WRITTEN — creating a file names one spelling correctly', () => {
    // Only a question about what is already there can be blind to the answer.
    expect(blindProbes(tree(`writeFileSync(join(dir, 'index.ts'), body)\n`))).toEqual([])
  })

  it('does NOT flag a name merely mentioned or logged', () => {
    expect(blindProbes(tree(`console.log('author index.ts + test.ts')\n`))).toEqual([])
  })

  it('does NOT flag an untwinned filename — SKILL.md has one spelling', () => {
    expect(blindProbes(tree(`const form = existsSync(join(dir, 'SKILL.md'))\n`))).toEqual([])
  })

  it('fails closed above the ceiling and passes at it', () => {
    const root = tree(`const c = existsSync(join(d, 'index.ts'))\n`)
    expect(() => assertNoBlindProbes(root, 1)).not.toThrow()
    expect(() => assertNoBlindProbes(root, 0)).toThrow(/probe — 1 test/)
  })

  it('the live corpus is at or under its ceiling', () => {
    expect(blindProbes(process.cwd()).length).toBeLessThanOrEqual(57)
  })
})
