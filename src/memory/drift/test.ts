import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { memoryDrift, assertNoMemoryDrift, memoryDirFor } from './index'

/** Hermetic temp dirs — never the live memory, which this atom exists to change. */
const mk = (index: string, files: Record<string, string>): string => {
  const d = mkdtempSync(join(tmpdir(), 'erpax-mem-'))
  writeFileSync(join(d, 'MEMORY.md'), index)
  for (const [f, body] of Object.entries(files)) writeFileSync(join(d, f), body)
  dirs.push(d)
  return d
}
const dirs: string[] = []
afterAll(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })))

describe('memory/drift — the index is the load surface', () => {
  it('is quiet when the index names every file and only real ones', () => {
    const d = mk('- [A](a.md) — hook\n- [B](b.md) — hook\n', { 'a.md': 'x', 'b.md': 'y' })
    expect(memoryDrift(d)).toMatchObject({ orphans: [], dead: [], files: 2, indexed: 2 })
    expect(() => assertNoMemoryDrift(d)).not.toThrow()
  })

  it('CATCHES an orphan — written, but never loaded', () => {
    // The real cost: four STANDING instructions sat orphaned and were violated in
    // the same session that found them. A memory off the index is not an instruction.
    const d = mk('- [A](a.md) — hook\n', { 'a.md': 'x', 'standing.md': 'never do Y' })
    expect(memoryDrift(d).orphans).toEqual(['standing.md'])
    expect(() => assertNoMemoryDrift(d)).toThrow(/never loaded/)
  })

  it('CATCHES a dead entry — a citation leading nowhere', () => {
    const d = mk('- [A](a.md) — hook\n- [Gone](gone.md) — hook\n', { 'a.md': 'x' })
    expect(memoryDrift(d).dead).toEqual(['gone.md'])
    expect(() => assertNoMemoryDrift(d)).toThrow(/no file/)
  })

  it('reports BOTH directions at once', () => {
    const d = mk('- [Gone](gone.md) — hook\n', { 'orphan.md': 'x' })
    const r = memoryDrift(d)
    expect(r.orphans).toEqual(['orphan.md'])
    expect(r.dead).toEqual(['gone.md'])
  })

  it('never counts MEMORY.md as its own memory', () => {
    const d = mk('- [A](a.md) — hook\n', { 'a.md': 'x' })
    expect(memoryDrift(d).files).toBe(1)
  })

  it('is silent, not loud, when there is no memory dir at all', () => {
    expect(memoryDrift(join(tmpdir(), 'erpax-no-such-memory-dir'))).toMatchObject({ files: 0, orphans: [], dead: [] })
  })

  it('derives the host memory path from the project path', () => {
    expect(memoryDirFor('/Users/x/github/erpax/erpax', '/Users/x')).toBe(
      '/Users/x/.claude/projects/-Users-x-github-erpax-erpax/memory',
    )
  })
})

describe('memory/drift — the LIVE memory holds', () => {
  it('the real index and the real files agree', () => {
    expect(() => assertNoMemoryDrift()).not.toThrow()
  })
})
