/**
 * entropy/threshold — n keys are strong only when they are n independent draws.
 *
 * Folded under [[entropy]] beside [[entropy]]/source, because that is what it composes: this atom
 * takes ADMITTED draws and reasons about what they add up to. (`src/threshold` is a schema.org
 * vocabulary word — `freeShippingThreshold` — and taking it would contradict that atom's own law.)
 *
 * **The claim that is false, and the one that is true.** n keys derived from one seed carry ONE
 * seed's entropy: breaking the seed breaks all n, and the n masks are decoration. n keys from n
 * independent attested draws compose additively — an attacker must break each. The arithmetic is
 * the whole security argument, and it is one line either way:
 *
 *   folded    n keys from 1 admitted seed   →  256 bits, whatever n is
 *   composed  n keys from n admitted seeds  →  n × 256 bits
 *
 * `assertIndependentSources` is what converts the first into the second. It rejects any two shares
 * whose attested source address is equal — the check that makes "n masks on one seed" impossible to
 * ship as "n independent secrets".
 *
 * **Folding and entanglement add ZERO entropy, and say so.** The horo fold and the entanglement
 * graph diffuse admitted entropy and raise forge-cost; they manufacture no randomness. A reversible
 * encoding cannot: if it could, running it twice would create more, and running it backwards would
 * destroy some. `ENTROPY_ADDED_BY_FOLD` is 0 and a claim asserting otherwise is refused as an
 * over-claim rather than argued with.
 *
 * @law multi-key strength is real only when the keys are independent draws. n keys from one seed
 *      carry one seed's entropy; folding and entanglement raise forge-cost and add none.
 * @invariant two shares from the same admitted seed FAIL assertIndependentSources
 * @invariant a fold or entanglement claiming added entropy is refused as an over-claim
 * @invariant composed strength is n × per-draw bits; folded strength is one draw's bits
 * @standard NIST SP 800-57 Part 1 r5 §5.6.1 — comparable key strengths
 * @standard NIST SP 800-90B — entropy sources
 * @see ./SKILL.md -- ../source -- ../../convention/discern
 */
import { createHmac } from 'node:crypto'

import type { Claim, EvidenceSource } from '@/convention/discern'

import { seedAddress, type Admission } from '../source'

/** Bits carried by one admitted draw. A 256-bit seed is the floor [[entropy]]/source enforces. */
export const BITS_PER_DRAW = 256

/** Folding and entanglement are reversible encodings. A reversible map adds no entropy. Ever. */
export const ENTROPY_ADDED_BY_FOLD = 0

export class ThresholdRefused extends Error {
  constructor(
    readonly code: 'shared-source' | 'over-claim' | 'too-few-shares',
    message: string,
  ) {
    super(`entropy/threshold: ${code} — ${message}`)
    this.name = 'ThresholdRefused'
  }
}

/** A share, and the admitted draw it was born from. The provenance is the point. */
export interface Share {
  readonly index: number
  readonly material: Buffer
  /** the admission this share's seed was drawn from — its independence evidence */
  readonly source: Admission
}

/**
 * Reject shares that are not independent draws.
 *
 * This is the invariant that makes the whole scheme honest. Two shares whose source seeds share an
 * address are one secret wearing two masks, and no amount of key-schedule separates them: an
 * attacker who breaks that seed holds both.
 */
export function assertIndependentSources(shares: readonly Share[]): void {
  const seen = new Map<string, number>()
  for (const s of shares) {
    const prior = seen.get(s.source.address)
    if (prior !== undefined) {
      throw new ThresholdRefused(
        'shared-source',
        `shares ${prior} and ${s.index} were drawn from the same admitted seed — that is one secret ` +
          'wearing two masks, and breaking the seed breaks both',
      )
    }
    seen.set(s.source.address, s.index)
  }
}

/**
 * What the shares are actually worth.
 *
 * Independent draws compose additively; shares folded from one seed carry that seed alone. This is
 * the number a reviewer should read, and it is arithmetic rather than a claim.
 */
export function composedStrengthBits(shares: readonly Share[]): number {
  const distinct = new Set(shares.map((s) => s.source.address)).size
  return distinct * BITS_PER_DRAW
}

/**
 * n-of-n composition, built from a local primitive that is trivially correct.
 *
 * XOR over independent draws is the one-time-pad construction: every share is required, any n−1
 * reveal nothing, and there is no field arithmetic to get wrong. It is not "custom secret-sharing
 * math" — it is the case where the math is a single operation.
 *
 * **m-of-n is deliberately absent.** Shamir over a prime field is where implementations go wrong,
 * and rolling it here would be exactly what the spec forbids. It is declared a COMPASS below until
 * a vetted library is pinned, so the gap is visible in the integrity metric rather than papered over.
 */
export function composeAll(shares: readonly Share[]): Buffer {
  if (shares.length < 2) {
    throw new ThresholdRefused('too-few-shares', `${shares.length} share(s) — composition needs at least 2`)
  }
  assertIndependentSources(shares)
  const width = shares[0]!.material.length
  const out = Buffer.alloc(width)
  for (const s of shares) {
    for (let i = 0; i < width; i += 1) out[i] ^= s.material[i % s.material.length]!
  }
  return out
}

/** Derive a share's material from its own admitted seed — one draw per share, never one folded n ways. */
export function shareFrom(source: Admission, seed: Buffer, index: number): Share {
  if (seedAddress(seed) !== source.address) {
    throw new ThresholdRefused('shared-source', 'the seed does not match the admission it claims')
  }
  return {
    index,
    source,
    material: createHmac('sha256', seed).update(`erpax:threshold:v1:${index}`).digest(),
  }
}

/**
 * Refuse an entropy claim about a reversible operation.
 *
 * A fold or an entanglement may claim diffusion and forge-cost. Claiming ADDED ENTROPY is refused,
 * because a reversible encoding that created entropy would create more each time it ran.
 */
export function assertNoEntropyOverClaim(operation: string, entropyAdded: number): void {
  if (entropyAdded !== ENTROPY_ADDED_BY_FOLD) {
    throw new ThresholdRefused(
      'over-claim',
      `"${operation}" claims ${entropyAdded} bits added — a reversible encoding adds none; it diffuses ` +
        'admitted entropy and raises forge-cost',
    )
  }
}

export const CLAIMS: readonly Claim[] = [
  { property: 'threshold.independence', measuredBy: 'src/entropy/threshold/test.ts' },
  { property: 'threshold.composition', measuredBy: 'src/entropy/threshold/test.ts' },
  { property: 'threshold.foldAddsNoEntropy', measuredBy: 'src/entropy/threshold/test.ts' },
  {
    property: 'threshold.mOfN',
    closedBy: 'a vetted Shamir-over-prime-field implementation, pinned by version',
    owner: 'security',
  },
]

export const SURFACES: readonly string[] = [
  'threshold.independence',
  'threshold.composition',
  'threshold.foldAddsNoEntropy',
  'threshold.mOfN',
]


/** What the proof exercises, declared beside the claims so the corpus metric never imports a test. */
export const EVIDENCE: readonly EvidenceSource[] = [
  {
    measuredBy: 'src/entropy/threshold/test.ts',
    exercised: 'refused two shares from one seed; composed three independent draws additively',
    wouldFailIf: 'assertIndependentSources accepted shares sharing a source address',
  },
]
