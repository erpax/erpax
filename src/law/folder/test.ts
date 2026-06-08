import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { folderViolations, folderGuardians, NAME_BASELINE, TRINITY_BASELINE, ONE_WORD } from '@/law/folder'

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
    console.log(`folder law: ${v.name.length} name (≤${NAME_BASELINE}) · ${v.trinity.length} trinity (≤${TRINITY_BASELINE})`)
  })

  // THE GUARDIANS: name and trinity are TWO independent ratchets — the gate is green
  // only when BOTH hold. Adding any non-one-word folder reddens the NAME guardian on
  // its own (it can no longer hide behind a trinity fix); a code folder missing its
  // SKILL.md/index.ts/test.ts reddens the TRINITY guardian. Either rise turns CI red.
  it('holds both guardians — name ≤ NAME_BASELINE AND trinity ≤ TRINITY_BASELINE', () => {
    const verdict = folderGuardians(v)
    expect(verdict.guardians.every((g) => g.ok)).toBe(true)
    expect(verdict.sealed).toBe(true)
  })

  // A naming violation can no longer be masked: even with trinity slack, a NAME rise
  // unseals the verdict on its own (the whole point of the user's command).
  it('catches a naming violation independently of trinity slack', () => {
    const masked = folderGuardians(
      { name: new Array(NAME_BASELINE + 1).fill({ folder: 'x-y', law: 'one-word' }), trinity: [], total: NAME_BASELINE + 1 },
      { name: NAME_BASELINE, trinity: TRINITY_BASELINE },
    )
    expect(masked.guardians.find((g) => g.axis === 'name')?.ok).toBe(false)
    expect(masked.sealed).toBe(false)
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

  // (The pure fail-closed ratchet decision is regression-locked in @/guardian and
  // its composition into a seal in @/seal — folder only wires them to its two axes.)

  it('ONE_WORD accepts a generic word, rejects hyphen / camelCase / dot-suffix', () => {
    expect(ONE_WORD.test('trading')).toBe(true)
    expect(ONE_WORD.test('api')).toBe(true)
    expect(ONE_WORD.test('trading-apis')).toBe(false)
    expect(ONE_WORD.test('appCollections')).toBe(false)
    expect(ONE_WORD.test('account.service')).toBe(false)
  })
})
