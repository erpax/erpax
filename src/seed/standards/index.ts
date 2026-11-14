/**
 * seed/standards — the editions of the standards erpax cites, as data.
 *
 * `src/seed/content/fixtures/standards.json` is written by `scripts/standards-refresh.mjs` from ISO's
 * own dataset (ISO Open Data, ODC-By), and `--check` of that script fails when it goes stale. This
 * module reads it: which editions are superseded (what a banner must not cite), which are current,
 * and the rows `compliance-frameworks` is loaded with. No edition is typed into code.
 *
 * Run: pnpm seed --url <origin> --standards   (creates the missing frameworks, updates what differs)
 *
 * @standard ISO-27001 §7.5 documented-information (the version of a cited standard is controlled)
 * @see scripts/standards-refresh.mjs · src/collections/compliance-frameworks
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface StandardEdition {
  readonly reference: string
  readonly title: string
  readonly category: string
  readonly edition: number | null
  readonly publicationDate: string | null
  readonly status: 'current' | 'superseded' | 'unverified'
  /** Manual rows only: the day someone last confirmed the status by hand, and from what. */
  readonly reviewedOn?: string
  readonly source?: string
  readonly note?: string
}

export interface TenantRest {
  find(args: Record<string, unknown>): Promise<unknown>
  create(args: Record<string, unknown>): Promise<unknown>
  update(args: Record<string, unknown>): Promise<unknown>
}

/** Every edition in the fixture. */
export const standardEditions = (): StandardEdition[] =>
  JSON.parse(readFileSync(join(import.meta.dirname, '..', 'content', 'fixtures', 'standards.json'), 'utf8')) as StandardEdition[]

/** The standards no open feed covers (ANSI/INCITS), kept by hand with the day each was last reviewed. */
export const manualStandards = (): StandardEdition[] =>
  JSON.parse(readFileSync(join(import.meta.dirname, '..', 'content', 'fixtures', 'standards.manual.json'), 'utf8')) as StandardEdition[]

/** Every standard erpax cites: the editions ISO publishes, then the ones reviewed by hand. */
export const allStandards = (): StandardEdition[] => [...standardEditions(), ...manualStandards()]

/** The standard without its edition: `ISO/IEC 27002:2022` → `ISO/IEC 27002`. */
export const baseOf = (reference: string): string => reference.replace(/:\d{4}$/, '')

/** The editions ISO has withdrawn. */
export const supersededEditions = (): StandardEdition[] => standardEditions().filter((row) => row.status === 'superseded')

/** The edition of a standard that is in force, when the fixture has one. */
export const currentEdition = (base: string): StandardEdition | undefined => standardEditions().find((row) => baseOf(row.reference) === base && row.status === 'current')

/** How a banner cites an edition: `ISO-27017:2015`, `ISO 27017:2015`, `ISO/IEC 27017-2015` all match. */
export const bannerPattern = (reference: string): RegExp => {
  const [number, year] = reference.replace(/^ISO(\/IEC)? /, '').split(':')
  return new RegExp(`ISO[-/ ](?:IEC[-/ ])?${number}[:-]${year}(?!\\d)`)
}

/** The `compliance-frameworks` document for an edition. */
export const frameworkRow = (edition: StandardEdition): Record<string, unknown> => ({
  code: edition.reference,
  name: edition.title,
  category: edition.category,
  issuingBody: edition.reference.startsWith('ISO/IEC') ? 'ISO/IEC' : 'ISO',
  ...(edition.publicationDate ? { effectiveDate: edition.publicationDate } : {}),
  isActive: edition.status !== 'superseded',
  ...(edition.status === 'unverified' ? { description: `Status unverified — last reviewed ${edition.reviewedOn ?? 'never'}. ${edition.note ?? ''}`.trim() } : {}),
})

/** Create the missing frameworks and update the ones that differ; a framework is found by its code. */
export const loadStandards = async (
  rest: TenantRest,
  rows: readonly StandardEdition[] = allStandards(),
  options: { tenant?: string | number } = {},
): Promise<{ created: number; updated: number; unchanged: number }> => {
  const result = { created: 0, updated: 0, unchanged: 0 }
  for (const edition of rows) {
    const row = frameworkRow(edition)
    const found = (await rest.find({ collection: 'compliance-frameworks', where: { code: { equals: edition.reference } }, limit: 1, depth: 0 })) as {
      docs?: Array<{ id: string | number; name?: string; isActive?: boolean; category?: string }>
    }
    const stored = found.docs?.[0]
    if (!stored) {
      await rest.create({ collection: 'compliance-frameworks', data: { ...row, ...(options.tenant !== undefined ? { tenant: options.tenant } : {}) } })
      result.created++
    } else if (stored.name === row.name && stored.isActive === row.isActive && stored.category === row.category) result.unchanged++
    else {
      await rest.update({ collection: 'compliance-frameworks', id: stored.id, data: { name: row.name, category: row.category, isActive: row.isActive } })
      result.updated++
    }
  }
  return result
}
