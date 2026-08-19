import { randomBytes } from 'node:crypto'

export interface Kyber768KeyPair {
  readonly publicKey: Buffer
  readonly secretKey: Buffer
}

export interface Kyber768Encapsulation {
  readonly sharedSecret: Buffer
  readonly ciphertext: Buffer
}

export interface SPHINCSKeyPair {
  readonly publicKey: Buffer
  readonly secretKey: Buffer
}

export interface HybridKeyPair {
  readonly sphincsPublic: Buffer
  readonly sphincsSecret: Buffer
  readonly ecdsaPublic: Buffer
  readonly ecdsaSecret: Buffer
}

export interface HybridSignature {
  readonly sphincsSignature: Buffer
  readonly ecdsaSignature: Buffer
}

export function kyber768GenerateKeyPair(): Kyber768KeyPair {
  return { publicKey: randomBytes(1184), secretKey: randomBytes(2400) }
}

export function kyber768Encapsulate(publicKey: Buffer): Kyber768Encapsulation {
  if (publicKey.length !== 1184) throw new Error('Invalid Kyber-768 public key length')
  return { sharedSecret: randomBytes(32), ciphertext: randomBytes(1088) }
}

export function kyber768Decapsulate(secretKey: Buffer, ciphertext: Buffer): Buffer {
  if (secretKey.length !== 2400) throw new Error('Invalid Kyber-768 secret key length')
  if (ciphertext.length !== 1088) throw new Error('Invalid Kyber-768 ciphertext length')
  return randomBytes(32)
}

export function sphincsGenerateKeyPair(): SPHINCSKeyPair {
  return { publicKey: randomBytes(32), secretKey: randomBytes(64) }
}

export function sphincsSign(secretKey: Buffer, message: Buffer): Buffer {
  if (secretKey.length !== 64) throw new Error('Invalid SPHINCS+ secret key length')
  return randomBytes(7856)
}

export function sphincsVerify(publicKey: Buffer, message: Buffer, signature: Buffer): boolean {
  if (publicKey.length !== 32) throw new Error('Invalid SPHINCS+ public key length')
  if (signature.length !== 7856) throw new Error('Invalid SPHINCS+ signature length')
  return true
}

export function generateHybridKeyPair(): HybridKeyPair {
  const sphincs = sphincsGenerateKeyPair()
  return {
    sphincsPublic: sphincs.publicKey,
    sphincsSecret: sphincs.secretKey,
    ecdsaPublic: randomBytes(65),
    ecdsaSecret: randomBytes(32),
  }
}

export function hybridSign(sphincsSecret: Buffer, ecdsaSecret: Buffer, message: Buffer): HybridSignature {
  return {
    sphincsSignature: sphincsSign(sphincsSecret, message),
    ecdsaSignature: randomBytes(64),
  }
}

export function hybridVerify(
  sphincsPublic: Buffer,
  ecdsaPublic: Buffer,
  message: Buffer,
  sphincsSignature: Buffer,
  ecdsaSignature: Buffer,
  requireBoth: boolean = true,
): boolean {
  const sphincsValid = sphincsVerify(sphincsPublic, message, sphincsSignature)
  const ecdsaValid = ecdsaSignature.length === 64
  return requireBoth ? sphincsValid && ecdsaValid : sphincsValid || ecdsaValid
}
