import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  assertStandardsGated,
  assumedStandards,
  citingAtoms,
  replaceableStandards,
  namesAnObligation,
  splitQueue,
  standardKey,
} from '@/proof/replaceable'

const tree = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-repl-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, 'src', rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

const skill = (stds: string[]): string => `# a\n\ntext\n\n## Standards\n\n${stds.map((s) => `- **${s}** — gloss.`).join('\n')}\n`

describe('proof/replaceable — a cited standard is an axiom until a gate discharges it', () => {
  it('folds a separator difference: ISO-19011:2018 and ISO 19011:2018 are ONE standard', () => {
    // they were two keys splitting 44 citations, which understated the corpus's exposure
    expect(standardKey('ISO-19011:2018')).toBe(standardKey('ISO 19011:2018'))
    expect(standardKey('ISO/IEC 25010:2023 §5.5 — testability')).toBe('ISO 25010')
  })

  it('folds the EDITION and the PUBLISHER — one obligation, however it is spelled', () => {
    // `ISO 4217` and `ISO 4217:2015` were two undischarged axioms for one register, and
    // `ISO/IEC 27001 A.5.23` could not be discharged by a gate citing `ISO 27001 A.5.23`.
    expect(standardKey('ISO 4217:2015')).toBe(standardKey('ISO 4217'))
    expect(standardKey('ISO/IEC 27001 A.5.23')).toBe(standardKey('ISO 27001 A.5.23'))
  })

  it('does NOT fold the CLAUSE — an over-discharge is worse than an over-count', () => {
    // Folding A.5.23 away would let one cloud-isolation gate discharge the whole of ISO 27001.
    // A section of a standard is a separate obligation; a spelling of its publisher is not.
    expect(standardKey('ISO 27001 A.5.23')).not.toBe(standardKey('ISO 27001 A.8.28'))
  })

  it('an atom exporting a fail-closed assert DISCHARGES what it cites', () => {
    const root = tree({
      'a/SKILL.md': skill(['ISO/IEC 25010:2023 §5.5']),
      'a/index.ts': 'export function assertThing(): void {}\n',
    })
    expect(assumedStandards(root)).toEqual([])
  })

  it('an atom with no gate leaves what it cites ASSUMED', () => {
    const root = tree({ 'a/SKILL.md': skill(['WCAG 2.2 §1.1.1']), 'a/index.ts': 'export const x = 1\n' })
    const open = replaceableStandards(root)
    expect(open.map((s) => s.standard)).toEqual(['WCAG 2.2'])
    expect(open[0]!.cites).toBe(1)
    expect(() => assertStandardsGated(root, 0)).toThrow(/nothing discharges/)
  })

  it('an EMPIRICAL standard is not counted as a theorem waiting to be written', () => {
    // a DOI is assigned by a registration agency; no amount of reading src decides it
    const root = tree({ 'a/SKILL.md': skill(['ISO 26324 — DOI']), 'a/index.ts': 'export const x = 1\n' })
    expect(assumedStandards(root).map((s) => s.empirical)).toEqual([true])
    expect(replaceableStandards(root)).toEqual([])
    expect(() => assertStandardsGated(root, 0)).not.toThrow() // adding a statute is not a regression
  })

  it('reads the bold lead of each bullet, not the gloss after it', () => {
    const root = tree({ 'a/SKILL.md': skill(['RFC 9562 §5.8 — content-address, same content same address']) })
    expect(citingAtoms(root)).toEqual([{ atomPath: 'a', standards: ['RFC 9562 §5.8 — content-address, same content same address'] }])
    expect(standardKey(citingAtoms(root)[0]!.standards[0]!)).toBe('RFC 9562')
  })

  it('the live corpus is at or under its ceiling', () => {
    expect(replaceableStandards(process.cwd()).length).toBeLessThanOrEqual(242)
    expect(() => assertStandardsGated(process.cwd(), 242)).not.toThrow()
  })

  it('the queue is ORDERED by how much a discharge would buy — never by name', () => {
    // This asserted `WCAG 2.2` with 20+ cites, and the corpus then DISCHARGED it: WCAG 2.2 is gone
    // from the queue entirely and only WCAG 2.1 remains, once. A test that names the current answer
    // goes red when the tree gets BETTER, which is [[rules]]/drift's law — prose may not restate a
    // number the corpus computes; state the invariant, and date any record worth keeping.
    //
    // RECORD (2026-09-21): the queue leads with `BCP 47` and `ISO 4217`, 7 cites each.
    const open = replaceableStandards(process.cwd())
    expect(open.length).toBeGreaterThan(0)
    for (let i = 1; i < open.length; i++) {
      expect(open[i - 1]!.cites).toBeGreaterThanOrEqual(open[i]!.cites)
    }
    expect(open.every((s) => s.standard === standardKey(s.standard))).toBe(true)
  })
})

describe('proof/replaceable — the queue held two populations, and one is undischargeable', () => {
  it('a bold lead ending in ":" LABELS a value and never cites a standard', () => {
    const root = tree({ 'a/SKILL.md': skill(['Version:** 1.2 — the deposit version']) })
    expect(citingAtoms(root)).toEqual([])
  })

  it('a branch of mathematics is a REFERENCE — no gate will ever discharge it', () => {
    expect(namesAnObligation('Kolmogorov complexity')).toBe(false)
    expect(namesAnObligation('Grassé, stigmergy')).toBe(false)
    expect(namesAnObligation('EN 16931')).toBe(true)
    expect(namesAnObligation('ISO/IEC 27001 A.5.23')).toBe(true)
  })

  it('a standard whose citation carries NO number is declared, not guessed', () => {
    // The failure direction that matters is UNDERSTATING obligations: these are real standards and
    // they sat in the reference bucket until they were named.
    expect(namesAnObligation('ActivityPub')).toBe(true)
    expect(namesAnObligation('eIDAS')).toBe(true)
  })

  it('the split REPORTS and moves no ceiling — the two buckets are the whole queue', () => {
    const q = splitQueue(process.cwd())
    const open = replaceableStandards(process.cwd())
    expect(q.obligations.length + q.references.length).toBe(open.length)
    expect(q.references.length).toBeGreaterThan(0)
  })
})
