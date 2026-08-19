import { COUNTRY_APIS, BANK_APIS, type CountryApi } from '@/country/api'
import { TRADING_APIS, type TradingApi } from '@/trading/api'
/**
 * outward/coverage — which external rails erpax CLAIMS to speak, and which it can PROVE.
 *
 * erpax catalogues 178 external rails (97 country/bank authorities + 81 trading
 * providers). Extending the contract pattern across all of them by hand would mean
 * 178 fixtures — and most would be fiction: only 5 of the 81 trading entries declare
 * `clientImplemented`, so for the other 76 there is NO parser, hence NO contract to
 * test. A fixture there would assert that a body we never read has a shape we never
 * parse: coverage theatre.
 *
 * What IS measurable, and what actually bites, is the GAP: a rail that declares
 * `clientImplemented: true` is a promise that erpax parses its answers, and a promise
 * with no contract check is exactly the corpus's own defect — a claim nothing can
 * contradict ([[rules]]/refutable · [[rules]]/unraised).
 *
 *   claimed    the rail says erpax has a client
 *   covered    a contract check exists for it (offline fixture, in the gate)
 *   uncovered  CLAIMED BUT UNPROVEN — the debt this ledger exists to name
 *   catalogue  no client claimed — honestly out of scope, never counted as covered
 *
 * The ratchet is on `uncovered`: it may not grow. Every new rail that claims a client
 * must arrive with a contract, and every contract written lowers the ceiling.
 *
 * @see ../eu/contract.ts (the three sealed contracts) · ./test.ts · ../SKILL.md
 */

/** Rail ids that have an offline contract check today (see ../eu/contract.ts). */
export const CONTRACTED_RAILS: ReadonlySet<string> = new Set([
  'VIES VAT Number Validation',
  'ECB Euro Reference Rates',
  'Peppol Directory',
  // ../bg — contracts pin what the CLIENT parses. Both live endpoints have MOVED
  // (БНБ serves HTML, TR 404s), so `covered` here means the parser has a refutable
  // specification, NOT that the integration currently works. The online lane says that.
  'БНБ — Daily Exchange Rates',
  'Търговски Регистър (TR)',
])

export interface RailCoverage {
  readonly name: string
  readonly kind: string
  readonly auth: string
  readonly registry: 'country' | 'bank' | 'trading'
  readonly claimed: boolean
  readonly covered: boolean
  /** probe-able without credentials — an authenticated rail cannot be checked here. */
  readonly public: boolean
}

const rowOf = (
  a: (CountryApi | TradingApi) & { clientImplemented?: boolean },
  registry: RailCoverage['registry'],
): RailCoverage => {
  const name = (a as { name?: string }).name ?? ''
  const kind = (a as { kind?: string }).kind ?? (a as { category?: string }).category ?? ''
  const auth = (a as { auth?: string }).auth ?? 'unknown'
  return {
    name,
    kind,
    auth,
    registry,
    claimed: a.clientImplemented === true,
    covered: CONTRACTED_RAILS.has(name),
    public: auth === 'none',
  }
}

/** Every catalogued rail, with its coverage state. Pure — derived from the registries. */
export function railCoverage(): readonly RailCoverage[] {
  return [
    ...Object.values(COUNTRY_APIS).flat().map((a) => rowOf(a as never, 'country')),
    ...Object.values(BANK_APIS).flat().map((a) => rowOf(a as never, 'bank')),
    ...TRADING_APIS.map((a) => rowOf(a as never, 'trading')),
  ]
}

export interface CoverageReport {
  readonly total: number
  readonly claimed: number
  readonly covered: number
  /** claimed a client but has no contract — the debt. */
  readonly uncovered: readonly RailCoverage[]
  /** no client claimed — out of scope, never counted as covered. */
  readonly catalogue: number
  readonly summary: string
}

export function coverageReport(rails: readonly RailCoverage[] = railCoverage()): CoverageReport {
  const claimed = rails.filter((r) => r.claimed)
  const covered = claimed.filter((r) => r.covered)
  const uncovered = claimed.filter((r) => !r.covered)
  return {
    total: rails.length,
    claimed: claimed.length,
    covered: covered.length,
    uncovered,
    catalogue: rails.length - claimed.length,
    summary:
      `rails ${rails.length}: ${claimed.length} claim a client · ${covered.length} contract-covered · ` +
      `${uncovered.length} CLAIMED BUT UNPROVEN · ${rails.length - claimed.length} catalogue-only`,
  }
}

/**
 * The ratchet: unproven claims may not grow. Zero is the horizon — every rail saying
 * `clientImplemented: true` should carry a contract the gate can run offline.
 *
 * @invariant fails when uncovered EXCEEDS the ceiling; never on catalogue entries
 */
export function assertCoverageRatchet(ceiling: number, report: CoverageReport = coverageReport()): void {
  if (report.uncovered.length > ceiling) {
    throw new Error(
      `✗ outward coverage regressed: ${report.uncovered.length} rail(s) claim a client with no contract (ceiling ${ceiling}). ` +
        `New: ${report.uncovered.slice(0, 5).map((r) => r.name).join(', ')}…`,
    )
  }
}
