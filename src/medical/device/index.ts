/**
 * medical/device — clinical hardware registry: collapse at edge, wire to EMR.
 *
 * Every modality simulates a lawful [[readings]] capture, maps LOINC codes, and folds
 * into [[quantum/emr]] observations for analog replay. Parent hub for vitals, imaging,
 * lab, therapy, surgical, wearable, diagnostic, and hospital devices — bonded to
 * [[device]] · [[vital]] · [[biometric]] · [[imaging]] · [[health]] vocabulary atoms.
 *
 *   tsx src/medical/device/index.ts
 *
 * @audit boundary checks delegate to [[readings]]/[[quantum/device]]; never hand-asserted sensing
 * @see ../../readings — ../../quantum/emr — ../../quantum/device — ./SKILL.md
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import type { DeviceReading } from '@/readings'
import { readingBoundaryHolds } from '@/readings'
import type { EmrObservation } from '@/quantum/emr'
import { observationFromDeviceReading } from '@/quantum/emr'
import type { MedicalSignal } from '@/quantum/device'

export type MedicalDeviceCategory =
  | 'vitals'
  | 'imaging'
  | 'lab'
  | 'therapy'
  | 'surgical'
  | 'wearable'
  | 'diagnostic'
  | 'hospital'

export type MedicalDeviceModality =
  | 'bp'
  | 'oximeter'
  | 'thermometer'
  | 'glucometer'
  | 'ecg'
  | 'holter'
  | 'fetal'
  | 'xray'
  | 'ct'
  | 'mri'
  | 'ultrasound'
  | 'pet'
  | 'centrifuge'
  | 'analyzer'
  | 'cassette'
  | 'infusion'
  | 'ventilator'
  | 'dialysis'
  | 'pacemaker'
  | 'defibrillator'
  | 'cautery'
  | 'laparoscope'
  | 'anesthesia'
  | 'cgm'
  | 'watch'
  | 'cpap'
  | 'spirometer'
  | 'audiometer'
  | 'ophthalmoscope'
  | 'otoscope'
  | 'endoscope'
  | 'monitor'
  | 'bed'
  | 'ivpump'

/** One scalar output slot on a collapsed reading (index into `numbers`). */
export interface DeviceOutputSlot {
  readonly code: string
  readonly unit?: string
  readonly index: number
}

export interface MedicalDeviceSpec {
  readonly modality: MedicalDeviceModality
  readonly category: MedicalDeviceCategory
  readonly signal: MedicalSignal
  readonly outputs: readonly DeviceOutputSlot[]
}

export const MEDICAL_DEVICES: Record<MedicalDeviceModality, MedicalDeviceSpec> = {
  bp: {
    modality: 'bp',
    category: 'vitals',
    signal: 'pressure',
    outputs: [
      { code: '8480-6', unit: 'mmHg', index: 0 },
      { code: '8462-4', unit: 'mmHg', index: 1 },
    ],
  },
  oximeter: {
    modality: 'oximeter',
    category: 'vitals',
    signal: 'spo2',
    outputs: [
      { code: '2708-6', unit: '%', index: 0 },
      { code: '8867-4', unit: '/min', index: 1 },
    ],
  },
  thermometer: {
    modality: 'thermometer',
    category: 'vitals',
    signal: 'temperature',
    outputs: [{ code: '8310-5', unit: 'Cel', index: 0 }],
  },
  glucometer: {
    modality: 'glucometer',
    category: 'vitals',
    signal: 'glucose',
    outputs: [{ code: '2339-0', unit: 'mg/dL', index: 0 }],
  },
  ecg: {
    modality: 'ecg',
    category: 'vitals',
    signal: 'ecg',
    outputs: [{ code: '8867-4', unit: '/min', index: 0 }],
  },
  holter: {
    modality: 'holter',
    category: 'vitals',
    signal: 'holter',
    outputs: [{ code: '8867-4', unit: '/min', index: 0 }],
  },
  fetal: {
    modality: 'fetal',
    category: 'vitals',
    signal: 'fetal',
    outputs: [
      { code: '11948-7', unit: '/min', index: 0 },
      { code: '8867-4', unit: '/min', index: 1 },
    ],
  },
  xray: {
    modality: 'xray',
    category: 'imaging',
    signal: 'xray',
    outputs: [{ code: '9843-6', unit: 'mGy', index: 0 }],
  },
  ct: {
    modality: 'ct',
    category: 'imaging',
    signal: 'ct',
    outputs: [{ code: '9843-6', unit: 'mGy', index: 0 }],
  },
  mri: {
    modality: 'mri',
    category: 'imaging',
    signal: 'mri',
    outputs: [{ code: '9843-6', unit: 'mGy', index: 0 }],
  },
  ultrasound: {
    modality: 'ultrasound',
    category: 'imaging',
    signal: 'ultrasound',
    outputs: [{ code: '11841-4', unit: 'cm', index: 0 }],
  },
  pet: {
    modality: 'pet',
    category: 'imaging',
    signal: 'pet',
    outputs: [{ code: '36952-8', unit: '{SUV}', index: 0 }],
  },
  centrifuge: {
    modality: 'centrifuge',
    category: 'lab',
    signal: 'centrifuge',
    outputs: [{ code: '20564-1', unit: 'RPM', index: 0 }],
  },
  analyzer: {
    modality: 'analyzer',
    category: 'lab',
    signal: 'analyzer',
    outputs: [{ code: '2345-7', unit: 'mg/dL', index: 0 }],
  },
  cassette: {
    modality: 'cassette',
    category: 'lab',
    signal: 'cassette',
    outputs: [{ code: '94500-6', unit: '{result}', index: 0 }],
  },
  infusion: {
    modality: 'infusion',
    category: 'therapy',
    signal: 'infusion',
    outputs: [{ code: '41820-0', unit: 'mL/h', index: 0 }],
  },
  ventilator: {
    modality: 'ventilator',
    category: 'therapy',
    signal: 'ventilator',
    outputs: [
      { code: '20112-8', unit: 'mL', index: 0 },
      { code: '3151-8', unit: '/min', index: 1 },
    ],
  },
  dialysis: {
    modality: 'dialysis',
    category: 'therapy',
    signal: 'dialysis',
    outputs: [{ code: '99715-2', unit: 'mL/min', index: 0 }],
  },
  pacemaker: {
    modality: 'pacemaker',
    category: 'therapy',
    signal: 'pacemaker',
    outputs: [{ code: '8867-4', unit: '/min', index: 0 }],
  },
  defibrillator: {
    modality: 'defibrillator',
    category: 'therapy',
    signal: 'defibrillator',
    outputs: [{ code: '89240-7', unit: 'J', index: 0 }],
  },
  cautery: {
    modality: 'cautery',
    category: 'surgical',
    signal: 'cautery',
    outputs: [{ code: '89247-4', unit: 'W', index: 0 }],
  },
  laparoscope: {
    modality: 'laparoscope',
    category: 'surgical',
    signal: 'laparoscope',
    outputs: [{ code: '89247-4', unit: '{score}', index: 0 }],
  },
  anesthesia: {
    modality: 'anesthesia',
    category: 'surgical',
    signal: 'anesthesia',
    outputs: [
      { code: '3150-0', unit: '%', index: 0 },
      { code: '8478-0', unit: 'mmHg', index: 1 },
    ],
  },
  cgm: {
    modality: 'cgm',
    category: 'wearable',
    signal: 'cgm',
    outputs: [{ code: '2339-0', unit: 'mg/dL', index: 0 }],
  },
  watch: {
    modality: 'watch',
    category: 'wearable',
    signal: 'watch',
    outputs: [{ code: '8867-4', unit: '/min', index: 0 }],
  },
  cpap: {
    modality: 'cpap',
    category: 'wearable',
    signal: 'cpap',
    outputs: [{ code: '59467-0', unit: 'cm[H2O]', index: 0 }],
  },
  spirometer: {
    modality: 'spirometer',
    category: 'diagnostic',
    signal: 'spirometer',
    outputs: [
      { code: '20150-9', unit: 'L', index: 0 },
      { code: '20151-7', unit: 'L', index: 1 },
    ],
  },
  audiometer: {
    modality: 'audiometer',
    category: 'diagnostic',
    signal: 'audiometer',
    outputs: [{ code: '9843-6', unit: 'dB', index: 0 }],
  },
  ophthalmoscope: {
    modality: 'ophthalmoscope',
    category: 'diagnostic',
    signal: 'ophthalmoscope',
    outputs: [{ code: '89247-4', unit: '{score}', index: 0 }],
  },
  otoscope: {
    modality: 'otoscope',
    category: 'diagnostic',
    signal: 'otoscope',
    outputs: [{ code: '89247-4', unit: '{score}', index: 0 }],
  },
  endoscope: {
    modality: 'endoscope',
    category: 'diagnostic',
    signal: 'endoscope',
    outputs: [{ code: '89247-4', unit: '{score}', index: 0 }],
  },
  monitor: {
    modality: 'monitor',
    category: 'hospital',
    signal: 'monitor',
    outputs: [
      { code: '8867-4', unit: '/min', index: 0 },
      { code: '2708-6', unit: '%', index: 1 },
      { code: '8480-6', unit: 'mmHg', index: 2 },
    ],
  },
  bed: {
    modality: 'bed',
    category: 'hospital',
    signal: 'bed',
    outputs: [{ code: '89247-4', unit: '{alarm}', index: 0 }],
  },
  ivpump: {
    modality: 'ivpump',
    category: 'hospital',
    signal: 'ivpump',
    outputs: [{ code: '41820-0', unit: 'mL/h', index: 0 }],
  },
}

export const MODALITIES = Object.keys(MEDICAL_DEVICES) as MedicalDeviceModality[]

/** Canonical ledger hook — record medical/device path step (append-only). */
export function recordMedicalDeviceOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit(
    'medical/device',
    { kind: 'medical.device.step', payload },
    at,
    prevEntryUuid,
    seq,
  )
}

export const devicesInCategory = (category: MedicalDeviceCategory): readonly MedicalDeviceSpec[] =>
  MODALITIES.map((m) => MEDICAL_DEVICES[m]).filter((d) => d.category === category)

export const deviceSpec = (modality: MedicalDeviceModality): MedicalDeviceSpec => MEDICAL_DEVICES[modality]

/** Build a lawful collapsed reading for any registered modality. */
export function deviceReadingFromModality(
  modality: MedicalDeviceModality,
  numbers: readonly number[],
  at: string,
): DeviceReading {
  const spec = MEDICAL_DEVICES[modality]
  const unit = spec.outputs.length === 1 ? spec.outputs[0]!.unit : undefined
  return { signal: spec.signal, numbers, at, unit }
}

/** Fold one reading into one or more EMR observations (multi-code modalities). */
export function observationsFromMedicalDevice(
  modality: MedicalDeviceModality,
  reading: DeviceReading,
): EmrObservation[] {
  const spec = MEDICAL_DEVICES[modality]
  if (reading.signal !== spec.signal) {
    throw new Error(`signal mismatch: expected ${spec.signal}, got ${reading.signal}`)
  }
  if (!readingBoundaryHolds(reading)) {
    throw new Error('device reading does not cross boundary')
  }
  return spec.outputs.map((slot) => {
    const value = reading.numbers[slot.index]
    if (value === undefined) {
      throw new Error(`missing value at index ${slot.index} for ${modality}`)
    }
    const slice: DeviceReading = {
      signal: reading.signal,
      numbers: [value],
      at: reading.at,
      unit: slot.unit ?? reading.unit,
    }
    return observationFromDeviceReading(slice, slot.code)
  })
}

/** Capture → reading → observations — full wire for one modality. */
export function wireModalityToEmr(
  modality: MedicalDeviceModality,
  numbers: readonly number[],
  at: string,
): EmrObservation[] {
  const reading = deviceReadingFromModality(modality, numbers, at)
  return observationsFromMedicalDevice(modality, reading)
}

// ── per-modality capture helpers (simulate device edge collapse) ─────────────

export const deviceReadingFromBp = (systolic: number, diastolic: number, at: string) =>
  deviceReadingFromModality('bp', [systolic, diastolic], at)

export const deviceReadingFromOximeter = (spo2: number, pulse: number, at: string) =>
  deviceReadingFromModality('oximeter', [spo2, pulse], at)

export const deviceReadingFromThermometer = (celsius: number, at: string) =>
  deviceReadingFromModality('thermometer', [celsius], at)

export const deviceReadingFromGlucometer = (mgDl: number, at: string) =>
  deviceReadingFromModality('glucometer', [mgDl], at)

export const deviceReadingFromEcg = (bpm: number, at: string) => deviceReadingFromModality('ecg', [bpm], at)

export const deviceReadingFromHolter = (avgBpm: number, at: string) =>
  deviceReadingFromModality('holter', [avgBpm], at)

export const deviceReadingFromFetal = (fhr: number, maternalHr: number, at: string) =>
  deviceReadingFromModality('fetal', [fhr, maternalHr], at)

export const deviceReadingFromXray = (doseMgy: number, at: string) =>
  deviceReadingFromModality('xray', [doseMgy], at)

export const deviceReadingFromCt = (doseMgy: number, at: string) => deviceReadingFromModality('ct', [doseMgy], at)

export const deviceReadingFromMri = (doseMgy: number, at: string) => deviceReadingFromModality('mri', [doseMgy], at)

export const deviceReadingFromUltrasound = (depthCm: number, at: string) =>
  deviceReadingFromModality('ultrasound', [depthCm], at)

export const deviceReadingFromPet = (suv: number, at: string) => deviceReadingFromModality('pet', [suv], at)

export const deviceReadingFromCentrifuge = (rpm: number, at: string) =>
  deviceReadingFromModality('centrifuge', [rpm], at)

export const deviceReadingFromAnalyzer = (analyte: number, at: string) =>
  deviceReadingFromModality('analyzer', [analyte], at)

export const deviceReadingFromCassette = (result: number, at: string) =>
  deviceReadingFromModality('cassette', [result], at)

export const deviceReadingFromInfusion = (rateMlH: number, at: string) =>
  deviceReadingFromModality('infusion', [rateMlH], at)

export const deviceReadingFromVentilator = (tidalMl: number, rate: number, at: string) =>
  deviceReadingFromModality('ventilator', [tidalMl, rate], at)

export const deviceReadingFromDialysis = (ufRate: number, at: string) =>
  deviceReadingFromModality('dialysis', [ufRate], at)

export const deviceReadingFromPacemaker = (pacedBpm: number, at: string) =>
  deviceReadingFromModality('pacemaker', [pacedBpm], at)

export const deviceReadingFromDefibrillator = (joules: number, at: string) =>
  deviceReadingFromModality('defibrillator', [joules], at)

export const deviceReadingFromCautery = (watts: number, at: string) =>
  deviceReadingFromModality('cautery', [watts], at)

export const deviceReadingFromLaparoscope = (score: number, at: string) =>
  deviceReadingFromModality('laparoscope', [score], at)

export const deviceReadingFromAnesthesia = (fio2: number, map: number, at: string) =>
  deviceReadingFromModality('anesthesia', [fio2, map], at)

export const deviceReadingFromCgm = (mgDl: number, at: string) => deviceReadingFromModality('cgm', [mgDl], at)

export const deviceReadingFromWatch = (bpm: number, at: string) => deviceReadingFromModality('watch', [bpm], at)

export const deviceReadingFromCpap = (pressure: number, at: string) =>
  deviceReadingFromModality('cpap', [pressure], at)

export const deviceReadingFromSpirometer = (fvc: number, fev1: number, at: string) =>
  deviceReadingFromModality('spirometer', [fvc, fev1], at)

export const deviceReadingFromAudiometer = (thresholdDb: number, at: string) =>
  deviceReadingFromModality('audiometer', [thresholdDb], at)

export const deviceReadingFromOphthalmoscope = (score: number, at: string) =>
  deviceReadingFromModality('ophthalmoscope', [score], at)

export const deviceReadingFromOtoscope = (score: number, at: string) =>
  deviceReadingFromModality('otoscope', [score], at)

export const deviceReadingFromEndoscope = (score: number, at: string) =>
  deviceReadingFromModality('endoscope', [score], at)

export const deviceReadingFromMonitor = (hr: number, spo2: number, systolic: number, at: string) =>
  deviceReadingFromModality('monitor', [hr, spo2, systolic], at)

export const deviceReadingFromBed = (alarm: number, at: string) => deviceReadingFromModality('bed', [alarm], at)

export const deviceReadingFromIvpump = (rateMlH: number, at: string) =>
  deviceReadingFromModality('ivpump', [rateMlH], at)

/** Every registered modality produces a boundary-holding reading. */
export const allModalitiesBoundaryHold = (): boolean =>
  MODALITIES.every((m) => {
    const spec = MEDICAL_DEVICES[m]
    const nums = spec.outputs.map((_, i) => 100 + i)
    return readingBoundaryHolds(deviceReadingFromModality(m, nums, '2026-06-08T12:00:00.000Z'))
  })

if (import.meta.url === 'file://' + process.argv[1]) {
  const at = '2026-06-08T12:00:00.000Z'
  const obs = wireModalityToEmr('bp', [120, 80], at)
  console.log(
    'medical/device — modalities=' +
      MODALITIES.length +
      ' · boundary=' +
      allModalitiesBoundaryHold() +
      ' · bp codes=' +
      obs.map((o) => o.code).join('+'),
  )
}
