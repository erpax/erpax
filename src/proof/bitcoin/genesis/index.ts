/**
 * Bitcoin genesis — the empirical upper bound of the forge≫verify asymmetry.
 *
 * The largest proof-of-work blockchain in existence is decoded and verified here
 * from FIRST PRINCIPLES: the 80-byte genesis header is a fixed public constant, so
 * anyone — peer, regulator, crawler — recomputes the block hash with one
 * double-SHA256 and confirms it ≤ the difficulty target, with no repo, no network,
 * and no prover to trust ([[proof]]: verify, do not trust; [[merge]]: same bytes ⇒
 * same hash on every machine). That recompute is the whole audit.
 *
 * The asymmetry it demonstrates publicly:
 *   - VERIFY  = 1 double-SHA256 over 80 bytes — O(1) per header, O(N) per chain.
 *   - FORGE   ≈ 2^32 hashes for this difficulty-1 block; rewriting the chain costs
 *     the cumulative chain-work (~2^93+ today). forge ≫ verify, and that released
 *     asymmetry is the trust.
 *
 * This is the external yardstick for erpax's OWN released asymmetry
 * (services/tamper-cost: the 106-bit content-uuid digest floor, ~2^106, already
 * exceeds Bitcoin's per-block work). Pure + deterministic: no Date, no randomness,
 * no I/O — re-running always yields the identical proof, so it drops straight into
 * the content-uuid'd `dry-proof` bundle and recomputes byte-for-byte on any peer.
 *
 * @standard Nakamoto (2008) "Bitcoin: A Peer-to-Peer Electronic Cash System" §§3–4 (PoW + chain)
 * @standard NIST FIPS 180-4 SHA-256 (double-SHA256 block hash)
 * @standard Bitcoin Core — genesis block (height 0, hash 000000000019d6…ce26f)
 * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
 * @see ../../index.ts ../../merkle/dag src/services/tamper-cost
 */

import { createHash } from 'node:crypto'

/** The 80-byte Bitcoin genesis block header (version‖prevBlock‖merkleRoot‖time‖bits‖nonce), hex. */
export const BITCOIN_GENESIS_HEADER_HEX =
  '01000000' + // version = 1
  '0000000000000000000000000000000000000000000000000000000000000000' + // prevBlock = none (the root)
  '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a' + // merkleRoot
  '29ab5f49' + // time = 1231006505 (2009-01-03T18:15:05Z)
  'ffff001d' + // bits = 0x1d00ffff (difficulty 1), little-endian on the wire
  '1dac2b7c' // nonce = 2083236893

/** Genesis coinbase scriptSig: push(bits) push(0x04) push(<69-byte headline>). */
export const BITCOIN_GENESIS_COINBASE_SCRIPTSIG_HEX =
  '04ffff001d0104' +
  '455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73'

/** Compact difficulty bits encoded in the genesis header (big-endian display form). */
const GENESIS_BITS = 0x1d00ffff

export interface BitcoinGenesisProof {
  readonly chain: 'bitcoin'
  readonly claim: string
  readonly blockHeight: 0
  /** the 80-byte header the verifier recomputes from — the proof input, not an assertion */
  readonly headerHex: string
  /** double-SHA256(header), big-endian — DERIVED here, equals 000000000019d6…ce26f */
  readonly blockHash: string
  readonly bits: string
  /** target decoded from bits; the block hash must be ≤ this (proof-of-work) */
  readonly targetHex: string
  readonly powValid: boolean
  /** the newspaper headline decoded from the coinbase scriptSig */
  readonly coinbaseHeadline: string
  /** log2 of expected double-SHA256 hashes to forge a header ≤ target ≈ 32 (difficulty 1) */
  readonly forgeCostLog2: number
  /** double-SHA256 invocations to fully verify the block = 2 (one double hash) */
  readonly verifyHashes: 2
  readonly note: string
}

const sha256 = (data: Buffer): Buffer => createHash('sha256').update(data).digest()
const doubleSha256 = (data: Buffer): Buffer => sha256(sha256(data))

/** Decode the last direct-push (OP_PUSHBYTES_1..75) data of a script as UTF-8. */
function decodeLastPushAscii(scriptHex: string): string {
  const bytes = Buffer.from(scriptHex, 'hex')
  let i = 0
  let last = Buffer.alloc(0)
  while (i < bytes.length) {
    const op = bytes[i++]!
    if (op >= 0x01 && op <= 0x4b) {
      last = bytes.subarray(i, i + op)
      i += op
    } else {
      break // the genesis coinbase uses only direct pushes
    }
  }
  return last.toString('utf8')
}

/** Decode the difficulty target from compact bits: mantissa · 256^(exponent−3). */
function decodeTarget(bits: number): bigint {
  const exponent = bits >>> 24
  const mantissa = bits & 0x00ffffff
  return BigInt(mantissa) << (8n * BigInt(exponent - 3))
}

/**
 * Decode and verify the Bitcoin genesis block from first principles. Pure,
 * deterministic, offline — the whole audit is one double-SHA256 plus a comparison.
 */
export function verifyBitcoinGenesis(): BitcoinGenesisProof {
  const header = Buffer.from(BITCOIN_GENESIS_HEADER_HEX, 'hex')
  // Internal hash is little-endian; Bitcoin displays block hashes byte-reversed.
  const blockHash = Buffer.from(doubleSha256(header)).reverse().toString('hex')

  const target = decodeTarget(GENESIS_BITS)
  const targetHex = target.toString(16).padStart(64, '0')
  const powValid = BigInt('0x' + blockHash) <= target

  // Expected double-SHA256 attempts to find a header hashing ≤ target = 2^256 / (target+1).
  const expectedHashes = (1n << 256n) / (target + 1n)
  const forgeCostLog2 = Math.log2(Number(expectedHashes))

  return {
    chain: 'bitcoin',
    claim:
      'The largest proof-of-work blockchain in existence verifies from first principles on commodity 64-bit hardware, at zero trust.',
    blockHeight: 0,
    headerHex: BITCOIN_GENESIS_HEADER_HEX,
    blockHash,
    bits: '0x1d00ffff',
    targetHex,
    powValid,
    coinbaseHeadline: decodeLastPushAscii(BITCOIN_GENESIS_COINBASE_SCRIPTSIG_HEX),
    forgeCostLog2,
    verifyHashes: 2,
    note: 'verify = 1 double-SHA256 over the 80-byte header (recompute blockHash, check ≤ target); forge ≈ 2^32 hashes for this difficulty-1 block, rising to the cumulative chain-work to rewrite history. forge ≫ verify.',
  }
}
