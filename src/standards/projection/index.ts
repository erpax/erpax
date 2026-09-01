/**
 * standards/projection — the catalogue, seen three ways: coverage, UI waves, lookup.
 * Each memoized on the catalogue's own content-address. @see ./SKILL.md
 */
import { STANDARDS_CATALOGUE as CATALOGUE } from '../catalogue'
import { merge, foldToRoot } from '@/merge'
import { standardsAddressIndex, standardById as standardByIdFtl } from '@/standards/improve'

/** Coverage of the standards catalogue by schemas — every standard is covered iff it names a schema (family). */
export interface SchemaCoverage {
  readonly total: number
  /** entries that name a schema (family). */
  readonly covered: number
  /** the distinct schemas (families) the standards fold into. */
  readonly schemas: readonly string[]
  /** ids of any standard with no covering schema — the gap the law forbids. */
  readonly uncovered: readonly string[]
  /** the law: every standard is covered by a schema. */
  readonly allCovered: boolean
  /** the quantum superposition — every (standard ⊕ its schema) folded to ONE content-address, all manifested at once. */
  readonly root: string
}

/** Catalogue root — same catalogue ⇒ same root ⇒ memo hit (architectural FTL: never re-fold). */
const catalogueRoot = (): string => foldToRoot(CATALOGUE.map((e) => merge(e.id, e.family || '')))

/** One UI improvement wave decoded from the standards — a schema's standards become one admin group to improve. */
export interface StandardsUiWave {
  /** the schema (family) this wave is themed on. */
  readonly schema: string
  readonly count: number
  /** the standard ids this wave surfaces in the UI. */
  readonly standards: readonly string[]
  /** the Payload admin group this wave improves (nav bucket for its compliance surface). */
  readonly adminGroup: string
  /** content-address of the wave (schema ⊕ its standards) — a wave that has not changed need not re-render. */
  readonly seal: string
}

let coverageMemo: { root: string; value: SchemaCoverage } | null = null
let wavesMemo: { root: string; value: readonly StandardsUiWave[] } | null = null
let addressIndexMemo: ReturnType<typeof standardsAddressIndex> | null = null

/** Shared O(1) address index — built once per process (reuse≠search). */
export function standardsIndex(): ReturnType<typeof standardsAddressIndex> {
  if (!addressIndexMemo) addressIndexMemo = standardsAddressIndex(CATALOGUE)
  return addressIndexMemo
}

/** O(1) standard lookup via content-address — standards/improve sealed (uses quantum/ftl). */
export const lookupStandard = (id: string) => standardByIdFtl(id, standardsIndex())

/** The law: every standard names a covering SCHEMA (its family). Memoized on the catalogue root. */
export function schemaCoverage(): SchemaCoverage {
  const root = catalogueRoot()
  if (coverageMemo && coverageMemo.root === root) return coverageMemo.value
  const uncovered = CATALOGUE.filter((e) => !e.family || e.family.trim() === '').map((e) => e.id)
  const schemas = [...new Set(CATALOGUE.map((e) => e.family).filter(Boolean))].sort()
  const value: SchemaCoverage = {
    total: CATALOGUE.length,
    covered: CATALOGUE.length - uncovered.length,
    schemas,
    uncovered,
    allCovered: uncovered.length === 0,
    root,
  }
  coverageMemo = { root, value }
  return value
}

/** Group covered standards by schema — one wave per admin surface, biggest impact first. */
export function standardsUiWaves(): readonly StandardsUiWave[] {
  const root = catalogueRoot()
  if (wavesMemo && wavesMemo.root === root) return wavesMemo.value
  const byFamily = new Map<string, string[]>()
  for (const e of CATALOGUE) {
    const arr = byFamily.get(e.family) ?? []
    arr.push(e.id)
    byFamily.set(e.family, arr)
  }
  const value = [...byFamily.entries()]
    .map(([schema, ids]) => {
      const standards = [...ids].sort()
      return {
        schema,
        count: standards.length,
        standards,
        adminGroup: `compliance/${schema}`,
        seal: foldToRoot([schema, ...standards].map((s) => merge('ui', s))),
      }
    })
    .sort((a, b) => b.count - a.count || a.schema.localeCompare(b.schema))
  wavesMemo = { root, value }
  return value
}
