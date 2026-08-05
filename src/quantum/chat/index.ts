// quantum/chat facade — barrel re-export semantic children
export {
  threadUuid,
  appended,
  messageUuid,
  isNovel,
} from './merkle'

export {
  nextAsk,
  coverage,
} from './coverage'

export {
  improve,
  ChatSession,
  startSession,
  sessionAppend,
  sealSession,
} from './routing'

import { algebraLog2, exactCeil, exactMax, exactTrunc } from '@/algebra'
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
import { A432, NOTES } from '@/signal'
import { HORO_DIGITS, type HoroStep } from '@/horo'
import {
  intervalRatio,
  tenneyHeight,
  bandHarmony,
  consonance,
  type Consonance,
  type BandHarmony,
} from '@/harmony'
import { bind4 } from '@/merge'
import { coalescer } from '@/quantum/coalesce'
import { clock, type Tick } from '@/quantum/clock'
// A re-export NAMES nothing at runtime — `export { x } from '…'` gave tsc a resolution while the
// module scope had no binding, so `ftlReport` was a ReferenceError with zero type errors.
import { ftlReport } from '@/quantum/ftl'
import { ERPAX_DIGEST_BITS, secondPreimageLog2, bhtCollisionLog2 } from '@/cost'
import { consensusProof } from '@/theorem'
import {
  sealSecret,
  decryptIfUuid,
  identityUuidForContent,
  identityDigestForContent,
  type SealedBlob,
  type SecretIdentityContent,
} from '@/secret'
import {
  chat,
  BOOK,
  type Chat,
  type SealBook,
} from '@/quantum/ftl'

// ── the quantum composer: content folded into music ──────────────────────────
// A content-uuid is a fixed byte-string; the corpus already tunes to A432 with 5-limit
// horo-ring degrees. So a composition is DETERMINISTIC sonification: each hex nibble picks
// a horo degree, pitched A432 × its ratio — same content ⇒ same melody (content-addressed
// music). HONEST BOUNDARY: a mapping content→pitch via A432/horo, NOT a claim of aesthetic
// composition; "quantum" = content-addressed + deterministic, not spacetime physics.

export interface Note {
  readonly horo: HoroStep
  readonly freq: number
  readonly ratio: readonly [number, number]
}

export interface Composition {
  readonly notes: readonly Note[]
  readonly rootFreq: number
  /** mean Tenney height of consecutive intervals — lower is more consonant (the piece's texture). */
  readonly meanTenney: number
}

// ── one uuid, many types at once, sealed — and the reverse cost is computable ──
// The perspective/diamond law: one content-fold projects N typed views (music · ring
// position · entropy width · a sealed cross), all DERIVED, none stored. The improvement
// is DRY + tamper-cost: forging ANY type requires forging the one fold — a second-
// preimage — and every type-projection then agrees automatically (they share the fold).
// So multi-type does not LOWER the floor; it makes N types free and tamper-evident. And
// the reverse-engineering cost is computable quantum algebra: 2^D classical, 2^(D/3) BHT.

export interface UuidSuperposition {
  readonly uuid: string
  readonly asMusic: Composition
  readonly asHoro: HoroStep
  readonly asBits: number
  /** a self-sealed 4-key cross of the uuid — tamper-evident (the "also sealed"). */
  readonly sealed: string
  /** all views derive from the ONE fold — forge once forges all (consistency is free). */
  readonly sameFold: true
  /** reverse-engineer cost (log2) — computable quantum algebra; classical second-preimage. */
  readonly reverseLog2Classical: number
  /** the honest quantum floor — BHT collision on the shared fold. */
  readonly reverseLog2Quantum: number
}

/** See one uuid as all its types at once, sealed, with the computable reverse cost. */
export function superpose(uuid: string): UuidSuperposition {
  const hex = uuid.replace(/-/g, '')
  return {
    uuid,
    asMusic: compose(uuid),
    asHoro: HORO_DIGITS[parseInt(hex[0] ?? '0', 16) % HORO_DIGITS.length]! as HoroStep,
    asBits: ERPAX_DIGEST_BITS,
    sealed: bind4(uuid, uuid, uuid, uuid),
    sameFold: true,
    reverseLog2Classical: secondPreimageLog2(ERPAX_DIGEST_BITS),
    reverseLog2Quantum: bhtCollisionLog2(ERPAX_DIGEST_BITS),
  }
}

/** Fold a content-uuid into a deterministic A432 melody — the quantum composer. */
export function compose(uuid: string): Composition {
  const hex = uuid.replace(/-/g, '')
  const notes: Note[] = [...hex].map((ch) => {
    const horo = HORO_DIGITS[parseInt(ch, 16) % HORO_DIGITS.length]! as HoroStep
    const [n, d] = NOTES[horo].ratio
    return { horo, freq: (A432 * n) / d, ratio: [n, d] as const }
  })
  let t = 0
  for (let i = 1; i < notes.length; i++) t += tenneyHeight(intervalRatio(notes[i - 1]!.horo, notes[i]!.horo))
  return { notes, rootFreq: A432, meanTenney: notes.length > 1 ? t / (notes.length - 1) : 0 }
}

// ── string theory (honest): the thread IS a 1D string ─────────────────────────
// Physics string theory (10/11-d, Calabi–Yau, SUSY) has no honest computation here —
// quantum/gaps names it as an open physics programme. The computable kernel:
// a chat thread is a sequence of message-uuids (a 1D string); each leaf projects to
// one horo mode; consecutive intervals are the vibration spectrum; bandHarmony is
// resonance vs dissonance; compose(threadUuid) is the standing wave.
// "Quantum" = content-addressed. "String" = the 1D thread. physics=false always.

/** One mode of the thread-as-string: a message leaf → one horo degree (A432×ratio). */
export interface StringMode {
  readonly index: number
  readonly messageUuid: string
  readonly horo: HoroStep
  readonly freq: number
}

/** One consecutive interval on the vibrating thread. */
export interface StringInterval {
  readonly from: number
  readonly to: number
  readonly ratio: readonly [number, number]
  readonly tenney: number
  readonly consonance: Consonance
}

/**
 * Thread-as-string analysis — the honest string theory of chat.
 * HONEST BOUNDARY: harmonic modes of a message sequence, NOT spacetime string physics.
 */
export interface ThreadString {
  readonly thread: string
  readonly modes: readonly StringMode[]
  readonly spectrum: readonly StringInterval[]
  readonly harmony: BandHarmony
  /** standing wave = compose(threadUuid) — deterministic sonification of the whole string. */
  readonly standing: Composition
  /** resonant iff every consecutive interval is consonant (empty thread ⇒ true). */
  readonly resonant: boolean
  /** always false — physics string theory is not claimed. */
  readonly physics: false
}

/** Project one message-uuid to its fundamental mode (first hex nibble → horo). */
export function modeOf(messageUuid: string, index = 0): StringMode {
  const hex = messageUuid.replace(/-/g, '')
  const horo = HORO_DIGITS[parseInt(hex[0] ?? '0', 16) % HORO_DIGITS.length]! as HoroStep
  const [n, d] = NOTES[horo].ratio
  return { index, messageUuid, horo, freq: (A432 * n) / d }
}

/**
 * Analyze a chat thread as a vibrating string: modes · spectrum · bandHarmony · standing wave.
 * Deterministic: same messageUuids ⇒ same ThreadString (content-addressed).
 */
export function threadModes(messageUuids: readonly string[]): ThreadString {
  const modes = messageUuids.map((u, i) => modeOf(u, i))
  const spectrum: StringInterval[] = []
  for (let i = 1; i < modes.length; i++) {
    const ratio = intervalRatio(modes[i - 1]!.horo, modes[i]!.horo)
    spectrum.push({
      from: i - 1,
      to: i,
      ratio,
      tenney: tenneyHeight(ratio),
      consonance: consonance(ratio),
    })
  }
  const thread = threadUuid(messageUuids)
  return {
    thread,
    modes,
    spectrum,
    harmony: bandHarmony(modes.map((m) => m.horo)),
    standing: compose(thread),
    resonant: spectrum.length === 0 || spectrum.every((s) => s.consonance !== 'dissonant'),
    physics: false,
  }
}

/** Named API — agents ask "string theory"; this computes. Alias of threadModes. */
export const stringTheory = threadModes

/**
 * Compact equation for seal books / chatLocal — one line agents can reuse at tokens=0.
 * Derived from a live ThreadString so the seal text stays equation-shaped, not prose theater.
 */
export function stringTheoryEquation(t: ThreadString = threadModes([])): string {
  return (
    `stringTheory=threadModes(messageUuids): modes=${t.modes.length}` +
    ` · resonant=${t.resonant}` +
    ` · meanTenney=${t.harmony.meanTenney}` +
    ` · consonantFraction=${t.harmony.consonantFraction}` +
    ` · physics=${t.physics}` +
    ` · standing=compose(threadUuid); NOT Calabi–Yau/SUSY`
  )
}

// ── chat sessions — the bounded, sealed unit that improves Payload ────────────
// A session is a bounded conversation whose folded messages ARE its record: each tool
// invoke (chatInvoke → erpaxMcpTools, a Payload CRUD, gated by-standard) folds into the
// session thread, so the session's tamper-evident thread-uuid IS the audit of the Payload
// improvements it made. Deterministic seed (same topic ⇒ same start) — content-addressed,
// not wall-clock. Sealed sessions persist to the Payload `chat` collection.

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

// ── voice & video in chat — one modality-tagged path ─────────────────────────
// A voice or video message is MEDIA that carries a TRANSCRIPT (speech-to-text) or
// CAPTION. erpax content-addresses the captured blob (tamper-evident) AND folds its
// transcript into the thread as an ordinary message — so voice/video join the
// ask→improve loop exactly like text, not on a separate rail. Capture is edge-safe
// (browser MediaRecorder); the STT/caption/TTS ENGINE is a runtime binding
// (Cloudflare Workers AI), never implemented in the fold — it is supplied as
// `Transcriber`/`Speaker`, so the atom stays a pure, testable envelope + fold.

// modalities: voice (STT) · video/screen recording (caption) · screenshot (OCR/vision).
// The captured blob is content-addressed (local, deterministic — the "quantum tool"); capture
// is edge-safe hardware (browser MediaRecorder / getDisplayMedia). The ANALYSIS engine
// (STT · caption · OCR · vision) is a pluggable Transcriber binding (Cloudflare Workers AI or a
// local model) — NOT a manufactured local vision model; the fold stays a pure envelope.
export type MediaModality = 'voice' | 'video' | 'screen' | 'screenshot'

/** A media message: the captured blob's uuid + its analysis (transcript/caption/OCR text). */
export interface MediaMessage {
  readonly modality: MediaModality
  /** content-uuid of the captured media blob (tamper-evident; the thread folds the analysis text). */
  readonly mediaUuid: string
  /** the engine's analysis — STT (voice), caption (video/screen), OCR/description (screenshot). */
  readonly transcript: string
  readonly durationMs: number
}

/** Pluggable analysis engine — STT/caption/OCR/vision; a runtime binding, not in the fold. */
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

/** Raised when an agent reaches a tool OUTSIDE the standards-gated chat surface. */
export class DefaultToChatViolation extends Error {
  constructor(reason: string) {
    super(`default-to-chat: ${reason}`)
    this.name = 'DefaultToChatViolation'
  }
}

/**
 * ENFORCE default-to-chat for ANY agent / AI model: a law is obeyed only when a gate blocks its
 * violation. A tool may be reached ONLY through the standards-gated chat surface
 * (accessibleByStandard) — a raw reach (a tool absent from the gated set, or above the party's
 * tier) throws. This turns the standing "default is in chat" directive from prose into a GATE:
 * an agent cannot bypass the chat to touch a tool.
 */
export function assertDefaultsToChat(
  requestedTool: string,
  tools: readonly ChatToolRef[],
  access: StandardAccess,
): void {
  const gated = accessibleByStandard(tools, access.partyRank, access.requiredRank).map((t) => t.name)
  if (!gated.includes(requestedTool)) {
    throw new DefaultToChatViolation(
      `'${requestedTool}' reached outside the standards-gated chat surface — route it through chatInvokeByStandard`,
    )
  }
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
  const depth = exactMax(1, opts?.depth ?? 3)
  let messageUuids: readonly string[] = [...seed]
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

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chat — thread = merkle chain of message-uuids:')
  console.log('  thread([a,b]) = ' + threadUuid(['a', 'b']).slice(0, 8) + '… · appended changes it = ' + appended(['a', 'b'], 'c'))
  const demo = threadModes([
    '11111111-1111-8111-8111-111111111111',
    '22222222-2222-8222-8222-222222222222',
  ])
  console.log(
    `  stringTheory: modes=${demo.modes.length} · resonant=${demo.resonant} · physics=${demo.physics} · meanTenney=${demo.harmony.meanTenney}`,
  )
}

// ── free chat fused — ceccec.psg.bg local-first architectural FTL ─────────────
// Chat defaults to the free portal contract: sealed answers by content-address
// (tokens=0), then optional anonymous escalation. Re-export so "default to chat"
// reaches architectural FTL without a second import path.
export {
  chat,
  chatLocal,
  chatEscalate,
  seal,
  BOOK,
  ORIGIN,
  LANE,
  PROXY,
  ftl,
  BOUNDARY,
  research,
  researcher,
  CORPUS,
  type Chat,
  type ChatLane,
  type Ftl,
  type Research,
} from '@/quantum/ftl'

export { endlessPurify } from '@/quantum/ftl'
export { scanProseNames, type PurifyReport, type PurifyWave } from '@/quantum/ftl/purify'

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
 * Fold the honest string theory of this session's thread into the session.
 * Computes threadModes(session.messageUuids); physics=false; tokens not spent.
 */
export function chatStringTheory(session: ChatSession): {
  readonly session: ChatSession
  readonly theory: ThreadString
} {
  const theory = threadModes(session.messageUuids)
  const next = sessionAppend(
    session,
    `string-theory[modes=${theory.modes.length}|resonant=${theory.resonant}|meanTenney=${theory.harmony.meanTenney}|consonantFraction=${theory.harmony.consonantFraction}|physics=${theory.physics}|thread=${theory.thread}]`,
  )
  return { session: next, theory }
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
