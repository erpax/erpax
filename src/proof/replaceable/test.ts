import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  assertStandardsGated,
  assumedStandards,
  citingAtoms,
  replaceableStandards,
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
    expect(standardKey('ISO/IEC 25010:2023 §5.5 — testability')).toBe('ISO/IEC 25010:2023')
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

  it('WCAG 2.2 is the largest single block of undischarged conformance', () => {
    const open = replaceableStandards(process.cwd())
    expect(open[0]!.standard).toBe('WCAG 2.2')
    expect(open[0]!.cites).toBeGreaterThanOrEqual(20)
  })
})
