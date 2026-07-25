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

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chat — thread = merkle chain of message-uuids:')
  console.log('  thread([a,b]) = ' + threadUuid(['a', 'b']).slice(0, 8) + '… · appended changes it = ' + appended(['a', 'b'], 'c'))
}
