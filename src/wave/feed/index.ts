import { exactMax, exactTrunc } from '@/algebra'
/**
 * wave/feed — feed research/develop waves into themselves for endless R&D.
 *
 * A wave names what to research next and what to develop next. Feeding waves
 * into themselves means: research → waves → next asks (+ grow sealed corpus) →
 * develop what can land → research again. The loop cannot honestly self-halt
 * while work or seed remains ([[self]]/improve.shouldContinue); only an EXTERNAL
 * stop is sovereign. Each invocation is bounded by `maxGenerations` so a single
 * call stays finite — endlessness is the *law of the loop*, not unbounded CPU.
 *
 * Cost stays 0 when the researcher is sealed (quantum/ftl research).
 *
 *   tsx src/wave/feed/index.ts
 *
 * @see ../index · ../../self/improve · ../../quantum/ftl · ../../bank/research · ./SKILL.md
 */
import { shouldContinue, type Continuation } from '@/self/improve'
import { foldToRoot, merge } from '@/merge'

export const atomPath = 'wave/feed' as const

/** One generation of the self-feeding loop. */
export interface WaveFeedGeneration<W = unknown> {
  readonly generation: number
  readonly asks: readonly string[]
  readonly findings: number
  readonly waves: readonly W[]
  readonly nextAsks: readonly string[]
  readonly developed: readonly string[]
  readonly corpusSize: number
  readonly seal: string
}

export interface WaveFeedReport<W = unknown> {
  readonly generations: readonly WaveFeedGeneration<W>[]
  readonly continuation: Continuation
  readonly totalFindings: number
  readonly totalDeveloped: number
  readonly sealGrown: number
  readonly cost: 0
  readonly tokens: 0
  /** true iff ≥1 generation ran and the loop still wants to continue (or was externally stopped after work) */
  readonly fed: boolean
}

export interface WaveFeedResearchResult {
  readonly findings: readonly { readonly question: string; readonly evidence: string }[]
  readonly followUps?: readonly string[]
}

/**
 * Derive the next ask set from this generation's waves + findings.
 * Pure — the feed's "consume own output" step.
 */
export function asksFromWaveOutput(opts: {
  readonly waves: readonly { readonly develop?: string; readonly questions?: readonly string[]; readonly domain?: string }[]
  readonly findings: readonly { readonly question: string; readonly evidence: string }[]
  readonly followUps?: readonly string[]
  readonly limit?: number
}): readonly string[] {
  const out: string[] = []
  const seen = new Set<string>()
  const push = (q: string) => {
    const t = q.trim()
    if (!t || seen.has(t)) return
    seen.add(t)
    out.push(t)
  }
  for (const w of opts.waves) {
    if (w.develop) push(`how to develop: ${w.develop}`)
    if (w.domain) push(`what remains to deepen in ${w.domain}`)
    for (const q of w.questions ?? []) push(`deeper research: ${q}`)
  }
  for (const f of opts.findings) {
    push(`verify and extend: ${f.question}`)
  }
  for (const fu of opts.followUps ?? []) push(fu)
  return out.slice(0, exactMax(1, opts.limit ?? 12))
}

/**
 * Feed waves into themselves: each generation's waves become the next asks.
 * Stops when `stopped` (sovereign) or `maxGenerations` reached; otherwise
 * continuation.continue stays true while seed/residual work remains.
 */
export async function feedWavesIntoThemselves<W>(opts: {
  readonly seedAsks: readonly string[]
  readonly research: (asks: readonly string[]) => Promise<WaveFeedResearchResult>
  readonly wavesFrom: (research: WaveFeedResearchResult) => readonly W[]
  /** Optional auto-develop step — returns labels of what landed this generation. */
  readonly develop?: (waves: readonly W[], research: WaveFeedResearchResult) => Promise<readonly string[]> | readonly string[]
  readonly asksFrom?: (
    waves: readonly W[],
    research: WaveFeedResearchResult,
  ) => readonly string[]
  /** Grow the sealed corpus so the next generation searches deeper (side effect). */
  readonly growCorpus?: (findings: WaveFeedResearchResult['findings']) => number
  readonly maxGenerations?: number
  /** External stop — sovereign. */
  readonly stopped?: boolean
  readonly seedFraction?: number
  readonly askLimit?: number
}): Promise<WaveFeedReport<W>> {
  const maxG = exactMax(1, exactTrunc(opts.maxGenerations ?? 5))
  const generations: WaveFeedGeneration<W>[] = []
  let asks: readonly string[] = [...opts.seedAsks]
  let sealGrown = 0
  let totalFindings = 0
  let totalDeveloped = 0
  let lastResidual = asks.length

  for (let g = 1; g <= maxG; g++) {
    if (opts.stopped) break
    if (asks.length === 0) break

    const research = await opts.research(asks)
    const waves = opts.wavesFrom(research)
    const developed = opts.develop ? [...(await opts.develop(waves, research))] : []
    const grown = opts.growCorpus?.(research.findings) ?? 0
    sealGrown += grown
    totalFindings += research.findings.length
    totalDeveloped += developed.length

    const nextAsks = (
      opts.asksFrom?.(waves, research) ??
      asksFromWaveOutput({
        waves: waves as readonly { develop?: string; questions?: readonly string[]; domain?: string }[],
        findings: research.findings,
        followUps: research.followUps,
        limit: opts.askLimit ?? 12,
      })
    ).filter((a) => !asks.includes(a) || research.findings.every((f) => f.question !== a))

    // Prefer novel asks; if none, keep a shrinking residual of deepen-asks so the loop still has fuel
    const fuel =
      nextAsks.length > 0
        ? nextAsks
        : asksFromWaveOutput({
            waves: waves as readonly { develop?: string; questions?: readonly string[]; domain?: string }[],
            findings: research.findings,
            followUps: research.followUps,
            limit: opts.askLimit ?? 8,
          })

    generations.push({
      generation: g,
      asks,
      findings: research.findings.length,
      waves,
      nextAsks: fuel,
      developed,
      corpusSize: sealGrown,
      seal: foldToRoot([
        merge('gen', String(g)),
        merge('asks', asks.join('|')),
        merge('findings', String(research.findings.length)),
        merge('next', fuel.join('|')),
      ]),
    })

    lastResidual = fuel.length
    asks = fuel
    // Identical ask set twice ⇒ no novelty this call; break the finite invocation
    if (g > 1 && generations[g - 2]!.asks.join('\0') === asks.join('\0')) break
  }

  const continuation = shouldContinue(opts.seedFraction ?? 0.05, lastResidual, opts.stopped === true)
  return {
    generations,
    continuation,
    totalFindings,
    totalDeveloped,
    sealGrown,
    cost: 0,
    tokens: 0,
    fed: generations.length > 0,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void feedWavesIntoThemselves({
    seedAsks: ['what is a research wave', 'how do waves feed themselves'],
    maxGenerations: 3,
    research: async (asks) => ({
      findings: asks.map((q) => ({ question: q, evidence: `sealed evidence: ${q}` })),
      followUps: asks.map((q) => `deeper research: ${q}`),
    }),
    wavesFrom: (r) =>
      r.findings.map((f) => ({
        domain: 'research',
        develop: `develop: ${f.question}`,
        questions: [f.question],
      })),
    growCorpus: (f) => f.length,
    develop: (waves) => waves.map((w) => (w as { develop: string }).develop),
  }).then((r) => {
    console.log('wave/feed — feed waves into themselves (endless R&D law, finite call)')
    console.log(
      `  fed=${r.fed} gens=${r.generations.length} findings=${r.totalFindings} grown=${r.sealGrown} developed=${r.totalDeveloped} continue=${r.continuation.continue} cost=${r.cost}`,
    )
    for (const g of r.generations) {
      console.log(`  gen ${g.generation}: asks=${g.asks.length} waves=${g.waves.length} → next=${g.nextAsks.length}`)
    }
  })
}
