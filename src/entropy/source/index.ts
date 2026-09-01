/**
 * entropy/source — seed quality is proven at the SOURCE and across the FLEET, never by inspection.
 *
 * This folds inside [[entropy]] rather than competing for the word: the parent atom measures the
 * corpus's thermodynamic entropy (reciprocity, free energy), and this measures the randomness a key
 * is born from. Same word, different scale, one home.
 *
 * **The hard lesson, and it is why no statistical test appears below.** You cannot verify seed
 * quality by inspecting the seed. A CSPRNG run on a weak seed is byte-identical in distribution to
 * one run on a strong seed — that is what a CSPRNG is for. Min-entropy over 32 bytes and monobit
 * tests do not separate them; they reject good randomness at a rate set by the significance level
 * and accept a deterministic stream that happens to look uniform. A per-seed test is a measurement
 * with no power, and shipping one would be worse than shipping nothing, because it reads as a check.
 *
 * So the evidence is elsewhere:
 *
 *   SOURCE  `attest(seed)` is an HMAC under a key provisioned ONLY to the genuine hardware RNG. A
 *           software fallback cannot produce a valid tag — not because its bytes look different,
 *           but because it does not hold the key.
 *   FLEET   every admitted seed is content-addressed. The same seed arriving from a second device
 *           is the fingerprint of a deterministic RNG, and no single-device test can see it. This
 *           is the measurement that only exists across the fleet.
 *
 * **Fail closed.** No key is derived from an un-admitted seed, and a seed under 32 bytes is refused
 * before any of it is examined.
 *
 * @law seed quality is proven at the source and across the fleet — never by inspecting the seed,
 *      because a CSPRNG on a weak seed is indistinguishable from one on a strong seed.
 * @invariant a seed with no valid attestation is never admitted
 * @invariant a seed already admitted on another device throws `weak-rng-collision`
 * @invariant deriving a key from an un-admitted seed throws `seed-not-admitted`
 * @invariant a seed shorter than 32 bytes is rejected before inspection
 * @standard NIST SP 800-90B — entropy sources: validated at the source, not by output inspection
 * @standard NIST SP 800-108 — key derivation in counter mode
 * @standard RFC 2104 — HMAC
 * @see ./SKILL.md -- ../../convention/discern -- ../../nist/sp/800/108
 */
import { createHmac, createHash, timingSafeEqual } from 'node:crypto'

import type { Claim, EvidenceSource } from '@/convention/discern'

/** The floor. 256 bits is the least a symmetric root may be born from. */
export const MIN_SEED_BYTES = 32

export class EntropyRefused extends Error {
  constructor(
    readonly code: 'seed-too-short' | 'attestation-invalid' | 'weak-rng-collision' | 'seed-not-admitted',
    message: string,
  ) {
    super(`entropy/source: ${code} — ${message}`)
    this.name = 'EntropyRefused'
  }
}

/**
 * The attestation over a seed.
 *
 * `hwKey` stands for a key injected into the secure element at manufacture and never exported. In
 * this process it is an ordinary buffer, and that is the honest limit: this proves the attester
 * HELD the key, never that the key lives in real hardware. Provisioning is the open compass below.
 */
export function attest(seed: Buffer, hwKey: Buffer): string {
  return createHmac('sha256', hwKey).update(seed).digest('hex')
}

/** Content-address of an admitted seed — the fleet's memory, never the seed itself. */
export function seedAddress(seed: Buffer): string {
  return createHash('sha256').update(seed).digest('hex')
}

/** One admitted seed, as the fleet records it. The seed itself is never stored. */
export interface Admission {
  readonly address: string
  readonly deviceId: string
}

/**
 * The cross-device registry.
 *
 * In erpax this is a ledger surface, so the evidence is tamper-evident; here it is the interface
 * that shape must satisfy. It stores ADDRESSES, never seeds — a registry holding the secrets it
 * guards is a worse liability than the one it prevents.
 */
export interface FleetRegistry {
  find(address: string): Admission | undefined
  record(a: Admission): void
}

/** An in-memory registry — for tests and single-process use. Production passes the ledger surface. */
export function memoryRegistry(): FleetRegistry {
  const seen = new Map<string, Admission>()
  return {
    find: (a) => seen.get(a),
    record: (a) => {
      seen.set(a.address, a)
    },
  }
}

const hexEq = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  // constant-time: an attestation compared with early exit leaks its prefix
  return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'))
}

/**
 * Admit a seed, or refuse it with the reason.
 *
 * Order matters and is deliberate: length, then attestation, then fleet. A short seed is refused
 * before any key touches it, and a forged attestation is refused before the registry learns the
 * address — otherwise an attacker could enumerate the fleet by submitting guesses.
 */
export function admit(
  seed: Buffer,
  deviceId: string,
  attestation: string,
  hwKey: Buffer,
  registry: FleetRegistry,
): Admission {
  if (seed.length < MIN_SEED_BYTES) {
    throw new EntropyRefused('seed-too-short', `${seed.length} bytes, need ${MIN_SEED_BYTES}`)
  }
  const expected = attest(seed, hwKey)
  if (!hexEq(expected, attestation)) {
    throw new EntropyRefused(
      'attestation-invalid',
      `device "${deviceId}" presented a tag the hardware key does not produce — a software RNG cannot forge this`,
    )
  }
  const address = seedAddress(seed)
  const prior = registry.find(address)
  if (prior && prior.deviceId !== deviceId) {
    throw new EntropyRefused(
      'weak-rng-collision',
      `this seed was already admitted on device "${prior.deviceId}" — the same bytes on two devices is a deterministic RNG, and no single-device test can see it`,
    )
  }
  const admission: Admission = { address, deviceId }
  registry.record(admission)
  return admission
}

/**
 * Derive a key from an ADMITTED seed. Fails closed on anything else.
 *
 * The check is the point: a caller cannot reach key material by holding a seed, only by holding a
 * seed the fleet has admitted.
 */
export function deriveFromAdmitted(seed: Buffer, purpose: string, registry: FleetRegistry): Buffer {
  const address = seedAddress(seed)
  if (!registry.find(address)) {
    throw new EntropyRefused('seed-not-admitted', 'no key is derived from a seed the fleet has not admitted')
  }
  return createHmac('sha256', seed).update(`erpax:entropy:v1:${purpose}`).digest()
}

/**
 * What this atom claims, typed by [[convention]]/discern.
 *
 * `hwKeyProvisioning` is a COMPASS and must stay one until the key genuinely lives in a secure
 * element behind attested boot. Declaring it sealed would be the exact over-claim discern exists to
 * catch: in this process the hardware key is a buffer like any other.
 */
export const CLAIMS: readonly Claim[] = [
  { property: 'entropy.source', measuredBy: 'src/entropy/source/test.ts' },
  { property: 'entropy.fleet', measuredBy: 'src/entropy/source/test.ts' },
  {
    property: 'entropy.hwKeyProvisioning',
    closedBy: 'attested boot + secure-element key injection',
    owner: 'security',
  },
]

export const SURFACES: readonly string[] = ['entropy.source', 'entropy.fleet', 'entropy.hwKeyProvisioning']


/** What the proof exercises, declared beside the claims so the corpus metric never imports a test. */
export const EVIDENCE: readonly EvidenceSource[] = [
  {
    measuredBy: 'src/entropy/source/test.ts',
    exercised: 'admitted an attested seed; refused a forged tag and a cross-device repeat',
    wouldFailIf: 'admit() accepted a tag the hardware key does not produce',
  },
]

/** @index-cross.foldback child=entropy/source parent=entropy — this cross folds back into its parent. */
