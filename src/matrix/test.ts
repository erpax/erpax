import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import {
  auditConstants,
  matrixCrackViolations,
  matrixCracksIn,
  newCracksIn,
  CONSTANTS_AUDIT_COORDINATE,
} from '@/matrix'
import { computedBaseline } from '@/law/folder/baseline'

describe('matrix constants-audit — auditConstants', () => {
  it('coordinates with 82bdf99d audit anchor', () => {
    expect(CONSTANTS_AUDIT_COORDINATE).toBe('82bdf99d')
  })

  it('categorizes lawful physical constants', () => {
    const audit = auditConstants()
    const horo = audit.entries.find((e) => e.constName === 'HORO_DIGITS')
    expect(horo?.category).toBe('lawful-physical')
    const landauer = audit.entries.find((e) => e.constName === 'LANDAUER_BIT')
    expect(landauer?.category).toBe('lawful-physical')
  })

  it('flags *_BASELINE as seal-debt not crack', () => {
    const audit = auditConstants()
    const baselines = audit.entries.filter((e) => e.constName.endsWith('_BASELINE'))
    expect(baselines.length).toBeGreaterThan(0)
    for (const b of baselines) {
      expect(b.category).toBe('seal-debt')
    }
  })

  it('a crack is a DATA literal only — a function-valued export const is code, not seal-debt', () => {
    // The scanner PARSES (ts.createSourceFile), never a regex. A regex over `export const X =`
    // cannot tell `export const RATE = 0.2` from `export const exactMax = (a,b) => …`, and counted
    // both: 57% of the old 1891 "cracks" were arrow functions. Pin the fix so it cannot regress.
    const entries = auditConstants().entries
    const exactMax = entries.find((e) => e.constName === 'exactMax')
    expect(exactMax?.category).toBe('lawful-code') // arrow function — computes, not a static datum
    // Per-atom i18n data and identity seeds are irreducible source, lawful (the test's own axioms).
    const translations = entries.filter((e) => e.constName === 'translations')
    expect(translations.length).toBeGreaterThan(0)
    for (const t of translations) expect(t.category).not.toBe('crack')
  })

  it('matrixCrackViolations holds below the telos — every crack is a genuine static datum', () => {
    const v = matrixCrackViolations()
    // Parser-honest count (2026-08-18): 791 real data-literal statics, well under the 1297 telos.
    // The old regex read 1891 (RED) — an artifact, not debt: it missed type-annotated data consts
    // and counted every arrow function. Down-only from here; a RISE fails closed.
    expect(v.length).toBeLessThanOrEqual(computedBaseline('matrix-crack'))
    console.log(
      `matrix cracks: ${v.length} (telos ${computedBaseline('matrix-crack')}) · lawful ${auditConstants().lawfulNames.length}`,
    )
  })

  it('the static-constant (crack) total does not grow beyond the sealed telos', () => {
    expect(auditConstants().crackTotal).toBeLessThanOrEqual(computedBaseline('matrix-crack'))
  })
})

describe('matrix constants-audit — what is NOT corpus matter', () => {
  // A crack is a HAND-WRITTEN static a theorem could have folded. Two kinds of file
  // can never be that, and both were counted until 2026-08-20.
  const cracks = matrixCrackViolations()
  const audit = auditConstants()

  it('excludes GENERATED faces — telling them to "compute from sealed state" is vacuous', () => {
    // They ARE the computed state. The old pattern needed a dot before "generated",
    // so a bare `generated.ts` (uuid/matrix) slipped through with 3 cracks.
    const generated = cracks.filter((c) =>
      /(^|\/)(catalogue|skills\.index|payload-types|generated)\.tsx?$/.test(c.file),
    )
    expect(generated).toEqual([])
  })

  it('excludes the Next App Router tree — those export names belong to the framework', () => {
    // `dynamic` · `revalidate` · `metadata` · `maxDuration` are read by exact
    // spelling by Next; erpax cannot derive them. Same reason rules/echo excludes
    // app/ and rules/compatibility refuses to model the framework's namespace.
    expect(cracks.filter((c) => c.file.startsWith('src/app/'))).toEqual([])
  })

  it('still audits a NESTED app folder — only the framework root is exempt', () => {
    // The exemption must not become "any folder called app". Probed on the AUDITED POPULATION,
    // never on the crack count: a nested app constant may lawfully stop being a crack (one did,
    // when `lawful-statutory` arrived), and a guard whose evidence can empty for a legitimate
    // reason reports red on a healthy tree — the dual of [[rules]]/mirror's vacuous assertion.
    const audited = audit.entries.filter((e) => e.file.includes('/app/') && !e.file.startsWith('src/app/'))
    expect(audited.length).toBeGreaterThan(0)
    expect(audit.entries.filter((e) => e.file.startsWith('src/app/'))).toEqual([])
  })

  it('a data literal that CITES A STATUTE is not seal-debt — a legislature is not derivable', () => {
    const risk = audit.entries.find((e) => e.constName === 'EXPOSURE_LIMIT_SHARE')
    expect(risk?.category).toBe('lawful-statutory')
    expect(cracks.some((c) => c.constName === 'EXPOSURE_LIMIT_SHARE')).toBe(false)
  })

  it('a declared band with NO statute stays a crack — the exemption is the citation, not the intent', () => {
    // src/aml's own SKILL says structuring is defined by INTENT and no number decides intent, so
    // nothing cites this 0.9. It is a hand-written static and the axis is right to say so.
    expect(cracks.some((c) => c.constName === 'STRUCTURING_BAND')).toBe(true)
  })

  it('a MODULE HEADER is not a declaration\u2019s docstring', () => {
    // getLeadingCommentRanges at a file's first statement returns the module header, so a header
    // citing a standard exempted the first exported const of every such file — 25 of them, measured.
    // Only a block separated from the declaration by at most one line break is its own docstring.
    const source = [
      '/**',
      ' * Module header.',
      ' * @standard ISO-19011:2018 audit-evidence',
      ' */',
      '',
      'export const NOT_STATUTORY = [1, 2, 3]',
      '',
    ].join('\n')
    const dir = mkdtempSync(join(tmpdir(), 'erpax-crack-'))
    mkdirSync(join(dir, 'src', 'probe'), { recursive: true })
    writeFileSync(join(dir, 'src', 'probe', 'index.ts'), source)
    const probe = auditConstants(dir).entries.find((e) => e.constName === 'NOT_STATUTORY')
    expect(probe?.category).toBe('crack')
    rmSync(dir, { recursive: true, force: true })
  })

  it('still audits ordinary hand-written constants — the axis has not been hollowed out', () => {
    expect(cracks.length).toBeGreaterThan(700)
  })
})

/**
 * A scoped reader is only sound if it gives the whole-tree ANSWER for the files it reads. This is the
 * axis an author trips over while writing — a new `export const X = {…}` is seal-debt — and learning it
 * from a whole-tree COUNT three gate-runs later means bisecting your own changeset by hand.
 */
describe('matrix constants-audit — the changeset-scoped reader', () => {
  it('gives the whole-tree population exactly, over every tracked src file', () => {
    const cwd = process.cwd()
    const all = execSync('git ls-files -- src', { cwd, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .map((f) => join(cwd, f))
    const key = (v: { file: string; constName: string }): string => `${v.file}::${v.constName}`
    const whole = new Set(matrixCrackViolations(cwd).map(key))
    const scoped = new Set(matrixCracksIn(all, cwd).map(key))
    // Empty in BOTH directions: a scoped reader that merely agrees on the COUNT could still disagree
    // on which files, and the count is what a ratchet compares.
    expect([...whole].filter((k) => !scoped.has(k))).toEqual([])
    expect([...scoped].filter((k) => !whole.has(k))).toEqual([])
    expect(scoped.size).toBe(whole.size)
  })

  it('keeps the whole-tree DOMAIN — the app subtree, generated faces, tests', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-crack-scope-'))
    try {
      const write = (rel: string): string => {
        const abs = join(root, rel)
        mkdirSync(join(abs, '..'), { recursive: true })
        writeFileSync(abs, 'export const SOMETHING = { a: 1, b: 2 }\n')
        return abs
      }
      // The walk never RECURSES into a skipped root dir, so the whole subtree is out — not just its top
      // level. Scoping this to one level let 11 `src/app/**` route exports through, and only diffing the
      // two populations showed it.
      const files = [
        write('src/thing/index.ts'),
        write('src/app/x.ts'),
        write('src/app/(frontend)/deep/route.ts'),
        write('src/thing/test.ts'),
        write('src/thing/catalogue.ts'),
        write('src/thing/x.generated.ts'),
      ]
      // `test.ts` is NOT skipped, and that is the whole-tree behaviour this must match rather than
      // improve: `SKIP_FILES` matches `foo.test.ts`, while this corpus's trinity file is bare `test.ts`,
      // so the skip its author intended does not fire. Narrowing it here would move a ratcheted count
      // behind a scoping change — a separate decision, taken deliberately, not smuggled in.
      expect(matrixCracksIn(files, root).map((v) => v.file)).toEqual([
        'src/thing/index.ts',
        'src/thing/test.ts',
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('a file that no longer exists carries no crack, and never throws', () => {
    expect(matrixCracksIn([join(process.cwd(), 'src/gone/index.ts')])).toEqual([])
  })

  it('names the const and says what to do, because a count cannot be acted on', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-crack-say-'))
    try {
      mkdirSync(join(root, 'src/thing'), { recursive: true })
      writeFileSync(join(root, 'src/thing/index.ts'), 'export const MEASURED_LAWS = [1, 2]\n')
      const [v] = matrixCracksIn([join(root, 'src/thing/index.ts')], root)
      expect(v!.constName).toBe('MEASURED_LAWS')
      expect(v!.atomPath).toBe('thing')
      expect(v!.reason).toContain('seal-debt')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

/**
 * A zero threshold is not a theorem. 451 of 11,631 tracked src files already hold a crack, so refusing
 * any crack in an edited file would lock 451 files and teach whoever hit one to use `--no-verify`. The
 * refusal is earned instead by two independent readings of the same file proving each other.
 */
describe('matrix constants-audit — a refusal the evidence earns', () => {
  const tree = (): { root: string; file: string; abs: string } => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-newcrack-'))
    mkdirSync(join(root, 'src/thing'), { recursive: true })
    return { root, file: 'src/thing/index.ts', abs: join(root, 'src/thing/index.ts') }
  }

  it('does not refuse a crack that was already committed — that debt is the ratchet\'s', () => {
    const { root, abs } = tree()
    try {
      writeFileSync(abs, 'export const OLD = { a: 1 }\n')
      // the committed reading is injected, so the theorem is provable with no repository at all
      const before = (): string => 'export const OLD = { a: 1 }\n'
      expect(matrixCracksIn([abs], root)).toHaveLength(1) // the tree scan still sees it
      expect(newCracksIn([abs], root, before)).toEqual([]) // and the WRITE does not refuse it
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('refuses the one this edit added, beside a pre-existing one in the same file', () => {
    const { root, abs } = tree()
    try {
      writeFileSync(abs, 'export const OLD = { a: 1 }\nexport const ADDED = { b: 2 }\n')
      const before = (): string => 'export const OLD = { a: 1 }\n'
      const news = newCracksIn([abs], root, before)
      expect(news.map((v) => v.constName)).toEqual(['ADDED'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('refuses every crack in a file git has never seen', () => {
    const { root, abs } = tree()
    try {
      writeFileSync(abs, 'export const A = { a: 1 }\nexport const B = { b: 2 }\n')
      const absent = (): null => null
      expect(newCracksIn([abs], root, absent).map((v) => v.constName)).toEqual(['A', 'B'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('notices a const that STOPPED being lawful — same name, now a literal', () => {
    const { root, abs } = tree()
    try {
      writeFileSync(abs, 'export const X = { a: 1 }\n')
      // it was a function before, which `categorize` calls lawful-code: computing already
      const before = (): string => 'export const X = () => ({ a: 1 })\n'
      expect(newCracksIn([abs], root, before).map((v) => v.constName)).toEqual(['X'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
