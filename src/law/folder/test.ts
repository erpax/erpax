import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  folderViolations,
  folderGuardians,
  folderMatterState,
  folderMatterComplete,
  computedBaseline,
  ONE_WORD,
  alphanumericNameViolations,
  alphanumericFileStem,
  isAlphanumericStem,
} from '@/law/folder'

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
    console.log(`folder law: ${v.name.length} name (≤${computedBaseline('folder-name')}) · ${v.trinity.length} trinity (≤${computedBaseline('folder-trinity')})`)
  })

  // THE GUARDIANS: name and trinity are TWO independent ratchets — the gate is green
  // only when BOTH hold. Adding any non-one-word folder reddens the NAME guardian on
  // its own (it can no longer hide behind a trinity fix); a code folder missing its
  // SKILL.md/index.ts/test.ts reddens the TRINITY guardian. Either rise turns CI red.
  it('holds both guardians — name and trinity at ratchet baselines', () => {
    const verdict = folderGuardians(v)
    expect(verdict.guardians.every((g) => g.ok)).toBe(true)
    expect(verdict.sealed).toBe(true)
  })

  // A naming violation can no longer be masked: even with trinity slack, a NAME rise
  // unseals the verdict on its own (the whole point of the user's command).
  it('catches a naming violation independently of trinity slack', () => {
    const nameBaseline = computedBaseline('folder-name')
    const trinityBaseline = computedBaseline('folder-trinity')
    const masked = folderGuardians(
      { name: new Array(nameBaseline + 1).fill({ folder: 'x-y', law: 'one-word' }), trinity: [], total: nameBaseline + 1 },
      { name: nameBaseline, trinity: trinityBaseline },
    )
    expect(masked.guardians.find((g) => g.axis === 'name')?.ok).toBe(false)
    expect(masked.sealed).toBe(false)
  })

  // plugins/mcpScopes was a camelCase name+trinity violation — relocated to
  // src/plugins/mcp/scopes (one-word path, full trinity). The gate must stay green.
  it('plugins/mcp/scopes is conforming after mcpScopes relocation', () => {
    const folders = new Set([...v.name.map((n) => n.folder), ...v.trinity.map((t) => t.folder)])
    expect(folders.has('plugins/mcpScopes')).toBe(false)
    expect(folders.has('plugins/mcp/scopes')).toBe(false)
    expect(existsSync(join(process.cwd(), 'src/plugins/mcp/scopes/index.ts'))).toBe(true)
  })

  // config/trading-apis was the canonical name+trinity violation — relocated to
  // src/trading/api (one-word path, full trinity). The gate must stay green.
  it('trading/api is conforming after trading-apis relocation', () => {
    const folders = new Set([...v.name.map((n) => n.folder), ...v.trinity.map((t) => t.folder)])
    expect(folders.has('config/trading-apis')).toBe(false)
    expect(folders.has('trading/api')).toBe(false)
    expect(existsSync(join(process.cwd(), 'src/trading/api/index.ts'))).toBe(true)
  })

  it('country/api is conforming after country-apis relocation', () => {
    const folders = new Set([...v.name.map((n) => n.folder), ...v.trinity.map((t) => t.folder)])
    expect(folders.has('config/country-apis')).toBe(false)
    expect(folders.has('country/api')).toBe(false)
    expect(existsSync(join(process.cwd(), 'src/country/api/test.ts'))).toBe(true)
  })

  // The law atom obeys its own law (dogfood — the guardian is tamper-proof).
  it('dogfoods — src/law/folder is itself conforming', () => {
    const folders = new Set([...v.name.map((n) => n.folder), ...v.trinity.map((t) => t.folder)])
    expect(folders.has('law/folder')).toBe(false)
  })

  // (The pure fail-closed ratchet decision is regression-locked in @/guardian and
  // its composition into a seal in @/seal — folder only wires them to its two axes.)

  it('folderMatterState — empty and incomplete are not matter-complete', () => {
    expect(folderMatterState(0, 0, false)).toBe('empty')
    expect(folderMatterComplete('empty')).toBe(false)
    expect(folderMatterState(1, 0, false)).toBe('vocabulary')
    expect(folderMatterComplete('vocabulary')).toBe(true)
    expect(folderMatterState(1, 1, false)).toBe('incomplete')
    expect(folderMatterComplete('incomplete')).toBe(false)
    expect(folderMatterState(1, 1, true)).toBe('code-complete')
    expect(folderMatterComplete('code-complete')).toBe(true)
  })

  it('ONE_WORD accepts a generic word, rejects hyphen / camelCase / dot-suffix', () => {
    expect(ONE_WORD.test('trading')).toBe(true)
    expect(ONE_WORD.test('api')).toBe(true)
    expect(ONE_WORD.test('trading-apis')).toBe(false)
    expect(ONE_WORD.test('appCollections')).toBe(false)
    expect(ONE_WORD.test('account.service')).toBe(false)
  })

  it('ALPHANUMERIC_NAME — folder segments and file stems are [a-z0-9]+ only', () => {
    expect(isAlphanumericStem('coa')).toBe(true)
    expect(isAlphanumericStem('debit')).toBe(true)
    expect(isAlphanumericStem('field-visibility')).toBe(false)
    expect(isAlphanumericStem('reports.service')).toBe(false)
    expect(alphanumericFileStem('margin.test.ts')).toBe('margin')
    expect(alphanumericFileStem('foo-bar.test.ts')).toBe('foo-bar')
  })

  it('alphanumeric-name guardian holds at committed baseline', () => {
    const alpha = alphanumericNameViolations()
    expect(alpha.length).toBeLessThanOrEqual(computedBaseline('alphanumeric-name'))
    expect(alpha.some((v) => v.path === 'accounting/debit-credit.ts')).toBe(false)
    expect(alpha.some((v) => v.path === 'admin/ui/field-visibility.ts')).toBe(false)
    console.log(
      `alphanumeric-name: ${alpha.length} (≤${computedBaseline('alphanumeric-name')}) — ${alpha.filter((a) => a.kind === 'folder').length} folder · ${alpha.filter((a) => a.kind === 'file').length} file`,
    )
  })
})
