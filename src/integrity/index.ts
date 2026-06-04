/**
 * Content-addressable integrity — barrel.
 *
 * Slice RRRRR (2026-05-11). Conservation Law 8: every object's uuid
 * is derivable from its content. Tamper detection in O(1) per row.
 *
 * @standard RFC 9562 §5.8 + RFC 8785 + ISO/IEC 10118 + NIST FIPS 180-4
 * @audit ISO 19011:2018 §6.4.6 + SOX §404
 */

export type { ContentUuid } from '@/integrity/content-uuid'
export {
  computeContentUuid, verifyContentUuid,
  jcsCanonicalize, stripNonContentFields,
  tenantNamespace, ERPAX_NAMESPACE_ROOT, NON_CONTENT_FIELDS,
} from '@/integrity/content-uuid'

// Slice SSSSS: opt-in registry + Payload field helper
export {
  TAMPER_PROOF_COLLECTIONS_REGISTRY,
  registerTamperProofCollection,
  isTamperProofCollection,
  tamperProofUuidField,
  tamperProofBeforeChangeHook,
} from '@/integrity/tamper-proof-uuid-field'

// Slice UUUUU: uuid-driven references (Conservation Law 10)
export type { DanglingRef } from '@/integrity/uuid-ref'
export {
  uuidRef, registerUuidRef, UUID_REF_REGISTRY,
  resolveByUuid, findDanglingRefs,
} from '@/integrity/uuid-ref'

// Slice HHHHHHHHH (2026-05-11) — uuid carries signature material.
// Signature attaches to contentUuid (the hash), never to raw payload.
// One canonical form → one signable artefact → one verification path.
//
// @standard RFC 8032 EdDSA, RFC 7515 JWS, ETSI EN 319 132/142, eIDAS 910/2014
export type { SignedUuid, SignatureAlg } from '@/integrity/signatures'
export {
  signContentUuid, verifyContentUuidSignature,
  toJws, fromJws,
} from '@/integrity/signatures'

// Slice HHHHHHHHH (2026-05-11) — uuid keys envelope encryption.
// DEK = HKDF(tenantKEK, salt=contentUuid). Convergent + tamper-bound:
// any plaintext mutation changes the uuid, the DEK, and the AEAD tag.
//
// @standard NIST SP 800-38D AES-GCM, RFC 5869 HKDF, ISO/IEC 27040, GDPR §32
export type { CipherEnvelope, EnvelopeAlg } from '@/integrity/envelope'
export {
  encryptEnvelope, decryptEnvelope,
  encryptBytesEnvelope, decryptBytesEnvelope,
} from '@/integrity/envelope'

// Slice HHHHHHHHH-cut2 (2026-05-11) — per-tenant key registry.
// Resolves `kid` → CryptoKey. Mediator + tests use this; production
// wires a KV-backed implementation. NIST SP 800-57 §5.6 rotation
// model: kid encodes `<tenantId>/<purpose>/<yyyy-mm-dd>`.
export type { TenantKeyResolver, KeyPurpose } from '@/integrity/tenant-key-registry'
export {
  InMemoryKeyResolver, getDefaultKeyResolver, setDefaultKeyResolver,
  provisionTestSigningKey, provisionTestKek,
} from '@/integrity/tenant-key-registry'
