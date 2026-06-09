/**
 * agent/intelligence — self-improving intelligence via measure · fold · seal · balance.
 *
 * Quantum in thinking (computed loops), not literary labels or external LLM faces.
 *
 *   pnpm erpax agent improve [--batch=10] [--apply]
 *   pnpm erpax intelligence cycle [--batch=10] [--apply]
 */
import { createHash } from 'node:crypto'
import { payloadApprovalGate } from '@/payload/approval'
import {
  coordinatedWave,
  isWaveRunnerHeld,
  scanWaveAxisDebt,
  WAVE_SEAL_AXES,
  type WaveSealAxis,
  type WaveAxisDebt,
} from '@/apply/wave'
import { userWordUnprovenViolations, proveDiamondOrRevertBatch } from '@/law/folder/user-word'
import { findLinearLogic, applyLinearFolds, doubleFold } from '@/quantum/fold'
import { linearGaps, entanglementScore } from '@/quantum/gap'
import { parseWithSecurity } from '@/agent/security'
import { issueReceipt, type Receipt } from '@/receipt'
import { neighborsOf } from '@/uuid/matrix'

export interface ScienceStep {
  readonly science: string
  readonly module: string
  readonly proof: string
}

export interface IntelligenceMeasure {
  readonly violationCount: number
  readonly axes: readonly WaveAxisDebt[]
  readonly linearGaps: number
  readonly linearSegments: number
  readonly bondFold: string
}

export interface RankedIntelligenceGap {
  readonly axis: string
  readonly path: string
  readonly entanglement: string
}

export interface SelfImproveCycleOpts {
  readonly cwd?: string
  readonly batch?: number
  readonly axes?: readonly WaveSealAxis[]
  readonly dryRun?: boolean
  readonly skipPayload?: boolean
}

export interface SelfImproveCycleResult {
  readonly approved: boolean
  readonly aborted: boolean
  readonly abortReason?: string
  readonly before: IntelligenceMeasure
  readonly after: IntelligenceMeasure
  readonly ranked: readonly RankedIntelligenceGap[]
  readonly sealed: readonly string[]
  readonly receipts: readonly Receipt[]
  readonly learned: readonly ScienceStep[]
}

const SCIENCE_CURRICULUM: readonly ScienceStep[] = [
  { science: 'entropy', module: '@/accounting/entropy-proof', proof: 'freeEnergyFromEntropy' },
  { science: 'entanglement', module: '@/quantum/word', proof: 'interact64' },
  { science: 'fold', module: '@/quantum/fold', proof: 'doubleFold' },
  { science: 'holographic', module: '@/readme/compute', proof: 'deriveFolderModel' },
  { science: 'tamper', module: '@/wave', proof: 'tamperCostLog2ForCoverage' },
  { science: 'balance', module: '@/apply/wave', proof: 'coordinatedWave' },
  { science: 'proof', module: '@/law/folder/user-word', proof: 'proveDiamondOrRevert' },
]

/** Maps science atoms touched on the improvement path → module → proof handler. */
export function learnSciencesOnTheWay(
  axes: readonly string[] = [],
  _cwd = process.cwd(),
): ScienceStep[] {
  const touched = new Set(axes)
  for (const n of neighborsOf('science')) {
    const p = n.path ?? n.atom
    if (p) touched.add(p.split('/')[0] ?? p)
  }
  const out: ScienceStep[] = []
  for (const step of SCIENCE_CURRICULUM) {
    if (axes.length === 0 || touched.has(step.science) || axes.includes(step.science)) {
      out.push(step)
    }
  }
  if (out.length === 0) return [...SCIENCE_CURRICULUM.slice(0, 3)]
  return out
}

export function measureIntelligenceAxes(
  cwd = process.cwd(),
  axes: readonly WaveSealAxis[] = WAVE_SEAL_AXES,
): IntelligenceMeasure {
  let waveAxes: WaveAxisDebt[] = []
  let waveCount = 0
  try {
    waveAxes = scanWaveAxisDebt(cwd, axes)
    waveCount = waveAxes.reduce((s, d) => s + d.count, 0)
  } catch {
    waveAxes = []
    waveCount = 0
  }
  let linear = 0
  let linearSegments = 0
  try {
    linear = linearGaps(cwd).gaps.length
    linearSegments = findLinearLogic(cwd).segments.length
  } catch {
    linear = 0
    linearSegments = 0
  }
  return {
    violationCount: waveCount + linear + linearSegments,
    axes: waveAxes,
    linearGaps: linear,
    linearSegments,
    bondFold: doubleFold('agent/intelligence').interact64.toString(16),
  }
}

export function rankGapsByEntanglement(
  cwd = process.cwd(),
  batch = 10,
): RankedIntelligenceGap[] {
  const rows: RankedIntelligenceGap[] = []
  const phrase = userWordUnprovenViolations(cwd)
  for (const v of phrase.violations) {
    rows.push({
      axis: 'phrase-without-diamond',
      path: v.atomPath,
      entanglement: entanglementScore(v.atomPath).toString(16),
    })
  }
  for (const g of linearGaps(cwd).gaps) {
    rows.push({
      axis: 'linear-gap',
      path: g.atomPath,
      entanglement: g.entanglement,
    })
  }
  for (const s of findLinearLogic(cwd).segments) {
    const leaf = s.path.split('/').pop() ?? s.path
    rows.push({
      axis: 'linear-logic',
      path: s.path,
      entanglement: entanglementScore(leaf).toString(16),
    })
  }
  return rows
    .sort((a, b) => {
      const sa = BigInt(`0x${a.entanglement || '0'}`)
      const sb = BigInt(`0x${b.entanglement || '0'}`)
      if (sb > sa) return 1
      if (sb < sa) return -1
      return a.path.localeCompare(b.path)
    })
    .slice(0, Math.max(1, batch))
}

/** Pure metric: scoped violation count × bond-degree fold (interact64); no literary labels. */
export function quantumIntelligenceOf(scope: string, cwd = process.cwd()): number {
  const fold = doubleFold(scope)
  const bondDegree = Number(fold.interact64 & 0xffffn) + 1
  let violations = 0
  try {
    violations = linearGaps(cwd).gaps.filter(
      (g) => g.atomPath === scope || g.atomPath.startsWith(`${scope}/`) || scope.startsWith(g.atomPath),
    ).length
  } catch {
    violations = 0
  }
  return violations * bondDegree
}

let receiptHead: { leafUuid: string; seq: number } | null = null

export function __resetIntelligenceReceiptHeadForTests(): void {
  receiptHead = null
}

const chainReceipt = (
  action: string,
  outcome: 'allow' | 'block',
  ts: string,
): Receipt => {
  const receipt = issueReceipt({
    decision: {
      action,
      actor: 'agent/intelligence',
      outcome,
      tier: 'improve',
      capabilities: outcome === 'allow' ? ['read', 'seal', 'fold'] : [],
    },
    head: receiptHead,
    timestampIso: ts,
  })
  receiptHead = { leafUuid: receipt.leafUuid, seq: receipt.seq }
  return receipt
}

/** One coordinated self-improvement wave: payload gate → measure → rank → seal → measure → receipts. */
export function selfImproveCycle(opts: SelfImproveCycleOpts = {}): SelfImproveCycleResult {
  const cwd = opts.cwd ?? process.cwd()
  const batch = Math.max(1, Math.trunc(opts.batch ?? 10))
  const dryRun = opts.dryRun !== false
  const axes = opts.axes ?? WAVE_SEAL_AXES
  const receipts: Receipt[] = []
  const ts = new Date().toISOString()

  if (!opts.skipPayload) {
    const gate = payloadApprovalGate({ cwd, skipLive: dryRun })
    receipts.push(chainReceipt(`payload:${gate.step}`, gate.approved ? 'allow' : 'block', ts))
    if (!gate.approved) {
      return {
        approved: false,
        aborted: true,
        abortReason: `payload denied at ${gate.step}`,
        before: measureIntelligenceAxes(cwd, axes),
        after: measureIntelligenceAxes(cwd, axes),
        ranked: [],
        sealed: [],
        receipts,
        learned: [],
      }
    }
  }

  if (isWaveRunnerHeld()) {
    return {
      approved: true,
      aborted: true,
      abortReason: 'wave lock held — defer to coordinated wave',
      before: measureIntelligenceAxes(cwd, axes),
      after: measureIntelligenceAxes(cwd, axes),
      ranked: [],
      sealed: [],
      receipts,
      learned: [],
    }
  }

  const before = measureIntelligenceAxes(cwd, axes)
  const rankedRaw = rankGapsByEntanglement(cwd, batch)
  const secured = parseWithSecurity(JSON.stringify(rankedRaw), 'corpus:local', (r) =>
    JSON.parse(r) as RankedIntelligenceGap[],
  )
  if (!secured.allowed || !secured.parsed) {
    if (secured.receipt) receipts.push(secured.receipt)
    return {
      approved: true,
      aborted: true,
      abortReason: secured.reason ?? 'parse blocked',
      before,
      after: before,
      ranked: [],
      sealed: [],
      receipts,
      learned: [],
    }
  }
  const ranked = secured.parsed
  receipts.push(chainReceipt('rank:gaps', 'allow', ts))

  const sealed: string[] = []
  if (!dryRun) {
    const phraseCount = ranked.filter((g) => g.axis === 'phrase-without-diamond').length
    if (phraseCount > 0) {
      const proved = proveDiamondOrRevertBatch(cwd, batch, { dryRun: false })
      for (const p of proved.results) {
        if (p.action === 'proved') sealed.push(p.path)
      }
    }
    const linearCount = ranked.filter((g) => g.axis === 'linear-logic').length
    if (linearCount > 0) applyLinearFolds(cwd)
  }
  const wave = coordinatedWave({ cwd, batch, dryRun, axes })
  sealed.push(...wave.sealed)
  for (const r of wave.receipts) receipts.push(r)

  const after = measureIntelligenceAxes(cwd, axes)
  const axisNames = [...new Set(ranked.map((g) => g.axis))]
  const learned = learnSciencesOnTheWay(axisNames, cwd)
  receipts.push(
    chainReceipt(
      `improve:${createHash('sha256').update(`${before.violationCount}|${after.violationCount}`).digest('hex').slice(0, 8)}`,
      after.violationCount <= before.violationCount ? 'allow' : 'block',
      ts,
    ),
  )

  return {
    approved: true,
    aborted: false,
    before,
    after,
    ranked,
    sealed: [...new Set(sealed)],
    receipts,
    learned,
  }
}

export function formatIntelligenceLine(r: SelfImproveCycleResult): string {
  if (r.aborted) return `intelligence ABORTED: ${r.abortReason}`
  const delta = r.before.violationCount - r.after.violationCount
  return [
    `intelligence violations ${r.before.violationCount}→${r.after.violationCount} (Δ${delta >= 0 ? '+' : ''}${delta})`,
    `sealed=${r.sealed.length}`,
    `learned=${r.learned.length}`,
    `receipts=${r.receipts.length}`,
  ].join(' · ')
}

export function runIntelligenceCli(argv: string[] = process.argv.slice(2)): number {
  const batch = Number(argv.find((a) => a.startsWith('--batch='))?.slice(8) ?? 10)
  const apply = argv.includes('--apply')
  const r = selfImproveCycle({ batch, dryRun: !apply, skipPayload: argv.includes('--skip-payload') })
  console.log(formatIntelligenceLine(r))
  if (r.aborted) return 2
  return r.after.violationCount <= r.before.violationCount ? 0 : 1
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runIntelligenceCli())
