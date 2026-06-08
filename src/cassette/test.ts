import { describe, it, expect } from 'vitest'
import { deviceReadingFromCassette } from '@/cassette'
import { wireModalityToEmr } from '@/medical/device'

describe('cassette — IS medical/device lab facet', () => {
  it('POC cassette result wires to EMR', () => {
    const at = '2026-06-08T12:00:00.000Z'
    const obs = wireModalityToEmr('cassette', [1], at)
    expect(obs[0]!.code).toBe('94500-6')
    expect(deviceReadingFromCassette(1, at).signal).toBe('cassette')
  })
})
