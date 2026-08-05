import { describe, it, expect } from 'vitest'
import { kyber768GenerateKeyPair, sphincsGenerateKeyPair } from './index'

describe('pqc', () => {
  it('Kyber-768 generates correct key sizes', () => {
    const { publicKey, secretKey } = kyber768GenerateKeyPair()
    expect(publicKey).toHaveLength(1184)
    expect(secretKey).toHaveLength(2400)
  })

  it('SPHINCS+ generates correct key sizes', () => {
    const { publicKey, secretKey } = sphincsGenerateKeyPair()
    expect(publicKey).toHaveLength(32)
    expect(secretKey).toHaveLength(64)
  })
})
