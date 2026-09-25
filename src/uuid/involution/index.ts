/**
 * uuid/involution — the XOR group on addresses: σ² = id, and differences telescope. See SKILL.md.
 *
 * @standard RFC 9562 §4.1 §5.8 — the version and variant bits a uuid must keep
 * @see ./SKILL.md — ../matrix — ../../cost/bits
 */
import { exactMax } from '@/algebra'

export const atomPath = 'uuid/involution' as const

const bytesOf = (uuid: string): Buffer => Buffer.from(uuid.replace(/-/g, ''), 'hex')

const format = (b: Buffer): string => {
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}

/** The key with the six constant bits cleared — version nibble and variant pair. See SKILL.md. */
export function maskKey(key: string): Buffer {
  const k = bytesOf(key)
  k[6] = k[6]! & 0x0f
  k[8] = k[8]! & 0x3f
  return k
}

/** True when a key moves nothing — the only key with a fixed point. */
export function isIdentityKey(key: string): boolean {
  return maskKey(key).every((b) => b === 0)
}

/** σ_k — the keyed involution on the 122 free bits; its own inverse. See SKILL.md. */
export function involve(uuid: string, key: string): string {
  const u = bytesOf(uuid)
  const k = maskKey(key)
  const out = Buffer.alloc(16)
  for (let i = 0; i < 16; i++) out[i] = u[i]! ^ k[i]!
  return format(out)
}

/** How many of the 122 free bits a key moves — its Hamming weight. */
export function keyWeight(key: string): number {
  let bits = 0
  for (const b of maskKey(key)) bits += b.toString(2).split('1').length - 1
  return bits
}

/** The XOR difference of two addresses, as an address. */
export function difference(a: string, b: string): string {
  const x = bytesOf(a)
  const y = bytesOf(b)
  const out = Buffer.alloc(16)
  for (let i = 0; i < 16; i++) out[i] = x[i]! ^ y[i]!
  return format(out)
}

/** The fold of every consecutive difference — equal to `difference(first, last)`. See SKILL.md. */
export function telescope(chain: readonly string[]): string {
  if (chain.length < 2) return format(Buffer.alloc(16))
  const out = Buffer.alloc(16)
  for (let i = 0; i + 1 < chain.length; i++) {
    const d = bytesOf(difference(chain[i]!, chain[i + 1]!))
    for (let j = 0; j < 16; j++) out[j] = out[j]! ^ d[j]!
  }
  return format(out)
}

/** The same answer read from the ends alone — O(1) where `telescope` is O(n). */
export function endsOnly(chain: readonly string[]): string {
  if (chain.length < 2) return format(Buffer.alloc(16))
  return difference(chain[0]!, chain[chain.length - 1]!)
}

/** A closed ring's differences cancel completely — divergence zero, by construction. */
export function ringDivergence(ring: readonly string[]): string {
  return ring.length === 0 ? format(Buffer.alloc(16)) : telescope([...ring, ring[0]!])
}

/** How many links a verifier skips by reading the ends instead of the chain. */
export function linksSkipped(chainLength: number): number {
  return exactMax(0, chainLength - 2)
}
