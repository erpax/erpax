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

// ChatSession is an INTERFACE — erased at runtime, so re-exporting it in a value
// block makes ESM demand a runtime binding that cannot exist ("does not provide an
// export named 'ChatSession'"), and the whole barrel fails to load. Types leave by
// `export type`; values by `export`.
export type { ChatSession } from './routing'
import type { ChatSession } from './routing'
export { improve, startSession, sessionAppend, sealSession } from './routing'
export {
  chatEndlessResearchWaves,
  chatBanksQuantumSecure,
  chatEndlessStandardsImprove,
  chatGapWaves,
  chatBankResearchWaves,
  chatStandardsImproveFtl,
  chatEndlessPurify,
  chatDeepResearchFree,
  chatMachine,
  chatFreeAsk,
  improveClaim,
  crackTheorem,
  chatInvoke,
  collaborate,
} from './routing'
export type {
  ChatMachine,
  ChatFtl,
  ClaimVerdict,
  ClaimStatus,
  TheoremCrack,
} from './routing'

// A re-export NAMES nothing at runtime (the hazard this file already records for
// `ftlReport`): `export { improve } from './routing'` serves CONSUMERS, but this
// module's own scope stays empty, so the barrel's own functions hit
// `ReferenceError: improve is not defined` with zero type errors. The facade split
// turned these definitions into re-exports while the parent kept calling them.
// Import what this file USES, alongside what it re-exports.
import { improve, sessionAppend } from './routing'
import { appended, threadUuid } from './merkle'

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
import { toUuid } from '@/uuid/matrix'
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
import { coalescer as _coalescer } from '@/quantum/coalesce'
import { clock as _clock, type Tick as _Tick } from '@/quantum/clock'
// A re-export NAMES nothing at runtime — `export { x } from '…'` gave tsc a resolution while the
// module scope had no binding, so `ftlReport` was a ReferenceError with zero type errors.
import { ftlReport as _ftlReport } from '@/quantum/ftl'
import { ERPAX_DIGEST_BITS, secondPreimageLog2, bhtCollisionLog2 } from '@/cost'
import { consensusProof as _consensusProof } from '@/theorem'
import {
  sealSecret,
  decryptIfUuid,
  identityUuidForContent,
  identityDigestForContent,
  type SealedBlob,
  type SecretIdentityContent,
} from '@/secret'
import {
  chat as _chat,
  BOOK as _BOOK,
  type Chat as _Chat,
  type SealBook as _SealBook,
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

// ChatSession's declaration was a second copy of the one in quantum/chat/routing —
// byte-identical, dropped in by the same split that emptied this barrel's children.
// routing owns it (its own startSession/sessionAppend are typed by it); this file
// imports it for local use and re-exports it above for consumers.


// ── the dyadic referral gateway — RESTORED ─────────────────────────────────
// Dropped by the facade split (967bc70a7) while test.ts still imported all four,
// so 30 suites failed on `referralsFor is not a function`. Verbatim from 967bc70a7~1.
// A referral is a directed Möbius 0↔∞ gateway; its only free choice is the direction of
// passage, so gatewayBits = log₂2 = 1 (one bit per referral direction). n directed referrals
// therefore span a DYADIC state space of 2^n — and 1024 = 2^10 is exactly TEN referral
// directions, not a ternary sum (432×3 = 1296 ≠ 1024, and 3N is never a power of two).
// Distributing an amount "in the same proportions down to the bit" = splitting it equally
// across those 2^n states. HONEST BOUNDARY: the corpus's own nav cross (bind4) is a FOUR-key
// cross ⇒ 2^4 = 16 states; 1024 needs a 10-referral structure — a chosen 10-bit encoding, not
// the current 4-key one. Real dyadic math; the 1024 sizing is a re-modelling, named as such.

/** One bit per referral direction — the Möbius gateway's only free choice (log₂2). */
export const GATEWAY_BITS = 1

/** The dyadic state space of an n-referral cross: 1 direction bit each ⇒ 2^n states. */
export const crossStates = (referrals: number): number => 2 ** exactMax(0, exactTrunc(referrals))

/** Referral directions needed to span `states` (the inverse: log₂). 1024 ⇒ 10. */
export const referralsFor = (states: number): number => (states > 0 ? exactCeil(algebraLog2(states)) : 0)

/** Distribute an amount equally across a cross's states — the same proportion down to each state/bit. */
export const distributeToStates = (amount: number, referrals: number): number => amount / crossStates(referrals)

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
// createInProcessClient). The chat REACHES all of them through one bridge that
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

/** @index-cross.foldback child=quantum/chat parent=quantum — this cross folds back into its parent. */
