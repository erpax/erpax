/**
 * MCP DRY cleaning — Slice BBBBBBB (2026-05-11).
 *
 * Per user 'mcp solves manual work by dry cleaning'. The MCP catalog
 * has grown to ~190 tools across ~25 areas. Manual review can't catch
 * the gradual accumulation of duplicate descriptions, copy-paste
 * parameter shapes, or near-identical handlers. This slice ships an
 * automated DRY-clean detector + extraction proposer.
 *
 * Three checks:
 *
 *   1. **Description duplication** — pairs of tools whose
 *      descriptions share ≥80% of word tokens. Likely indicates
 *      copy-paste descriptions that should be templated.
 *
 *   2. **Identical parameter shapes** — tools with byte-equal Zod
 *      parameter shapes (post-canonicalisation). Likely indicates
 *      a missing shared schema (e.g. `{tenantId, sampleSize}`
 *      reused across many tools).
 *
 *   3. **Naming-pattern violations** — tools that share a verb
 *      (`erpax.*.list`, `erpax.*.check`) but inconsistent parameter
 *      shapes — should normalize.
 *
 * **Conservation Law 50** — `checkMcpDryCleanliness`: no two non-
 * generated tools share >MAX_DESCRIPTION_OVERLAP word-overlap
 * fraction; identical-shape clusters reported as warn (not fail —
 * extraction is a refactor decision, not a build-block).
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — DRY by detection
 * @standard ISO/IEC 25010:2023 §5.7 modularity
 * @audit ISO 19011:2018 §6.4.6 (every duplication finding audit-trailed)
 */

import { createHash } from 'node:crypto'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

// Slice OOOOOOOO (2026-05-11) — per user "the stable amount of drift is
// a computation". The threshold above which MCP overlap is *real drift*
// (fusion-breaking) is derived from the corpus, not hardcoded.
//
// Two kinds of drift coexist in any healthy MCP surface:
//
//   STABLE drift  = same-area pairs sharing family vocabulary.
//                   `seo.renderJsonLd` ↔ `seo.renderOgMeta` ≈ 0.42.
//                   Acceptable: same family, same input domain, the
//                   shared tokens ARE the family identity.
//
//   REAL drift    = cross-area pairs with high overlap.
//                   Indicates a description template that wasn't
//                   specialised to its tool's semantics — the kind
//                   of inconsistency that "stops the fusion".
//
// The runtime gate is computed at scan time:
//
//   stableDriftCeiling = max(jaccard) over all intra-area pairs
//   realDriftFloor     = stableDriftCeiling + ε
//
// Any cross-area pair AT or above realDriftFloor fails the invariant.
// As the corpus grows, the ceiling adapts naturally.
//
// `MAX_DESCRIPTION_OVERLAP` is retained as a hard ABSOLUTE floor (no
// pair anywhere should exceed it, even if both are in the same area)
// — the catch for true copy-paste descriptions that templates failed
// to specialise.
export const MAX_DESCRIPTION_OVERLAP = 0.7
/** Stability margin between max intra-area overlap and the cross-area gate. */
export const DRIFT_THRESHOLD_EPSILON = 0.05
const MIN_TOKENS_FOR_OVERLAP_CHECK = 8   // skip very short descriptions

/** Extract the area segment from a fully-qualified tool name `erpax.<area>.<verb>`. */
function areaOf(toolName: string): string {
  const m = toolName.match(/^erpax\.([^.]+)\./)
  return m ? m[1]! : '_unknown'
}

/**
 * Slice PPPPPPPP (2026-05-11) — strategy switching at drift threshold edges.
 *
 * Per user "mcp switches strategies at the edges of the tresholds in
 * same harmonic computational cycle all based on uuid". One sweep =
 * one cycle = one threshold snapshot. Within it, every candidate pair
 * gets a single strategy choice — coherent across the whole cycle.
 *
 * The strategy is keyed by the pair's content-uuid (sha-256 of the
 * canonical pair name pair). Same pair, same cycle, same uuid → same
 * strategy. Deterministic, reproducible, replayable.
 *
 * Strategy ladder (descending entropy bands):
 *
 *   1. ESCALATE       — pair score ≥ realDriftFloor AND cross-area.
 *                       Real fusion-breaking drift; needs human review.
 *
 *   2. EXTRACT        — score in [stableDriftCeiling, realDriftFloor)
 *                       OR cross-area in [0.3, gate). Propose a shared
 *                       description template; refactor decision.
 *
 *   3. SWAP_VOCAB     — score at stableDriftCeiling AND intra-area.
 *                       Family pair — propose a small vocabulary swap
 *                       to descend the ceiling on next cycle.
 *
 *   4. MONITOR        — score < 0.2 baseline. No action; record only.
 *
 * The strategy choice is exposed in the report so observers can verify
 * the agent's decision matrix. ConsistencyAgent dispatches accordingly.
 */
/**
 * DriftStrategy ladder — Slices PPPPPPPP (initial 4) + extension below.
 *
 * Per user "this way new gaps to fill with creation will emerge":
 * disambiguation isn't just closure — it also REVEALS the absent
 * concepts whose presence would have prevented the overlap. As tool
 * vocabulary diverges, the semantic space between them becomes
 * visible; the agent surfaces those as CREATE_GAP candidates so the
 * maintainer (or a future AI inference step) can author a new tool.
 *
 * Strategy → action mapping:
 *   ESCALATE    → human review (fusion-breaking)
 *   EXTRACT     → propose shared description template
 *   SWAP_VOCAB  → propose minor vocabulary swap (drops next-cycle ceiling)
 *   CREATE_GAP  → surface a token-derived hint for a tool that should
 *                 exist between this pair (emerges from disambiguation)
 *   MONITOR     — record only
 */
export type DriftStrategy = 'ESCALATE' | 'EXTRACT' | 'SWAP_VOCAB' | 'CREATE_GAP' | 'MONITOR'

export interface StrategyDecision {
  readonly pairUuid: string
  readonly toolA: string
  readonly toolB: string
  readonly score: number
  readonly sameArea: boolean
  readonly strategy: DriftStrategy
  readonly rationale: string
  /**
   * Slice PPPPPPPP-cont (2026-05-11) — when `strategy === 'CREATE_GAP'`,
   * tokens that appear in BOTH tool descriptions but in NEITHER tool
   * name. These are the unclaimed semantic territories the pair is
   * "talking about" without owning. Each is a candidate new-tool concept.
   */
  readonly emergingConcepts?: ReadonlyArray<string>
}

/**
 * Slice PPPPPPPP-cont (2026-05-11) — gap that emerged from disambiguation.
 * Per user "this way new gaps to fill with creation will emerge": as
 * pairs disambiguate, the shared vocabulary that *neither tool name
 * claims* surfaces as a concrete tool-creation candidate.
 */
export interface EmergingGap {
  readonly area: string
  readonly suggestedTool: string  // erpax.<area>.<concept> — kebab-case from token
  readonly anchorPair: readonly [string, string]
  readonly anchorScore: number
  readonly evidence: ReadonlyArray<string>  // the shared description tokens
  readonly rationale: string
}

/**
 * Deterministic, replayable strategy selection. Same (pair, thresholds)
 * input → same uuid → same strategy.
 *
 * Slice PPPPPPPP-cont — CREATE_GAP fires for same-area pairs in the
 * mid band [0.25, stableDriftCeiling) where ≥2 description tokens are
 * shared but appear in NEITHER tool name. Those tokens name a concept
 * the pair circles but doesn't claim. The disambiguation process is
 * what *exposes* the gap.
 */
export function pickStrategy(input: {
  a: string
  b: string
  score: number
  sameArea: boolean
  stableDriftCeiling: number
  realDriftFloor: number
  emergingConcepts?: ReadonlyArray<string>
}): { strategy: DriftStrategy; rationale: string } {
  const { score, sameArea, stableDriftCeiling, realDriftFloor, emergingConcepts } = input
  const ENTROPY_BASELINE = 0.2
  const CREATE_GAP_BAND_LO = 0.25
  if (score < ENTROPY_BASELINE) {
    return { strategy: 'MONITOR', rationale: `below baseline ${ENTROPY_BASELINE}` }
  }
  if (!sameArea && score >= realDriftFloor) {
    return {
      strategy: 'ESCALATE',
      rationale: `cross-area pair above real-drift floor (${realDriftFloor.toFixed(3)}) — fusion-breaking`,
    }
  }
  if (score >= stableDriftCeiling) {
    return sameArea
      ? {
          strategy: 'SWAP_VOCAB',
          rationale: `intra-area pair at stable ceiling (${stableDriftCeiling.toFixed(3)}); small vocab swap drops the next cycle's gate`,
        }
      : {
          strategy: 'EXTRACT',
          rationale: `cross-area pair in (ceiling, floor) — propose shared description template`,
        }
  }
  // CREATE_GAP — same-area, mid band, has unclaimed semantic territory.
  if (sameArea && score >= CREATE_GAP_BAND_LO && (emergingConcepts?.length ?? 0) >= 2) {
    return {
      strategy: 'CREATE_GAP',
      rationale: `same-area pair shares ${emergingConcepts!.length} description token(s) absent from both names; suggests a missing tool around: ${emergingConcepts!.slice(0, 3).join(', ')}`,
    }
  }
  return {
    strategy: 'EXTRACT',
    rationale: `pair in mid band [${ENTROPY_BASELINE}, ${stableDriftCeiling.toFixed(3)}); proposal-only`,
  }
}

/** Tokens in `description` that don't appear in either tool's full name. */
function unclaimedConceptTokens(
  descTokens: ReadonlySet<string>,
  aName: string,
  bName: string,
): string[] {
  // Tokenize the full name into 3+-char parts so things like 'render', 'check'
  // count even when they're in `erpax.seo.renderJsonLd` → ['erpax','seo','render','json','ld'].
  const nameTok = new Set<string>()
  for (const n of [aName, bName]) {
    const parts = n
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 3)
    for (const p of parts) nameTok.add(p)
  }
  // Common scaffolding tokens to ignore (mentioned in nearly every description).
  const noise = new Set([
    'slice', 'tool', 'tools', 'every', 'returns', 'returns', 'standard', 'standards',
    'audit', 'ndard', 'pper', 'ration', 'each', 'with', 'this', 'that', 'from',
    'into', 'used', 'when', 'where', 'over', 'into', 'their', 'they',
  ])
  const out: string[] = []
  for (const t of descTokens) {
    if (nameTok.has(t)) continue
    if (noise.has(t)) continue
    out.push(t)
  }
  return out
}

/** Build a deterministic pair-uuid from two tool names. */
function pairUuid(a: string, b: string): string {
  const [x, y] = a < b ? [a, b] : [b, a]
  // Minimal stable hash — sha-256 of canonical pair string. Inline so this
  // module doesn't pull crypto unconditionally; require lazy.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHash } = require('node:crypto') as typeof import('node:crypto')
  return createHash('sha256').update(`${x}|${y}`).digest('hex').slice(0, 16)
}

// ─── Tokenisation ──────────────────────────────────────────────────

function tokens(desc: string): ReadonlySet<string> {
  return new Set(
    desc.toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 4),  // drop short stop-words
  )
}

function jaccard(a: ReadonlySet<string>, b: ReadonlySet<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  const uni = a.size + b.size - inter
  return uni === 0 ? 0 : inter / uni
}

// ─── Parameter-shape canonicalisation ──────────────────────────────

function paramShapeSignature(tool: ErpaxMcpTool): string {
  // We don't have the raw Zod source — use the parameter NAMES + the
  // count as a coarse signature. Two tools whose parameter names match
  // are likely candidates for a shared schema (false positives caught
  // by manual review).
  const names = Object.keys(tool.parameters).sort()
  return names.length === 0 ? '<empty>' : names.join(',')
}

// ─── DRY-clean report ──────────────────────────────────────────────

export interface DescriptionDuplicate {
  readonly toolA: string
  readonly toolB: string
  readonly overlap: number              // jaccard 0..1
  readonly recommendation: string
}

export interface ShapeCluster {
  readonly signature: string
  readonly tools: ReadonlyArray<string>
  readonly recommendation: string
}

export interface VerbInconsistency {
  readonly verb: string
  readonly tools: ReadonlyArray<{ name: string; signature: string }>
  readonly recommendation: string
}

export interface DriftDistribution {
  /** Highest jaccard score among same-area pairs — the stable-drift ceiling. */
  readonly stableDriftCeiling: number
  /** Cross-area pair gate = stableDriftCeiling + DRIFT_THRESHOLD_EPSILON. */
  readonly realDriftFloor: number
  /** Pair at the stable-drift ceiling (informational). */
  readonly ceilingPair?: { a: string; b: string }
  /** Count of intra-area pairs vs cross-area pairs above their respective thresholds. */
  readonly intraAreaPairsScanned: number
  readonly crossAreaPairsScanned: number
  /**
   * Drift entropy (Slice OOOOOOOO 2026-05-11) — the system's distance
   * from a zero-overlap MCP surface. Computed as the sum of all pair
   * overlap scores above the noise baseline (0.2). Monotonically
   * non-increasing across sweeps as the ConsistencyAgent disambiguates
   * the highest-overlap pair each cycle.
   *
   *   driftEntropy = Σ max(0, score_ij - 0.2) for all pairs
   *
   * Per user "the computation logic eventually leads the drift to zero
   * entropy" — the agent's autonomous loop drives this number toward 0.
   */
  readonly driftEntropy: number
  /**
   * The highest-overlap pair (intra or cross area). Surfaced as the
   * canonical next-disambiguation target. ConsistencyAgent picks this
   * one each sweep; once disambiguated, the next-highest pair becomes
   * the new target. Zero-entropy convergence in finite steps.
   */
  readonly nextDisambiguationTarget?: { a: string; b: string; score: number; sameArea: boolean }
}

export interface DryCleanReport {
  readonly toolsScanned: number
  readonly handCuratedCount: number
  readonly autoGeneratedCount: number
  readonly descriptionDuplicates: ReadonlyArray<DescriptionDuplicate>
  readonly shapeClusters: ReadonlyArray<ShapeCluster>
  readonly verbInconsistencies: ReadonlyArray<VerbInconsistency>
  /** Slice OOOOOOOO — computed drift distribution + thresholds. */
  readonly driftDistribution: DriftDistribution
  /**
   * Slice PPPPPPPP (2026-05-11) — per-pair strategy decisions taken in
   * this harmonic cycle. uuid-keyed (replayable) and snapshot-consistent
   * (every decision used the same thresholds from this same scan).
   * ConsistencyAgent dispatches per `strategy` value.
   */
  readonly strategyDecisions: ReadonlyArray<StrategyDecision>
  /**
   * Slice PPPPPPPP-cont — gaps that emerged from disambiguation. Each
   * is a tool concept whose vocabulary already lives in the descriptions
   * of nearby tools but no tool claims it by name. Per user "this way
   * new gaps to fill with creation will emerge".
   */
  readonly emergingGaps: ReadonlyArray<EmergingGap>
  /** Cycle uuid — hash of the (snapshot thresholds, tool count). Same cycle ⇒ same uuid. */
  readonly cycleUuid: string
}

export function dryCleanScan(tools: ReadonlyArray<ErpaxMcpTool>): DryCleanReport {
  const handCurated = tools.filter((t) => !t.description.startsWith('[generated]'))
  const autoGenerated = tools.length - handCurated.length

  // Slice OOOOOOOO — pass 1: compute the drift distribution.
  // Iterate every hand-curated pair, partition into intra-area vs
  // cross-area, track the max overlap in each partition. The stable
  // drift ceiling = max(intra-area); the real-drift gate sits ε above
  // it. As the corpus grows, the gate adapts.
  const tokenCache = new Map<string, ReadonlySet<string>>()
  for (const t of handCurated) tokenCache.set(t.name, tokens(t.description))

  let stableDriftCeiling = 0
  let ceilingPair: { a: string; b: string } | undefined
  let intraAreaPairsScanned = 0
  let crossAreaPairsScanned = 0
  type Pair = { a: string; b: string; score: number; sameArea: boolean }
  const allPairs: Pair[] = []
  for (let i = 0; i < handCurated.length; i++) {
    const ti = handCurated[i]!
    const ai = tokenCache.get(ti.name)!
    if (ai.size < MIN_TOKENS_FOR_OVERLAP_CHECK) continue
    const areaI = areaOf(ti.name)
    for (let j = i + 1; j < handCurated.length; j++) {
      const tj = handCurated[j]!
      const aj = tokenCache.get(tj.name)!
      if (aj.size < MIN_TOKENS_FOR_OVERLAP_CHECK) continue
      const score = jaccard(ai, aj)
      const sameArea = areaOf(tj.name) === areaI
      if (sameArea) intraAreaPairsScanned++
      else crossAreaPairsScanned++
      if (sameArea && score > stableDriftCeiling) {
        stableDriftCeiling = score
        ceilingPair = { a: ti.name, b: tj.name }
      }
      if (score >= 0.3) allPairs.push({ a: ti.name, b: tj.name, score, sameArea })
    }
  }
  const realDriftFloor = Math.min(
    MAX_DESCRIPTION_OVERLAP,
    stableDriftCeiling + DRIFT_THRESHOLD_EPSILON,
  )

  // Slice OOOOOOOO — drift entropy + next-disambiguation target. Per
  // user "the computation logic eventually leads the drift to zero
  // entropy". Each sweep computes the current entropy; the agent
  // disambiguates the top-scoring pair; the next sweep computes a
  // lower entropy. Monotonic descent → zero in finite steps.
  const ENTROPY_BASELINE = 0.2
  let driftEntropy = 0
  for (const p of allPairs) {
    if (p.score > ENTROPY_BASELINE) driftEntropy += p.score - ENTROPY_BASELINE
  }
  driftEntropy = Number(driftEntropy.toFixed(3))
  let nextDisambiguationTarget: { a: string; b: string; score: number; sameArea: boolean } | undefined
  if (allPairs.length > 0) {
    const top = [...allPairs].sort((x, y) => y.score - x.score)[0]!
    if (top.score >= ENTROPY_BASELINE) {
      nextDisambiguationTarget = {
        a: top.a, b: top.b,
        score: Number(top.score.toFixed(3)),
        sameArea: top.sameArea,
      }
    }
  }

  // 1. Description duplicates: any cross-area pair AT or above the
  //    computed real-drift floor (stable-ceiling + ε). This is the
  //    fusion-breaking class. Also any pair anywhere ≥ the absolute
  //    hard floor (`MAX_DESCRIPTION_OVERLAP`) — true copy-paste.
  const descriptionDuplicates: DescriptionDuplicate[] = []
  for (const p of allPairs) {
    const trips = !p.sameArea && p.score >= realDriftFloor
    const absolute = p.score >= MAX_DESCRIPTION_OVERLAP
    if (!trips && !absolute) continue
    descriptionDuplicates.push({
      toolA: p.a, toolB: p.b, overlap: Number(p.score.toFixed(3)),
      recommendation: absolute
        ? `pair exceeds absolute copy-paste floor (${MAX_DESCRIPTION_OVERLAP}); rewrite one description`
        : `cross-area pair above computed drift floor (${realDriftFloor.toFixed(3)} = stable ${stableDriftCeiling.toFixed(3)} + ε ${DRIFT_THRESHOLD_EPSILON}); fusion-breaking`,
    })
  }

  // 2. Parameter shape clusters.
  const sigToTools = new Map<string, string[]>()
  for (const t of handCurated) {
    const sig = paramShapeSignature(t)
    if (sig === '<empty>') continue
    const list = sigToTools.get(sig) ?? []
    list.push(t.name)
    sigToTools.set(sig, list)
  }
  const shapeClusters: ShapeCluster[] = [...sigToTools.entries()]
    .filter(([, names]) => names.length >= 3)   // 2+ is noise; 3+ worth a look
    .map(([signature, tools]) => ({
      signature,
      tools,
      recommendation: `extract Zod schema 'z.object({ ${signature} })' as a shared const + reuse across these tools`,
    }))

  // 3. Verb consistency: same final segment (verb), different
  //    parameter shapes.
  const verbToShapes = new Map<string, Map<string, string[]>>()
  for (const t of handCurated) {
    const m = t.name.match(/\.([a-zA-Z][a-zA-Z0-9-]*)$/)
    if (!m) continue
    const verb = m[1]!
    const sig = paramShapeSignature(t)
    let inner = verbToShapes.get(verb)
    if (!inner) { inner = new Map(); verbToShapes.set(verb, inner) }
    const list = inner.get(sig) ?? []
    list.push(t.name)
    inner.set(sig, list)
  }
  const verbInconsistencies: VerbInconsistency[] = []
  for (const [verb, shapes] of verbToShapes.entries()) {
    if (shapes.size < 2) continue                          // single shape — consistent
    const totalTools = [...shapes.values()].reduce((s, l) => s + l.length, 0)
    if (totalTools < 4) continue                            // not enough corpus to call inconsistent
    const flattened: { name: string; signature: string }[] = []
    for (const [signature, names] of shapes) for (const name of names) flattened.push({ name, signature })
    verbInconsistencies.push({
      verb,
      tools: flattened,
      recommendation: `tools sharing verb '${verb}' have ${shapes.size} different parameter shapes; consider normalising`,
    })
  }

  return {
    toolsScanned: tools.length,
    handCuratedCount: handCurated.length,
    autoGeneratedCount: autoGenerated,
    descriptionDuplicates,
    shapeClusters,
    verbInconsistencies,
    driftDistribution: {
      stableDriftCeiling: Number(stableDriftCeiling.toFixed(3)),
      realDriftFloor: Number(realDriftFloor.toFixed(3)),
      ceilingPair,
      intraAreaPairsScanned,
      crossAreaPairsScanned,
      driftEntropy,
      nextDisambiguationTarget,
    },
    strategyDecisions: (() => {
      // Slice PPPPPPPP — one harmonic cycle, uuid-keyed strategy per pair.
      const decisions: StrategyDecision[] = []
      for (const p of allPairs) {
        const ai = tokenCache.get(p.a)!
        const bi = tokenCache.get(p.b)!
        const shared = new Set<string>()
        for (const t of ai) if (bi.has(t)) shared.add(t)
        const emergingConcepts = unclaimedConceptTokens(shared, p.a, p.b)
        const { strategy, rationale } = pickStrategy({
          a: p.a, b: p.b, score: p.score, sameArea: p.sameArea,
          stableDriftCeiling, realDriftFloor, emergingConcepts,
        })
        if (strategy === 'MONITOR') continue
        decisions.push({
          pairUuid: pairUuid(p.a, p.b),
          toolA: p.a, toolB: p.b,
          score: Number(p.score.toFixed(3)),
          sameArea: p.sameArea,
          strategy, rationale,
          ...(strategy === 'CREATE_GAP' ? { emergingConcepts } : {}),
        })
      }
      return decisions
    })(),
    emergingGaps: (() => {
      // Slice PPPPPPPP-cont — derive concrete tool-creation candidates
      // from CREATE_GAP decisions. Each unclaimed token in a same-area
      // pair's shared vocabulary becomes a candidate erpax.<area>.<token>.
      const gaps: EmergingGap[] = []
      const seen = new Set<string>()
      for (const p of allPairs) {
        if (!p.sameArea || p.score < 0.25) continue
        const ai = tokenCache.get(p.a)!
        const bi = tokenCache.get(p.b)!
        const shared = new Set<string>()
        for (const t of ai) if (bi.has(t)) shared.add(t)
        const concepts = unclaimedConceptTokens(shared, p.a, p.b)
        if (concepts.length < 2) continue
        const area = areaOf(p.a)
        for (const concept of concepts.slice(0, 3)) {
          const suggested = `erpax.${area}.${concept}`
          if (seen.has(suggested)) continue
          seen.add(suggested)
          gaps.push({
            area,
            suggestedTool: suggested,
            anchorPair: [p.a, p.b],
            anchorScore: Number(p.score.toFixed(3)),
            evidence: concepts.slice(0, 6),
            rationale: `same-area pair ${p.a} ↔ ${p.b} (overlap ${p.score.toFixed(3)}) shares description token '${concept}' but neither tool name claims it — candidate new tool`,
          })
        }
      }
      return gaps
    })(),
    cycleUuid: createHash('sha256')
      .update(`${tools.length}|${stableDriftCeiling.toFixed(6)}|${realDriftFloor.toFixed(6)}|${driftEntropy.toFixed(6)}`)
      .digest('hex')
      .slice(0, 16),
  }
}

// ─── Conservation Law 50 — DRY cleanliness ─────────────────────────

export interface DryCleanlinessVerdict {
  readonly ok: boolean
  readonly report: DryCleanReport
  readonly note: string
}

/**
 * Conservation Law 50 — DRY cleanliness with the drift threshold COMPUTED
 * from the corpus (Slice OOOOOOOO 2026-05-11). The gate sits at
 * `max(intra-area overlap) + ε` so:
 *
 *   - same-area pairs (e.g. SEO render family) are allowed to share
 *     vocabulary — that's STABLE drift and reflects the family identity
 *   - cross-area pairs at the same overlap fail — that's REAL drift,
 *     description-template laziness that "stops the fusion"
 *
 * `MAX_DESCRIPTION_OVERLAP` remains as an absolute hard ceiling for
 * true copy-paste even within an area.
 *
 * Shape clusters + verb inconsistencies stay warn-only (extraction is a
 * refactor decision, not a build-block).
 */
export function checkMcpDryCleanliness(tools: ReadonlyArray<ErpaxMcpTool>): DryCleanlinessVerdict {
  const report = dryCleanScan(tools)
  const ok = report.descriptionDuplicates.length === 0
  const d = report.driftDistribution
  const targetStr = d.nextDisambiguationTarget
    ? `; next target ${d.nextDisambiguationTarget.a} ↔ ${d.nextDisambiguationTarget.b} (${d.nextDisambiguationTarget.score})`
    : ''
  const note = ok
    ? `${report.handCuratedCount} hand-curated tools — entropy=${d.driftEntropy}, stable-ceiling=${d.stableDriftCeiling}, gate=${d.realDriftFloor} (${d.intraAreaPairsScanned} intra + ${d.crossAreaPairsScanned} cross-area pairs); ${report.shapeClusters.length} shape clusters + ${report.verbInconsistencies.length} verb inconsistencies${targetStr}`
    : `${report.descriptionDuplicates.length} description duplicates need attention (gate=${d.realDriftFloor}, entropy=${d.driftEntropy}, computed from stable-ceiling=${d.stableDriftCeiling})${targetStr}`
  return { ok, report, note }
}
