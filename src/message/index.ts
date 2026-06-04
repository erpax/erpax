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
