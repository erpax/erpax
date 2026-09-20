import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { diamondMembershipOk, diamondMembershipViolations, isChildAtomDir, isDataDir, isPathSegmentDir } from '@/diamond/membership'

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
    const v = atomWith('messages', 'fixtures', { 'a.json': '{}' }, 'deeper')
    expect(v.some((x) => x.file === 'fixtures/' && x.reason === 'stray-dir')).toBe(true)
  })

  it('REFUSES an EMPTY fixtures/ dir — evidence, or nothing', () => {
    const v = atomWith('lean', 'fixtures', {})
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

describe('diamond/membership — a path segment is not a stray', () => {
  const tree = (dirs: Record<string, string[]>): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-seg-'))
    for (const [d, files] of Object.entries(dirs)) {
      mkdirSync(join(root, d), { recursive: true })
      for (const f of files) writeFileSync(join(root, d, f), '# x\n')
    }
    return root
  }

  // `api/audit` contains nothing but `events`; `auto/populate` nothing but `created` and
  // `tenant`. They exist so a nested atom has an address — no code, no prose, nothing to seal.
  // Charging them as stray asks them to become atoms, and an atom with nothing in it is what
  // rules/prose forbids. Measured: 176 of 248 stray-dirs were this.
  it('a directory of only directories, leading to an atom, is lawful', () => {
    const root = tree({ 'api': [], 'api/audit': [], 'api/audit/events': ['SKILL.md'] })
    expect(isPathSegmentDir(join(root, 'api'), 'audit')).toBe(true)
  })

  it('…but not when it leads to no atom at all — then it is on the way to nothing', () => {
    const root = tree({ 'api': [], 'api/audit': [], 'api/audit/events': [] })
    expect(isPathSegmentDir(join(root, 'api'), 'audit')).toBe(false)
  })

  it('any file at all means it carries matter, and matter needs a SKILL', () => {
    const root = tree({ 'admin': [], 'admin/bar': ['index.tsx'], 'admin/bar/sub': ['SKILL.md'] })
    expect(isPathSegmentDir(join(root, 'admin'), 'bar')).toBe(false)
  })

  it('an empty directory is still stray', () => {
    const root = tree({ 'a': [], 'a/empty': [] })
    expect(isPathSegmentDir(join(root, 'a'), 'lean')).toBe(false)
  })

  // The cascade correction. `bank/reconciliation` holds nothing but `service/`, which carries
  // `index.ts` and owes a SKILL. Charging the ancestor too reported one missing leg twice, all the
  // way up the chain — 45 of 117 stray dirs were that echo, never a second defect.
  it('a path segment leading to TypeScript is lawful, even where no SKILL exists yet', () => {
    const root = tree({ 'bank': [], 'bank/reconciliation': [], 'bank/reconciliation/service': ['index.ts'] })
    expect(isPathSegmentDir(join(root, 'bank'), 'reconciliation')).toBe(true)
  })

  it('…and the leaf that owes the SKILL is still charged for it', () => {
    const root = tree({ 'bank': [], 'bank/reconciliation': [], 'bank/reconciliation/service': ['index.ts'] })
    expect(isPathSegmentDir(join(root, 'bank/reconciliation'), 'service')).toBe(false)
    expect(isChildAtomDir(join(root, 'bank/reconciliation'), 'service')).toBe(false)
  })

  it('a chain of folders holding no TypeScript at all is still on the way to nothing', () => {
    const root = tree({ 'a': [], 'a/b': [], 'a/b/c': ['notes.txt'] })
    expect(isPathSegmentDir(join(root, 'a'), 'b')).toBe(false)
  })

  it('a directory with a SKILL is a child atom, judged by the older rule', () => {
    const root = tree({ 'a': [], 'a/b': ['SKILL.md'] })
    expect(isChildAtomDir(join(root, 'a'), 'b')).toBe(true)
  })
})

describe('isDataDir — the narrowest shape that admits a folder of data, and fails closed', () => {
  const mk = (files: Record<string, string>, dirs: string[] = []): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-datadir-'))
    for (const [f, body] of Object.entries(files)) writeFileSync(join(root, f), body)
    for (const d of dirs) mkdirSync(join(root, d))
    return root
  }

  it('admits a flat folder of one non-TypeScript extension', () => {
    const root = mk({})
    mkdirSync(join(root, 'lean'))
    writeFileSync(join(root, 'lean', 'A.lean'), 'theorem a : True := trivial')
    writeFileSync(join(root, 'lean', 'B.lean'), 'theorem b : True := trivial')
    expect(isDataDir(root, 'lean')).toBe(true)
  })

  it('tolerates ONE generated face beside the data — the emitter writes it there', () => {
    const root = mk({})
    mkdirSync(join(root, 'lean'))
    writeFileSync(join(root, 'lean', 'A.lean'), 'x')
    writeFileSync(join(root, 'lean', 'inventory.generated.json'), '{}')
    expect(isDataDir(root, 'lean')).toBe(true)
  })

  it('REFUSES a folder holding a .ts file — it carries code and owes a trinity', () => {
    const root = mk({})
    mkdirSync(join(root, 'messages'))
    writeFileSync(join(root, 'messages', 'A.lean'), 'x')
    writeFileSync(join(root, 'messages', 'sneak.ts'), 'export const x = 1')
    expect(isDataDir(root, 'messages')).toBe(false)
  })

  it('REFUSES a mixed-extension folder — a pocket, not a data set', () => {
    const root = mk({})
    mkdirSync(join(root, 'messages'))
    writeFileSync(join(root, 'messages', 'a.json'), '{}')
    writeFileSync(join(root, 'messages', 'b.yaml'), 'k: v')
    expect(isDataDir(root, 'messages')).toBe(false)
  })

  it('REFUSES a nested folder, and REFUSES an empty one', () => {
    const root = mk({})
    mkdirSync(join(root, 'messages'))
    writeFileSync(join(root, 'messages', 'a.json'), '{}')
    mkdirSync(join(root, 'messages', 'deeper'))
    expect(isDataDir(root, 'messages')).toBe(false)
    mkdirSync(join(root, 'lean'))
    expect(isDataDir(root, 'lean')).toBe(false)
  })

  it('REFUSES a folder that carries a SKILL — that is a child atom, judged as one', () => {
    const root = mk({})
    mkdirSync(join(root, 'lean'))
    writeFileSync(join(root, 'lean', 'a.json'), '{}')
    writeFileSync(join(root, 'lean', 'SKILL.md'), '# atom')
    expect(isDataDir(root, 'lean')).toBe(false)
  })

  it('is NAME-scoped — identical data under an undeclared name stays stray', () => {
    const root = mk({})
    mkdirSync(join(root, 'captures'))
    writeFileSync(join(root, 'captures', 'A.lean'), 'x')
    expect(isDataDir(root, 'captures')).toBe(false)
    // and the declared sibling with the same bytes is admitted — the NAME is the whole difference
    mkdirSync(join(root, 'lean'))
    writeFileSync(join(root, 'lean', 'A.lean'), 'x')
    expect(isDataDir(root, 'lean')).toBe(true)
  })
})