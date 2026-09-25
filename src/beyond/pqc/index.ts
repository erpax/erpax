/**
 * beyond/pqc — what FIPS 203/204 DECIDE, and a refusal where they do not. See SKILL.md.
 *
 * @standard NIST FIPS 203 ML-KEM — Tables 2 and 3, values received verbatim
 * @standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
 * @standard NIST SP 800-208 stateful-hash-based-signatures
 */
import type { PqcAlgorithm, PqcSignature } from '@/beyond/types'

/** One approved ML-KEM parameter set — received from FIPS 203, never derived. */
export interface KemParameterSet {
  readonly name: 'ML-KEM-512' | 'ML-KEM-768' | 'ML-KEM-1024'
  readonly n: 256
  readonly q: 3329
  readonly k: number
  readonly rbgStrengthBits: number
  readonly category: 1 | 3 | 5
  readonly encapsulationKeyBytes: number
  readonly decapsulationKeyBytes: number
  readonly ciphertextBytes: number
  readonly sharedSecretBytes: 32
}

/**
 * FIPS 203 Tables 2 and 3, verbatim. See SKILL.md.
 * @standard NIST FIPS 203 §8 Table 2 (parameters) · Table 3 (sizes) · §7 (categories 1, 3, 5)
 */
export const ML_KEM: readonly KemParameterSet[] = Object.freeze([
  { name: 'ML-KEM-512', n: 256, q: 3329, k: 2, rbgStrengthBits: 128, category: 1, encapsulationKeyBytes: 800, decapsulationKeyBytes: 1632, ciphertextBytes: 768, sharedSecretBytes: 32 },
  { name: 'ML-KEM-768', n: 256, q: 3329, k: 3, rbgStrengthBits: 192, category: 3, encapsulationKeyBytes: 1184, decapsulationKeyBytes: 2400, ciphertextBytes: 1088, sharedSecretBytes: 32 },
  { name: 'ML-KEM-1024', n: 256, q: 3329, k: 4, rbgStrengthBits: 256, category: 5, encapsulationKeyBytes: 1568, decapsulationKeyBytes: 3168, ciphertextBytes: 1568, sharedSecretBytes: 32 },
] as const)

/** Coefficients in the module: `k · n`, which is what the parameter set is named after. */
export function kemCoefficients(set: KemParameterSet): number {
  return set.k * set.n
}

/** The smallest approved set meeting a required category — or nothing, never a weaker one. */
export function kemForCategory(category: number): KemParameterSet | undefined {
  return ML_KEM.find((s) => s.category >= category)
}

/** What one encapsulation costs on the wire: the key plus the ciphertext. */
export function kemWireBytes(set: KemParameterSet): number {
  return set.encapsulationKeyBytes + set.ciphertextBytes
}

/** Why a signature was not produced, and what is missing. */
export interface PqcRefusal {
  readonly signed: false
  readonly algorithm: PqcAlgorithm
  readonly refusal: string
}

/** Refuses — it returned a placeholder that read as a signature. See SKILL.md. */
export function signPqc(args: {
  payload: Uint8Array
  algorithm?: PqcAlgorithm
  publicKeyFingerprint: string
}): PqcRefusal {
  const algorithm = args.algorithm ?? 'ML-DSA-65'
  return {
    signed: false,
    algorithm,
    refusal: `no ${algorithm} signing key is held by this process — a signature is produced by a key, never by a function that has none`,
  }
}

/** Refuses, and says why — there is nothing here that could verify. */
export function verifyPqc(_args: {
  payload: Uint8Array
  signature: PqcSignature
  publicKey: Uint8Array
}): { ok: false; reason: string } {
  return { ok: false, reason: 'no ML-DSA verifier is wired — this refuses rather than reporting a verdict it cannot reach' }
}

/** True when the algorithm is on NIST's FIPS-approved PQC list (2024). */
export function isApprovedPqc(algorithm: PqcAlgorithm): boolean {
  return ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-128'].includes(algorithm)
}

/** @index-cross.foldback child=beyond/pqc parent=beyond — this cross folds back into its parent. */
