import { createHmac } from 'node:crypto'

export function expandKeySync(ikm: Buffer, salt?: Buffer, info?: Buffer, length: number = 32): Buffer {
  const actualSalt = salt || Buffer.alloc(32, 0)
  const prk = createHmac('sha256', actualSalt).update(ikm).digest()
  return prk.subarray(0, length)
}
