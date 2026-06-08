/**
 * apply/report — lightweight session-law metrics (no readme import).
 */
import { assertPathCanonicallyRecorded } from '@/path/record'
import { ATOM_LEDGER_PATHS, ledgerForAtomPaths } from '@/path/hub'

export type SessionLawDomain =
  | 'core'
  | 'quantum'
  | 'medical'
  | 'computer'
  | 'body'
  | 'vocabulary'
  | 'collections'
  | 'agents'
  | 'other'

export interface DomainCoverage {
  readonly domain: SessionLawDomain
  readonly atoms: number
  readonly trinity: number
  readonly trinityPct: number
  readonly ledgerHooks: number
  readonly ledgerPct: number
  readonly crossed: number
  readonly crossedPct: number
  readonly folded: number
  readonly foldedPct: number
}

export interface SessionLawInventory {
  readonly totalAtoms: number
  readonly withIndex: number
  readonly withTest: number
  readonly trinity: number
  readonly trinityPct: number
  readonly formOnly: number
  readonly ledgerRegistry: number
  readonly ledgerNamedHooks: number
  readonly domains: readonly DomainCoverage[]
}

/** Prove hub registry covers sample paths with batch gate. */
export function proveLedgerHubCoverage(sampleSize = 12): {
  readonly registry: number
  readonly sampleComplete: boolean
  readonly incomplete: readonly string[]
} {
  const sample = ATOM_LEDGER_PATHS.slice(0, sampleSize)
  const touched = new Set(sample)
  const ledger = ledgerForAtomPaths(sample)
  const recordGate = assertPathCanonicallyRecorded(touched, ledger)
  return {
    registry: ATOM_LEDGER_PATHS.length,
    sampleComplete: recordGate.recorded,
    incomplete: recordGate.missing,
  }
}

export function renderDomainTable(inv: SessionLawInventory): string {
  const hdr = '| domain | atoms | trinity% | ledger% | crossed% | folded% |'
  const sep = '| --- | ---: | ---: | ---: | ---: | ---: |'
  const rows = inv.domains.map(
    (d) =>
      `| ${d.domain} | ${d.atoms} | ${d.trinityPct.toFixed(1)} | ${d.ledgerPct.toFixed(1)} | ${d.crossedPct.toFixed(1)} | ${d.foldedPct.toFixed(1)} |`,
  )
  return [hdr, sep, ...rows].join('\n')
}
