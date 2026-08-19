import { createHmac, randomBytes } from 'node:crypto'

export interface QuantumFoldCipherKey {
  readonly salt: Buffer
  readonly info: Buffer
  readonly derivedKey: Buffer
}

export async function expandKey(
  ikm: Buffer,
  salt?: Buffer,
  info?: Buffer,
  length: number = 32,
): Promise<Buffer> {
  return expandKeySync(ikm, salt, info, length)
}

export function expandKeySync(ikm: Buffer, salt?: Buffer, info?: Buffer, length: number = 32): Buffer {
  const actualSalt = salt || Buffer.alloc(32, 0)
  const actualInfo = info || Buffer.alloc(0)

  const hmacExtract = createHmac('sha256', actualSalt)
  hmacExtract.update(ikm)
  const prk = hmacExtract.digest()

  const n = Math.ceil(length / 32)
  let t = Buffer.alloc(0)
  const output: Buffer[] = []

  for (let i = 1; i <= n; i++) {
    const hmacExpand = createHmac('sha256', prk)
    hmacExpand.update(t)
    hmacExpand.update(actualInfo)
    hmacExpand.update(Buffer.from([i]))
    t = hmacExpand.digest()
    output.push(t)
  }

  return Buffer.concat(output).subarray(0, length)
}

export function deriveQuantumFoldCipherKey(
  uuid: string,
  entropy?: Buffer,
): QuantumFoldCipherKey {
  const salt = randomBytes(32)
  const ikm = entropy || randomBytes(64)
  const info = Buffer.from(uuid, 'utf8')
  const derivedKey = expandKeySync(ikm, salt, info, 32)
  return { salt, info, derivedKey }
}

export function keysEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a[i]! ^ b[i]!
  }
  return result === 0
}
