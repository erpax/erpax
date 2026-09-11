import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { computedBaseline, clearRatchetCache } from '@/law/folder/baseline'
import {
  wordWithoutLogicViolations,
  caseOf,
  isOrphanReexportOnly,
  buildImportIndex,
  importTargetToAtomPath,
  PROSE_HEAVY_README_WORDS,
} from '@/rules/word-without-logic'

describe('rules/word-without-logic — fixtures', () => {
  const fixtureRoot = join(tmpdir(), `erpax-word-logic-${Date.now()}`)
  const src = join(fixtureRoot, 'src')

  beforeAll(() => {
    mkdirSync(join(src, 'prose-heavy'), { recursive: true })
    // The prose weight lives in SKILL.md — the tracked form. README.md and diamond.json are
    // gitignored faces derived from it, present on a working tree and absent in CI.
    writeFileSync(
      join(src, 'prose-heavy/SKILL.md'),
      '---\nname: prose-heavy\n---\n\n' +
        Array.from({ length: PROSE_HEAVY_README_WORDS + 20 }, (_, i) => `word${i}`).join(' ') +
        '\n',
    )

    mkdirSync(join(src, 'orphan-export'), { recursive: true })
    writeFileSync(join(src, 'orphan-export/SKILL.md'), '---\nname: orphan-export\n---\n\nRe-export face.\n')
    const deepA = '@/real'
    const deepB = '@/real/bar'
    writeFileSync(
      join(src, 'orphan-export/index.ts'),
      `export { foo } from '${deepA}'\nexport * from '${deepB}'\n`,
    )

    mkdirSync(join(src, 'with-logic'), { recursive: true })
    writeFileSync(join(src, 'with-logic/SKILL.md'), '---\nname: with-logic\n---\n\nMatter twin.\n')
    writeFileSync(
      join(src, 'with-logic/index.ts'),
      'export function deriveThing(): string {\n  return "ok"\n}\n',
    )
    writeFileSync(join(src, 'with-logic/test.ts'), "import { describe, it, expect } from 'vitest'\n")
    writeFileSync(
      join(src, 'with-logic/test.ts'),
      "import { describe, it, expect } from 'vitest'\nimport { deriveThing } from './index'\ndescribe('with-logic', () => { it('derives', () => { expect(deriveThing()).toBe('ok') }) })\n",
    )

    mkdirSync(join(src, 'vocab-exception'), { recursive: true })
    writeFileSync(
      join(src, 'vocab-exception/SKILL.md'),
      '---\nname: vocab-exception\nvocabularyException: true\n---\n\nHuman-gate vocabulary.\n',
    )
    writeFileSync(join(src, 'vocab-exception/README.md'), 'form only by design')

    mkdirSync(join(src, 'importer'), { recursive: true })
    writeFileSync(join(src, 'importer/SKILL.md'), '---\nname: importer\n---\n\nImported.\n')
    writeFileSync(join(src, 'importer/index.ts'), 'export const imported = 1\n')
    mkdirSync(join(src, 'consumer'), { recursive: true })
    writeFileSync(join(src, 'consumer/SKILL.md'), '---\nname: consumer\n---\n\nUses importer.\n')
    writeFileSync(join(src, 'consumer/index.ts'), `import { imported } from '${'@/importer'}'\nexport const x = imported\n`)
  })

  afterAll(() => {
    if (existsSync(fixtureRoot)) rmSync(fixtureRoot, { recursive: true, force: true })
  })

  it('isOrphanReexportOnly detects re-export barrels', () => {
    const orphanLine = `export { a } from '${'@/foo'}'\n`
    expect(isOrphanReexportOnly(orphanLine)).toBe(true)
    expect(isOrphanReexportOnly('export function x() {}\n')).toBe(false)
  })

  it('importTargetToAtomPath resolves nested imports', () => {
    const atoms = new Set(['importer', 'consumer', 'with-logic'])
    expect(importTargetToAtomPath('importer', atoms)).toBe('importer')
    expect(importTargetToAtomPath('importer/extra', atoms)).toBe('importer')
  })

  it('caseOf classifies fixture atoms', () => {
    const index = buildImportIndex(fixtureRoot)
    expect(caseOf('prose-heavy', fixtureRoot, index).isLiterary).toBe(true)
    expect(caseOf('orphan-export', fixtureRoot, index).isLiterary).toBe(true)
    expect(caseOf('with-logic', fixtureRoot, index).isLiterary).toBe(false)
    expect(caseOf('vocab-exception', fixtureRoot, index).isLiterary).toBe(false)
    expect(caseOf('importer', fixtureRoot, index).importerCount).toBeGreaterThan(0)
  })

  // Derived faces are gitignored: a working tree carries ~3,500 of them and a CI checkout none.
  // Read as evidence, they made this axis count 440 locally and 27 in CI — a verdict that depends
  // on which machine asks. Planting both faces must not move a single verdict.
  it('a derived README.md or diamond.json does not change any verdict', () => {
    const before = buildImportIndex(fixtureRoot)
    const atoms = ['prose-heavy', 'orphan-export', 'with-logic', 'importer', 'consumer'] as const
    const verdicts = atoms.map((a) => caseOf(a, fixtureRoot, before))
    for (const a of atoms) {
      writeFileSync(join(src, a, 'README.md'), Array.from({ length: 900 }, (_, i) => `face${i}`).join(' '))
      writeFileSync(join(src, a, 'diamond.json'), '{}')
    }
    try {
      const after = buildImportIndex(fixtureRoot)
      expect(atoms.map((a) => caseOf(a, fixtureRoot, after))).toEqual(verdicts)
    } finally {
      for (const a of atoms) {
        rmSync(join(src, a, 'README.md'), { force: true })
        rmSync(join(src, a, 'diamond.json'), { force: true })
      }
    }
  })

  it('wordWithoutLogicViolations ranks literary fixtures', () => {
    const audit = wordWithoutLogicViolations(fixtureRoot)
    expect(audit.literaryCount).toBeGreaterThan(0)
    expect(audit.violations.some((v) => v.atomPath === 'prose-heavy')).toBe(true)
    expect(audit.violations.some((v) => v.atomPath === 'vocab-exception')).toBe(false)
    expect(audit.violations.some((v) => v.atomPath === 'with-logic')).toBe(false)
  })
})

describe('rules/word-without-logic — live corpus', () => {
  it('wordWithoutLogicViolations returns ranked violations within ratchet', () => {
    clearRatchetCache()
    const audit = wordWithoutLogicViolations()
    expect(audit.totalAtoms).toBeGreaterThan(1000)
    expect(audit.literaryCount).toBeGreaterThan(0)
    expect(audit.literaryCount).toBeLessThanOrEqual(computedBaseline('word-without-logic'))
    expect(audit.withUseCasePct).toBeGreaterThan(0)
    for (const row of audit.top50.slice(0, 5)) {
      expect(row.law).toBe('word-without-logic')
      expect(row.kind).toBeTruthy()
    }
    console.log(
      `literary: ${audit.literaryCount}/${audit.totalAtoms} (${audit.withUseCasePct}% with use case) · top: ${audit.top50
        .slice(0, 5)
        .map((v) => `${v.atomPath}(${v.kind})`)
        .join(', ')}`,
    )
  })
})
