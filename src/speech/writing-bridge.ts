/**
 * speech/writing-bridge — collapse computed writing → phoneme chain.
 *
 * Base utterance from content-uuid + horo (signal/A432); prose words fold in as
 * extra syllables on the nibble ring — text never stored as wav, only computed.
 *
 * @see ./computed — ../writing/computed
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  durationMs,
  NIBBLE_PHONEMES,
  phonemeDurationMs,
  speechFromHoro,
  type ComputedSpeech,
} from './computed'
import type { ComputedWriting } from '@/writing/computed'
import { isHoroStep, type HoroStep } from '@/horo'

const pathUuid = (atomPath: string): string => uuid(jcsCanonicalize({ path: atomPath }))

/** Collapse prose words into extra syllables on the phoneme ring. */
export function prosePhonemes(text: string, step: HoroStep, max = 8): readonly string[] {
  const words = text.toLowerCase().match(/[a-z][a-z0-9]*/g) ?? []
  return words.slice(0, max).map((w, i) => {
    const nib = (w.charCodeAt(0) + i + step) % NIBBLE_PHONEMES.length
    return NIBBLE_PHONEMES[nib]!
  })
}

export interface WritingToSpeechOpts {
  /** Optional prose face to collapse — defaults to empty (uuid+horo only). */
  readonly text?: string
  readonly horo?: number
}

/**
 * Collapse a computed writing record → sealed phoneme utterance.
 * Bonds writing score inputs to A432 speech frame — no hand transcript.
 */
export function writingToSpeech(
  writing: ComputedWriting,
  opts: WritingToSpeechOpts = {},
): ComputedSpeech {
  const contentUuid = writing.contentUuid ?? pathUuid(writing.atomPath)
  const horo = opts.horo ?? writing.horo ?? 5
  const base = speechFromHoro(contentUuid, horo)
  const text = opts.text?.trim()
  if (!text) return base

  const step = base.step
  const extra = prosePhonemes(text, step)
  const phonemes = [...base.phonemes, ...extra]
  const periodMs = phonemeDurationMs(step)
  return {
    ...base,
    phonemes,
    periodMs,
    durationMs: durationMs(phonemes, step),
  }
}
