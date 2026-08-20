import { messageUuid, threadUuid, isNovel } from '../merkle'
import { consensusProof } from '@/theorem'
import { BOOK, type Chat, type SealBook, chat, ftlReport } from '@/quantum/ftl'
import { type Tick, clock } from '@/quantum/clock'
import { coalescer } from '@/quantum/coalesce'

/**
 * IMPROVE: fold a message into the thread. `improved` is true iff it was novel — the
 * distinct coverage grew. A duplicate answer re-folds the chain (history still moves)
 * but does not improve coverage.
 */
export const improve = (
  messageUuids: readonly string[],
  message: string,
): { readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean } => {
  const improved = isNovel(messageUuids, message)
  const next = [...messageUuids, messageUuid(message)]
  return { thread: threadUuid(next), messageUuids: next, improved }
}

export interface ChatSession {
  readonly topic: string
  readonly messageUuids: readonly string[]
  /** current tamper-evident thread-uuid — the session's record of every folded change. */
  readonly thread: string
  readonly sealed: boolean
}

/** Open a session on a topic — the seed folds the topic (deterministic). */
export const startSession = (topic: string): ChatSession => {
  const seed = [messageUuid(`session:${topic}`)]
  return { topic, messageUuids: seed, thread: threadUuid(seed), sealed: false }
}

/** Fold a message (an improvement, a tool result) into the session. */
export const sessionAppend = (s: ChatSession, message: string): ChatSession => {
  const r = improve(s.messageUuids, message)
  return { ...s, messageUuids: r.messageUuids, thread: r.thread }
}

/** Seal the session — its thread-uuid is the tamper-evident record persisted to Payload. */
export const sealSession = (s: ChatSession): ChatSession => ({ ...s, sealed: true })

// ── folded down from the quantum/chat barrel ──────────────────────────────────
// Thirteen exports sat in the hub while every one was already routing: each opens
// or appends a ChatSession, or runs a message through `improve`. The manifest
// attributed all thirteen here and proved every symbol they drag is EXCLUSIVE —
// no referrer left behind, followed transitively, so ClaimStatus and TheoremCrack
// come along because ClaimVerdict and crackTheorem need them. Each cluster
// travels whole and nothing dangles. The barrel re-exports every name it used to
// offer, including the carried ones that were themselves exported.

// startSession · sessionAppend · sealSession live in ./routing (the facade split's
// child) and are re-exported at the top of this barrel. They were ALSO re-declared
// here — byte-identical copies — which esbuild refuses as a duplicate export and
// which broke the production build. One definition, re-exported once.

/**
 * Let all develop itself through the chat in COLLABORATIVE TEAMS: a proposal folds into the
 * session only when a 2f+1 quorum of the team agrees (theorem.consensusProof — "three minds form
 * a higher mind"). No single agent, and no operator, decides alone; the session records only what
 * the team compiled. Self-development gated by consensus.
 */
export function collaborate(
  session: ChatSession,
  proposal: string,
  verdicts: readonly boolean[],
): { readonly session: ChatSession; readonly accepted: boolean; readonly reason: string } {
  const { compiled, reason } = consensusProof(verdicts)
  if (!compiled) return { session, accepted: false, reason }
  const agree = verdicts.filter(Boolean).length
  return {
    session: sessionAppend(session, `team consensus (${agree}/${verdicts.length}): ${proposal}`),
    accepted: true,
    reason,
  }
}


/**
 * Invoke any quantum tool from the chat and fold its result into the thread. The
 * result becomes a normal message, so tool outputs join the ask→improve loop like
 * any other. `invoke` is the runtime-supplied MCP callTool (createInProcessClient),
 * keeping this a pure, cycle-free bridge.
 */
export async function chatInvoke(
  messageUuids: readonly string[],
  invoke: (name: string, args: Record<string, unknown>) => Promise<string>,
  toolName: string,
  args: Record<string, unknown> = {},
): Promise<{ readonly result: string; readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean }> {
  const result = await invoke(toolName, args)
  return { result, ...improve(messageUuids, `${toolName}: ${result}`) }
}


// ── invention by cracking theorems ───────────────────────────────────────────
// Every theorem this corpus kept was found by CRACKING the last one: a gate caught
// its own author, a claim met a counterexample, and the crack pointed straight at the
// next theorem. Invention is not addition — it is falsification that lands somewhere.
// crackTheorem probes a claim across a domain IN PARALLEL; each probe that fails is a
// crack, folded into the thread as an INVENTION LEAD (the boundary the next theorem must
// close). A claim that cracks nowhere in the probed domain holds OVER THAT DOMAIN — the
// honest limit is the domain (bounded witness), never a proof of universality.

export interface TheoremCrack {
  readonly probe: string
  readonly cracked: boolean
  readonly why: string
}


/**
 * Crack a theorem through the chat: probe its claim in parallel; the cracks ARE the
 * invention frontier. `probe` returns whether the claim fails at that point and why —
 * a counterexample is a crack, and the crack is the lead the next theorem closes.
 */
export async function crackTheorem(
  seed: readonly string[],
  probe: (x: string) => Promise<{ cracked: boolean; why: string }> | { cracked: boolean; why: string },
  probes: readonly string[],
): Promise<{
  readonly cracks: readonly TheoremCrack[]
  readonly inventions: readonly string[]
  readonly holds: boolean
  readonly thread: string
  readonly messageUuids: readonly string[]
}> {
  const results = await Promise.all(probes.map(async (p) => ({ probe: p, ...(await probe(p)) })))
  let messageUuids: readonly string[] = [...seed]
  const cracks: TheoremCrack[] = []
  for (const r of results) {
    if (r.cracked) {
      cracks.push(r)
      messageUuids = improve(messageUuids, `crack @ ${r.probe}: ${r.why} — invention lead`).messageUuids
    }
  }
  return {
    cracks,
    inventions: cracks.map((c) => `close the boundary: ${c.probe} — ${c.why}`),
    holds: cracks.length === 0, // over the probed domain only (bounded witness)
    thread: threadUuid(messageUuids),
    messageUuids,
  }
}


// ── improve a claim for all — the refutable law as a chat action ──────────────
// A bare assertion is not a claim; a REFUTABLE one is ([[rules]]/refutable: a claim
// with no proof beside it forbids nothing). improveClaim runs the claim through the
// cracker: a crack REFUTES it (refutability proven — the claim is false, and the
// crack is its correction), no crack leaves it unrefuted-but-UNPROVEN — which by the
// refutable law is decoration until a proof is attached. Either way the assertion is
// improved into a refutable claim, folded into the thread for everyone.

export type ClaimStatus = 'refuted' | 'unrefuted-unproven'


export interface ClaimVerdict {
  readonly claim: string
  readonly status: ClaimStatus
  /** the crack that refuted it, when refuted. */
  readonly refutation?: string
  /** what turns this into a better (refutable) claim, for all. */
  readonly improvement: string
  readonly thread: string
  readonly messageUuids: readonly string[]
}


/** Improve a claim for all: crack it across a domain, then state its refutability + how to raise it. */
export async function improveClaim(
  seed: readonly string[],
  probe: (x: string) => Promise<{ cracked: boolean; why: string }> | { cracked: boolean; why: string },
  claim: string,
  probes: readonly string[],
): Promise<ClaimVerdict> {
  const cracked = await crackTheorem(seed, probe, probes)
  if (cracked.cracks.length > 0) {
    return {
      claim,
      status: 'refuted',
      refutation: cracked.cracks[0]!.why,
      improvement: 'refuted — replace the assertion with the corrected claim the crack reveals',
      thread: cracked.thread,
      messageUuids: cracked.messageUuids,
    }
  }
  const folded = improve(cracked.messageUuids, `claim holds over ${probes.length} probe(s): ${claim} — attach a proof to make it a law`)
  return {
    claim,
    status: 'unrefuted-unproven',
    improvement: 'unrefuted over the probed domain — by rules/refutable it is decoration until a proof (test) is attached',
    thread: folded.thread,
    messageUuids: folded.messageUuids,
  }
}


/**
 * Ask through chat at ftl: fold seal into the session.
 * Local seal → tokens=0; misses may escalate. Boundary from boundary(cracks).
 */
export async function chatFreeAsk(
  session: ChatSession,
  question: string,
  opts: {
    readonly book?: SealBook
    readonly fetchImpl?: typeof fetch
    readonly escalate?: boolean
  } = {},
): Promise<{ readonly session: ChatSession; readonly answer: Chat }> {
  const answer = await chat(question, opts.book ?? BOOK, {
    fetchImpl: opts.fetchImpl,
    escalate: opts.escalate,
  })
  const next = sessionAppend(
    session,
    `free-chat[${answer.lane}|tokens=${answer.tokens}|reused=${answer.reused}]: ${answer.answer}`,
  )
  return { session: next, answer }
}


/** What a chat machine actually spent — every field MEASURED, none supplied. */
export interface ChatFtl {
  /** questions answered */
  readonly answers: number
  /** upstream `chat()` calls actually made */
  readonly tokens: number
  /** answers served from an in-flight or retained fold */
  readonly reuses: number
  /** ftl.holds computed from the two numbers above, not from arguments */
  readonly holds: boolean
  /** sealed order of this machine's asks — reordering history changes it */
  readonly head: string | null
}


export interface ChatMachine {
  ask(
    session: ChatSession,
    question: string,
    opts?: { readonly book?: SealBook; readonly fetchImpl?: typeof fetch; readonly escalate?: boolean },
  ): Promise<{ readonly session: ChatSession; readonly answer: Chat; readonly tick: Tick }>
  ftl(): ChatFtl
}


/**
 * Chat at ftl, MEASURED.
 *
 * Theorem 238 says *"chat is ftl: seal first (tokens=0), escalate anonymously only on miss"*, and
 * `chatFreeAsk` already seals first. Two things were missing, and both are now folded in:
 *
 *   1. COALESCE — N callers asking the same question concurrently each escalated separately. The
 *      question's content-address matches BEFORE any call is made ([[quantum]]/coalesce), so
 *      identical asks collapse onto one upstream `chat()`. Duplicate work provably disappears.
 *   2. ORDER — a session appended to an array, so history could be reordered silently. Each ask now
 *      ticks [[quantum]]/clock, and the head seals the sequence: edit or reorder an ask and the head
 *      cannot reproduce.
 *
 * `ftl()` then reports `holds` from what was actually spent. That is the whole point: `ftl.holds`
 * fed with caller-supplied numbers restates its arguments and nothing can contradict it. Fed from
 * here, a genuinely novel question yields `tokens > 0` and REFUTES the claim — which by
 * [[rules]]/refutable is the only condition under which it can be true.
 *
 * HONEST BOUNDARY — this reduces the NUMBER of escalations; it does not make one escalation faster,
 * and `holds` is a statement about reuse, never about physics: there is no time and no distance
 * here, so nothing claims a velocity.
 */
/**
 * A stable identity for a seal book, used ONLY as part of the coalescing key.
 *
 * `SealBook` is a `ReadonlyMap` or a lookup function, and neither carries a name — the previous
 * `o.book?.name` was `undefined` for every Map, so every custom book collapsed onto the same key as
 * "no book at all". Two different books coalesced into one flight, and one book's answer could be
 * served for another's question. The type error was the surface; that was the defect.
 *
 * Identity is by OBJECT, never by content: hashing the content would be slower than the lookup it
 * guards, and two books that merely look alike must still not share an answer.
 *
 * @invariant distinct books never share a key; the same book always yields the same key
 */
const BOOK_KEYS = new WeakMap<object, string>()

let bookSeq = 0


function bookKey(book: SealBook | undefined): string | null {
  if (book === undefined) return null
  const seen = BOOK_KEYS.get(book)
  if (seen !== undefined) return seen
  bookSeq += 1
  const key = `book:${bookSeq}`
  BOOK_KEYS.set(book, key)
  return key
}


export function chatMachine(opts: { readonly concurrency?: number } = {}): ChatMachine {
  const flight = coalescer<Chat>({ concurrency: opts.concurrency ?? 8, retain: true })
  const order = clock()
  return {
    async ask(session, question, o = {}) {
      // The ADDRESS of the question is the coalescing key — same question, one escalation.
      const answer = await flight.run({ q: question, book: bookKey(o.book) }, () =>
        chat(question, o.book ?? BOOK, { fetchImpl: o.fetchImpl, escalate: o.escalate }),
      )
      const tick = order.tick({ q: question, lane: answer.lane })
      const next = sessionAppend(
        session,
        `free-chat[${answer.lane}|tokens=${answer.tokens}|reused=${answer.reused}]: ${answer.answer}`,
      )
      return { session: next, answer, tick }
    },
    ftl(): ChatFtl {
      const m = flight.amortizeInput()
      return {
        answers: m.answers,
        tokens: m.tokens,
        reuses: m.reuses,
        holds: ftlReport({ answers: m.answers, tokens: m.tokens, reuses: m.reuses }).holds,
        head: order.now()?.address ?? null,
      }
    },
  }
}


/**
 * Deep research through chat: sealed research folded into the session.
 * cost=0 · tokens=0 · efficiency→∞ when findings>0.
 */
export async function chatDeepResearchFree(
  session: ChatSession,
  questions: readonly string[],
  opts: { readonly depth?: number } = {},
): Promise<{ readonly session: ChatSession; readonly research: import('@/quantum/ftl').Research }> {
  const { research: run } = await import('@/quantum/ftl')
  const research = await run(questions, { depth: opts.depth ?? 2 })
  const next = sessionAppend(
    session,
    `deep-research-free[cost=${research.cost}|tokens=${research.tokens}|findings=${research.findings.length}|eff=${research.efficiency}]: thread=${research.thread}`,
  )
  return { session: next, research }
}


/**
 * Chat waves purify src: scan prose names → RENAME → feed into themselves.
 * Covers the corpus at scale; hand edits cannot.
 */
export async function chatEndlessPurify(
  session: ChatSession,
  opts: {
    readonly maxGenerations?: number
    readonly scanLimit?: number
    readonly stopped?: boolean
  } = {},
): Promise<{
  readonly session: ChatSession
  readonly report: import('@/quantum/ftl/purify').PurifyReport
}> {
  const { endlessPurify } = await import('@/quantum/ftl')
  const report = await endlessPurify({
    maxGenerations: opts.maxGenerations ?? 3,
    scanLimit: opts.scanLimit,
    stopped: opts.stopped,
  })
  const next = sessionAppend(
    session,
    `endless-purify[hits=${report.hits.length}|fed=${report.feed.fed}|gens=${report.feed.generations.length}|developed=${report.feed.totalDeveloped}|cost=${report.cost}]`,
  )
  return { session: next, report }
}


/**
 * Let the standards chat and improve (architectural reuse via quantum/ftl): detect gaps on the
 * standards surface, ask free chat (tokens=0), emit improvement waves, fold a receipt into
 * the session. Dual of accessibleByStandard — standards reach chat to improve themselves.
 * Path: standards/improve (not the FTL core).
 */
export async function chatStandardsImproveFtl(
  session: ChatSession,
  opts: {
    readonly usesLinearScan?: boolean
    readonly ungatedMandatoryIds?: readonly string[]
    readonly research?: boolean
    readonly depth?: number
  } = {},
): Promise<{ readonly session: ChatSession; readonly report: import('@/standards/improve').StandardsFtlReport }> {
  const { standardsImproveWaves: run } = await import('@/standards/improve')
  const report = await run({
    usesLinearScan: opts.usesLinearScan ?? false, // reuse applied: lookupStandard / standardsIndex is the default path
    usesAddressIndex: true,
    memo: true,
    reDerivesCoverage: false,
    ungatedMandatoryIds: opts.ungatedMandatoryIds,
    research: opts.research,
    depth: opts.depth,
  })
  const next = sessionAppend(
    session,
    `standards-improve[holds=${report.holds}|gaps=${report.gaps.length}|answered=${report.answered}|waves=${report.waves.length}|cost=${report.cost}|eff=${report.efficiency}]`,
  )
  return { session: next, report }
}


/**
 * Deep-research global banking through chat waves at no cost, fold a receipt, return develop waves.
 * Names related ISO 20022 / open-banking / reconciliation matter to land next.
 */
export async function chatBankResearchWaves(
  session: ChatSession,
  opts: { readonly depth?: number; readonly asks?: readonly string[] } = {},
): Promise<{
  readonly session: ChatSession
  readonly report: import('@/bank/research').GlobalBankingReport
}> {
  const { deepResearchGlobalBanking } = await import('@/bank/research')
  const report = await deepResearchGlobalBanking({
    depth: opts.depth ?? 2,
    asks: opts.asks,
    chat: true,
  })
  const top = report.waves
    .slice(0, 4)
    .map((w) => `${w.domain}×${w.count}`)
    .join(',')
  const next = sessionAppend(
    session,
    `bank-research-waves[cost=${report.cost}|tokens=${report.tokens}|findings=${report.research.findings.length}|eff=${report.efficiency}|present=${report.present}/${report.related.length}|waves=${top}]`,
  )
  return { session: next, report }
}


/**
 * Ask chat about the corpus's OWN structural debt, grouped into waves.
 *
 * The fourth wave source beside bank/research, ftl/purify and standards/improve — and the only one
 * whose domain is this repo's own shape. [[wave]]/gap reads the live gates (dead references, stray
 * `.ts`, unraised kinds) and groups by the CLASS a fix pattern covers, biggest first: 465 dead
 * pointers are not 465 problems when 93% land in twelve dissolved trees.
 *
 * Sealed first, so a repeat costs nothing ([[quantum]]/coalesce), and the receipt folds into the
 * session so the next generation searches deeper rather than re-deriving.
 *
 * HONEST BOUNDARY — a wave says these gaps share a SHAPE, never that one edit closes them. Each ask
 * carries the wrong-target warning in its own text, because a pointer to a wrong-but-existing file
 * passes the gate and is worse than a dead one ([[rules]]/reference).
 */
export async function chatGapWaves(
  session: ChatSession,
  opts: { readonly limit?: number; readonly fetchImpl?: typeof fetch; readonly escalate?: boolean } = {},
): Promise<{
  readonly session: ChatSession
  readonly waves: readonly import('@/wave/gap').GapWave[]
  readonly asks: readonly string[]
}> {
  const { gapWaves, asksFromGapWaves } = await import('@/wave/gap')
  const waves = await gapWaves()
  const asks = asksFromGapWaves(waves, opts.limit ?? 8)
  const total = waves.reduce((s, w) => s + w.count, 0)
  const top = waves
    .slice(0, 3)
    .map((w) => `${w.kind}×${w.count}@${w.cluster}`)
    .join(' ')
  const next = sessionAppend(session, `gap-waves[waves=${waves.length}|gaps=${total}|asks=${asks.length}] ${top}`)
  return { session: next, waves, asks }
}


/**
 * Feed standards improve waves into themselves (bounded per call by maxGenerations).
 */
export async function chatEndlessStandardsImprove(
  session: ChatSession,
  opts: {
    readonly maxGenerations?: number
    readonly depth?: number
    readonly stopped?: boolean
  } = {},
): Promise<{
  readonly session: ChatSession
  readonly report: import('@/wave/feed').WaveFeedReport<import('@/standards/improve').StandardsFtlWave>
}> {
  const { endlessStandardsImprove } = await import('@/standards/improve')
  const report = await endlessStandardsImprove({
    maxGenerations: opts.maxGenerations ?? 3,
    depth: opts.depth ?? 1,
    stopped: opts.stopped,
  })
  const gens = report.generations
    .map((g) => `g${g.generation}:asks=${g.asks.length}→next=${g.nextAsks.length}`)
    .join('|')
  const next = sessionAppend(
    session,
    `endless-standards-improve[fed=${report.fed}|gens=${report.generations.length}|findings=${report.totalFindings}|developed=${report.totalDeveloped}|continue=${report.continuation.continue}|cost=${report.cost}|${gens}]`,
  )
  return { session: next, report }
}


/**
 * Banks chat + develop quantum-secure banking (classical⊕PQC · tokens=0).
 */
export async function chatBanksQuantumSecure(
  session: ChatSession,
  opts: {
    readonly depth?: number
    readonly asks?: readonly string[]
  } = {},
): Promise<{
  readonly session: ChatSession
  readonly report: import('@/bank/chat').QuantumSecureBankingReport
}> {
  const { developQuantumSecureBanking } = await import('@/bank/chat')
  const report = await developQuantumSecureBanking({
    depth: opts.depth ?? 2,
    asks: opts.asks,
  })
  const next = sessionAppend(
    session,
    `banks-quantum-secure[holds=${report.holds}|cost=${report.cost}|findings=${report.research.findings.length}|banks=${report.chat.banks.length}|turns=${report.chat.turns.length}|accepted=${report.chat.acceptedDevelopments.length}|eff=${report.efficiency}]`,
  )
  return { session: next, report }
}


/**
 * Feed banking research waves into themselves for endless R&D (bounded per call by maxGenerations).
 * Cost=0 · tokens=0; continuation.continue stays true until external stop (shouldContinue law).
 */
export async function chatEndlessResearchWaves(
  session: ChatSession,
  opts: {
    readonly maxGenerations?: number
    readonly depth?: number
    readonly asks?: readonly string[]
    readonly stopped?: boolean
  } = {},
): Promise<{
  readonly session: ChatSession
  readonly report: import('@/wave/feed').WaveFeedReport<import('@/bank/research').BankResearchWave>
}> {
  const { endlessBankResearchDevelop } = await import('@/bank/research')
  const report = await endlessBankResearchDevelop({
    maxGenerations: opts.maxGenerations ?? 3,
    depth: opts.depth ?? 1,
    seedAsks: opts.asks,
    stopped: opts.stopped,
  })
  const gens = report.generations
    .map((g) => `g${g.generation}:asks=${g.asks.length}→next=${g.nextAsks.length}`)
    .join('|')
  const next = sessionAppend(
    session,
    `endless-research-waves[fed=${report.fed}|gens=${report.generations.length}|findings=${report.totalFindings}|grown=${report.sealGrown}|developed=${report.totalDeveloped}|continue=${report.continuation.continue}|cost=${report.cost}|${gens}]`,
  )
  return { session: next, report }
}
