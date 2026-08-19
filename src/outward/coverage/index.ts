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

/**
 * The rails that have an offline contract check today, keyed by **endpoint**.
 *
 * This set used to be keyed by DISPLAY NAME, and it silently mismatched: it held
 * `'ECB Euro Reference Rates'`, a name that appears on **zero** rails — the registry
 * calls it `'ECB Reference Exchange Rates'`. So a contract that had existed all along
 * marked nothing as covered, and 9 rows read as unproven debt. That is this corpus's
 * own defect ([[rules]]/unraised): a membership test against a key nobody has fails
 * OPEN and reports the wrong number forever, because nothing contradicts it.
 *
 * An endpoint is the rail's actual address, so it cannot drift from a label — and
 * `assertContractedRailsResolve` now fails closed if any key here matches no rail.
 *
 * @see ../eu/contract.ts · ../bg · ../world
 */
export const CONTRACTED_ENDPOINTS: ReadonlySet<string> = new Set([
  // ../eu — the four pan-EU authorities.
  'https://ec.europa.eu/taxation_customs/vies/services/checkVatService',
  'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
  'https://directory.peppol.eu/search/1.0/json',
  'https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content',
  // ../bg — both addresses were dead and are now fixed, captured and live-verified.
  'https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/index.htm',
  'https://portal.registryagency.bg/api/public',
  // ../world — public, parser-backed rails, each contracted against a real capture.
  'https://data.brreg.no/enhetsregisteret/api',
  'https://www.treasury.gov/ofac/downloads/sdn.xml',
  'https://data.sec.gov',
  'https://api.frankfurter.dev/v1',
  'https://open.er-api.com/v6/latest',
  'https://world.openfoodfacts.org/api/v2',
])

export interface RailCoverage {
  readonly name: string
  /** The rail's ADDRESS — what coverage is keyed on, because a label drifts. */
  readonly endpoint: string
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
  const endpoint = (a as { endpoint?: string }).endpoint ?? ''
  return {
    name,
    endpoint,
    kind,
    auth,
    registry,
    claimed: a.clientImplemented === true,
    covered: CONTRACTED_ENDPOINTS.has(endpoint),
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


/**
 * Every contracted endpoint must match at least one catalogued rail.
 *
 * Without this, the set fails OPEN: a key nobody has marks nothing as covered and
 * the ledger under-reports coverage forever with nothing to contradict it — which
 * is exactly what `'ECB Euro Reference Rates'` did. A contract naming a rail that
 * does not exist is a claim nothing can refute ([[rules]]/unraised).
 *
 * @invariant every CONTRACTED_ENDPOINTS entry resolves to ≥1 rail
 */
export function unresolvedContractedEndpoints(
  rails: readonly RailCoverage[] = railCoverage(),
): readonly string[] {
  const known = new Set(rails.map((r) => r.endpoint))
  return [...CONTRACTED_ENDPOINTS].filter((e) => !known.has(e)).sort()
}

export function assertContractedRailsResolve(rails: readonly RailCoverage[] = railCoverage()): void {
  const dead = unresolvedContractedEndpoints(rails)
  if (dead.length) {
    throw new Error(
      `✗ ${dead.length} contracted endpoint(s) match no catalogued rail — the coverage ledger is ` +
        `under-reporting and nothing else will say so: ${dead.join(', ')}`,
    )
  }
}
