import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { splitQueue } from '@/proof/replaceable'
import { RATCHET_GENERATED } from '@/law/folder/ratchet.generated'
import { MANIFEST_PATH, census, description, drift, manifest, render, type Census, type Declared } from '@/publish/zenodo'

const D: Declared = {
  version: '1.0.6',
  creatorName: 'Rouschev, Tsvetan',
  orcid: '0009-0000-7312-9778',
  repo: 'https://github.com/erpax/erpax',
  atoms: 3599,
  references: ['Grassé, stigmergy', 'Kolmogorov complexity'],
}

/** The enforcement fields every fixture shares — the deposit counts gates as well as theorems. */
const GATES = {
  guardians: 21,
  theoremCeilings: 5,
  ratchetUuid: 'ratchet-uuid',
  ratchetSealed: '2026-09-21',
  theoremAxes: ['folder-name'],
} as const

describe('publish/zenodo — every quantity comes from the record, never from prose', () => {
  it('states the kernel census the inventory reports', () => {
    const c = census()
    const text = description(c, D)
    expect(text).toContain(`${c.theorems} theorems across ${c.files} files`)
    expect(text).toContain(`${c.axiomFree} depend on no axioms`)
    expect(text).toContain(c.sourcesHash)
  })

  it('moves with the record — a different census renders different prose', () => {
    const a: Census = { theorems: 10, axiomFree: 4, stubbed: 0, files: 2, sourcesHash: 'aaa', lean: '4.33.1', ...GATES }
    const b: Census = { theorems: 20, axiomFree: 9, stubbed: 0, files: 3, sourcesHash: 'bbb', lean: '4.33.1', ...GATES }
    expect(description(a, D)).not.toBe(description(b, D))
    expect(description(a, D)).toContain('10 theorems across 2 files')
    expect(description(b, D)).toContain('20 theorems across 3 files')
  })

  it('derives the axiom-carrying count rather than stating it twice', () => {
    const c: Census = { theorems: 177, axiomFree: 111, stubbed: 0, files: 19, sourcesHash: 'x', lean: '4.33.1', ...GATES }
    expect(description(c, D)).toContain('66 rest on')
  })

  it('SAYS SO when something is stubbed, instead of the clean sentence', () => {
    const clean: Census = { theorems: 5, axiomFree: 5, stubbed: 0, files: 1, sourcesHash: 'x', lean: '4', ...GATES }
    const dirty: Census = { theorems: 5, axiomFree: 4, stubbed: 1, files: 1, sourcesHash: 'x', lean: '4', ...GATES }
    expect(description(clean, D)).toContain('none resting on')
    expect(description(dirty, D)).toContain('1 still resting on')
    expect(description(dirty, D)).not.toContain('none resting on')
  })

  it('always carries the boundary — a deposit is permanent, so an over-claim in it is too', () => {
    const text = description(census(), D)
    expect(text).toContain('proves its DECISION, never the facts it is fed')
    expect(text).toContain('none of it claims a Millennium problem is solved')
  })
})

describe('publish/zenodo — the manifest shape Zenodo reads', () => {
  it('carries the fields a deposit needs', () => {
    const m = manifest(census(), D)
    expect(m.upload_type).toBe('software')
    expect(m.license).toBe('cc-by-nc-nd-4.0')
    expect(m.access_right).toBe('open')
    expect(m.version).toBe('1.0.6')
    expect((m.creators as { orcid: string }[])[0]!.orcid).toBe(D.orcid)
  })

  it('does NOT mint a DOI — an identifier a registry assigns is received or refused', () => {
    const json = render(census(), D)
    expect(json).not.toMatch(/"doi"/)
    expect(json).not.toMatch(/10\.5281\/zenodo\.\d+/)
  })

  it('renders stable bytes — the same input twice is the same file', () => {
    expect(render(census(), D)).toBe(render(census(), D))
  })
})

describe('publish/zenodo — drift, measured against the committed manifest', () => {
  it('reports the LIVE .zenodo.json as fresh once regenerated', () => {
    const committed = readFileSync(MANIFEST_PATH, 'utf8')
    const d = drift(committed)
    expect(d.stale).toEqual([])
    expect(d.fresh).toBe(true)
  })

  it('catches a manifest whose numbers the record contradicts', () => {
    // The real drift this atom was built from: 105 theorems claimed, 177 reported.
    const stale = render({ theorems: 105, axiomFree: 65, stubbed: 4, files: 12, sourcesHash: 'old', lean: '4.33.1', ...GATES }, D)
    const d = drift(stale, census())
    expect(d.fresh).toBe(false)
    expect(d.stale.length).toBeGreaterThan(0)
  })

  it('tolerates improved PROSE but never a changed NUMBER', () => {
    const fresh = readFileSync(MANIFEST_PATH, 'utf8')
    const reworded = fresh.replace('erpax is an ERP corpus', 'erpax is a content-addressed ERP corpus')
    expect(drift(reworded).fresh).toBe(true)
    const renumbered = fresh.replace(String(census().theorems), '999')
    expect(drift(renumbered).fresh).toBe(false)
  })
})

describe('publish/zenodo — the deposit claims the ENFORCEMENT surface, not only the theorems', () => {
  it('counts guardians from the sealed ratchet, never from a number typed here', () => {
    const c = census()
    const axes = Object.values(RATCHET_GENERATED.axes) as number[]
    expect(c.guardians).toBe(axes.length)
    expect(c.theoremCeilings).toBe(axes.filter((n) => n === 0).length)
    expect(c.ratchetUuid).toBe(RATCHET_GENERATED.contentUuid)
  })

  it('names the ACTUAL zero-ceiling axes — a deposit is permanent, so an example in it must be real', () => {
    // The first draft of this paragraph illustrated the zero ceilings with rules/citation,
    // rules/command and rules/inject. All three are real theorem-zero laws and NONE is one of the
    // ratchet axes it was counting — an over-claim that would have been permanent.
    const c = census()
    const zero = Object.entries(RATCHET_GENERATED.axes)
      .filter(([, v]) => v === 0)
      .map(([k]) => k)
    expect([...c.theoremAxes]).toEqual(zero)
    const html = description(c, D)
    for (const axis of zero) expect(html).toContain(axis)
  })

  it('keeps the boundary: a guardian proves its axis, never that the corpus is correct', () => {
    expect(description(census(), D)).toMatch(/never that the corpus is correct/)
  })
})

describe('publish/zenodo — a citation is RECEIVED, and a reference is DECLARED', () => {
  it('carries the references verbatim — Zenodo\u2019s field is free text by design', () => {
    const m = manifest(census(), D) as { references?: readonly string[] }
    expect(m.references).toEqual(['Grassé, stigmergy', 'Kolmogorov complexity'])
  })

  it('declares no citation COUNT — Asclepias computes those and a depositor may not add them', () => {
    // support.zenodo.org/help/en-gb/25-citations: "this is unfortunately not possible". A citation
    // count minted here would be rules/forge with a different noun.
    const json = JSON.stringify(manifest(census(), D))
    expect(json).not.toMatch(/"citation_count"|"citations"|"citedBy"/)
  })

  it('the live deposit declares the corpus\u2019s own reference bucket, and nothing it can gate', () => {
    const refs = splitQueue(process.cwd()).references.map((r) => r.standard)
    const obligations = splitQueue(process.cwd()).obligations.map((r) => r.standard)
    expect(refs.length).toBeGreaterThan(0)
    for (const o of obligations.slice(0, 20)) expect(refs).not.toContain(o)
  })
})
