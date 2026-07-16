import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { unfoldedExports, assertExportsFolded } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-unfolded-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('rules/unfolded — an export with no caller is entropy', () => {
  it('flags an export nothing references', () => {
    const cwd = corpus({ 'src/a/index.ts': 'export function orphan() { return 1 }' })
    const r = unfoldedExports(cwd)
    expect(r.dead.map((d) => d.name)).toEqual(['orphan'])
    expect(r.single).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('flags a SINGLE-use export — un-folded: inline it, delete it, or reuse it', () => {
    const cwd = corpus({
      'src/a/index.ts': 'export function once() { return 1 }',
      'src/b/index.ts': "import { once } from '@/a'\nexport const b = once()",
    })
    const r = unfoldedExports(cwd)
    expect(r.single.map((s) => s.name)).toContain('once')
    expect(r.dead.map((d) => d.name)).not.toContain('once')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a reused export is FOLDED — two or more sites clear it', () => {
    const cwd = corpus({
      'src/a/index.ts': 'export function reused() { return 1 }',
      'src/b/index.ts': "import { reused } from '@/a'\nexport const b = reused()",
      'src/c/index.ts': "import { reused } from '@/a'\nexport const c = reused()",
    })
    const r = unfoldedExports(cwd)
    expect([...r.dead, ...r.single].map((e) => e.name)).not.toContain('reused')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a barrel re-export never inflates the count — only a real reference does', () => {
    // `export * from './a'` does not name the symbol, so it cannot fake a use
    const cwd = corpus({
      'src/a/index.ts': 'export function viaBarrel() { return 1 }',
      'src/index.ts': "export * from './a'",
    })
    expect(unfoldedExports(cwd).dead.map((d) => d.name)).toContain('viaBarrel')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('generated bundles are not evidence of use — they restate every symbol', () => {
    const cwd = corpus({
      'src/a/index.ts': 'export function orphan() { return 1 }',
      'src/skill/router/skills.index.ts': 'export const SKILL_INDEX = { orphan, orphan, orphan }',
    })
    expect(unfoldedExports(cwd).dead.map((d) => d.name)).toContain('orphan')
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const cwd = corpus({ 'src/a/index.ts': 'export function orphan() { return 1 }' })
    expect(() => assertExportsFolded(cwd, 1)).not.toThrow()
    expect(() => assertExportsFolded(cwd, 0)).toThrow(/un-folded export/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
