import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { exactMax, exactRound } from '@/algebra'
/**
 * entropy -- the FUEL, the disorder the whole ledger balances, COMPUTED live.
 *
 * entropy is the one quantity erpax keeps double-entry books on (angel: order /
 * ↓entropy ⊕ archangel: duplicate / ↑entropy). Asymmetry IS slack: a binding
 * merge(a,b) present without its reverse merge(b,a) is a directed edge a forger
 * could ride one way. The reciprocal-edge fraction (the SAME number quantum's
 * entanglement reports) measures how symmetric the matrix is; the slack left
 * over -- 1 - that fraction -- is the borrowed disorder. Orphans (atoms bound
 * by nothing, binding nothing) are pure unfused disorder. entropy() is an
 * audit/aura signal, NOT an input to crackVerdict/coverageCostLog2: it is a
 * DISTINCT measure from coverage (the [0,1] fraction that prices tamper-cost),
 * so zero entropy does NOT by itself yield infinite cost. The cost reaches its
 * +∞ limit ONLY at coverage = 1 (the live tree is the counter-example: entropy
 * 0, coverage < 1, cost finite -- see ../balance).
 *
 *   tsx src/entropy/index.ts
 *
 * @audit computed from the live matrix, never hand-asserted
 * @see ../uuid/matrix -- ../quantum (same reciprocal count, two views) -- ../digit -- ../harmony (A432)
 */
import { UUID_MATRIX_NODES as N, UUID_MATRIX_EDGES as E, nodeIndexOf } from '@/uuid/matrix'
import { auraBalance, coverage, disbalance } from '@/balance'
import { HORO_DIGITS, horoRatio, type HoroStep } from '@/horo'
import { COMPARABLE_UNIT, LANDAUER_BIT } from '@/readme/entropy-unit'

/** Reciprocity: # directed edges whose reverse is also present (EXACTLY as quantum.entanglement). */
export function reciprocity(): { reciprocal: number; edges: number; fraction: number } {
  const edgeSet = new Set(E.map((e) => e.f + ',' + e.t))
  let reciprocal = 0
  for (const e of E) if (edgeSet.has(e.t + ',' + e.f)) reciprocal++
  return { reciprocal, edges: E.length, fraction: reciprocal / E.length }
}

/** Borrowed-disorder slack in [0,1] = the asymmetry a forger could exploit (1 - reciprocity). */
export const entropy = (): number => 1 - reciprocity().fraction

/** Orphans: atom names with ZERO incoming AND ZERO outgoing edges (fully unbound disorder). */
export function orphans(): string[] {
  const bound = new Set<number>()
  for (const e of E) {
    bound.add(e.f)
    bound.add(e.t)
  }
  // Edges reference the CANONICAL index per atom name (nodeIndexOf, which prefers the root when an
  // atom is a homonym — 366 atoms carry method sub-nodes). Checking the raw array position instead
  // flagged every non-preferred homonym position as a false orphan. Judge each DISTINCT atom by its
  // canonical index against the edge set.
  const seen = new Set<string>()
  const out: string[] = []
  for (const n of N) {
    if (seen.has(n.atom)) continue
    seen.add(n.atom)
    const i = nodeIndexOf(n.atom)
    if (i === undefined || !bound.has(i)) out.push(n.atom)
  }
  return out
}

// ── Landauer free energy from zero entropy (theorem + metric) ────────────────
// Folded here from the former stray accounting entropy-proof file (a hyphenated
// file at a grouping-prefix root): free energy comes from zero entropy — F is
// maximized iff corpus entropy S → 0. Bindings only, no hand constants.

/** Horo unity — last ring position (close / decade ratio 9/10). */
export const UNITY_HORO_STEP = HORO_DIGITS[HORO_DIGITS.length - 1]!

const roundBits = (n: number): number => exactRound(n * 1000) / 1000

/** Corpus entropy S (bits) — gap/seal eb imbalance + violation bits at Landauer floor. */
export function corpusEntropyBits(entropyEb: number, violationCount: number): number {
  const disorderEb = exactMax(0, entropyEb)
  const violationBits = exactMax(0, violationCount) * LANDAUER_BIT
  return roundBits(disorderEb + violationBits)
}

/** Max reversible work capacity — tamper-sealed work × horo unity, else seal mass × unity. */
export function fMaxFromBindings(workTamperProduct: number, totalSealEb: number): number {
  const unityScale = horoRatio(UNITY_HORO_STEP as HoroStep)
  const capacity = workTamperProduct > 0 ? workTamperProduct : exactMax(0, totalSealEb)
  return roundBits(capacity * unityScale)
}

/** Free energy at entropy S — monotone decreasing in S. */
export function freeEnergyBitsAt(S: number, fMax: number): number {
  return exactMax(0, roundBits(fMax - S * LANDAUER_BIT))
}

export interface FreeEnergyFromEntropyInput {
  /** Net corpus entropy eb (gap − seal rollup). */
  readonly entropyEb: number
  readonly violationCount: number
  readonly workTamperProduct: number
  readonly totalSealEb?: number
}

export interface FreeEnergyFromEntropyVerdict {
  readonly unit: typeof COMPARABLE_UNIT
  readonly entropyEb: number
  /** Corpus entropy S in bits (eb disorder + violation bits). */
  readonly S: number
  readonly F_max: number
  readonly freeEnergyBits: number
  /** ΔF available by erasing S to zero — S · LANDAUER_BIT. */
  readonly releasePotential: number
  /** Percent progress toward zero entropy (100 at S = 0). */
  readonly scaleTowardZeroPct: number
}

/** Live free-energy verdict from corpus entropy inputs — all derived. */
export function freeEnergyFromEntropy(input: FreeEnergyFromEntropyInput): FreeEnergyFromEntropyVerdict {
  const S = corpusEntropyBits(input.entropyEb, input.violationCount)
  const F_max = fMaxFromBindings(input.workTamperProduct, input.totalSealEb ?? 0)
  const freeEnergyBits = freeEnergyBitsAt(S, F_max)
  const releasePotential = roundBits(S * LANDAUER_BIT)
  const sAtZero = F_max / LANDAUER_BIT
  const scaleTowardZeroPct =
    S <= 0 ? 100 : sAtZero <= 0 ? 0 : roundBits(exactMax(0, 100 * (1 - S / sAtZero)))

  return {
    unit: COMPARABLE_UNIT,
    entropyEb: input.entropyEb,
    S,
    F_max,
    freeEnergyBits,
    releasePotential,
    scaleTowardZeroPct,
  }
}

export interface ProofStep {
  readonly id: string
  readonly math: string
  readonly binding?: string
}

export interface FreeEnergyProof {
  readonly theorem: string
  readonly definitions: Readonly<Record<string, string>>
  readonly steps: readonly ProofStep[]
  readonly QED: boolean
}

/** Structured Landauer proof — F maximized iff S = 0. QED when constraints hold on (S, F_max). */
export function proveFreeEnergyFromZeroEntropy(opts: {
  readonly S: number
  readonly fMax: number
}): FreeEnergyProof {
  const { S, fMax } = opts
  const F0 = freeEnergyBitsAt(0, fMax)
  const FS = freeEnergyBitsAt(S, fMax)

  const steps: ProofStep[] = [
    { id: 'def-S', math: 'S = max(0, eb_gap − eb_seal) + V · LANDAUER_BIT', binding: 'LANDAUER_BIT' },
    { id: 'def-F', math: 'F(S) = F_max − S · LANDAUER_BIT', binding: 'LANDAUER_BIT' },
    { id: 'def-Fmax', math: `F_max = W_tamper × horoRatio(${UNITY_HORO_STEP})  ∨  sealEb × horoRatio(${UNITY_HORO_STEP})`, binding: 'HORO_DIGITS' },
    { id: 'landauer', math: 'ΔE_erase ≥ kT ln 2  ⇒  per-bit erasure cost ≥ LANDAUER_BIT = log₂(2)', binding: 'LANDAUER_BIT' },
    { id: 'monotone', math: 'dF/dS = −LANDAUER_BIT < 0  ∀ S ≥ 0  ⇒  F strictly decreasing in S', binding: 'LANDAUER_BIT' },
    { id: 'limit', math: 'lim_{S→0} F(S) = F_max' },
    { id: 'maximum', math: 'F(0) = F_max  >  F(S)  ∀ S > 0' },
    { id: 'corollary', math: 'ΔF = F(S₁) − F(S₂) = (S₂ − S₁) · LANDAUER_BIT  when S₂ > S₁', binding: 'LANDAUER_BIT' },
  ]

  const landauerPositive = LANDAUER_BIT > 0
  const fAtZeroIsMax = S <= 0 ? F0 === roundBits(fMax) : F0 > FS
  const corollaryHolds = S <= 0 || roundBits(F0 - FS) === roundBits(S * LANDAUER_BIT)
  const QED = landauerPositive && fMax >= 0 && fAtZeroIsMax && corollaryHolds

  return {
    theorem: 'Free energy F is uniquely maximized at S = 0 (zero corpus entropy).',
    definitions: {
      S: 'corpus entropy (bits) — gap/seal eb imbalance + violation bits',
      F: 'free energy (bits) — reversible work capacity without further erasure',
      W_tamper: 'workTamperProduct — sealed work × tamper cost log₂',
      unit: COMPARABLE_UNIT,
    },
    steps,
    QED,
  }
}

export interface EntropyProofMarkdownOpts {
  readonly entropyEb: number
  readonly violationCount: number
  readonly workTamperProduct: number
  readonly totalSealEb?: number
  readonly totalGapEb?: number
}

/** Render proof + F(S) line for root README corpus entropy section — computed. */
export function entropyProofMarkdown(opts: EntropyProofMarkdownOpts): string {
  const verdict = freeEnergyFromEntropy(opts)
  const proof = proveFreeEnergyFromZeroEntropy({ S: verdict.S, fMax: verdict.F_max })
  const L: string[] = [
    '',
    '### free energy (Landauer)',
    '',
    `Theorem: ${proof.theorem} QED: \`${proof.QED}\`.`,
    '',
    '| symbol | definition |',
    '| ------ | ---------- |',
    ...Object.entries(proof.definitions).map(([k, v]) => `| \`${k}\` | ${v} |`),
    '',
    'Proof steps:',
    ...proof.steps.map((s, i) => `${i + 1}. \`${s.math}\`${s.binding ? ` · ${s.binding}` : ''}`),
    '',
    `- S \`${verdict.S}\` bits · F_max \`${verdict.F_max}\` · F(S) \`${verdict.freeEnergyBits}\` bits · release potential \`${verdict.releasePotential}\` bits`,
    `- scale toward zero entropy \`${verdict.scaleTowardZeroPct}%\` · unit \`${verdict.unit}\``,
  ]
  return L.join('\n')
}

/** Sample F(S) table for audit — S values derived from F_max scale (no hand literals). */
export function freeEnergySampleTable(fMax: number): ReadonlyArray<{ S: number; F: number }> {
  const sMax = fMax > 0 ? fMax / LANDAUER_BIT : 0
  const samples =
    sMax > 0
      ? [0, sMax / HORO_DIGITS.length, sMax].map((s) => exactRound(s))
      : [0, LANDAUER_BIT, LANDAUER_BIT * HORO_DIGITS.length]
  const unique = [...new Set(samples.map((s) => exactMax(0, exactRound(s))))].sort((a, b) => a - b)
  return unique.map((S) => ({ S, F: freeEnergyBitsAt(S, fMax) }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = reciprocity()
  console.log('entropy (' + N.length + ' nodes):')
  console.log('  reciprocity: ' + r.reciprocal + '/' + r.edges + ' (' + (100 * r.fraction).toFixed(1) + '% symmetric)')
  console.log('  entropy=' + entropy().toFixed(4) + ' (borrowed slack)  orphans=' + orphans().length)
  const b = auraBalance()
  console.log(
    '  model⊕collection: ' +
      b.balanced +
      '/' +
      b.collections +
      ' collections have their model (' +
      (100 * coverage(b)).toFixed(1) +
      '% coverage, disbalance ' +
      (100 * disbalance(b)).toFixed(1) +
      '%, tamper-cost ' +
      (coverage(b) >= 1 ? '∞' : 'finite — the slack') +
      ')',
  )
}

/**
 * The bare implication, as ONE definition — see ./SKILL.md § the bare-implication gate.
 *
 * An entropy/reciprocity premise within reach of an `infinite … (cost|mass|work)` consequent.
 */
export const BARE_IMPLICATION =
  /(zero[\s-]*entropy|reciprocity\s*=\s*1|entropy\s*(\(\))?\s*(===?|⇒|=>|→|implies)).{0,80}?(infinit|∞).{0,40}?(cost|mass|work)/i

/**
 * Tokens marking the sentence as qualified or negated — the honest framing.
 *
 * `\bfinite\b` is word-bounded so it does NOT match inside "in·finite"; without that, every
 * "infinite cost" sentence would look falsely qualified and the gate could never fire.
 */
export const IMPLICATION_QUALIFIER =
  /\bnot\b|does not|cannot|distinct|do not conflate|coverage\s*[=<>]?\s*1|\bfinite\b|counter-?example|only at coverage|≠|is NOT|by itself|anchor/i

/**
 * The slogan inside quotes, backticks or emphasis is being CITED, not asserted.
 *
 * The same refusal [[rules]]/forge and [[rules]]/prose make: a comment quoting a forgery to explain
 * it is not a forgery, and a marker in a string literal is data. Three sentences in this corpus
 * quote the slogan in order to refute or formalise it, and flagging those would make the gate
 * report its own refutation as the defect.
 */
const CITES_THE_SLOGAN =
  /["“”`*]\s*zero[\s-]*entropy[^"“”`*]{0,60}(infinit|∞)[^"“”`*]{0,30}(cost|mass|work)\s*["“”`*]/i

/** A sentence ASSERTING the implication — no local qualifier, and not merely quoting it. */
export const statesBareImplication = (raw: string): boolean => {
  const sentence = unlinked(raw)
  return BARE_IMPLICATION.test(sentence) && !IMPLICATION_QUALIFIER.test(sentence) && !CITES_THE_SLOGAN.test(sentence)
}

/** Sentence-ish split, so a qualifier must be LOCAL to the implication. */
export const sentencesOf = (text: string): string[] => text.split(/(?<=[.;])\s+|\n+/)

/**
 * Wikilink brackets removed, so the predicate sees the WORDS.
 *
 * Without this the gate reported **0** while `diamond/SKILL.md` asserted
 * `zero [[entropy]] ⇒ infinite tamper-[[cost]]` in its Law line: `zero[\s-]*entropy` cannot match
 * `zero [[entropy]]`. [[rules]]/probe — a filter that selects by name cannot see what it does not
 * name, and what it misses is systematically the thing nobody thought to name.
 */
export const unlinked = (text: string): string => text.replace(/\[\[([^\]|]+)(\|[^\]]*)?\]\]/g, '$1')

export interface BareClaim {
  readonly file: string
  readonly sentence: string
}

/**
 * Every hand-maintained sentence in the corpus asserting the bare implication.
 *
 * The predicate above was pinned to THREE files (`entropy/SKILL.md`, `entropy/index.ts`,
 * `law/SKILL.md`) while 24 carried the claim — [[rules]]/domain inside the gate written for it.
 * Generated faces are excluded because they restate their source; heal the source and regenerate.
 */
/**
 * The three files that DEFINE or REGISTER this check, DECLARED so the exemption is visible.
 *
 * The predicate's own fixtures assert that it fires, and the gate registry's comment names the
 * axis — both are the corpus describing its own defence, which [[rules]]/inject warns is the
 * failure mode of a broad detector. Narrow on purpose: every other file under `src` is judged,
 * including `law/` and `entropy/SKILL.md`.
 */
export const DEFINES_THE_LAW: readonly string[] = [
  'src/entropy/index.ts',
  'src/entropy/test.ts',
  'src/rules/index.ts',
]

export function bareImplications(cwd: string = process.cwd()): BareClaim[] {
  const out: BareClaim[] = []
  const walk = (d: string): void => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      if (!/\.(md|tsx?)$/.test(e.name)) continue
      if (/^(LLM|README)\.md$/.test(e.name) || /\.generated\.tsx?$|^(catalogue|translations|payload-types)\./.test(e.name)) continue
      const rel = relative(cwd, p)
      if (DEFINES_THE_LAW.includes(rel)) continue
      for (const s of sentencesOf(readFileSync(p, 'utf8'))) {
        if (statesBareImplication(s)) out.push({ file: rel, sentence: s.trim().slice(0, 160) })
      }
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/** Zero is a THEOREM: no sentence may assert an implication the corpus computes as false. */
export function assertNoBareImplication(cwd: string = process.cwd()): void {
  const bare = bareImplications(cwd)
  if (bare.length === 0) return
  throw new Error(
    `✖ entropy — ${bare.length} sentence(s) assert 'coverage = 1 ⇒ unbounded cost' with no qualifier:\n` +
      bare.map((b) => `  ${b.file}\n    ${b.sentence}`).join('\n'),
  )
}
