/**
 * speech/realtime — collapse → sealed utterance → team/comms wave emit.
 *
 * Event id: `speech:collapsed` — the speech gate twin of trading/dimension collapse emits.
 *
 * @see ../quantum/speech — ../team/comms — ../realtime — ../wave/session
 */
import { computeContentUuid } from '@/integrity'
import { append } from '@/realtime'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
  type TeamCommsEmit,
  type WaveInSecureCommsResult,
} from '@/team/comms'
import type { ComputedSpeech } from './computed'

export const SPEECH_COLLAPSED_EVENT = 'speech:collapsed' as const

/** A collapsed, sealed utterance riding the secure wave envelope. */
export interface CollapsedUtterance {
  readonly utteranceUuid: string
  readonly tenantId: string
  readonly contentUuid: string
  readonly horo: number
  readonly pitchHz: number
  readonly phonemes: readonly string[]
  readonly durationMs: number
  readonly collapsedAt: string
}

export interface SpeechRealtimeEvent {
  readonly utteranceUuid: string
  readonly event: typeof SPEECH_COLLAPSED_EVENT
  readonly emit: TeamCommsEmit
  readonly verdictOk: boolean
}

export interface EmitSpeechCollapsedOpts {
  readonly utterance: CollapsedUtterance
  readonly envelope: SecureWaveEnvelope
  readonly scopeTenantId: string
  readonly agent: string
  readonly receipt?: {
    readonly actor: string
    readonly head: { leafUuid: string; seq: number } | null
    readonly timestampIso: string
  }
}

export interface EmitSpeechCollapsedResult extends WaveInSecureCommsResult {
  readonly speechEvent: SpeechRealtimeEvent
}

/** Seal a collapsed utterance body as content-uuid — same content ⇒ same utterance id. */
export function sealCollapsedUtterance(body: Omit<CollapsedUtterance, 'utteranceUuid'>): string {
  return computeContentUuid(
    {
      tenantId: body.tenantId,
      contentUuid: body.contentUuid,
      horo: body.horo,
      pitchHz: body.pitchHz,
      phonemes: [...body.phonemes],
      durationMs: body.durationMs,
      collapsedAt: body.collapsedAt,
    },
    body.tenantId,
  )
}

/** Fold a computed speech frame into a collapsed utterance record. */
export function collapsedUtteranceFromSpeech(
  tenantId: string,
  contentUuid: string,
  horo: number,
  speech: ComputedSpeech,
  collapsedAt: string,
): CollapsedUtterance {
  const body = {
    tenantId,
    contentUuid,
    horo,
    pitchHz: speech.pitchHz,
    phonemes: speech.phonemes,
    durationMs: speech.durationMs,
    collapsedAt,
  }
  return { utteranceUuid: sealCollapsedUtterance(body), ...body }
}

/** Build wave correlation uuid for a speech session. */
export function speechWaveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return waveCorrelationUuid(opts)
}

/**
 * Emit a collapsed utterance on the realtime bus via team/comms secure wave envelope.
 */
export function emitSpeechCollapsed(opts: EmitSpeechCollapsedOpts): EmitSpeechCollapsedResult {
  const event = SPEECH_COLLAPSED_EVENT
  const payload = {
    utteranceUuid: opts.utterance.utteranceUuid,
    contentUuid: opts.utterance.contentUuid,
    horo: opts.utterance.horo,
    pitchHz: opts.utterance.pitchHz,
    phonemes: [...opts.utterance.phonemes],
    durationMs: opts.utterance.durationMs,
    [SECURE_WAVE_PAYLOAD_KEY]: opts.envelope,
  }
  const eventUuid = computeContentUuid(
    {
      id: event,
      tenantId: opts.utterance.tenantId,
      payload,
      emittedAt: opts.envelope.emittedAt,
    },
    opts.utterance.tenantId,
  )
  const result = waveInSecureComms({
    scopeTenantId: opts.scopeTenantId,
    envelope: opts.envelope,
    event,
    eventUuid,
    agent: opts.agent,
    payload,
    receipt: opts.receipt,
  })
  return {
    ...result,
    speechEvent: {
      utteranceUuid: opts.utterance.utteranceUuid,
      event,
      emit: result.emit,
      verdictOk: result.verdict.ok,
    },
  }
}

/** Append a speech realtime event to an append-only log (pull-side delivery). */
export function appendSpeechToLog<T extends SpeechRealtimeEvent>(log: readonly T[], event: T): T[] {
  return append(log, event)
}
