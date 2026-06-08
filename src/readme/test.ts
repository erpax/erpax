/**
 * readme — the proof that the README is a diamond.
 *
 * Two properties carry the law:
 *   1. ZERO ENTROPY (stability) — the generator is deterministic: same tree ⇒
 *      identical bytes (run twice, byte-for-byte equal; render twice, equal).
 *   2. CONTENT-ADDRESSED — the README's uuid is a v8 content-uuid of its model;
 *      it is stable under regeneration and changes when the model changes (drift
 *      is detectable, the gate can fail closed).
 *   3. TYPOGRAPHY = THE DIAMOND — the rendered facets ARE the closed horo ring
 *      in measure-walk order (reading the README is reading the crystal).
 *
 * Pure unit test — no Payload, no network. It touches the generator's pure
 * surface (`renderReadme`, `readmeUuid`) on a fixed model AND the live pipeline
 * (`deriveModel`/`generateReadme`) which reads the static matrix + a fs walk.
 */
import { describe, it, expect } from 'vitest'
import {
  deriveModel,
  renderReadme,
  generateReadme,
  readmeUuid,
  deriveFolderModel,
  renderFolderReadme,
  folderReadmeUuid,
  listAtomPaths,
  type ReadmeModel,
} from '@/readme'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'

const FIXED: ReadmeModel = {
  name: 'erpax',
  description: 'a fixed model for the pure render test',
  version: '1.0.0',
  license: 'MIT',
  corpusRoot: 'ede33b50-988c-8e53-a3fe-04b9aa48796f',
  atoms: 3,
  bonds: 2,
  skills: 3,
  index: 1,
  tests: 1,
  ring: HORO_DIGITS.map((digit, i) => ({
    digit,
    measure: HORO_MEASURE[i]!,
    atoms: i,
    facets: ['alpha', 'beta'],
  })),
  axis: [
    { digit: 3, atoms: 5 },
    { digit: 6, atoms: 7 },
  ],
  scripts: [['readme', 'tsx src/readme/index.ts']],
  payload: ['payload 4.0.0'],
  stack: ['zod 3.25.76'],
  node: 'node >=20',
}

describe('readme — the README is a diamond', () => {
  it('renderReadme is PURE and STABLE: same model ⇒ byte-identical markdown', () => {
    expect(renderReadme(FIXED)).toBe(renderReadme(FIXED))
  })

  it('readmeUuid is a conformant v8 content-uuid, stable under recomputation', () => {
    const u = readmeUuid(FIXED)
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(readmeUuid(FIXED)).toBe(u)
  })

  it('the uuid is content-addressed: a model change yields a different uuid (drift detectable)', () => {
    const drifted: ReadmeModel = { ...FIXED, atoms: FIXED.atoms + 1 }
    expect(readmeUuid(drifted)).not.toBe(readmeUuid(FIXED))
  })

  it('embeds its own content-uuid in the rendered diamond (the seal)', () => {
    const md = renderReadme(FIXED)
    expect(md).toContain(readmeUuid(FIXED))
    expect(md).toContain('ede33b50-988c-8e53-a3fe-04b9aa48796f') // the corpus root seal
  })

  it('TYPOGRAPHY = the diamond: facets are the closed horo ring in measure-walk order', () => {
    const md = renderReadme(FIXED)
    // Every measure name appears as a facet row, in order, after the ring header.
    const ringHeader = md.indexOf('| digit | measure | atoms | principal facets |')
    expect(ringHeader).toBeGreaterThan(-1)
    let cursor = ringHeader
    for (let i = 0; i < HORO_MEASURE.length; i++) {
      const row = md.indexOf(`| ${HORO_DIGITS[i]} | ${HORO_MEASURE[i]} |`, cursor)
      expect(row).toBeGreaterThan(cursor)
      cursor = row
    }
  })

  it('deriveModel reads the LIVE tree: a complete, sane projection', () => {
    const m = deriveModel()
    expect(m.atoms).toBeGreaterThan(0)
    expect(m.bonds).toBeGreaterThan(0)
    expect(m.skills).toBeGreaterThan(0)
    expect(m.index).toBeGreaterThan(0)
    expect(m.tests).toBeGreaterThan(0)
    expect(m.ring).toHaveLength(HORO_DIGITS.length)
    expect(m.ring.map((r) => r.digit)).toEqual([...HORO_DIGITS])
    expect(m.corpusRoot).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('ZERO ENTROPY: generateReadme on the live tree is deterministic (run twice ⇒ identical)', () => {
    expect(generateReadme()).toBe(generateReadme())
  })
})

describe('readme — per-folder quantum accounting', () => {
  it('deriveFolderModel is computed from the live tree', () => {
    const m = deriveFolderModel('readme')
    expect(m.atomPath).toBe('readme')
    expect(m.form).toBe(1)
    expect(m.code).toBe(1)
    expect(m.accounting.length).toBeGreaterThan(0)
  })

  it('renderFolderReadme is stable and contains accounting lines', () => {
    const m = deriveFolderModel('readme')
    const md = renderFolderReadme(m)
    expect(renderFolderReadme(m)).toBe(md)
    expect(md).toContain('## quantum accounting')
    expect(md).toContain('| trinity.form |')
    expect(md).toContain(folderReadmeUuid(m))
  })

  it('lists atom paths from SKILL.md walk', () => {
    expect(listAtomPaths().length).toBeGreaterThan(100)
    expect(listAtomPaths()).toContain('readme')
  })
})
