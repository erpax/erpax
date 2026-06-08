/**
 * ISO 27002 coverage helpers — turn a list of canonical control ids
 * into a typed coverage matrix (id, title, theme) for SOC-2 / ISO 27001
 * evidence packs.
 *
 * Used by access predicate modules in `src/access/*` to expose a
 * `controlsApplied: Iso27002ControlId[]` typed export. The auditor's
 * coverage tool aggregates them and renders the cross-reference.
 *
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @audit ISO-19011:2018 audit-trail control-coverage-evidence
 * @compliance SOC-2 trust-services-criteria
 * @see ./types.ts ./README.md
 */

import type { Iso27002ControlId, Iso27002Theme } from './types'
import { iso27002Title, iso27002Theme } from './types'

/** A single coverage row — id + title + theme, ready for rendering. */
export interface ControlCoverageRow {
  id: Iso27002ControlId
  title: string
  theme: Iso27002Theme
}

/**
 * Resolve a list of canonical control ids into a typed coverage matrix.
 * Each row carries the id (for grep-traceability), the canonical title
 * (for the audit report), and the theme (for grouping).
 *
 * Deterministic order: input order is preserved.
 */
export const resolveCoverage = (
  ids: ReadonlyArray<Iso27002ControlId>,
): ReadonlyArray<ControlCoverageRow> =>
  ids.map((id) => ({
    id,
    title: iso27002Title(id),
    theme: iso27002Theme(id),
  }))

/**
 * Group a coverage matrix by theme (organizational / people / physical /
 * technological). Returns a map keyed by theme; each value is the list
 * of rows under that theme.
 */
export const coverageByTheme = (
  rows: ReadonlyArray<ControlCoverageRow>,
): Partial<Record<Iso27002Theme, ControlCoverageRow[]>> => {
  const out: Partial<Record<Iso27002Theme, ControlCoverageRow[]>> = {}
  for (const r of rows) {
    ;(out[r.theme] ??= []).push(r)
  }
  return out
}

/**
 * Aggregate multiple `controlsApplied` arrays from different modules
 * into a single deduplicated coverage matrix. Drives the master
 * SOC-2 / ISO 27001 evidence pack.
 *
 * @example
 *   import { controlsApplied as authChecks } from '@/authenticated'
 *   import { controlsApplied as adminChecks } from '@/is/super/admin'
 *   const all = aggregateCoverage([authChecks, adminChecks])
 */
export const aggregateCoverage = (
  inputs: ReadonlyArray<ReadonlyArray<Iso27002ControlId>>,
): ReadonlyArray<ControlCoverageRow> => {
  const seen = new Set<Iso27002ControlId>()
  const ids: Iso27002ControlId[] = []
  for (const list of inputs) {
    for (const id of list) {
      if (!seen.has(id)) {
        seen.add(id)
        ids.push(id)
      }
    }
  }
  return resolveCoverage(ids)
}
