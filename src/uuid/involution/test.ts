import { describe, it, expect } from 'vitest'
import { createHash } from 'node:crypto'
import {
  atomPath,
  difference,
  endsOnly,
  involve,
  isIdentityKey,
  keyWeight,
  linksSkipped,
  maskKey,
  ringDivergence,
  telescope,
} from '@/uuid/involution'
import { toUuid } from '@/uuid/matrix'
import { atomAddress } from '@/atom/address'

const u = (s: string): string => toUuid(Buffer.from(s, 'utf8'))
const SAMPLE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(u)
const KEY = u('key')
const VALID = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('uuid/involution — the atom', () => {
  it('lives where it says it lives', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})

/** σ² = id — the Clay record's structure, keyed so it is a privacy primitive and not a convention. */
describe('uuid/involution — applied twice, every address returns', () => {
  it('σ_k ∘ σ_k = id over every sample', () => {
    for (const x of SAMPLE) expect(involve(involve(x, KEY), KEY)).toBe(x)
  })

  it('and the image is still a lawful uuid — version 8, variant 10x', () => {
    for (const x of SAMPLE) {
      expect(x).toMatch(VALID)
      expect(involve(x, KEY)).toMatch(VALID)
    }
  })

  it('a masked key never touches the six constant bits', () => {
    const k = maskKey(KEY)
    expect(k[6]! & 0xf0).toBe(0)
    expect(k[8]! & 0xc0).toBe(0)
    // 122 free bits, so a key can move at most 122 of them
    expect(keyWeight(KEY)).toBeLessThanOrEqual(122)
    expect(keyWeight(KEY)).toBeGreaterThan(0)
  })
})

/**
 * The Clay involution over 25 balances has exactly ONE fixed point. A keyed XOR has NONE,
 * unless the key is the identity — which is decidable, so the degenerate key cannot be used by
 * accident.
 */
describe('uuid/involution — a non-identity key moves every address', () => {
  it('no fixed point exists for a real key', () => {
    for (const x of SAMPLE) expect(involve(x, KEY)).not.toBe(x)
    expect(isIdentityKey(KEY)).toBe(false)
  })

  it('and the only key that fixes anything fixes everything', () => {
    const nil = '00000000-0000-8000-8000-000000000000'
    expect(isIdentityKey(nil)).toBe(true)
    for (const x of SAMPLE) expect(involve(x, nil)).toBe(x)
    // a key whose ONLY set bits are the constant six is the identity too — masked away
    const onlyConstants = '00000000-0000-8000-8000-000000000000'
    expect(isIdentityKey(onlyConstants)).toBe(true)
  })

  it('different keys give different images — the map is injective in the key', () => {
    const images = new Set(['k1', 'k2', 'k3', 'k4'].map((k) => involve(SAMPLE[0]!, u(k))))
    expect(images.size).toBe(4)
  })
})

/**
 * The Navier–Stokes window: differences around a closed ring telescope, so the interior cancels.
 */
describe('uuid/involution — a difference chain is read from its ends', () => {
  it('the fold of every consecutive difference equals the difference of the ends', () => {
    for (let n = 2; n <= SAMPLE.length; n++) {
      const chain = SAMPLE.slice(0, n)
      expect(telescope(chain), `n=${n}`).toBe(endsOnly(chain))
    }
  })

  it('so a verifier skips the interior — O(1) where the chain is O(n)', () => {
    expect(linksSkipped(8)).toBe(6)
    expect(linksSkipped(2)).toBe(0)
    expect(linksSkipped(1)).toBe(0)
  })

  it('a closed ring has divergence zero, exactly', () => {
    const zero = '00000000-0000-0000-0000-000000000000'
    expect(ringDivergence(SAMPLE)).toBe(zero)
    expect(ringDivergence([SAMPLE[0]!])).toBe(zero)
    expect(ringDivergence([])).toBe(zero)
  })

  it('THE BOUNDARY: the interior cancels, so an interior change is invisible', () => {
    const inner = [...SAMPLE]
    inner[3] = u('forged') // an interior link, swapped
    // the fold is UNCHANGED — this is the telescoping property, not a defect, and it is
    // exactly why an O(1) end-check is not a chain-integrity check
    expect(telescope(inner)).toBe(telescope(SAMPLE))
    expect(ringDivergence(inner)).toBe('00000000-0000-0000-0000-000000000000')
  })

  it('an ENDPOINT change is what the fold sees', () => {
    const moved = [...SAMPLE]
    moved[moved.length - 1] = u('forged')
    expect(telescope(moved)).not.toBe(telescope(SAMPLE))
    expect(endsOnly(moved)).not.toBe(endsOnly(SAMPLE))
    const head = [u('forged'), ...SAMPLE.slice(1)]
    expect(telescope(head)).not.toBe(telescope(SAMPLE))
  })

  it('difference is its own inverse, which is why the interior cancels', () => {
    const [a, b] = [SAMPLE[0]!, SAMPLE[1]!]
    expect(difference(a, b)).toBe(difference(b, a))
    expect(difference(a, a)).toBe('00000000-0000-0000-0000-000000000000')
  })
})

describe('uuid/involution — it is a permutation, not a hash', () => {
  it('distinct addresses stay distinct under the key', () => {
    const images = SAMPLE.map((x) => involve(x, KEY))
    expect(new Set(images).size).toBe(SAMPLE.length)
  })

  it('and it commits to nothing — a digest is one-way, this is not', () => {
    const x = SAMPLE[0]!
    // recoverable by anyone holding the key, which is the whole boundary
    expect(involve(involve(x, KEY), KEY)).toBe(x)
    // and NOT equal to a digest of the same material
    expect(involve(x, KEY)).not.toBe(toUuid(createHash('sha256').update(x).digest()))
  })
})
