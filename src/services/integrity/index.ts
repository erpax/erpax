/**
 * Content-addressable integrity — barrel.
 *
 * Slice RRRRR (2026-05-11). Conservation Law 8: every object's uuid
 * is derivable from its content. Tamper detection in O(1) per row.
 *
 * @standard RFC 4122 §4.3 + RFC 8785 + ISO/IEC 10118 + NIST FIPS 180-4
 * @audit ISO 19011:2018 §6.4.6 + SOX §404
 */

export type { ContentUuid } from './content-uuid'
export {
  computeContentUuid, verifyContentUuid,
  jcsCanonicalize, stripNonContentFields,
  tenantNamespace, ERPAX_NAMESPACE_ROOT, NON_CONTENT_FIELDS,
} from './content-uuid'

// Slice SSSSS: opt-in registry + Payload field helper
export {
  TAMPER_PROOF_COLLECTIONS_REGISTRY,
  registerTamperProofCollection,
  isTamperProofCollection,
  tamperProofUuidField,
  tamperProofBeforeChangeHook,
} from './tamper-proof-uuid-field'

// Slice UUUUU: uuid-driven references (Conservation Law 10)
export type { DanglingRef } from './uuid-ref'
export {
  uuidRef, registerUuidRef, UUID_REF_REGISTRY,
  resolveByUuid, findDanglingRefs,
} from './uuid-ref'
