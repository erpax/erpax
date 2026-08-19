export type ThreatType = 'immediate-retire' | 'quantum-accelerated' | 'quantum-safe'

export interface ThreatModel {
  readonly algorithm: string
  readonly keyBits: number
  readonly threatType: ThreatType
  readonly groverAcceleration?: number
  readonly shorFactorization?: string
}

const THREAT_REGISTRY: readonly ThreatModel[] = [
  {
    algorithm: 'RSA-2048',
    keyBits: 2048,
    threatType: 'immediate-retire',
    shorFactorization: 'polynomial time via Shor (~20M Toffoli gates)',
  },
  {
    algorithm: 'ECDLP-P-256',
    keyBits: 256,
    threatType: 'immediate-retire',
    shorFactorization: 'polynomial time via Shor (~1.9B gates)',
  },
  {
    algorithm: 'AES-256',
    keyBits: 256,
    threatType: 'quantum-accelerated',
    groverAcceleration: Math.sqrt(2 ** 256),
  },
  {
    algorithm: 'SHA-256',
    keyBits: 256,
    threatType: 'quantum-accelerated',
    groverAcceleration: Math.sqrt(2 ** 256),
  },
]

export function threatClassify(algorithm: string): ThreatModel | undefined {
  return THREAT_REGISTRY.find(
    t => t.algorithm.toLowerCase() === algorithm.toLowerCase(),
  )
}

export function assertThreatClassificationHonest(): void {
  const rsaEcdlp = THREAT_REGISTRY.filter(t => /RSA|ECDLP/.test(t.algorithm))
  if (rsaEcdlp.some(t => t.threatType !== 'immediate-retire')) {
    throw new Error('RSA/ECDLP must be immediate-retire (Shor breaks completely)')
  }

  const withGrover = THREAT_REGISTRY.filter(t => t.groverAcceleration)
  for (const threat of withGrover) {
    const expectedSqrt = Math.sqrt(2 ** threat.keyBits)
    if (threat.groverAcceleration !== expectedSqrt) {
      throw new Error(
        `${threat.algorithm}: Grover must be sqrt(2^${threat.keyBits}), not 2^(${threat.keyBits}/2)`,
      )
    }
  }
}

assertThreatClassificationHonest()
