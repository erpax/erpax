import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { diamondMembershipViolations, diamondMembershipOk } from '@/diamond/membership'

describe('diamond/membership — stray matter blocks seal', () => {
  // BOUNDED-WITNESS: prove the DETECTOR on a hermetic fixture, not a live atom — a live
  // "known-dirty" atom (skill/router) is a moving target: the corpus cleans it and the test
  // rots. Here we plant stray matter in a temp tree and assert the detector catches it.
  const root = mkdtempSync(join(tmpdir(), 'erpax-membership-'))
  const atom = 'strayatom'
  const dir = join(root, 'src', atom)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'SKILL.md'), '# strayatom\n')
  writeFileSync(join(dir, 'index.ts'), 'export const x = 1\n')
  writeFileSync(join(dir, 'test.ts'), 'export {}\n')
  writeFileSync(join(dir, '.stray'), 'x') // a stray dotfile — unaddressable matter
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  it('detects stray matter (a dotfile) in an atom', () => {
    const v = diamondMembershipViolations(atom, root)
    expect(v.length).toBeGreaterThan(0)
    expect(v.some((x) => x.reason === 'stray-dotfile')).toBe(true)
    expect(diamondMembershipOk(atom, root)).toBe(false)
  })

  it('law/folder is membership-pure (live)', () => {
    expect(diamondMembershipOk('law/folder')).toBe(true)
  })
})

describe('diamond/membership — a fixtures/ dir is captured evidence, not stray matter', () => {
  // Hermetic again: plant each shape in a temp tree and assert the DETECTOR, never a
  // live atom whose contents the corpus may clean tomorrow.
  const root = mkdtempSync(join(tmpdir(), 'erpax-fixtures-'))
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  /** Build an atom with a `<name>/` dir holding `files`, return its violations. */
  const atomWith = (atom: string, dirName: string, files: Record<string, string>, nested?: string) => {
    const dir = join(root, 'src', atom)
    mkdirSync(join(dir, dirName), { recursive: true })
    writeFileSync(join(dir, 'SKILL.md'), `# ${atom}\n`)
    writeFileSync(join(dir, 'index.ts'), 'export const x = 1\n')
    writeFileSync(join(dir, 'test.ts'), 'export {}\n')
    for (const [f, body] of Object.entries(files)) writeFileSync(join(dir, dirName, f), body)
    if (nested) mkdirSync(join(dir, dirName, nested), { recursive: true })
    return diamondMembershipViolations(atom, root)
  }

  it('ALLOWS a fixtures/ dir holding only captured data', () => {
    const v = atomWith('good', 'fixtures', {
      'ecb-daily.xml': '<x/>',
      'brreg.json': '{}',
      'agents.jsonl': '{}\n',
    })
    expect(v).toEqual([])
  })

  it('REFUSES a fixtures/ dir containing code — it may not become a pocket', () => {
    const v = atomWith('withcode', 'fixtures', { 'a.json': '{}', 'helper.ts': 'export {}' })
    expect(v.some((x) => x.file === 'fixtures/' && x.reason === 'stray-dir')).toBe(true)
  })

  it('REFUSES a nested directory inside fixtures/ — the allowance is flat', () => {
    const v = atomWith('nested', 'fixtures', { 'a.json': '{}' }, 'deeper')
    expect(v.some((x) => x.file === 'fixtures/' && x.reason === 'stray-dir')).toBe(true)
  })

  it('REFUSES an EMPTY fixtures/ dir — evidence, or nothing', () => {
    const v = atomWith('empty', 'fixtures', {})
    expect(v.some((x) => x.file === 'fixtures/' && x.reason === 'stray-dir')).toBe(true)
  })

  it('is NAME-scoped — the same data under another dir name is still stray', () => {
    const v = atomWith('othername', 'captures', { 'a.json': '{}' })
    expect(v.some((x) => x.file === 'captures/' && x.reason === 'stray-dir')).toBe(true)
  })

  it('the live outward fixtures atoms are membership-pure', () => {
    for (const a of ['outward/eu', 'outward/bg', 'outward/world', 'agent/inventory']) {
      expect(diamondMembershipOk(a), a).toBe(true)
    }
  })
})
