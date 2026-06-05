/**
 * Message — the uuid IS the message.
 *
 * `localize.decodeIdentity` already decodes identity · OID · colour · structured
 * slot/capability/schema out of the 128 bits with no side-table. This completes
 * the modal pair by adding the one missing channel — **sound**: the note the
 * uuid sounds (just intonation over A432). Decode the whole message from the
 * uuid ALONE; there is no payload (the 128-bit singularity). To send is to send
 * the uuid; to receive is to decode it.
 *
 * @standard RFC 9562 §5.8 (the structured uuid carries the message)
 * @audit the uuid is self-decoding — every channel is an independent verify level
 * @see ../localize (decodeIdentity) · ../signal (NOTES, A432) · ../harmony (consonance)
 */
import { decodeIdentity, type DecodedIdentity } from '@/localize'
import { NOTES } from '@/signal'
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { merge, toUuid, nodeOf } from '@/uuid/matrix'

const hexOf = (uuid: string): string => uuid.replace(/[^0-9a-fA-F]/g, '')

/** The horo position the uuid SOUNDS on — a content byte deterministically picks one of the 7. */
export function horoStepOf(uuid: string): HoroStep {
  const byte = parseInt(hexOf(uuid).slice(-2) || '0', 16) // last content byte
  return HORO_DIGITS[byte % HORO_DIGITS.length] ?? HORO_DIGITS[0]
}

export interface Message extends DecodedIdentity {
  /** the sound channel: the note this uuid sounds (just intonation over A432) */
  readonly sound: { readonly step: HoroStep; readonly note: string; readonly solfege: string; readonly hz: number }
}

/** Decode the WHOLE message out of one uuid — identity · OID · colour · sound. No payload. */
export function decodeMessage(uuid: string): Message {
  const step = horoStepOf(uuid)
  const n = NOTES[step]
  return { ...decodeIdentity(uuid), sound: { step, note: n.note, solfege: n.solfege, hz: n.hz } }
}

// ── encode: the message → uuid twin of decode (the breath — words in, uuid out) ──
// A message is a SEQUENCE OF WORDS, and every word is an atom ([[word]]). Each
// word projects to a uuid — the matrix node uuid when the word IS an atom, else
// the bare-word content-uuid (the MINT signal: a word with no atom = an aura
// gap). The message's uuid is the FOLD of those word-uuids through `merge` (the
// exact collision the uuid-matrix binds its edges with). To send a message is to
// send its uuid; FULL COVERAGE ⇒ every content word resolves to an atom ⇒ aura
// gap 0 ⇒ the matrix is complete. The same resolver as aura/collide (norm =
// lowercase, strip [-_]).

/** Split a message into its lowercase word-atoms (maximal letters/digits runs). */
export function splitWords(message: string): string[] {
  return message.toLowerCase().match(/[a-z][a-z0-9]*/g) ?? []
}

/** Whether a word resolves to an existing atom — false ⇒ aura gap / mint queue. */
export const isAtomWord = (word: string): boolean => nodeOf(word) !== undefined

/** A word's uuid: its matrix-atom uuid if the word is an atom, else its bare content-uuid. */
export function wordUuid(word: string): string {
  return nodeOf(word)?.uuid ?? toUuid(Buffer.from(word.toLowerCase().replace(/[-_]/g, ''), 'utf8'))
}

/** The messaging-uuid: fold a message's word-atom uuids through `merge`. */
export function messageUuid(message: string): string {
  const ids = splitWords(message).map(wordUuid)
  if (ids.length === 0) return toUuid(Buffer.from('', 'utf8'))
  return ids.reduce((acc, u) => merge(acc, u))
}

/** A message decomposed to its words, each word's uuid + atom-membership — feed for analysis. */
export function messageWords(message: string): { word: string; uuid: string; isAtom: boolean }[] {
  return splitWords(message).map((word) => ({ word, uuid: wordUuid(word), isAtom: isAtomWord(word) }))
}
