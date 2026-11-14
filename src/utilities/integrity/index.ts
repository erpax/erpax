/**
 * Content-addressable integrity — barrel.
 */
export type { ContentUuid } from '@/utilities/integrity/content'
export {
  computeContentUuid, verifyContentUuid, computeContentDigest,
  jcsCanonicalize, stripNonContentFields, uuid, nameDigest, nameUuid,
  tenantNamespace, ERPAX_NAMESPACE_ROOT, NON_CONTENT_FIELDS,
} from '@/utilities/integrity/content'

export {
  TAMPER_PROOF_COLLECTIONS_REGISTRY, registerTamperProofCollection,
  isTamperProofCollection, tamperProofUuidField, tamperProofBeforeChangeHook,
} from '@/utilities/integrity/tamper-proof-uuid-field'

export type { DanglingRef } from '@/utilities/integrity/uuid-ref'
export { uuidRef, registerUuidRef, UUID_REF_REGISTRY, resolveByUuid, findDanglingRefs } from '@/utilities/integrity/uuid-ref'

export type { SignedUuid, SignatureAlg } from '@/utilities/integrity/signatures'
export { signContentUuid, verifyContentUuidSignature, toJws, fromJws } from '@/utilities/integrity/signatures'

export type { CipherEnvelope, EnvelopeAlg } from '@/utilities/integrity/envelope'
export { encryptEnvelope, decryptEnvelope, encryptBytesEnvelope, decryptBytesEnvelope } from '@/utilities/integrity/envelope'

export type { TenantKeyResolver, KeyPurpose } from '@/utilities/integrity/tenant-key-registry'
export {
  InMemoryKeyResolver, getDefaultKeyResolver, setDefaultKeyResolver,
  provisionTestSigningKey, provisionTestKek,
} from '@/utilities/integrity/tenant-key-registry'

export { computeTamperReverseCost, meetsThreshold } from '@/utilities/integrity/tamper-reverse-cost'
export type { TamperReverseCost, TamperReverseCostInput, RegulatoryThreshold } from '@/utilities/integrity/tamper-reverse-cost'

export type { UuidLinkedLeaf, ChainVerifyResult } from '@/utilities/integrity/uuid-linked-chain'
export {
  GENESIS_PREV_UUID, canonicalJson, payloadContentUuid, computeLeafUuid,
  buildNextLeaf, verifyUuidLinkedChain,
} from '@/utilities/integrity/uuid-linked-chain'

export {
  SHORT_UUID_POLICY, shortUuid, parseShortUuid, lookupShort, displayUuid, checkUuidShortDisplay,
} from '@/utilities/integrity/uuid-short'
export type { ShortUuidKind, ShortLookupResult, DisplayUuid, UuidDisplayCompliance } from '@/utilities/integrity/uuid-short'


export {
  computeTypeUuid, registerType, getType, getTypeByUuid, listTypes,
  descriptorFromZod, registerTypeFromZod, verifyType, checkTypeUuidCoverage, ensureBaselineTypesRegistered,
} from '@/utilities/integrity/type-uuid'
export type { TypeDescriptor, RegisteredType, TypeVerification, TypeUuidCoverageResult } from '@/utilities/integrity/type-uuid'

export {
  LANDAUER_FLOOR_JOULES, energyLog10Joules, RESOURCE_BUDGETS,
  largestBudgetExceeded, beyondUniverse, proveBeyondResources,
} from '@/utilities/integrity/resource-bound'
export type { ResourceBudget, ResourceVerdict } from '@/utilities/integrity/resource-bound'

// Child atom — the wire encoding both signature paths share
export * from '@/utilities/integrity/base64url'
