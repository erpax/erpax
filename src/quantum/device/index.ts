/**
 * quantum/device — measurement instrument: analog collapses to discrete snapshot;
 * capture on edge, numbers only cross the boundary.
 *
 * A device may only report what it can physically sense — the [[biofield]] is not
 * detectable. Each reading is an append-only content-addressed [[snapshot]].
 *
 *   tsx src/quantum/device/index.ts
 *
 * @audit pure functions; never hand-asserted sensing claims
 * @see ../../device — ../../measurement — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Consumer/wearable signals a phone-class device may collapse. */
export const CONSUMER_SIGNALS = ['rppg', 'hrv', 'accelerometer', 'camera', 'mic'] as const

/** Clinical hardware modalities — each maps to a [[medical/device]] registry entry. */
export const MEDICAL_SIGNALS = [
  'pressure',
  'spo2',
  'temperature',
  'glucose',
  'ecg',
  'holter',
  'fetal',
  'xray',
  'ct',
  'mri',
  'ultrasound',
  'pet',
  'centrifuge',
  'analyzer',
  'cassette',
  'infusion',
  'ventilator',
  'dialysis',
  'pacemaker',
  'defibrillator',
  'cautery',
  'laparoscope',
  'anesthesia',
  'cgm',
  'watch',
  'cpap',
  'spirometer',
  'audiometer',
  'ophthalmoscope',
  'otoscope',
  'endoscope',
  'monitor',
  'bed',
  'ivpump',
] as const

/** Signals a real device may collapse — biofield is excluded by law. */
export const DETECTABLE_SIGNALS = [...CONSUMER_SIGNALS, ...MEDICAL_SIGNALS] as const
export type DetectableSignal = (typeof DETECTABLE_SIGNALS)[number]
export type MedicalSignal = (typeof MEDICAL_SIGNALS)[number]

const DETECTABLE = new Set<string>(DETECTABLE_SIGNALS)

/** Device may only collapse what is physically real — biofield ⇒ false. */
export function mayReport(signal: string): boolean {
  if (signal === 'biofield') return false
  return DETECTABLE.has(signal)
}

/** Numbers cross the boundary; the raw analog stream never leaves the edge. */
export function boundaryCrossHolds(payload: {
  numbers: readonly number[]
  rawStream?: unknown
}): boolean {
  return payload.rawStream === undefined && payload.numbers.length > 0
}

/** Each reading is a content-addressed snapshot — final the moment taken. */
export const readingSnapshotUuid = (reading: unknown): string => uuid(reading)

/** Canonical ledger hook — record quantum/device path step (append-only). */
export function recordDeviceOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/device', { kind: 'device.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/device — mayReport(rppg)=' +
      mayReport('rppg') +
      ' · mayReport(biofield)=' +
      mayReport('biofield'),
  )
}
