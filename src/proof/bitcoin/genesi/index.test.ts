/**
 * Empirical proof leg — the LARGEST proof-of-work blockchain decoded and verified
 * from first principles, on commodity hardware, at zero trust. This is the public
 * upper bound of the forge≫verify asymmetry ([[proof]]): verifying Bitcoin's
 * genesis block is one double-SHA256 (recompute the hash, check ≤ target); forging
 * it costs ~2^32 hashes, and rewriting the chain costs the cumulative chain-work.
 *
 * Every value asserted here is INDEPENDENTLY recomputable by anyone from the
 * published 80-byte header — no repo, no network, no prover to trust. @see ../../dry-proof.ts
 */
import { describe, it, expect } from 'vitest'
import { verifyBitcoinGenesis, BITCOIN_GENESIS_HEADER_HEX } from '@/proof/bitcoin/genesi'

const CANONICAL_GENESIS_HASH = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
const DIFFICULTY_1_TARGET = '00000000ffff0000000000000000000000000000000000000000000000000000'
const TIMES_HEADLINE = 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'

describe('bitcoin-genesis: decode + verify the biggest blockchain from first principles', () => {
  it('recomputes the canonical genesis block hash by double-SHA256 of the 80-byte header', () => {
    const p = verifyBitcoinGenesis()
    // The hash is DERIVED from the published header, not asserted — verify, do not trust.
    expect(p.headerHex).toBe(BITCOIN_GENESIS_HEADER_HEX)
    expect(p.headerHex).toHaveLength(160) // 80 bytes, hex-encoded
    expect(p.blockHash).toBe(CANONICAL_GENESIS_HASH)
    expect(p.blockHeight).toBe(0)
  })

  it('confirms the proof-of-work: blockHash ≤ target decoded from bits 0x1d00ffff', () => {
    const p = verifyBitcoinGenesis()
    expect(p.bits).toBe('0x1d00ffff')
    expect(p.targetHex).toBe(DIFFICULTY_1_TARGET)
    expect(p.powValid).toBe(true)
  })

  it('decodes the coinbase newspaper headline embedded in the genesis transaction', () => {
    const p = verifyBitcoinGenesis()
    expect(p.coinbaseHeadline).toBe(TIMES_HEADLINE)
  })

  it('quantifies the asymmetry: forge ≈ 2^32 double-SHA256 hashes ≫ the 2-hash verify', () => {
    const p = verifyBitcoinGenesis()
    expect(p.verifyHashes).toBe(2) // one double-SHA256 to fully verify
    expect(Math.round(p.forgeCostLog2)).toBe(32) // 2^256 / (target+1), difficulty-1
    expect(p.forgeCostLog2).toBeGreaterThan(Math.log2(p.verifyHashes)) // forge ≫ verify
  })

  it('is deterministic + independently recomputable (same output every call, no state)', () => {
    expect(verifyBitcoinGenesis()).toEqual(verifyBitcoinGenesis())
  })
})
