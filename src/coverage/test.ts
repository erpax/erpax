import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { coverageMatrix, coverageRatio, developmentWaves, atomPath } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-coverage-'))
  for (const [p, text] of Object.entries(files)) {
    mkdirSync(join(cwd, p, '..'), { recursive: true })
    writeFileSync(join(cwd, p), text)
  }
  return cwd
}

describe('coverage — the development waves ARE theorems, computed not written', () => {
  it('names its path', () => {
    expect(atomPath).toBe('coverage')
  })

  it('a cell is covered iff a PROVEN control cites its standard', () => {
    const cwd = corpus({
      'src/report/index.ts': '/**\n * @compliance SOX §302\n */\nexport const x = 1',
      'src/report/test.ts': 'it("x", () => {})',
    })
    const director = coverageMatrix(cwd).filter((c) => c.participant === 'director')
    expect(director.find((c) => c.standard === 'SOX §302')!.covered).toBe(true) // cited + proven
    rmSync(cwd, { recursive: true, force: true })
  })

  // The theorem the whole atom rests on: a cited control WITHOUT a test does not cover its cell — the same
  // claim audit/agent refuses, seen as a hole in the plan instead of a finding in a diff.
  it('a cited control with NO proof leg leaves its cell UNCOVERED — a wave', () => {
    const cwd = corpus({ 'src/report/index.ts': '/**\n * @compliance SOX §302\n */\nexport const x = 1' })
    const cell = coverageMatrix(cwd).find((c) => c.participant === 'director' && c.standard === 'SOX §302')!
    expect(cell.covered).toBe(false)
    expect(developmentWaves(cwd).some((w) => w.standard === 'SOX §302')).toBe(true)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a standard named in a STRING does not cover — the auditor reads comments, not data', () => {
    const cwd = corpus({
      'src/x/index.ts': `export const msg = '@compliance SOX §302 in a string'\nexport const y = 1`,
      'src/x/test.ts': 'it("y", () => {})',
    })
    expect(coverageMatrix(cwd).find((c) => c.standard === 'SOX §302')!.covered).toBe(false)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('coverageRatio is covered / total — one number, the floor of trust', () => {
    const cwd = corpus({
      'src/a/index.ts': '/**\n * @compliance SOX §302\n */\nexport const x = 1',
      'src/a/test.ts': 'it("x", () => {})',
    })
    const r = coverageRatio(cwd)
    expect(r).toBeGreaterThan(0)
    expect(r).toBeLessThanOrEqual(1)
    rmSync(cwd, { recursive: true, force: true })
  })

  // A WAVE is a theorem to establish, and landing its test COLLAPSES the wave — measurable to the cell.
  it('filling a cell removes exactly its wave — the plan recomputes, never maintained', () => {
    const withoutTest = corpus({ 'src/r/index.ts': '/**\n * @compliance SOX §302\n */\nexport const x = 1' })
    const before = developmentWaves(withoutTest).filter((w) => w.standard === 'SOX §302').length
    writeFileSync(join(withoutTest, 'src/r/test.ts'), 'it("x", () => {})')
    const after = developmentWaves(withoutTest).filter((w) => w.standard === 'SOX §302').length
    expect(before).toBeGreaterThan(0)
    expect(after).toBe(0) // the theorem is proven; the wave is gone
    rmSync(withoutTest, { recursive: true, force: true })
  })

  it('waves are ordered most-exposed participant first — the director before hr', () => {
    const cwd = corpus({}) // no controls: every cell is a wave, so order is pure priority
    const waves = developmentWaves(cwd)
    const dir = waves.findIndex((w) => w.participant === 'director')
    const hr = waves.findIndex((w) => w.participant === 'hr')
    if (dir !== -1 && hr !== -1) expect(dir).toBeLessThan(hr)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('each wave states its theorem as a traceable claim', () => {
    const cwd = corpus({})
    const w = developmentWaves(cwd)[0]
    expect(w?.theorem).toMatch(/can trace .* to a control with a test beside it/)
    rmSync(cwd, { recursive: true, force: true })
  })
})
