import { describe, it, expect } from 'vitest'
import { deviceReadingFromWatch, deviceReadingFromCgm } from '@/biometric'
import { wireModalityToEmr } from '@/medical/device'

describe('biometric — IS medical/device wearable/vitals capture', () => {
  it('watch HR wires to EMR', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const obs = wireModalityToEmr('watch', [68], at)
    expect(obs).toHaveLength(1)
    expect(obs[0]!.code).toBe('8867-4')
    expect(deviceReadingFromWatch(68, at).signal).toBe('watch')
  })

  it('cgm glucose wires to EMR', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const obs = wireModalityToEmr('cgm', [112], at)
    expect(obs[0]!.value).toBe(112)
    expect(deviceReadingFromCgm(112, at).signal).toBe('cgm')
  })
})
