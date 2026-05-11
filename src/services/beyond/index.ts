/**
 * Beyond current standards — barrel.
 *
 * Slice ZZZZZ (2026-05-11). 11 next-horizon conservation primitives:
 *
 *   Law 11  causal provenance     (W3C PROV)              — provenance.ts
 *   Law 12  deterministic replay                          — replay.ts
 *   Law 13  tenant isolation                              — tenant-isolation.ts
 *   Law 14  bitemporal queries    (SQL:2011 §4.15.10)      — bitemporal.ts (stub)
 *   Law 15  cost accountability   (CF Workers price list)  — cost.ts
 *   Law 16  carbon-aware exec     (ESRS E1 + GHG Scope-2)  — carbon.ts
 *   Law 17  agent capability      (NIST INCITS 359 RBAC)   — agent-capability.ts
 *   Law 18  post-quantum sigs     (NIST FIPS 204 ML-DSA)   — pqc.ts (stub)
 *   Law 19  self-explainability   (EU AI Act Art. 13)      — explainability.ts
 *   Law 20  reversibility         (GDPR Art. 17)           — reversibility.ts
 *   Law 22  AI-decision audit     (EU AI Act Annex IV)     — ai-audit.ts
 *
 * @standard W3C PROV + ESRS E1 + EU AI Act + NIST FIPS 203/204
 */

export type {
  CausalLink, Provenance,
  ReplayRequest, ReplayResult,
  TenantScopedQuery,
  BitemporalCoordinates,
  CostMetric, CarbonEstimate,
  PqcAlgorithm, PqcSignature,
  Explanation,
  InverseEffect,
  AiProvenance,
} from './types'

export { recordCausalLink, getCausalAncestry, getProvenance, provenanceUuid } from './provenance'
export { effectsHash, replayLeaf, isReplayStable } from './replay'
export type { TenantIsolationViolation } from './tenant-isolation'
export { checkTenantIsolation, tenantScopedFind } from './tenant-isolation'
export { asOf, isHistoricalQuery } from './bitemporal'
export { setBudget, recordCost, estimateMicroUsd, getBudget } from './cost'
export { estimateCarbon, recordCarbon, getTenantCarbon } from './carbon'
export type { AgentCapability } from './agent-capability'
export {
  declareAgentCapability, getAgentCapability,
  assertAgentCanCallTool, assertAgentCanRead, assertAgentCanWrite, assertAgentJurisdiction,
  findAgentsWithoutCapability, listAgentCapabilities, DEFAULT_DENY,
} from './agent-capability'
export { signPqc, verifyPqc, isApprovedPqc } from './pqc'
export { autoExplain, isExplanationComplete } from './explainability'
export { inverseOf, isFullyReversible } from './reversibility'
export { recordAiInvocation, isAnnexIvCompliant } from './ai-audit'
