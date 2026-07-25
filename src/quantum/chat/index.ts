/**
 * quantum/chat — a chat thread as a merkle chain: each message is a content-uuid, and the thread
 * folds its message-uuids into ONE chain-uuid (a tamper-evident history — change or reorder any
 * message and the thread-uuid changes). Merges into [[chat]]. Composes [[merge]] · [[uuid]] · [[quantum]].
 *
 *   tsx src/quantum/chat/index.ts
 *
 * @standard merkle hash-chain; RFC 9562 §5.8 content-uuid
 * @see ../../chat -- ../../uuid/matrix (merge) -- ../communication -- ./SKILL.md
 */
import { merge, toUuid } from '@/uuid/matrix'
import {
  sealSecret,
  decryptIfUuid,
  identityUuidForContent,
  identityDigestForContent,
  type SealedBlob,
  type SecretIdentityContent,
} from '@/secret'

const SEED = toUuid(Buffer.from('chat:thread', 'utf8'))

/** Fold a thread's message-uuids into one chain-uuid (merkle) — the tamper-evident history. */
export const threadUuid = (messageUuids: readonly string[]): string => messageUuids.reduce((acc, u) => merge(acc, u), SEED)

/** Appending a message changes the thread-uuid (the history cannot be silently rewritten). */
export const appended = (before: readonly string[], message: string): boolean => threadUuid([...before, message]) !== threadUuid(before)

/** A message's content-uuid — the leaf the thread folds. */
export const messageUuid = (message: string): string => toUuid(Buffer.from(message, 'utf8'))

/** NOVEL iff its content-uuid is not already a leaf of the thread (a real new answer, not a repeat). */
export const isNovel = (messageUuids: readonly string[], message: string): boolean =>
  !messageUuids.includes(messageUuid(message))

/**
 * ASK: of the candidate questions, the next whose answer would be NOVEL to the thread —
 * the first not yet covered. Returns undefined when the thread already covers every
 * candidate (nothing left to improve over this space). The chat that greets a visitor
 * and chats to infinity always has a next uncovered thing to ask, until coverage = 1.
 *
 * HONEST BOUNDARY: this SELECTS the next uncovered question from a given set; it does
 * not GENERATE questions (no LLM in the fold). The intelligence is which-is-novel.
 */
export const nextAsk = (messageUuids: readonly string[], candidates: readonly string[]): string | undefined =>
  candidates.find((q) => isNovel(messageUuids, q))

/**
 * IMPROVE: fold a message into the thread. `improved` is true iff it was novel — the
 * distinct coverage grew. A duplicate answer re-folds the chain (history still moves)
 * but does not improve coverage.
 *
 * HONEST BOUNDARY: improvement = coverage grew, NOT answer correctness — a novel but
 * wrong answer still counts as covered; quality is a separate judgement.
 */
export const improve = (
  messageUuids: readonly string[],
  message: string,
): { readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean } => {
  const improved = isNovel(messageUuids, message)
  const next = [...messageUuids, messageUuid(message)]
  return { thread: threadUuid(next), messageUuids: next, improved }
}

/** Coverage of a candidate space: the fraction of candidate questions the thread has answered. */
export const coverage = (messageUuids: readonly string[], candidates: readonly string[]): number =>
  candidates.length === 0 ? 1 : candidates.filter((q) => messageUuids.includes(messageUuid(q))).length / candidates.length

// ── voice & video in chat — one modality-tagged path ─────────────────────────
// A voice or video message is MEDIA that carries a TRANSCRIPT (speech-to-text) or
// CAPTION. erpax content-addresses the captured blob (tamper-evident) AND folds its
// transcript into the thread as an ordinary message — so voice/video join the
// ask→improve loop exactly like text, not on a separate rail. Capture is edge-safe
// (browser MediaRecorder); the STT/caption/TTS ENGINE is a runtime binding
// (Cloudflare Workers AI), never implemented in the fold — it is supplied as
// `Transcriber`/`Speaker`, so the atom stays a pure, testable envelope + fold.

export type MediaModality = 'voice' | 'video'

/** A voice/video message: the captured blob's uuid + its transcript/caption. */
export interface MediaMessage {
  readonly modality: MediaModality
  /** content-uuid of the captured media blob (tamper-evident; the thread folds the transcript). */
  readonly mediaUuid: string
  /** speech-to-text transcript (voice) or caption (video) — what enters the thread. */
  readonly transcript: string
  readonly durationMs: number
}

/** Pluggable STT/caption engine — a Cloudflare Workers AI binding at runtime, not in the fold. */
export interface Transcriber {
  transcribe(media: Uint8Array, modality: MediaModality): Promise<string>
}

/** Pluggable text-to-speech engine — the reverse (a chat message → spoken audio). */
export interface Speaker {
  speak(text: string): Promise<Uint8Array>
}

/** The content-uuid of a captured media blob (bytes → tamper-evident address). */
export const mediaBlobUuid = (media: Uint8Array): string => toUuid(Buffer.from(media))

/** Build a voice/video message envelope from a captured blob + its engine transcript. */
export const mediaMessage = (
  modality: MediaModality,
  media: Uint8Array,
  transcript: string,
  durationMs: number,
): MediaMessage => ({ modality, mediaUuid: mediaBlobUuid(media), transcript, durationMs })

/** Fold a media message into the chat: its transcript enters the thread (ask→improve). */
export const foldMediaMessage = (
  messageUuids: readonly string[],
  m: MediaMessage,
): { readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean } =>
  improve(messageUuids, m.transcript)

/** Capture → transcribe → fold: the whole voice/video-in-chat path (engine is a binding). */
export async function chatFromMedia(
  messageUuids: readonly string[],
  media: Uint8Array,
  modality: MediaModality,
  engine: Transcriber,
  durationMs: number,
): Promise<{ readonly message: MediaMessage; readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean }> {
  const transcript = await engine.transcribe(media, modality)
  const message = mediaMessage(modality, media, transcript, durationMs)
  return { message, ...foldMediaMessage(messageUuids, message) }
}

// ── crypto in chat — confidentiality on top of the tamper-evident thread ──────
// The thread is already tamper-EVIDENT (threadUuid merkle) and 4-key sealable
// (chatSeal). The missing leg is CONFIDENTIALITY: a message encrypted under a ROOM
// identity, so only a party that can prove the room descriptor decrypts it. Reuses
// @/secret v2 (AES-256-GCM, full-256-digest bound — quantum floor 2^85.3), never a
// hand-rolled cipher. The room descriptor is the identity; the message is the plaintext.

/** Encrypt a chat message under a room identity (v2 full-digest bound). ERPAX_SEAL_KEY or opts.sealKey. */
export const sealChatMessage = (
  text: string,
  room: SecretIdentityContent,
  opts?: { sealKey?: Buffer; tenantId?: string },
): SealedBlob =>
  sealSecret(text, identityUuidForContent(room, opts?.tenantId), {
    sealKey: opts?.sealKey,
    contextDigest: identityDigestForContent(room, opts?.tenantId),
  })

/** Decrypt a sealed chat message iff the presented room descriptor proves the room (fail-closed). */
export const openChatMessage = (
  blob: SealedBlob,
  room: SecretIdentityContent,
  opts?: { sealKey?: Buffer; tenantId?: string },
): string => decryptIfUuid(blob, identityUuidForContent(room, opts?.tenantId), room, opts)

// ── all quantum in chat — by REACH, not by copy ──────────────────────────────
// Every atom already exposes tools through the MCP surface (erpaxMcpTools →
// createInProcessMcpClient). The chat REACHES all of them through one bridge that
// invokes a tool and folds its result into the thread (ask→improve). `invoke` is
// the in-process client's callTool, supplied by the runtime (dependency injection),
// so the chat never IMPORTS the collection graph — no re-entangling, no duplication.
// This is what makes "all quantum usable in chat" DRY: one router, not N per-domain copies.

/** A tool the chat can reach — name + the standards it answers to (its legal surface). */
export interface ChatToolRef {
  readonly name: string
  readonly description: string
  /** The standards this tool cites — they DERIVE the access tier it requires (@/access/standard). */
  readonly standards?: readonly string[]
}

/** The names of tools the chat may invoke (for nextAsk-style discovery over the tool space). */
export const chatToolNames = (tools: readonly ChatToolRef[]): string[] => tools.map((t) => t.name)

// ── fuse all accessible BY STANDARD ──────────────────────────────────────────
// The chat may reach only what the applicable STANDARDS permit: each tool's cited
// standards derive a required access tier (@/access/standard requiredAccessTier),
// and a party reaches a tool only when its tier ≥ that requirement. `requiredRank`
// is injected (requiredAccessTier∘tierRank) so quantum/chat stays pure — the legal
// surface gates the chat's reach without pulling the mesh-coupled access graph in.

/** The tools a party at `partyRank` may reach — filtered by each tool's standards-required tier. */
export const accessibleByStandard = (
  tools: readonly ChatToolRef[],
  partyRank: number,
  requiredRank: (standards: readonly string[]) => number,
): ChatToolRef[] => tools.filter((t) => requiredRank(t.standards ?? []) <= partyRank)

/** The chat↔mcp mutual improvement, measured (bidirectional). */
export interface ChatMcpFold {
  readonly tools: number
  /** tools the chat has actually invoked — mcp IMPROVING chat (its reach grows with the surface). */
  readonly reached: number
  readonly coverage: number
  /** tools with no cited standard — chat IMPROVING mcp: ungoverned, so accessibleByStandard can only
   *  floor them at 'open'; naming them is the chat cracking the mcp surface for the next fix. */
  readonly cracks: readonly string[]
}

/**
 * Fold the chat and the mcp surface into their mutual improvement: the chat REACHES tools
 * (coverage — a bigger/better surface improves the chat), and CRACKS ungoverned tools (no
 * standard — the chat's by-standard gate exposes what the mcp surface must fix). Each closes
 * the other's gap: chat improves mcp (cracks → govern them), mcp improves chat (more reach).
 */
export function chatMcpFold(tools: readonly ChatToolRef[], invoked: readonly string[]): ChatMcpFold {
  const names = new Set(invoked)
  const reached = tools.filter((t) => names.has(t.name)).length
  const cracks = tools.filter((t) => !t.standards || t.standards.length === 0).map((t) => t.name)
  return { tools: tools.length, reached, coverage: tools.length ? reached / tools.length : 1, cracks }
}

export interface StandardAccess {
  readonly partyRank: number
  readonly requiredRank: (standards: readonly string[]) => number
}

/**
 * Invoke a tool ONLY when the party's tier clears the tool's standards-required tier;
 * otherwise fold an auditable refusal into the thread (no invoke). This is the legal
 * surface gating the chat's reach — the same law [[rules]]/audience names: an operation's
 * access is read by the reader who signs it.
 */
export async function chatInvokeByStandard(
  messageUuids: readonly string[],
  invoke: (name: string, args: Record<string, unknown>) => Promise<string>,
  tool: ChatToolRef,
  args: Record<string, unknown>,
  access: StandardAccess,
): Promise<{ readonly refused: boolean; readonly result?: string; readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean }> {
  const need = access.requiredRank(tool.standards ?? [])
  if (need > access.partyRank) {
    const folded = improve(messageUuids, `refused ${tool.name}: standards require tier ${need} > party ${access.partyRank}`)
    return { refused: true, ...folded }
  }
  const result = await invoke(tool.name, args)
  return { refused: false, result, ...improve(messageUuids, `${tool.name}: ${result}`) }
}

/**
 * Invoke any quantum tool from the chat and fold its result into the thread. The
 * result becomes a normal message, so tool outputs join the ask→improve loop like
 * any other. `invoke` is the runtime-supplied MCP callTool (createInProcessMcpClient),
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

// ── deep research — parallel & branching, not linear-manual ───────────────────
// Linear manual research asks one question, waits, reads, asks the next. Deep
// research fans a frontier of sub-questions out CONCURRENTLY (Promise.all — the
// anti-linear step), folds every finding into the tamper-evident thread (ask→
// improve), and expands the frontier with the follow-ups each finding raises,
// to a bounded DEPTH. The gatherer is injected (`Researcher` — corpus tools via
// chatInvoke, a web API, a DB), so the loop stays a pure, testable orchestrator.

/** One answered sub-question and its evidence — a leaf the thread folds. */
export interface Finding {
  readonly question: string
  readonly evidence: string
}

/** Gathers evidence for one sub-question and may raise follow-ups (breadth×depth). Injected. */
export type Researcher = (question: string) => Promise<{ evidence: string; followUps?: readonly string[] }>

export interface DeepResearchResult {
  readonly findings: readonly Finding[]
  /** Content-uuid folding every finding — the tamper-evident, citable research trace. */
  readonly thread: string
  readonly messageUuids: readonly string[]
  /** Frontier levels actually explored (≤ depth budget). */
  readonly depthReached: number
  /** Fraction of the ORIGINAL questions answered. */
  readonly coverage: number
}

/**
 * Research a frontier of questions in parallel, folding findings into the thread and
 * expanding follow-ups to a bounded depth. Concurrent per level (breadth), recursive
 * across levels (depth) — the opposite of linear one-at-a-time.
 *
 * HONEST BOUNDARY: the loop ORCHESTRATES (fan-out · fold · expand · bound); the actual
 * gathering is the injected `researcher`. It folds evidence, it does not judge its truth
 * (that is [[rules]]/refutable's concern) — and depth is bounded, never infinite.
 */
export async function deepResearch(
  seed: readonly string[],
  questions: readonly string[],
  researcher: Researcher,
  opts?: { depth?: number },
): Promise<DeepResearchResult> {
  const depth = Math.max(1, opts?.depth ?? 3)
  let messageUuids = [...seed]
  const findings: Finding[] = []
  const asked = new Set<string>()
  let frontier = questions.filter((q) => (asked.has(q) ? false : (asked.add(q), true)))
  let depthReached = 0

  for (let d = 0; d < depth && frontier.length > 0; d++) {
    depthReached = d + 1
    const results = await Promise.all(frontier.map((q) => researcher(q))) // FAN OUT — parallel
    const next: string[] = []
    frontier.forEach((q, i) => {
      const { evidence, followUps } = results[i]!
      findings.push({ question: q, evidence })
      messageUuids = improve(messageUuids, `${q} → ${evidence}`).messageUuids
      for (const f of followUps ?? []) if (!asked.has(f)) { asked.add(f); next.push(f) }
    })
    frontier = next
  }

  const answered = new Set(findings.map((f) => f.question))
  const coverageOfOriginal = questions.length === 0 ? 1 : questions.filter((q) => answered.has(q)).length / questions.length
  return { findings, thread: threadUuid(messageUuids), messageUuids, depthReached, coverage: coverageOfOriginal }
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
  let messageUuids = [...seed]
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

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chat — thread = merkle chain of message-uuids:')
  console.log('  thread([a,b]) = ' + threadUuid(['a', 'b']).slice(0, 8) + '… · appended changes it = ' + appended(['a', 'b'], 'c'))
}
