/**
 * computed — speech derived from diamond state (the color+sound twin of css/computed).
 *
 * Token source (priority order for horo step):
 *   1. surface.horo → horoStepOf(n) on the measure ring
 *   2. contentUuid → horoStepOf(uuid) (128 bits mod 7)
 *   3. default → base (1)
 *
 * Phoneme sequence:
 *   - anchor syllable = solfege of resolved horo step (A432 diatonic)
 *   - body syllables = uuid hex nibbles indexed through the 16-slot phoneme ring
 *   - count = min(step, 9) — crest (8) yields eight syllables
 *
 * Duration: each syllable spans A432/step ms (pitch anchor = time anchor).
 *
 * @see ./SKILL.md — ../signal — ../css/computed — ../uuid/llm — ../pixel
 */
import { type UiSurface } from '@/css/computed'
import { isHoroStep, type HoroStep } from '@/horo'
import { A432, NOTES, signalForStep } from '@/signal'
import { horoStepOf as horoStepOfUuid } from '@/uuid/llm'

const round2 = (n: number): number => Math.round(n * 100) / 100

/** User spelling alias — bonds may reference `speach` instead of `speech`. */
export const SPEACH_ALIAS = 'speach' as const

/** Sixteen open syllables on the rodin nibble ring — never hand-authored wav text. */
export const NIBBLE_PHONEMES = [
  'ka', 'ta', 'ma', 'na', 'pa', 'ra', 'sa', 'va', 'ba', 'da', 'ga', 'ha', 'ja', 'la', 'wa', 'ya',
] as const

export type NibblePhoneme = (typeof NIBBLE_PHONEMES)[number]

/** One computed utterance frame — pitch + phoneme chain + timing (no stored audio). */
export interface ComputedSpeech {
  readonly step: HoroStep
  readonly pitchHz: number
  readonly note: string
  readonly solfege: string
  readonly phonemes: readonly string[]
  readonly periodMs: number
  readonly durationMs: number
}

function hexOf(uuid: string): string {
  return uuid.replace(/-/g, '')
}

function horoStepFromNumber(n: number | undefined): HoroStep {
  if (n == null || !Number.isFinite(n)) return 1
  if (isHoroStep(n)) return n
  const root = ((Math.trunc(n) - 1) % 9) + 1
  return isHoroStep(root) ? root : 1
}

function resolveHoroStep(surface: UiSurface): HoroStep {
  if (surface.horo != null) return horoStepFromNumber(surface.horo)
  if (surface.contentUuid) return horoStepOfUuid(surface.contentUuid)
  return 1
}

/** A432 just-intonation pitch for one horo position. */
export function pitchOf(step: HoroStep): number {
  return signalForStep(step).hz
}

/** Per-syllable frame period — A432 ms scaled by horo digit (crest speaks faster). */
export function phonemeDurationMs(step: HoroStep): number {
  return round2(A432 / step)
}

/** Phoneme chain from content-uuid nibbles + horo anchor syllable. */
export function phonemesOf(uuid: string, step: HoroStep): readonly string[] {
  const hex = hexOf(uuid)
  const count = Math.min(step, 9)
  const anchor = NOTES[step].solfege.toLowerCase()
  const out: string[] = [anchor]
  for (let i = 1; i < count; i++) {
    const nib = parseInt(hex[i] ?? '0', 16)
    out.push(NIBBLE_PHONEMES[(nib + step) % NIBBLE_PHONEMES.length]!)
  }
  return out
}

/** Total utterance duration for a phoneme chain at a horo step. */
export function durationMs(phonemes: readonly string[], step: HoroStep): number {
  return round2(phonemes.length * phonemeDurationMs(step))
}

/**
 * Derive one utterance from sealed coordinates — explicit horo wins over uuid ring index.
 * Same uuid + horo ⇒ same pitch, phonemes, duration (merge-safe).
 */
export function speechFromHoro(uuid: string, horo: number): ComputedSpeech {
  const step = horoStepFromNumber(horo)
  const phonemes = phonemesOf(uuid, step)
  const periodMs = phonemeDurationMs(step)
  const sig = signalForStep(step)
  return {
    step,
    pitchHz: sig.hz,
    note: sig.note,
    solfege: sig.solfege,
    phonemes,
    periodMs,
    durationMs: durationMs(phonemes, step),
  }
}

/**
 * Derive speech for a UI surface — mirrors `computedCssForUi` facet priority.
 * Speech and color share the same sealed inputs; never hand-maintained transcript text.
 */
export function computedSpeechForUi(surface: UiSurface = {}): ComputedSpeech {
  const step = resolveHoroStep(surface)
  const uuid = surface.contentUuid ?? '00000000-0000-8000-8000-000000000000'
  return speechFromHoro(uuid, step)
}
