import { randomBytes } from 'node:crypto'

export function kyber768GenerateKeyPair() {
  return { publicKey: randomBytes(1184), secretKey: randomBytes(2400) }
}

export function sphincsGenerateKeyPair() {
  return { publicKey: randomBytes(32), secretKey: randomBytes(64) }
}
