import { tmpdir } from 'node:os'
import { sealPathDoubleWire } from '@/law/folder/index-cross'
import { mirroredIn } from '@/rules/mirror'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
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
import { isPinnedBarrel, packageBundledBarrels } from './index-cross'

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

/*
 * index-cross wires barrels — and until now it had no proof of its own, which is how it
 * appended `export * from './wire'` to the one barrel whose test says it must not, and
 * reddened CI twice. The refusal is computed from the sibling proof's grammar, so it
 * cannot go stale the way a hand-kept list does.
 */
describe('index-cross: a barrel whose OWN proof pins its face is refused', () => {
  const root = join(import.meta.dirname, '..', '..')

  it('reads the pin from the proof, not from a list', () => {
    expect(isPinnedBarrel(join(root, 'skill'))).toBe(true)
  })

  it('a folder with no proof at all is not pinned', () => {
    expect(isPinnedBarrel(join(root, 'law', 'folder', 'nothing-lives-here'))).toBe(false)
  })

  it('a proof that pins nothing leaves its barrel wireable', () => {
    // This very file asserts plenty, and none of it is an array of './…' specifiers —
    // so law/folder is NOT pinned, and the wiring pass may still widen it.
    expect(isPinnedBarrel(join(root, 'law', 'folder'))).toBe(false)
  })

  it('the skill barrel is still narrow — the regression this refusal exists for', () => {
    const barrel = readFileSync(join(root, 'skill', 'index.ts'), 'utf8')
    expect(barrel).not.toMatch(/from '\.\/wire'/)
  })
})

describe('index-cross: a barrel a PACKAGE bundles is refused — computed, not supplied', () => {
  const bundled = packageBundledBarrels()

  it('finds the published entries and everything they reach', () => {
    // Every packages/<atom> entry is its own barrel, so at minimum those are in.
    expect(bundled.has('src/algebra/index.ts')).toBe(true)
    expect(bundled.has('src/cloudflare/index.ts')).toBe(true)
    expect(bundled.size).toBeGreaterThan(50)
  })

  it('a barrel no package reaches is NOT refused — the edge costs a stranger nothing', () => {
    expect(bundled.has('src/deploy/index.ts')).toBe(false)
    expect(bundled.has('src/monitor/index.ts')).toBe(false)
  })
})


describe('index-cross — the autoclean must not mint the defect another gate removes', () => {
  const fixture = (): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-seal-'))
    const d = join(root, 'src', 'x', 'y')
    mkdirSync(d, { recursive: true })
    writeFileSync(join(d, 'SKILL.md'), '# x/y\n')
    writeFileSync(join(d, 'index.ts'), "export const atomPath = 'x/y' as const\n")
    writeFileSync(join(d, 'test.ts'), 'export {}\n')
    return root
  }

  // It used to write `expect(atomPath).toBe('<p>')` against an index declaring that same literal
  // — rules/mirror's canonical example, verbatim. Running it over the 2,315 one-way paths would
  // have minted that many vacuous proofs in one batch, taking mirror from 55 to ~2,370.
  it('the stub it writes is NOT a mirror', () => {
    const root = fixture()
    const r = sealPathDoubleWire(root, 3)
    expect(r.paths.length).toBeGreaterThan(0)
    for (const p of r.paths) {
      const t = join(root, 'src', p, 'test.ts')
      expect(mirroredIn([t], root)).toEqual([])
    }
  })

  it('and its assertion can fail — it compares against the filesystem address', () => {
    const root = fixture()
    const r = sealPathDoubleWire(root, 3)
    const body = readFileSync(join(root, 'src', r.paths[0]!, 'test.ts'), 'utf8')
    expect(body).toContain('atomAddress(import.meta.url).path')
    expect(body).not.toMatch(/toBe\('[^']+'\)/) // never a literal restated
  })
})
