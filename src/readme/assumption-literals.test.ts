import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { computeProseLiterals, BANNED_HAND_PROSE } from './assumption-literals'

// computeProseLiterals scans src/readme/compute.ts for banned hand-prose. A hermetic-fixture cwd may not include
// that file — an absent file holds no banned prose, so the scan is empty, never an ENOENT crash. (This crash
// failed all 4 scanCleanAxes tests via handMaintainedViolations → liveViolationCounts → bypassMathViolations.)
describe('computeProseLiterals — tolerates a missing src/readme/compute.ts', () => {
  const corpus = (files: Record<string, string>): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-proselit-'))
    for (const [p, text] of Object.entries(files)) {
      mkdirSync(join(cwd, p, '..'), { recursive: true })
      writeFileSync(join(cwd, p), text)
    }
    return cwd
  }

  it('returns [] when src/readme/compute.ts is absent — no crash on a hermetic fixture', () => {
    const cwd = corpus({ 'src/other/index.ts': 'export const x = 1' }) // no readme/compute.ts
    expect(computeProseLiterals(cwd)).toEqual([]) // absent file ⇒ empty scan, not ENOENT
    rmSync(cwd, { recursive: true, force: true })
  })

  it('finds banned hand-prose when the file is present and contains it', () => {
    const banned = BANNED_HAND_PROSE[0]! // e.g. "erpax IS a diamond"
    const cwd = corpus({ 'src/readme/compute.ts': `// some code\nconst s = "${banned}"\n` })
    expect(computeProseLiterals(cwd)).toContain(banned)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('returns [] when the file is present but clean', () => {
    const cwd = corpus({ 'src/readme/compute.ts': 'export const compute = () => 1\n' })
    expect(computeProseLiterals(cwd)).toEqual([])
    rmSync(cwd, { recursive: true, force: true })
  })
})
