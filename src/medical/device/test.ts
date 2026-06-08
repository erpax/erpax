/**
 * medical/device — clinical hardware registry; device → readings → EMR wire.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { readingBoundaryHolds } from '@/readings'
import { analogResults, reconstructAt } from '@/quantum/emr'
import {
  MEDICAL_DEVICES,
  MODALITIES,
  devicesInCategory,
  deviceReadingFromModality,
  observationsFromMedicalDevice,
  wireModalityToEmr,
  deviceReadingFromBp,
  allModalitiesBoundaryHold,
} from '@/medical/device'

const AT = '2026-06-08T12:00:00.000Z'

describe('medical/device — registry', () => {
  it('covers 34 modalities across 8 categories', () => {
    expect(MODALITIES).toHaveLength(34)
    const cats = new Set(MODALITIES.map((m) => MEDICAL_DEVICES[m].category))
    expect(cats.size).toBe(8)
    expect(devicesInCategory('vitals')).toHaveLength(7)
    expect(devicesInCategory('imaging')).toHaveLength(5)
    expect(devicesInCategory('lab')).toHaveLength(3)
    expect(devicesInCategory('therapy')).toHaveLength(5)
    expect(devicesInCategory('surgical')).toHaveLength(3)
    expect(devicesInCategory('wearable')).toHaveLength(3)
    expect(devicesInCategory('diagnostic')).toHaveLength(5)
    expect(devicesInCategory('hospital')).toHaveLength(3)
  })

  it('allModalitiesBoundaryHold — every modality crosses the device edge lawfully', () => {
    expect(allModalitiesBoundaryHold()).toBe(true)
  })

  it('rejects raw stream leakage on any modality', () => {
    const reading = {
      ...deviceReadingFromModality('bp', [120, 80], AT),
      rawStream: [1, 2, 3],
    }
    expect(readingBoundaryHolds(reading)).toBe(false)
  })
})

describe('medical/device — vitals wire', () => {
  it('deviceReadingFromBp → dual LOINC observations', () => {
    const reading = deviceReadingFromBp(120, 80, AT)
    expect(readingBoundaryHolds(reading)).toBe(true)
    const obs = observationsFromMedicalDevice('bp', reading)
    expect(obs).toHaveLength(2)
    expect(obs.map((o) => o.code).sort()).toEqual(['8462-4', '8480-6'])
    expect(obs.find((o) => o.code === '8480-6')?.value).toBe(120)
    expect(obs.find((o) => o.code === '8462-4')?.value).toBe(80)
  })

  it('wireModalityToEmr composes capture through EMR for oximeter', () => {
    const obs = wireModalityToEmr('oximeter', [98, 72], AT)
    expect(obs).toHaveLength(2)
    expect(obs.find((o) => o.code === '2708-6')?.value).toBe(98)
    expect(obs.find((o) => o.code === '8867-4')?.value).toBe(72)
  })
})

describe('medical/device — full pipeline per category sample', () => {
  const samples: Array<[typeof MODALITIES[number], readonly number[]]> = [
    ['thermometer', [37.2]],
    ['glucometer', [110]],
    ['ct', [12.5]],
    ['cassette', [1]],
    ['ventilator', [450, 14]],
    ['cgm', [105]],
    ['spirometer', [3.2, 2.8]],
    ['monitor', [78, 97, 118]],
  ]

  it.each(samples)('%s boundary → observations → analog replay', (modality, numbers) => {
    const obs = wireModalityToEmr(modality, numbers, AT)
    const spec = MEDICAL_DEVICES[modality]
    expect(obs).toHaveLength(spec.outputs.length)
    const stream = analogResults(obs, { asOf: AT })
    const active = stream.filter((r) => r.active)
    expect(active).toHaveLength(spec.outputs.length)
    const state = reconstructAt(obs, AT)
    for (const slot of spec.outputs) {
      expect(state.get(slot.code)?.value).toBe(numbers[slot.index])
    }
  })
})

describe('medical/device — every modality wires to EMR', () => {
  it.each(MODALITIES)('%s produces lawful observations', (modality) => {
    const spec = MEDICAL_DEVICES[modality]
    const numbers = spec.outputs.map((_, i) => 50 + i * 10)
    const obs = wireModalityToEmr(modality, numbers, AT)
    expect(obs.length).toBe(spec.outputs.length)
    for (const o of obs) {
      expect(o.kind).toBe('observation')
      expect(o.at).toBe(AT)
    }
  })
})
