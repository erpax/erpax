/**
 * Law 18 — Post-quantum signatures (placeholder/migration target).
 * Slice ZZZZZ.
 *
 * Migration path: SHA-256 → SHA-3 + ML-DSA (FIPS 204) for the audit
 * chain leaf signatures. The function below documents the contract
 * the actual cryptographic implementation will land in a follow-up
 * cut once a Workers-friendly liboqs / @noble/post-quantum is wired.
 *
 * @standard NIST FIPS 203 ML-KEM (Module-Lattice Key Encapsulation)
 * @standard NIST FIPS 204 ML-DSA (Module-Lattice Digital Signature)
 * @standard NIST SP 800-208 stateful-hash-based-signatures
 */
import type { PqcAlgorithm, PqcSignature } from '@/beyond/types'

/** Sign a payload with the configured PQC algorithm. STUB. */
export function signPqc(args: {
  payload: Uint8Array
  algorithm?: PqcAlgorithm
  publicKeyFingerprint: string
}): PqcSignature {
  return {
    algorithm: args.algorithm ?? 'ML-DSA-65',
    publicKeyFingerprint: args.publicKeyFingerprint,
    signatureB64: 'PLACEHOLDER-pending-libpqc-integration',
    signedAt: new Date().toISOString(),
  }
}

/** Verify a PQC signature. STUB. */
export function verifyPqc(_args: {
  payload: Uint8Array
  signature: PqcSignature
  publicKey: Uint8Array
}): { ok: boolean; reason?: string } {
  return { ok: false, reason: 'PQC verification pending implementation (slice follow-up)' }
}

/** True when the algorithm is on NIST's FIPS-approved PQC list (2024). */
export function isApprovedPqc(algorithm: PqcAlgorithm): boolean {
  return ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-128'].includes(algorithm)
}
