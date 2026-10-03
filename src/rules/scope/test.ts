import { describe, it, expect } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { scanShapes, unscopedLaws } from './index'

const law = (root: string, name: string, body: string): string => {
  const dir = join(root, 'src/rules', name)
  mkdirSync(dir, { recursive: true })
  const p = join(dir, 'index.ts')
  writeFileSync(p, body)
  return p
}

describe('rules/scope — the address a scan reads', () => {
  it('reads the first parameter from the GRAMMAR, not a pattern over source', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-scope-'))
    try {
      // Each of these defeats the regex form: an arrow export, a declaration wrapped across lines,
      // and a destructured parameter that names neither cwd nor files.
      const p = law(
        root,
        'shapes',
        [
          'export const arrowTree = (cwd: string) => [cwd]',
          'export function wrapped(',
          '  cwd: string = process.cwd(),',
          '): string[] { return [cwd] }',
          'export function scoped(files: readonly string[], cwd: string): string[] { return [...files, cwd] }',
          'export function destructured({ a }: { a: number }): number { return a }',
          'export function assertSomething(cwd: string): void { void cwd }',
        ].join('\n'),
      )
      const shapes = scanShapes(p, root)
      const byName = new Map(shapes.map((s) => [s.name, s.shape]))
      expect(byName.get('arrowTree')).toBe('tree')
      expect(byName.get('wrapped')).toBe('tree')
      expect(byName.get('scoped')).toBe('changeset')
      expect(byName.has('destructured')).toBe(false) // neither address
      expect(byName.has('assertSomething')).toBe(false) // an assertion throws, it does not read
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('a law with BOTH shapes is scoped; one with only a tree scan is not', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-scope2-'))
    try {
      law(root, 'twinned', 'export function allOf(cwd: string) { return [cwd] }\nexport function someIn(files: readonly string[]) { return files }')
      law(root, 'treeonly', 'export function allOf(cwd: string) { return [cwd] }')
      law(root, 'neither', 'export const NAME = 1')
      const un = unscopedLaws(root).map((u) => u.law)
      expect(un).toEqual(['rules/treeonly'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('the live corpus splits exactly where the write hook does', { timeout: 120_000 }, () => {
    const un = new Set(unscopedLaws(process.cwd()).map((u) => u.law))
    // Nothing tells this instrument which laws the confirm hook runs; it reports the same split from
    // the grammar alone. That agreement is the reason to believe the other 28.
    for (const wired of ['rules/mirror', 'rules/forge', 'rules/prose', 'rules/reference']) {
      expect(un.has(wired), `${wired} is in the write hook and must have a changeset twin`).toBe(false)
    }
    expect(un.size).toBeGreaterThan(0) // a gate that cannot fire is not a gate
  })
})
