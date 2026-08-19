import { describe, it, expect } from 'vitest'
import { threatClassify, assertThreatClassificationHonest, ThreatType } from './index'

describe('threat', () => {
  it('RSA-2048 is immediate-retire', () => {
    const threat = threatClassify('RSA-2048')
    expect(threat).toBeDefined()
    expect(threat?.threatType).toBe('immediate-retire')
  })

  it('ECDLP-P-256 is immediate-retire', () => {
    const threat = threatClassify('ECDLP-P-256')
    expect(threat).toBeDefined()
    expect(threat?.threatType).toBe('immediate-retire')
  })

  it('AES-256 is quantum-accelerated', () => {
    const threat = threatClassify('AES-256')
    expect(threat).toBeDefined()
    expect(threat?.threatType).toBe('quantum-accelerated')
  })

  it('SHA-256 is quantum-accelerated', () => {
    const threat = threatClassify('SHA-256')
    expect(threat).toBeDefined()
    expect(threat?.threatType).toBe('quantum-accelerated')
  })

  it('Case-insensitive algorithm lookup', () => {
    const threat1 = threatClassify('rsa-2048')
    const threat2 = threatClassify('RSA-2048')
    expect(threat1).toEqual(threat2)
  })

  it('Unknown algorithm returns undefined', () => {
    const threat = threatClassify('UNKNOWN-ALGO')
    expect(threat).toBeUndefined()
  })

  it('Threat classification is honest', () => {
    expect(() => assertThreatClassificationHonest()).not.toThrow()
  })
})
