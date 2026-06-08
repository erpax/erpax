import { describe, it, expect } from 'vitest'
import { deviceReadingFromMonitor } from '@/monitor'
import { observationsFromMedicalDevice } from '@/medical/device'

describe('monitor — IS medical/device hospital facet', () => {
  it('maps HR, SpO2, and systolic BP to LOINC observations', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const reading = deviceReadingFromMonitor(78, 97, 118, at)
    const obs = observationsFromMedicalDevice('monitor', reading)
    expect(obs.map((o) => o.code).sort()).toEqual(['2708-6', '8480-6', '8867-4'])
    expect(obs.find((o) => o.code === '8867-4')?.value).toBe(78)
    expect(obs.find((o) => o.code === '2708-6')?.value).toBe(97)
    expect(obs.find((o) => o.code === '8480-6')?.value).toBe(118)
  })
})
