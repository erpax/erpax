import { contractOffline, type ContractCheck } from '../eu/contract'
import { bgContractOffline } from '../bg'
import { worldContractOffline } from '../world'
import { assertCoverageRatchet, assertContractedRailsResolve, coverageReport, type CoverageReport } from '../coverage'
/**
 * outward/gate — every OFFLINE contract, in one fail-closed call.
 *
 * This is the release-gate half of the split ([[outward]]/eu/contract):
 *
 *   1. Does OUR CODE handle each API's shape?  → deterministic. THIS. Belongs in the gate.
 *   2. Is the OUTSIDE still that shape?        → someone else's uptime. A lane, never a gate.
 *
 * **It cannot reach the network, structurally** — it imports only the `*Offline`
 * functions, which read frozen captures from disk. That is the whole point: a correct
 * erpax must never fail its own release because an authority is rebooting. The live
 * halves stay behind `--online`, run deliberately by a human.
 *
 * Three things fail the release here, and each was a REAL defect this session:
 *
 *   · a parser disagreeing with its own capture — the shape erpax reads moved
 *   · a contracted endpoint matching NO catalogued rail — the ledger under-reporting
 *     itself, which is how a working ECB contract marked nothing covered
 *   · unproven claims growing — a new rail claiming a client with no contract
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: the contract IS the evidence
 * @see ../eu/contract.ts · ../bg · ../world · ../coverage · ./test.ts
 */

/**
 * The unproven-claim ceiling, DERIVED — never a typed number.
 *
 * It was `= 20`, which is the corpus's own forbidden shape: a ceiling written by
 * hand instead of computed ([[rules]] — ceilings live in the ratchet, read, never
 * ALCAPS). And 20 was not even the law; it was a snapshot of how many credentialed
 * rails happened to exist that afternoon.
 *
 * The actual law is sharper: a PUBLIC rail can always be captured, so an unproven
 * one is undone work — while a CREDENTIALED one cannot be proven without
 * credentials nobody has committed. So the ceiling IS the count of credentialed
 * unproven rails. Add a public rail with no contract and this gate reddens
 * immediately; add a credentialed one and it does not, because no amount of effort
 * would close it.
 */
export function uncoveredCeiling(report: CoverageReport = coverageReport()): number {
  return report.uncovered.filter((r) => r.auth !== 'none').length
}

export interface ContractGateReport {
  readonly checks: readonly ContractCheck[]
  readonly broken: readonly ContractCheck[]
  readonly holds: boolean
  readonly summary: string
}

/** Every offline contract across the EU, BG and world lanes. Pure — disk only. */
export function contractGate(): ContractGateReport {
  const checks = [...contractOffline(), ...bgContractOffline(), ...worldContractOffline()]
  const broken = checks.filter((c) => !c.holds)
  return {
    checks,
    broken,
    holds: broken.length === 0,
    summary: broken.length
      ? `✗ ${broken.length}/${checks.length} contract(s) broken: ${broken.map((c) => c.rail).join(', ')}`
      : `✓ ${checks.length} offline contracts hold`,
  }
}

/**
 * Fail the release when a contract breaks, when the ledger cannot resolve its own
 * keys, or when unproven claims grow.
 *
 * @invariant every offline contract holds ∧ every contracted endpoint resolves ∧ uncovered ≤ ceiling
 */
export function assertContractsHold(ceiling: number = uncoveredCeiling()): void {
  const report = contractGate()
  if (!report.holds) {
    throw new Error(
      `${report.summary}\n` +
        report.broken.map((c) => `    ✗ ${c.rail}: ${c.detail}`).join('\n') +
        `\n  The parser disagrees with its OWN capture — this is erpax's break, not the world's.`,
    )
  }
  // A contract naming a rail that does not exist marks nothing covered and says so to
  // no one; it must fail closed, never quietly under-report.
  assertContractedRailsResolve()
  assertCoverageRatchet(ceiling)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const report = contractGate()
  for (const c of report.checks) console.log(`  ${c.holds ? '✓' : '✗'} ${c.rail.padEnd(12)} ${c.detail}`)
  try {
    assertContractsHold()
    console.log(`\n${report.summary}\n  ${coverageReport().summary} (ceiling ${uncoveredCeiling()})`)
  } catch (e) {
    console.error(`\n${String((e as Error).message)}`)
    process.exit(1)
  }
}
