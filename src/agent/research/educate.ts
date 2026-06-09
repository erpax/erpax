/**
 * agent/research/educate — self-educating bounded loop.
 */
import { createHash } from 'node:crypto'
import { userWordUnprovenViolations } from '@/law/folder/user-word'
import { waveAccountingGapViolations } from '@/accounting/gaps'
import { materializeComputedFacesForPathsStable } from '@/readme/compute'
import { parseWithSecurity } from '@/agent/security'
import { issueReceipt, type Receipt } from '@/receipt'
import { coordinatedWave, type CoordinatedWaveResult } from '@/apply/wave'

export interface EducateGapRow {
  readonly axis: 'phrase-without-diamond' | 'accounting-wave' | 'linear-gap'
  readonly path: string
  readonly detail: string
}

export interface EducateGapScan {
  readonly gaps: readonly EducateGapRow[]
  readonly totalDebt: number
}

export interface SelfEducateCycleOpts {
  readonly cwd?: string
  readonly batch?: number
  readonly dryRun?: boolean
}

export interface SelfEducateCycleResult {
  readonly scan: EducateGapScan
  readonly proposed: readonly EducateGapRow[]
  readonly sealed: readonly string[]
  readonly wave: CoordinatedWaveResult
  readonly receipt: Receipt
}

export function scanEducateGaps(cwd = process.cwd()): EducateGapScan {
  const phrase = userWordUnprovenViolations(cwd)
  const accounting = waveAccountingGapViolations(cwd)
  const gaps: EducateGapRow[] = []
  for (const v of phrase.violations.slice(0, 50)) {
    gaps.push({ axis: 'phrase-without-diamond', path: v.atomPath, detail: v.kind })
  }
  for (const w of accounting.verdict.waves) {
    for (const p of w.paths.slice(0, 20)) {
      gaps.push({ axis: 'accounting-wave', path: p, detail: `wave ${w.wave}` })
    }
  }
  for (const p of (accounting.verdict.topGapsByWave[1] ?? []).slice(0, 20)) {
    gaps.push({ axis: 'linear-gap', path: p, detail: 'linear-gap' })
  }
  return { gaps, totalDebt: gaps.length }
}

export function selfEducateCycle(opts: SelfEducateCycleOpts = {}): SelfEducateCycleResult {
  const cwd = opts.cwd ?? process.cwd()
  const batch = Math.max(1, Math.trunc(opts.batch ?? 10))
  const dryRun = opts.dryRun !== false
  const scan = scanEducateGaps(cwd)
  const secured = parseWithSecurity(JSON.stringify(scan.gaps.slice(0, batch)), 'corpus:local', (r) =>
    JSON.parse(r) as EducateGapRow[],
  )
  if (!secured.allowed || !secured.parsed) throw new Error(secured.reason ?? 'blocked')
  const proposed = secured.parsed
  const sealed: string[] = []
  if (!dryRun) {
    const paths = proposed.filter((g) => g.axis === 'phrase-without-diamond').map((g) => g.path).slice(0, batch)
    if (paths.length) {
      materializeComputedFacesForPathsStable(paths, cwd)
      sealed.push(...paths)
    }
  }
  const wave = coordinatedWave({ cwd, batch, dryRun, axes: ['phrase-without-diamond', 'accounting-wave'] })
  sealed.push(...wave.sealed)
  const ts = new Date().toISOString()
  const id = createHash('sha256').update(`educate|${batch}|${ts.slice(0, 13)}`).digest('hex').slice(0, 12)
  const receipt = issueReceipt({
    decision: {
      action: `self-educate:${id}`,
      actor: 'agent/research/educate',
      outcome: wave.aborted ? 'block' : 'allow',
      tier: 'educate',
      capabilities: ['read', 'seal'],
    },
    head: null,
    timestampIso: ts,
  })
  return { scan, proposed, sealed: [...new Set(sealed)], wave, receipt }
}

export function runEducateCli(argv: string[] = process.argv.slice(2)): number {
  const r = selfEducateCycle({
    batch: Number(argv.find((a) => a.startsWith('--batch='))?.slice(8) ?? 10),
    dryRun: !argv.includes('--apply'),
  })
  console.log(`educate gaps=${r.scan.totalDebt} sealed=${r.sealed.length} receipt=${r.receipt.leafUuid.slice(0, 10)}`)
  return r.wave.aborted ? 2 : 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runEducateCli())
