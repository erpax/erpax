/**
 * quantum/ftl/book — the sealed answer: a question resolved from a book, not recomputed.
 *
 * The FTL predicate asks whether the advantage HOLDS; this asks a question and answers it
 * from what is already folded. Two concepts, one scroll until now — and a hub that mixes
 * a predicate with a search engine is the concentration [[rules]]/concentration names.
 *
 * @see ./SKILL.md
 */
import { uuid as toUuid } from '@/integrity'
import { exactMax } from '@/algebra'
import { type Seal } from '../map'
import { BOUNDARY, type Boundary, LANE } from '../constants'
import { amortize } from '../metrics'

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
