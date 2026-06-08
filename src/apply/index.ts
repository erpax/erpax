/**
 * apply — session law batch applier across src/ (registry hub pattern).
 *
 *   pnpm session:apply -- --inventory
 *   pnpm session:apply -- --batch core,quantum,medical
 *   pnpm session:apply -- --report
 *
 * @see ./inventory — ./batch — ./report — ../path/hub
 */
import { applySessionLawBatch } from './batch'
import { inventorySessionLaws } from './inventory'
import { proveLedgerHubCoverage, renderDomainTable } from './report'

export type { SessionLawDomain, DomainCoverage, SessionLawInventory } from './report'
export { inventorySessionLaws } from './inventory'
export { applySessionLawBatch } from './batch'
export { proveLedgerHubCoverage, renderDomainTable } from './report'
export {
  efficiencySnapshot,
  efficiencyRatchet,
  recordEfficiencyPass,
  formatEfficiencySummary,
  renderEfficiencyDelta,
  loadEfficiencyStore,
  type EfficiencyPassId,
  type EfficiencyMetrics,
  type EfficiencySnapshot,
  type EfficiencyRatchetVerdict,
} from './efficiency'
export {
  dryCleanCycle,
  scanCleanAxes,
  classifyCleanFindings,
  applySafeCleanFixes,
  renderCleanReport,
  formatCleanSummary,
  loadCleanManifest,
  cleanDirectionPath,
  CLEAN_SCAN_AXES,
  CLEAN_MANIFEST_REL,
  type CleanTaxonomy,
  type CleanFinding,
  type DryCleanCycleResult,
} from './clean'
export {
  automateCycle,
  maxEfficiencyLoop,
  taskInventory,
  tamperCostOf,
  tamperCostReport,
  rulesLightScan,
  formatAutomateSummary,
  renderAutomateReport,
  automateWatchIntervalMs,
  AUTOMATE_MANIFEST_REL,
  type AutomateCycleResult,
  type TaskInventory,
  type TamperCostReport,
} from './automate'

if (import.meta.url === `file://${process.argv[1]}`) {
  const main = async () => {
  const cwd = process.cwd()
  const inventory = process.argv.includes('--inventory')
  const report = process.argv.includes('--report')
  const batchIdx = process.argv.indexOf('--batch')
  const batches =
    batchIdx >= 0 && process.argv[batchIdx + 1]
      ? process.argv[batchIdx + 1]!.split(',').map((s) => s.trim()).filter(Boolean)
      : []

  if (inventory || report) {
    const inv = inventorySessionLaws(cwd)
    console.log('session-law inventory')
    console.log(`  atoms: ${inv.totalAtoms}`)
    console.log(`  index.ts barrels: ${inv.ledgerRegistry} (100% via path/hub registry)`)
    console.log(
      `  trinity: ${inv.trinity}/${inv.totalAtoms} (${inv.trinityPct.toFixed(1)}%) · SKILL+index: ${inv.withIndex}`,
    )
    console.log(`  named ledger hooks: ${inv.ledgerNamedHooks} · form-only: ${inv.formOnly}`)
    console.log('')
    console.log(renderDomainTable(inv))
    if (report) {
      const hub = proveLedgerHubCoverage()
      const { accountCodeOf } = await import('@/accounting')
      const {
        recordEfficiencyPass,
        formatEfficiencySummary,
        renderEfficiencyDelta,
        loadEfficiencyStore,
      } = await import('./efficiency')
      console.log('')
      console.log(`ledger hub sample gate: complete=${hub.sampleComplete} registry=${hub.registry}`)
      console.log(`path=account sample: ${accountCodeOf('agents/accounting')} ≠ ${accountCodeOf('accounting')}`)
      const prior = loadEfficiencyStore(cwd).latest
      const { snapshot, ratchet } = recordEfficiencyPass('session:apply', { cwd })
      console.log('')
      console.log(formatEfficiencySummary(snapshot, ratchet))
      if (prior) {
        console.log('')
        console.log('efficiency delta (prior → this pass):')
        console.log(renderEfficiencyDelta(prior, snapshot.metrics))
      }
      if (!ratchet.ok) process.exit(1)
    }
  }

  if (batches.length > 0) {
    console.log(`\napply batch: ${batches.join(', ')}`)
    const result = applySessionLawBatch(batches, cwd)
    console.log(JSON.stringify(result, null, 2))
    if (result.errors.length > 0) process.exit(1)
  }

  if (!inventory && !report && batches.length === 0) {
    console.log('usage: tsx src/apply/index.ts --inventory | --report | --batch core,quantum,medical')
  }
  }
  void main()
}
