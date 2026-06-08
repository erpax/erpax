/**
 * speech — computed utterances from sealed coordinates (the sound gate twin of css).
 *
 * Speech is never hand-authored transcript text — it is **computed** from diamond state:
 * content-uuid · horo · seal · path, bonded to [[signal]] (A432 pitch) · [[pixel]] (chroma)
 * · [[uuid/llm]] (horo bridge) · [[taichi]] (chi-cung breath) · [[wave]] (session emit).
 *
 * User spelling alias: `speach` (bonds may reference either spelling).
 *
 *   tsx src/speech/index.ts
 *
 * @standard ISO-16:1975 a432-tuning-reference (pitch); value from position
 * @see ./SKILL.md — ../quantum/speech — ../signal — ../css/computed — ../taichi — ../wave
 */
import { uuid } from '@/integrity'
import {
  chiCungBreathCycle,
  CHI_CUNG_PHASES,
  type ChiCungPhase,
  type ChiCungBreath,
} from '@/taichi'
import { isHoroStep, type HoroStep } from '@/horo'
import {
  computedSpeechForUi,
  durationMs,
  phonemeDurationMs,
  phonemesOf,
  pitchOf,
  SPEACH_ALIAS,
  speechFromHoro,
  type ComputedSpeech,
  type NibblePhoneme,
  NIBBLE_PHONEMES,
} from './computed'

export {
  computedSpeechForUi,
  durationMs,
  phonemeDurationMs,
  phonemesOf,
  pitchOf,
  SPEACH_ALIAS,
  speechFromHoro,
  NIBBLE_PHONEMES,
  type ComputedSpeech,
  type NibblePhoneme,
} from './computed'

export {
  SPEECH_COLLAPSED_EVENT,
  appendSpeechToLog,
  collapsedUtteranceFromSpeech,
  emitSpeechCollapsed,
  sealCollapsedUtterance,
  speechWaveCorrelationUuid,
  type CollapsedUtterance,
  type EmitSpeechCollapsedOpts,
  type EmitSpeechCollapsedResult,
  type SpeechRealtimeEvent,
} from './realtime'

export { ComputedSpeechProvider, useComputedSpeech, type ComputedSpeechContextValue, type ComputedSpeechProviderProps } from './ComputedSpeechProvider'

export { writingToSpeech, prosePhonemes, type WritingToSpeechOpts } from './writing-bridge'

/** Append-only speech capture — one computed utterance instant. */
export interface SpeechEntry {
  readonly id: string
  readonly contentUuid: string
  readonly horo: HoroStep
  readonly at: string
  readonly supersedes?: string | null
}

/** One point on the analog speech timeline (EMR-style replay). */
export interface SpeechAnalogResult {
  readonly entryId: string
  readonly contentUuid: string
  readonly horo: HoroStep
  readonly pitchHz: number
  readonly phonemes: readonly string[]
  readonly durationMs: number
  readonly at: string
  readonly superseded: boolean
  readonly active: boolean
}

/** Content-address one speech capture. */
export const speechEntryUuid = (payload: unknown): string => uuid(payload)

/** Build a lawful speech entry from sealed coordinates. */
export function speechEntryOf(contentUuid: string, horo: HoroStep, at: string): SpeechEntry {
  const payload = { contentUuid, horo, at }
  return { id: speechEntryUuid(payload), contentUuid, horo, at }
}

const supersededSpeechIds = (entries: readonly SpeechEntry[]): ReadonlySet<string> => {
  const ids = new Set<string>()
  for (const e of entries) {
    if (e.supersedes) ids.add(e.supersedes)
  }
  return ids
}

/** Active winning entry per contentUuid at instant `at` (inclusive). */
export function reconstructSpeechAt(
  entries: readonly SpeechEntry[],
  at: string,
): ReadonlyMap<string, SpeechAnalogResult> {
  const visible = entries.filter((e) => e.at <= at)
  const superseded = supersededSpeechIds(visible)
  const byUuid = new Map<string, SpeechEntry[]>()
  for (const e of visible) {
    if (superseded.has(e.id)) continue
    const list = byUuid.get(e.contentUuid) ?? []
    list.push(e)
    byUuid.set(e.contentUuid, list)
  }
  const out = new Map<string, SpeechAnalogResult>()
  for (const [contentUuid, list] of byUuid) {
    const winner = list.reduce((best, e) => (e.at > best.at ? e : best), list[0]!)
    const speech = speechFromHoro(contentUuid, winner.horo)
    out.set(contentUuid, {
      entryId: winner.id,
      contentUuid,
      horo: winner.horo,
      pitchHz: speech.pitchHz,
      phonemes: speech.phonemes,
      durationMs: speech.durationMs,
      at: winner.at,
      superseded: false,
      active: true,
    })
  }
  return out
}

function latestSpeechAt(entries: readonly SpeechEntry[]): string | null {
  if (entries.length === 0) return null
  return entries.reduce((max, e) => (e.at > max ? e.at : max), entries[0]!.at)
}

/**
 * Map append-only speech entries → analog utterance stream (EMR-style timeline).
 * Corrections supersede; `active` reflects the winner at `asOf`.
 */
export function speechAnalogStream(
  entries: readonly SpeechEntry[],
  opts?: { asOf?: string },
): SpeechAnalogResult[] {
  const asOf = opts?.asOf ?? latestSpeechAt(entries) ?? ''
  const active = reconstructSpeechAt(entries, asOf)
  const superseded = supersededSpeechIds(entries)
  return [...entries]
    .sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
    .map((e) => {
      const speech = speechFromHoro(e.contentUuid, e.horo)
      return {
        entryId: e.id,
        contentUuid: e.contentUuid,
        horo: e.horo,
        pitchHz: speech.pitchHz,
        phonemes: speech.phonemes,
        durationMs: speech.durationMs,
        at: e.at,
        superseded: superseded.has(e.id),
        active: active.get(e.contentUuid)?.entryId === e.id,
      }
    })
}

/** One tai-chi chi-cung breath tick with computed speech at the yang pole. */
export interface ChiCungSpeechFrame {
  readonly tick: number
  readonly phase: ChiCungPhase
  readonly breath: ChiCungBreath
  readonly contentUuid: string
  readonly speech: ComputedSpeech
}

/**
 * Bond taichi chi-cung breath phases to computed speech frames.
 * The forward (yang) torus pole supplies horo; content-uuid seals the syllable chain.
 */
export function chiCungSpeechCycle(
  tick: number,
  contentUuid: string,
  anchor: HoroStep = 1,
): ChiCungSpeechFrame {
  const breath = chiCungBreathCycle(tick, anchor)
  const step = breath.flow.forward
  return {
    tick: breath.tick,
    phase: breath.phase,
    breath,
    contentUuid,
    speech: speechFromHoro(contentUuid, step),
  }
}

/** All four breath phases as a crest utterance chain for one content-uuid. */
export function chiCungUtteranceChain(contentUuid: string, anchor: HoroStep = 8): ChiCungSpeechFrame[] {
  const anchorStep: HoroStep = isHoroStep(anchor) ? anchor : 8
  return CHI_CUNG_PHASES.map((_, i) => chiCungSpeechCycle(i, contentUuid, anchorStep))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const TAICHI = '220f7274-dfa6-8321-bf45-4cfd86e2bee4'
  const s = speechFromHoro(TAICHI, 8)
  console.log('speech — computed from sealed coordinates (horo 8 crest):')
  console.log('  pitch=' + s.pitchHz + 'Hz note=' + s.note + ' phonemes=' + s.phonemes.join('·'))
  console.log('  duration=' + s.durationMs + 'ms period=' + s.periodMs + 'ms/syllable')
  const chain = chiCungUtteranceChain(TAICHI, 8)
  console.log('  chi-cung chain=' + chain.map((f) => f.phase + ':' + f.speech.phonemes[0]).join(' → '))
}
