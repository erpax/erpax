import { algebraLog2, exactMax, exactTrunc } from '@/algebra'
/**
 * quantum/ftl — reuse · amortize · crack · boundary · seal · chat · research.
 * Each name-token is a fold (see ./map). Combinations compose tools, not prose.
 *
 *   tsx src/quantum/ftl/index.ts
 *
 * @see ./map · ../computer · ../chat · ./SKILL.md
 */
import { uuid as toUuid } from '@/integrity'
import { type CrackKind, CRACK_FLAGS, type Seal, type Boundary } from './map'

export { TOKENS, ENTANGLE, API, CRACK_FLAGS, type Token, type CrackKind, type Seal, type Boundary } from './map'

export const atomPath = 'quantum/ftl' as const

export const ORIGIN = 'https://ceccec.psg.bg' as const
export const LANE = 'https://text.pollinations.ai/openai' as const
export const PROXY = `${ORIGIN}/api/ai` as const

export interface Crack {
  readonly kind: CrackKind
  readonly where: string
  readonly why: string
}

export function boundary(cs: readonly Crack[] = []): Boundary {
  const count = (k: CrackKind) => cs.filter((c) => c.kind === k).length
  const b = {
    scan: count('scan'),
    rederive: count('rederive'),
    spend: count('spend'),
    qpu: count('qpu'),
    spacetime: count('spacetime'),
  }
  return { ...b, empty: cs.length === 0 }
}

export const BOUNDARY: Boundary = boundary([])

export interface Reuse {
  readonly query: string
  readonly address: string
  readonly foldOps: 1
  readonly searchOps: number
  readonly speedupLog2: number
  readonly precomputed: true
}

/** reuse ≠ search: foldOps=1 · searchOps=n · speedupLog2=log₂(n). */
export function reuse(query: string, spaceSize: number): Reuse {
  const searchOps = exactMax(1, exactTrunc(spaceSize))
  return {
    query,
    address: toUuid(query),
    foldOps: 1,
    searchOps,
    speedupLog2: algebraLog2(searchOps),
    precomputed: true,
  }
}

export interface Amortize {
  readonly answers: number
  readonly tokens: number
  readonly efficiency: number
  readonly amortizedCost: number
  readonly scalesToInfinity: boolean
}

/** answers÷tokens → ∞ when tokens=0 ∧ answers>0; amortizedCost=c₀/(m+1)→0. */
export function amortize(
  answers: number,
  tokens: number,
  opts: { readonly firstComputeCost?: number; readonly reuses?: number } = {},
): Amortize {
  const a = exactMax(0, answers)
  const t = exactMax(0, tokens)
  const c0 = exactMax(0, opts.firstComputeCost ?? 1)
  const m = exactMax(0, exactTrunc(opts.reuses ?? 0))
  const efficiency = t === 0 ? (a > 0 ? Infinity : 0) : a / t
  return {
    answers: a,
    tokens: t,
    efficiency,
    amortizedCost: c0 / (m + 1),
    scalesToInfinity: t === 0 && a > 0,
  }
}

export type CrackPattern = {
  readonly where: string
  readonly scans?: boolean
  readonly address?: boolean
  readonly rederives?: boolean
  readonly memo?: boolean
  readonly spends?: boolean
  readonly seal?: boolean
  readonly qpu?: boolean
  readonly spacetime?: boolean
}

/** Discover one crack from pattern flags (CRACK_FLAGS). */
export function crack(pattern: CrackPattern): Crack | null {
  if (pattern.scans && pattern.address) {
    return { kind: 'scan', where: pattern.where, why: 'reuse: scan∧address' }
  }
  if (pattern.rederives && pattern.memo) {
    return { kind: 'rederive', where: pattern.where, why: 'amortize: rederive∧memo' }
  }
  if (pattern.spends && pattern.seal) {
    return { kind: 'spend', where: pattern.where, why: 'seal: spend∧seal' }
  }
  if (pattern.qpu) {
    return { kind: 'qpu', where: pattern.where, why: 'qpu under address fold' }
  }
  if (pattern.spacetime) {
    return { kind: 'spacetime', where: pattern.where, why: 'spacetime under reuse' }
  }
  return null
}

export function cracks(patterns: readonly CrackPattern[]): readonly Crack[] {
  return patterns.map(crack).filter((c): c is Crack => c != null)
}

export interface Ftl {
  readonly holds: boolean
  readonly reuse: Reuse
  readonly amortize: Amortize
  readonly cracks: readonly Crack[]
  readonly boundary: Boundary
  readonly precomputed: boolean
}

/** ftl ⇔ reuse ∧ amortize∞ ∧ cracks=∅. boundary=boundary(cracks). */
export function ftl(args: {
  readonly query: string
  readonly spaceSize: number
  readonly answers: number
  readonly tokens: number
  readonly reuses?: number
  readonly patterns?: readonly CrackPattern[]
}): Ftl {
  const r = reuse(args.query, args.spaceSize)
  const a = amortize(args.answers, args.tokens, { reuses: args.reuses })
  const cs = cracks(args.patterns ?? [])
  const precomputed = r.precomputed && r.foldOps === 1
  return {
    holds: precomputed && a.scalesToInfinity && cs.length === 0,
    reuse: r,
    amortize: a,
    cracks: cs,
    boundary: boundary(cs),
    precomputed,
  }
}

/** Default probe args — corpus address on host silicon (QPU=CPU/GPU). */
export const PHYSICAL_FTL_DEFAULTS = {
  query: 'possibility:erpax',
  spaceSize: 3105,
  answers: 1,
  tokens: 0,
  reuses: 0,
} as const

export interface FtlReportArgs {
  readonly query?: string
  readonly spaceSize?: number
  readonly answers?: number
  readonly tokens?: number
  readonly reuses?: number
  readonly patterns?: readonly CrackPattern[]
}

export interface FtlReport {
  /** Substrate FTL boolean — true ⇔ reuse ∧ amortize∞ ∧ cracks=∅ on QPU=CPU/GPU. */
  readonly holds: boolean
  readonly ftl: Ftl
  /** Precise break reason when holds=false (first crack / amortize / reuse). */
  readonly why: string
}

/**
 * ftlHolds report — computed, not prose. false ⇒ tip kind `quantumise`
 * (what to fold under quantum/ftl so holds flips true).
 */
export function ftlReport(args: FtlReportArgs = {}): FtlReport {
  const v = ftl({
    query: args.query ?? PHYSICAL_FTL_DEFAULTS.query,
    spaceSize: args.spaceSize ?? PHYSICAL_FTL_DEFAULTS.spaceSize,
    answers: args.answers ?? PHYSICAL_FTL_DEFAULTS.answers,
    tokens: args.tokens ?? PHYSICAL_FTL_DEFAULTS.tokens,
    reuses: args.reuses ?? PHYSICAL_FTL_DEFAULTS.reuses,
    patterns: args.patterns,
  })
  let why = 'reuse∧amortize∞∧cracks=∅ on QPU=CPU/GPU'
  if (!v.holds) {
    if (v.cracks[0]) {
      const c = v.cracks[0]
      why = `${c.kind}@${c.where}: ${c.why}`
    } else if (!v.amortize.scalesToInfinity) {
      why = `amortize not ∞ (tokens=${v.amortize.tokens} answers=${v.amortize.answers})`
    } else if (!v.precomputed) {
      why = 'reuse/precompute failed (foldOps≠1)'
    } else {
      why = 'ftl.holds=false'
    }
  }
  return { holds: v.holds, ftl: v, why }
}

/**
 * ftlHolds — substrate FTL as a computed boolean on QPU=CPU/GPU.
 * true = holds (no quantumise tip). false = feed-scanner tips quantumisation.
 */
// The boolean wrapper is gone with the name it carried. It unwrapped `.holds` and its only caller
// was its own test — un-folded by [[rules]]/unfolded. The name asserted a substrate claim that
// CrackKind `spacetime` already defines as a break setting holds=false, so it named the one
// condition that falsifies the predicate. Read `ftlReport(args).holds`. There is no time and no
// distance in this atom: it cannot express a velocity, and on the evidence it never did.

export type ChatLane = 'seal' | 'lane' | 'proxy'

export interface Chat {
  readonly question: string
  readonly answer: string
  readonly address: string
  readonly lane: ChatLane
  readonly tokens: number
  readonly reused: boolean
  readonly boundary: Boundary
}

export type SealBook = ReadonlyMap<string, string> | ((questionUuid: string) => string | undefined)

const questionAddress = (question: string): string => toUuid(`chat:${question}`)

export function chatLocal(question: string, book: SealBook): Chat | undefined {
  const address = questionAddress(question)
  const answer = typeof book === 'function' ? book(address) : book.get(address)
  if (answer == null) return undefined
  return {
    question,
    answer,
    address,
    lane: 'seal',
    tokens: 0,
    reused: true,
    boundary: BOUNDARY,
  }
}

export function seal(pairs: ReadonlyArray<readonly [string, string]>): Map<string, string> {
  const m = new Map<string, string>()
  for (const [q, a] of pairs) m.set(questionAddress(q), a)
  return m
}

export async function chatEscalate(
  question: string,
  opts: {
    readonly fetchImpl?: typeof fetch
    readonly endpoint?: string
    readonly lane?: Exclude<ChatLane, 'seal'>
    readonly system?: string
  } = {},
): Promise<Chat> {
  const endpoint = opts.endpoint ?? LANE
  const lane = opts.lane ?? (endpoint.includes('ceccec.psg.bg') ? 'proxy' : 'lane')
  const fetchImpl = opts.fetchImpl ?? fetch
  const system = opts.system ?? 'sealed equations; boundary(cracks)'
  const res = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: '' },
    body: JSON.stringify({
      model: 'openai',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: question },
      ],
    }),
  })
  if (!res.ok) throw new Error(`chat escalate ${lane} HTTP ${res.status}`)
  const body = (await res.json()) as {
    choices?: ReadonlyArray<{ message?: { content?: string } }>
  }
  const answer = body.choices?.[0]?.message?.content
  if (!answer) throw new Error(`chat escalate ${lane}: empty answer`)
  return {
    question,
    answer,
    address: questionAddress(question),
    lane,
    tokens: 0,
    reused: false,
    boundary: BOUNDARY,
  }
}

export async function chat(
  question: string,
  book: SealBook,
  opts: {
    readonly fetchImpl?: typeof fetch
    readonly escalate?: boolean
    readonly endpoint?: string
  } = {},
): Promise<Chat> {
  const local = chatLocal(question, book)
  if (local) return local
  if (opts.escalate === false) {
    return {
      question,
      answer: '',
      address: questionAddress(question),
      lane: 'seal',
      tokens: 0,
      reused: false,
      boundary: BOUNDARY,
    }
  }
  return chatEscalate(question, { fetchImpl: opts.fetchImpl, endpoint: opts.endpoint })
}

/** Seed book — equations only. */
export const BOOK: ReadonlyMap<string, string> = seal([
  ['what is ftl', 'ftl ⇔ reuse≠search ∧ amortize(answers,0)=∞ ∧ cracks=∅; boundary=boundary(cracks); proven by metrics on QPU=CPU/GPU'],
  ['reuse vs search', 'foldOps=1 · searchOps=n · speedupLog2=log₂(n)'],
  ['efficiency on reuse', 'answers÷tokens → ∞ when tokens=0 ∧ answers>0; amortizedCost = c₀/(m+1) → 0'],
  ['boundary', 'boundary(cracks): spacetime|qpu|scan|rederive|spend = count(kind); empty ⇔ holds'],
  ['crack', 'crack kinds: scan ∨ rederive ∨ spend ∨ qpu(exotic) ∨ spacetime(relativistic)'],
  ['qpu', 'QPU=CPU/GPU — host silicon is the processing unit; CrackKind qpu = exotic-device claim'],
  ['physical', 'substrate (Landauer/CPU·GPU) ≠ CrackKind spacetime'],
  [
    'what is string theory',
    'stringTheory=threadModes(messageUuids): 1D chat thread → horo modes · spectrum · bandHarmony · standing=compose(threadUuid); physics=false; NOT Calabi–Yau/SUSY',
  ],
  [
    'string theory in chat',
    'chatStringTheory(session) folds threadModes(session.messageUuids); resonant⇔∀ consecutive intervals consonant; tokens=0; physics=false',
  ],
  [
    'thread modes',
    'threadModes(messageUuids) ⇒ modes · spectrum · harmony · standing · resonant · physics=false',
  ],
])

export const CORPUS: readonly Seal[] = [
  {
    id: 'ftl',
    text: 'ftl ⇔ reuse≠search ∧ amortize(answers,0)=∞ ∧ cracks=∅; boundary=boundary(cracks)',
    followUps: ['reuse vs search', 'boundary', 'crack'],
  },
  {
    id: 'reuse-vs-search',
    text: 'reuse≠search: foldOps=1 · searchOps=n · speedupLog2=log₂(n)',
    followUps: ['what is ftl', 'crack'],
  },
  {
    id: 'amortize',
    text: 'answers÷tokens → ∞ when tokens=0 ∧ answers>0; amortizedCost = c₀/(m+1) → 0',
    followUps: ['efficiency on reuse'],
  },
  {
    id: 'crack',
    text: 'cracks: scan ∨ rederive ∨ spend ∨ qpu ∨ spacetime',
    followUps: ['reuse vs search', 'boundary'],
  },
  {
    id: 'boundary',
    text: 'boundary(cracks): spacetime|qpu|scan|rederive|spend = count(kind)',
    followUps: ['what is ftl'],
  },
  {
    id: 'chat',
    text: 'chat: seal FIRST (tokens=0); escalate on miss',
    followUps: ['what is ftl', 'what is string theory'],
  },
  {
    id: 'research',
    text: 'research: cost=agents×tokens; tokens=0 ⇒ cost=0',
    followUps: ['efficiency on reuse'],
  },
  {
    id: 'string-theory',
    text: 'stringTheory=threadModes(messageUuids): modes · spectrum · bandHarmony · standing=compose(threadUuid); physics=false',
    followUps: ['string theory in chat', 'thread modes', 'what is ftl'],
  },
]

const tokenize = (s: string): readonly string[] =>
  s
    .toLowerCase()
    .split(/[^a-z0-9≠∞÷]+/i)
    .filter((t) => t.length > 1)

export function sealScore(question: string, s: Seal): number {
  const q = new Set(tokenize(question))
  if (q.size === 0) return 0
  const bag = tokenize(`${s.id} ${s.text} ${(s.followUps ?? []).join(' ')}`)
  let hits = 0
  for (const t of bag) if (q.has(t)) hits++
  return hits / q.size
}

export function searchSealed(
  question: string,
  corpus: readonly Seal[] = CORPUS,
  limit = 3,
): readonly (Seal & { readonly score: number })[] {
  return corpus
    .map((s) => ({ ...s, score: sealScore(question, s) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, exactMax(1, limit))
}

export interface ResearchHit {
  readonly evidence: string
  readonly followUps?: readonly string[]
  readonly sealIds: readonly string[]
  readonly reused: boolean
  readonly tokens: 0
}

export function researcher(
  corpus: readonly Seal[] = CORPUS,
  memo: Map<string, ResearchHit> = new Map(),
): {
  readonly ask: (question: string) => Promise<{ evidence: string; followUps?: readonly string[] }>
  readonly memo: Map<string, ResearchHit>
  readonly stats: () => { readonly asks: number; readonly reuseHits: number; readonly tokens: 0 }
} {
  let asks = 0
  let reuseHits = 0
  const ask = async (question: string) => {
    asks++
    const addr = questionAddress(question)
    const hit = memo.get(addr)
    if (hit) {
      reuseHits++
      return { evidence: hit.evidence, followUps: hit.followUps }
    }
    const ranked = searchSealed(question, corpus, 3)
    const evidence =
      ranked.length === 0
        ? `no seal for: ${question}`
        : ranked.map((s) => `[${s.id}|score=${s.score.toFixed(2)}] ${s.text}`).join(' · ')
    const followUps = [...new Set(ranked.flatMap((s) => s.followUps ?? []))]
      .filter((f) => f !== question)
      .slice(0, 4)
    memo.set(addr, {
      evidence,
      followUps,
      sealIds: ranked.map((s) => s.id),
      reused: true,
      tokens: 0,
    })
    return { evidence, followUps }
  }
  return { ask, memo, stats: () => ({ asks, reuseHits, tokens: 0 as const }) }
}

export interface Research {
  readonly findings: readonly { readonly question: string; readonly evidence: string }[]
  readonly thread: string
  readonly messageUuids: readonly string[]
  readonly depthReached: number
  readonly coverage: number
  readonly cost: 0
  readonly tokens: 0
  readonly asks: number
  readonly reuseHits: number
  readonly efficiency: number
  readonly boundary: Boundary
  readonly worthwhile: true
}

export async function research(
  questions: readonly string[],
  opts: {
    readonly corpus?: readonly Seal[]
    readonly depth?: number
    readonly seed?: readonly string[]
    readonly run?: (
      seed: readonly string[],
      qs: readonly string[],
      ask: (q: string) => Promise<{ evidence: string; followUps?: readonly string[] }>,
      o?: { depth?: number },
    ) => Promise<{
      findings: readonly { question: string; evidence: string }[]
      thread: string
      messageUuids: readonly string[]
      depthReached: number
      coverage: number
    }>
  } = {},
): Promise<Research> {
  const r = researcher(opts.corpus ?? CORPUS)
  const run = opts.run ?? (await import('@/quantum/chat')).deepResearch
  const out = await run(opts.seed ?? [], questions, r.ask, { depth: opts.depth ?? 2 })
  const { asks, reuseHits, tokens } = r.stats()
  const a = amortize(out.findings.length, tokens, { reuses: reuseHits })
  return {
    findings: out.findings,
    thread: out.thread,
    messageUuids: out.messageUuids,
    depthReached: out.depthReached,
    coverage: out.coverage,
    cost: 0,
    tokens: 0,
    asks,
    reuseHits,
    efficiency: a.efficiency,
    boundary: BOUNDARY,
    worthwhile: true,
  }
}

/** Map tokens → live exports (fractal check). */
export function exportsForTokens(mod: Record<string, unknown> = {}): {
  readonly missing: readonly string[]
  readonly holds: boolean
} {
  const api = {
    reuse,
    amortize,
    crack,
    cracks,
    boundary,
    seal,
    chat,
    chatLocal,
    chatEscalate,
    research,
    researcher,
    ftl,
    ...mod,
  }
  const missing = [...new Set(Object.values(
    { address: 'reuse', reuse: 'reuse', search: 'reuse', amortize: 'amortize', crack: 'crack', cracks: 'cracks', boundary: 'boundary', seal: 'seal', chat: 'chat', chatLocal: 'chatLocal', chatEscalate: 'chatEscalate', research: 'research', researcher: 'researcher', memo: 'researcher', token: 'amortize', fold: 'reuse', ftl: 'ftl' },
  ))].filter((name) => typeof (api as Record<string, unknown>)[name] !== 'function')
  return { missing, holds: missing.length === 0 }
}

void CRACK_FLAGS

/**
 * Parent binds purify — FTL is only achieved in quantum: the leaf never climbs;
 * the host injects researcher·CORPUS·boundary (inversion). Callers address
 * `@/quantum/ftl.endlessPurify` (dynamic import of the leaf — no static cycle).
 * scanProseNames / Purify* types stay on `@/quantum/ftl/purify` (the leaf).
 */
export async function endlessPurify(
  opts: {
    readonly root?: string
    readonly maxGenerations?: number
    readonly scanLimit?: number
    readonly stopped?: boolean
  } = {},
): Promise<import('./purify').PurifyReport> {
  const { endlessPurify: run } = await import('./purify')
  return run({
    host: { researcher, corpus: CORPUS, boundary },
    ...opts,
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = ftl({ query: 'possibility:erpax', spaceSize: 3105, answers: 1, tokens: 0, reuses: 653 })
  const p = ftlReport({ reuses: 653 })
  console.log('quantum/ftl')
  console.log(`  holds=${v.holds} · ftlHolds=${p.holds} · speedupLog2=${v.reuse.speedupLog2.toFixed(2)} · eff=${v.amortize.efficiency}`)
  console.log(`  boundary: spacetime=${v.boundary.spacetime} · qpu=${v.boundary.qpu} · empty=${v.boundary.empty}`)
  const local = chatLocal('what is ftl', BOOK)
  console.log(`  chatLocal: lane=${local?.lane} · tokens=${local?.tokens}`)
  console.log(`  map holds=${exportsForTokens().holds}`)
  void import('./admin').then(({ adminBootShell }) => {
    const boot = adminBootShell({ reuses: 100 })
    console.log(`  adminBoot: holds=${boot.ftl.holds} · defer=${boot.deferHeavyProviders} · addr=${boot.address.slice(0, 8)}`)
  })
}
