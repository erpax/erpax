import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { folderViolations, folderRatchet, FOLDER_LAW_BASELINE, ONE_WORD } from '@/law/folder'

// The folder-shape law (./index.ts), computed from the live tree. The ratchet
// decision is pure (no fs / process), so it is regression-locked here; the live
// count is gated as a RATCHET so the law can never get worse — every new
// malformed folder fails this test (and pre-push, and the confirm hook).
describe('folder: the folder-shape law (computed)', () => {
  const v = folderViolations()

  it('computes name + trinity violations from the live tree', () => {
    expect(Array.isArray(v.name)).toBe(true)
    expect(Array.isArray(v.trinity)).toBe(true)
    expect(v.total).toBe(v.name.length + v.trinity.length)
    console.log(`folder law: ${v.total} (${v.name.length} name · ${v.trinity.length} trinity) — baseline ${FOLDER_LAW_BASELINE}`)
  })

  // THE GATE: the live tree must not exceed the committed baseline. Adding any
  // non-one-word folder, or a code folder missing its SKILL.md/index.ts/test.ts,
  // pushes total over the baseline and turns this test (hence CI) red.
  it('holds the ratchet — total ≤ FOLDER_LAW_BASELINE (cannot get worse)', () => {
    const verdict = folderRatchet({ violations: v.total, baseline: FOLDER_LAW_BASELINE })
    expect(verdict.reason).toBeTruthy()
    expect(verdict.ok).toBe(true)
  })

  // The gate DETECTS the named violation: config/trading-apis breaks BOTH rules —
  // a hyphenated (non-one-word) name AND a code folder missing its SKILL.md/test.ts.
  // (Its relocation to the one-word src/trading/api home is the prescribed fix,
  // deferred while a live builder is mid-wave on that exact file — see SKILL.md.)
  it('detects the named violation config/trading-apis (name + trinity)', () => {
    const named = (arr: { folder: string }[]) => arr.some((x) => x.folder === 'config/trading-apis')
    // Only assert while the file is present (the builder may relocate it at any time);
    // once it is gone this is vacuously fine and the baseline ratchets down.
    if (existsSync(join(process.cwd(), 'src/config/trading-apis/index.ts'))) {
      expect(named(v.name)).toBe(true) // hyphen → not one word
      expect(named(v.trinity)).toBe(true) // index.ts-only → missing SKILL.md + test.ts
    }
  })

  // The law atom obeys its own law (dogfood — the guardian is tamper-proof).
  it('dogfoods — src/law/folder is itself conforming', () => {
    const folders = new Set([...v.name.map((n) => n.folder), ...v.trinity.map((t) => t.folder)])
    expect(folders.has('law/folder')).toBe(false)
  })

  // Fail-closed: the pure decision treats a broken scan / literal as NOT a pass.
  it('folderRatchet is fail-closed and ratchets correctly', () => {
    expect(folderRatchet({ violations: 5, baseline: 10 }).ok).toBe(true) // under
    expect(folderRatchet({ violations: 10, baseline: 10 }).ok).toBe(true) // at
    expect(folderRatchet({ violations: 11, baseline: 10 }).ok).toBe(false) // over → red
    expect(folderRatchet({ violations: NaN, baseline: 10 }).ok).toBe(false) // broken scan
    expect(folderRatchet({ violations: -1, baseline: 10 }).ok).toBe(false)
    expect(folderRatchet({ violations: 5, baseline: NaN }).ok).toBe(false) // broken literal
  })

  it('ONE_WORD accepts a generic word, rejects hyphen / camelCase / dot-suffix', () => {
    expect(ONE_WORD.test('trading')).toBe(true)
    expect(ONE_WORD.test('api')).toBe(true)
    expect(ONE_WORD.test('trading-apis')).toBe(false)
    expect(ONE_WORD.test('appCollections')).toBe(false)
    expect(ONE_WORD.test('account.service')).toBe(false)
  })
})
