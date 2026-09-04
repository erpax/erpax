import { describe, expect, it, beforeEach } from 'vitest'
import ts from 'typescript'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { astOf, cacheStats, clearCache, corpusFiles, retainAsts, textOf } from '.'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-cache-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

describe('syntax/cache', () => {
  beforeEach(() => {
    clearCache()
    retainAsts(false)
  })

  it('reads a file once and returns the same string', () => {
    const root = tree({ 'a/index.ts': 'export const x = 1\n' })
    const f = join(root, 'src/a/index.ts')
    expect(textOf(f)).toBe(textOf(f))
    expect(cacheStats().texts).toBe(1)
  })

  it('SAME CONTENT ⇒ SAME PARSE — sharing a parse cannot change an answer', () => {
    // The safety property the whole atom rests on: a SourceFile is a pure function of its inputs,
    // so a gate reading a shared tree sees exactly what its own parse would have produced.
    const root = tree({ 'a/index.ts': 'export const x: number = 1\nexport function f() {}\n' })
    const f = join(root, 'src/a/index.ts')
    const shared = astOf(f)
    const own = ts.createSourceFile(f, textOf(f), ts.ScriptTarget.ESNext, true)
    const names = (s: ts.SourceFile): string[] => {
      const out: string[] = []
      const visit = (n: ts.Node): void => {
        if (ts.isIdentifier(n)) out.push(n.text)
        ts.forEachChild(n, visit)
      }
      visit(s)
      return out
    }
    expect(names(shared)).toEqual(names(own))
    expect(shared.getFullText()).toBe(own.getFullText())
  })

  it('parses with setParentNodes, because a gate asks what encloses a node', () => {
    const root = tree({ 'a/index.ts': 'export const x = 1\n' })
    const src = astOf(join(root, 'src/a/index.ts'))
    let child: ts.Node | undefined
    ts.forEachChild(src, (n) => {
      child ??= n
    })
    expect(child!.parent).toBeDefined()
  })

  it('walks once per (root, kind), and the order is stable', () => {
    const root = tree({ 'b/index.ts': '', 'a/index.ts': '', 'a/test.ts': '' })
    const first = corpusFiles(root, 'source')
    expect(corpusFiles(root, 'source')).toBe(first)
    expect(cacheStats().walks).toBe(1)
    expect([...first]).toEqual([...first].sort())
  })

  it('separates the kinds it is asked for', () => {
    const root = tree({ 'a/index.ts': '', 'a/test.ts': '', 'a/SKILL.md': '' })
    expect(corpusFiles(root, 'source')).toHaveLength(2)
    expect(corpusFiles(root, 'test')).toHaveLength(1)
    expect(corpusFiles(root, 'skill')).toHaveLength(1)
  })

  it('does NOT retain ASTs by default — that half costs 19× the source in memory', () => {
    const root = tree({ 'a/index.ts': 'export const x = 1\n' })
    astOf(join(root, 'src/a/index.ts'))
    expect(cacheStats().asts).toBe(0)
  })

  it('retains them when a caller asks, and drops them when it stops asking', () => {
    const root = tree({ 'a/index.ts': 'export const x = 1\n' })
    retainAsts(true)
    const first = astOf(join(root, 'src/a/index.ts'))
    expect(astOf(join(root, 'src/a/index.ts'))).toBe(first)
    expect(cacheStats().asts).toBe(1)
    retainAsts(false)
    expect(cacheStats().asts).toBe(0)
  })

  it('a missing directory yields nothing rather than throwing', () => {
    expect(corpusFiles(join(tmpdir(), 'erpax-cache-absent'), 'source')).toEqual([])
  })
})
