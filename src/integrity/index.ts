/**
 * Content-addressable integrity — barrel.
 */
export type { ContentUuid } from './content-uuid'
export {
  computeContentUuid, verifyContentUuid, computeContentDigest,
  jcsCanonicalize, stripNonContentFields, uuid, nameDigest, nameUuid,
  tenantNamespace, ERPAX_NAMESPACE_ROOT, NON_CONTENT_FIELDS,
} from './content-uuid'

export {
  TAMPER_PROOF_COLLECTIONS_REGISTRY, registerTamperProofCollection,
  isTamperProofCollection, tamperProofUuidField, tamperProofBeforeChangeHook,
} from './tamper-proof-uuid-field'

export type { DanglingRef } from './uuid-ref'
export { uuidRef, registerUuidRef, UUID_REF_REGISTRY, resolveByUuid, findDanglingRefs } from './uuid-ref'

export type { SignedUuid, SignatureAlg } from './signatures'
export { signContentUuid, verifyContentUuidSignature, toJws, fromJws } from './signatures'

export type { CipherEnvelope, EnvelopeAlg } from './envelope'
export { encryptEnvelope, decryptEnvelope, encryptBytesEnvelope, decryptBytesEnvelope } from './envelope'

export type { TenantKeyResolver, KeyPurpose } from './tenant-key-registry'
export {
  InMemoryKeyResolver, getDefaultKeyResolver, setDefaultKeyResolver,
  provisionTestSigningKey, provisionTestKek,
} from './tenant-key-registry'

export { computeTamperReverseCost, meetsThreshold } from './tamper-reverse-cost'
export type { TamperReverseCost, TamperReverseCostInput, RegulatoryThreshold } from './tamper-reverse-cost'

export type { UuidLinkedLeaf, ChainVerifyResult } from './uuid-linked-chain'
export {
  GENESIS_PREV_UUID, canonicalJson, payloadContentUuid, computeLeafUuid,
  buildNextLeaf, verifyUuidLinkedChain,
} from './uuid-linked-chain'

export {
  SHORT_UUID_POLICY, shortUuid, parseShortUuid, lookupShort, displayUuid, checkUuidShortDisplay,
} from './uuid-short'
export type { ShortUuidKind, ShortLookupResult, DisplayUuid, UuidDisplayCompliance } from './uuid-short'

export {
  recordUuid, recordManyUuids, queryUuidStream, snapshotFromRegistries,
  buildInfiniteFinitenessReport, checkInfiniteFiniteness, __resetUuidStreamForTests,
} from './uuid-stream'
export type {
  UuidSource, UuidEntry, UuidStreamFilter, InfiniteFinitenessReport, BuildReportArgs, InfiniteFinitenessVerdict,
} from './uuid-stream'

export {
  computeTypeUuid, registerType, getType, getTypeByUuid, listTypes,
  descriptorFromZod, registerTypeFromZod, verifyType, checkTypeUuidCoverage, ensureBaselineTypesRegistered,
} from './type-uuid'
export type { TypeDescriptor, RegisteredType, TypeVerification, TypeUuidCoverageResult } from './type-uuid'

export {
  LANDAUER_FLOOR_JOULES, energyLog10Joules, RESOURCE_BUDGETS,
  largestBudgetExceeded, beyondUniverse, proveBeyondResources,
} from './resource-bound'
export type { ResourceBudget, ResourceVerdict } from './resource-bound'
