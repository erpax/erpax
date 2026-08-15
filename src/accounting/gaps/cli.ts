import { startProgressHeartbeat } from '@/cli/progress-heartbeat'
import { accountingGapsInWaves, fixAccountingGapsOnP0, formatAccountingGapsReport } from './index'

const args = process.argv.slice(2)
const fix = args.includes('--fix')
const dryRun = args.includes('--dry-run')
const maxWavesArg = args.find((a) => a.startsWith('--max-waves='))
const maxWaves = maxWavesArg ? Number(maxWavesArg.split('=')[1]) : 7

const stop = startProgressHeartbeat('accounting:gaps')
const verdict = accountingGapsInWaves(process.cwd(), { maxWaves, topPerWave: 20 })
console.log(formatAccountingGapsReport(verdict))
if (fix) {
  const r = fixAccountingGapsOnP0(process.cwd(), { dryRun })
  console.log(`\nfixes: ${r.fixesApplied} · ${r.paths.join(', ') || '—'}`)
}
stop()
process.exit(verdict.gapPathCount > 0 || verdict.corpusNetEb > 0 ? 1 : 0)
