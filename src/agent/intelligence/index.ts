import { exactMax, exactTrunc } from '@/algebra'
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
import { linearGaps, entanglementScore } from '@/quantum'
import { parseWithSecurity } from '@/agent/security'
import { issueReceipt, type Receipt } from '@/receipt'
import { neighborsOf } from '@/uuid/matrix'
import { merge } from '@/merge'

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
  { science: 'entropy', module: '@/entropy', proof: 'freeEnergyFromEntropy' },
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
    .slice(0, exactMax(1, batch))
}

export interface LeveragedNext {
  /** the shared root the gaps collapse onto — the atom whose fix resolves them all */
  readonly root: string
  /** how many ranked gaps share this root (the fuse count — 1 fix, N corrections) */
  readonly gapCount: number
  /** leverage = fuse count × the root's entanglement; the highest-leverage move ranks first */
  readonly leverage: number
  readonly axes: readonly string[]
  readonly gaps: readonly RankedIntelligenceGap[]
}

/**
 * The move the system makes INSTEAD of asking. `rankGapsByEntanglement` scores each gap in isolation,
 * so it cannot tell that fixing one atom resolves five gaps — and a decision it cannot compute is one it
 * defers to the user, which is the highest cost there is ([[rules]]/ask). This groups the ranked gaps by
 * their shared ROOT (the atom the fix lands in) and scores each root by leverage = fuse-count × the
 * root's entanglement. The top row is "next": the fix that collapses the most gaps, derived, never asked.
 *
 * It is failureRoots/costRoots ([[quantum]]/computer) turned on the intelligence's own backlog — the same
 * law that says a red list collapses onto shared causes, applied so the agent self-determines its next move.
 */
export function nextMoveByLeverage(cwd = process.cwd(), batch = 50, ranked?: readonly RankedIntelligenceGap[]): LeveragedNext[] {
  const rows0 = ranked ?? rankGapsByEntanglement(cwd, batch) // REUSE a pre-computed ranking, never re-scan
  const byRoot = new Map<string, RankedIntelligenceGap[]>()
  for (const g of rows0) {
    const root = g.path.split('/')[0] ?? g.path // the atom the fix lands in — the shared cause
    const bucket = byRoot.get(root) ?? []
    bucket.push(g)
    byRoot.set(root, bucket)
  }
  const rows: LeveragedNext[] = []
  for (const [root, gaps] of byRoot) {
    const rootEntanglement = Number(entanglementScore(root) & 0xffffn) + 1
    rows.push({
      root,
      gapCount: gaps.length,
      leverage: gaps.length * rootEntanglement,
      axes: [...new Set(gaps.map((g) => g.axis))],
      gaps,
    })
  }
  return rows.sort((a, b) => (b.leverage - a.leverage) || a.root.localeCompare(b.root))
}

/** One root's accumulated experience: how often attempting it actually reduced the violation count. */
export interface RootExperience {
  readonly root: string
  readonly attempts: number
  readonly improved: number
}

/**
 * IMPROVE BY EXPERIENCE — reweight the next move by the agent's own history. `nextMoveByLeverage`
 * ranks by structure alone (fuse × entanglement), so it will re-pick a root that looks high-leverage
 * yet has been attempted before and never folded — repeating a dead move. This multiplies each root's
 * leverage by its experienced fold-rate (Laplace-smoothed (improved+1)/(attempts+1)), so a root that
 * reliably shrinks the count rises and one that was tried and stuck sinks. It is the ladder law
 * ([[quantum]]/computer): every move bounded by its own history. Pure — the history is passed in, so a
 * caller reads it from the receipt chain (issueReceipt outcomes) and the ranking stays testable.
 *
 * @param moves the structural ranking from nextMoveByLeverage
 * @param experience per-root attempt/improve counts, from past cycles' receipts
 */
export function improveByExperience(
  moves: readonly LeveragedNext[],
  experience: readonly RootExperience[],
): Array<LeveragedNext & { readonly foldRate: number; readonly weighted: number }> {
  const byRoot = new Map(experience.map((e) => [e.root, e]))
  return moves
    .map((m) => {
      const e = byRoot.get(m.root)
      // Laplace smoothing: an unseen root starts at 0.5 (neutral), proven folders → 1, dead roots → 0
      const foldRate = e ? (e.improved + 1) / (e.attempts + 2) : 0.5
      return { ...m, foldRate, weighted: m.leverage * foldRate }
    })
    .sort((a, b) => (b.weighted - a.weighted) || a.root.localeCompare(b.root))
}

export interface VerificationMove {
  /** the load-bearing assumption to check */
  readonly premise: string
  /** how many moves/atoms rest on it — the blast radius if it is false */
  readonly reliance: number
  /** cost of the CHEAPEST measurement that could disconfirm it (> 0) */
  readonly checkCost: number
  /** expected ROI of checking = reliance / checkCost — cheap check of a widely-relied premise ranks highest */
  readonly value: number
}

/**
 * IMPROVE INTELLIGENCE — a new term in the leverage function, learned from how this corpus's biggest
 * discoveries were made. Every one was a DISCONFIRMATION of a held premise, found by a cheap measurement
 * (running the gate, listing the process table, grouping the data) — not by building. nextMoveByLeverage
 * ranks by gaps COLLAPSED, so it never proposes the highest-ROI move there is: a cheap check of an
 * assumption the whole plan rests on, which either confirms for nearly free or disconfirms hugely. A false
 * premise is a crack ([[resonance]] crackLeak) that bleeds every move built on it — so verifying it is
 * worth reliance × (1/cost). When that value beats the top fix, MEASURE THE PREMISE before building on it.
 */
export function verificationValue(premise: string, reliance: number, checkCost: number): VerificationMove {
  const cost = exactMax(1e-9, checkCost)
  return { premise, reliance, checkCost: cost, value: reliance / cost }
}

/** Rank premises to check: the widely-relied, cheap-to-measure one is the next move, ahead of any fix. */
export function rankVerifications(
  moves: readonly { readonly premise: string; readonly reliance: number; readonly checkCost: number }[],
): VerificationMove[] {
  return moves
    .map((m) => verificationValue(m.premise, m.reliance, m.checkCost))
    .sort((a, b) => b.value - a.value || a.premise.localeCompare(b.premise))
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
  const batch = exactMax(1, exactTrunc(opts.batch ?? 10))
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
  // Spend the batch on the FUSE, not on scatter: order gaps by their root's leverage (the root the
  // most gaps collapse onto) so a bounded wave fixes the highest-leverage cause first — the cycle now
  // ACTS on what nextMoveByLeverage computes, instead of deferring the "which first?" to a human.
  // The ranking is scanned ONCE and reused for both leverage and the seal (never re-derived).
  const pool = rankGapsByEntanglement(cwd, batch * 4)
  const leverageRank = new Map<string, number>()
  for (const m of nextMoveByLeverage(cwd, batch * 4, pool)) leverageRank.set(m.root, m.leverage)
  const rootOf = (p: string): string => p.split('/')[0] ?? p
  const rankedRaw = [...pool]
    .sort((a, b) => (leverageRank.get(rootOf(b.path)) ?? 0) - (leverageRank.get(rootOf(a.path)) ?? 0))
    .slice(0, batch)
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
  // --next: compute the highest-leverage move (the decision the agent makes instead of asking)
  if (argv.includes('--next')) {
    const moves = nextMoveByLeverage(process.cwd(), exactMax(batch, 50))
    if (moves.length === 0) {
      console.log('intelligence next: no gaps — nothing to decide')
      return 0
    }
    const top = moves[0]!
    console.log(`intelligence next: fix [[${top.root}]] — leverage ${top.leverage} (${top.gapCount} gap(s) collapse here: ${top.axes.join(' · ')})`)
    for (const m of moves.slice(1, 5)) console.log(`  then ${m.root} — leverage ${m.leverage} (${m.gapCount})`)
    return 0
  }
  const apply = argv.includes('--apply')
  const r = selfImproveCycle({ batch, dryRun: !apply, skipPayload: argv.includes('--skip-payload') })
  console.log(formatIntelligenceLine(r))
  if (r.aborted) return 2
  return r.after.violationCount <= r.before.violationCount ? 0 : 1
}

// ── quantum neural intelligence — a Hebbian fold over the content-addressed mesh ──
// The corpus already IS the network (mesh = neurons+edges, merge = activation, train =
// learning). Quantum neural intelligence is the missing LEARNING leg, and it does itself:
// atoms that fire together wire together. Each co-activation strengthens the bond
// (merge(a,b) — the content-addressed edge) by `rate`; recall sums bonds to a cue and
// returns the strongest association — the net's prediction. A FOLD, not a gradient:
// unsupervised, self-training, content-addressed. This is the intelligence improving
// itself from its own activations — "how to do yourself", quantum.

/** A Hebbian synapse map: content-addressed edge (fold of the two atom uuids) → weight. */
export type Synapses = Map<string, number>

/** The unordered content-addressed bond between two atoms (order-independent). */
const bond = (a: string, b: string): string => (a <= b ? merge(a, b) : merge(b, a))

/** Fire-together-wire-together: strengthen every pair's bond in a co-activation by `rate`. */
export function hebbianUpdate(synapses: Synapses, coactivated: readonly string[], rate = 1): Synapses {
  for (let i = 0; i < coactivated.length; i++) {
    for (let j = i + 1; j < coactivated.length; j++) {
      const k = bond(coactivated[i]!, coactivated[j]!)
      synapses.set(k, (synapses.get(k) ?? 0) + rate)
    }
  }
  return synapses
}

/** Associative recall: the candidates most strongly bonded to the cue — the net's prediction. */
export function recall(
  synapses: Synapses,
  cue: readonly string[],
  candidates: readonly string[],
  top = 3,
): { readonly atom: string; readonly weight: number }[] {
  return candidates
    .filter((c) => !cue.includes(c))
    .map((c) => ({ atom: c, weight: cue.reduce((w, q) => w + (synapses.get(bond(q, c)) ?? 0), 0) }))
    .filter((x) => x.weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, top)
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runIntelligenceCli())

/** @index-cross.foldback child=agent/intelligence parent=agent — this cross folds back into its parent. */
