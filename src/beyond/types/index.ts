/**
 * Beyond current standards — common types for the 10 next-horizon
 * conservation primitives (Laws 11-20+22).
 *
 * Slice ZZZZZ (2026-05-11). What no current standard fully demands
 * but every regulator will demand within 5 years.
 *
 * @standard W3C PROV (Provenance Data Model)
 * @standard EU AI Act 2024/1689 (Annex IV — technical documentation)
 * @standard ISRS 4400 agreed-upon-procedures (replay verification)
 * @standard ESRS E1 (climate change disclosures — gCO2e per activity)
 * @standard NIST SP 800-208 stateful-hash-based-signatures (PQC)
 * @standard NIST FIPS 203 ML-KEM + FIPS 204 ML-DSA (PQC, 2024)
 * @standard ISO 19944 cloud-services data-flow + jurisdiction
 * @standard XBRL inline-XBRL (machine-explainability of financial values)
 */

import type { AgentEffect } from '@/agent'

// ── Law 11: Causal provenance (W3C PROV) ─────────────────────────────

/** A directed PROV-style edge: this leaf was caused by these inputs. */
export interface CausalLink {
  readonly causedBy: ReadonlyArray<string>   // uuids of upstream audit leaves / inputs
  readonly producedBy: string                 // the agent / chain step that did the work
  readonly atTime: string                     // ISO-8601 wall-clock instant
}

/** Provenance attached to any value — extends AuditLeaf without requiring a schema change. */
export interface Provenance {
  readonly causalChain: ReadonlyArray<CausalLink>
  /** Optional W3C PROV `wasDerivedFrom` source-uri. */
  readonly source?: string
}

// ── Law 12: Deterministic replay ─────────────────────────────────────

/** A replay request — given (leaf, tenant snapshot), reproduce. */
export interface ReplayRequest {
  readonly leafHash: string                   // pointer into the Merkle audit chain
  readonly snapshotUuid: string               // content-uuid of the tenant state at the time
}

/** Replay result — byte-identical to the original AgentEffect[]. */
export interface ReplayResult {
  readonly ok: boolean
  readonly effects?: ReadonlyArray<AgentEffect>
  readonly mismatch?: { expectedHash: string; actualHash: string }
}

// ── Law 13: Tenant isolation provability ─────────────────────────────

/** A query trace — proves the query was scoped to a tenant. */
export interface TenantScopedQuery {
  readonly collection: string
  readonly tenantIdInWhereClause: string
  readonly resultRowTenantIds: ReadonlyArray<string>
}

// ── Law 14: Bitemporal queries ───────────────────────────────────────

export interface BitemporalCoordinates {
  /** When the system recorded the value (system time). */
  readonly recordedAt: string
  /** When the value was true in the world (valid time). */
  readonly validAt: string
}

// ── Law 15: Cost accountability ──────────────────────────────────────

/** Per-step cost metric — accumulates to tenant.budget. */
export interface CostMetric {
  readonly cpuMs: number
  readonly storageBytes: number
  readonly egressBytes: number
  readonly aiTokensIn?: number
  readonly aiTokensOut?: number
  /** Computed total in micro-USD using the tenant's price list. */
  readonly microUsd?: number
}

// ── Law 16: Carbon-aware execution ───────────────────────────────────

/** Per-step carbon estimate (gCO2e) — aggregates for ESRS E1 reporting. */
export interface CarbonEstimate {
  readonly gramsCO2e: number
  /** Source of the factor: ECB / EPA / Cloudflare published; cited per ESRS E1. */
  readonly factorSource: string
  /** Region the workload ran in (data centers have different carbon intensity). */
  readonly region?: string
}

// ── Law 18: Post-quantum signatures ──────────────────────────────────

export type PqcAlgorithm = 'ML-DSA-44' | 'ML-DSA-65' | 'ML-DSA-87' | 'SLH-DSA-128' | 'XMSS' | 'LMS'

export interface PqcSignature {
  readonly algorithm: PqcAlgorithm
  readonly publicKeyFingerprint: string
  readonly signatureB64: string
  readonly signedAt: string
}

// ── Law 19: Self-explainability ──────────────────────────────────────

/** Auto-generated narrative explanation for any business outcome. */
export interface Explanation {
  /** Per-locale explanations — i18n via spec-templates. */
  readonly text: { readonly [locale: string]: string }
  /** Standards cited in the explanation. */
  readonly standardsCited: ReadonlyArray<{ body: string; id: string }>
  /** Source data references (uuids). */
  readonly sources: ReadonlyArray<string>
  /** Chain steps the value flowed through. */
  readonly chainPath: ReadonlyArray<{ chainId: string; stepIndex: number }>
}

// ── Law 20: Reversibility ────────────────────────────────────────────

/** Typed inverse of an AgentEffect — runs to undo the original. */
export type InverseEffect =
  | { kind: 'undo-create'; collection: string; id: string }
  | { kind: 'undo-update'; collection: string; id: string; restorePatch: unknown }
  | { kind: 'undo-emit'; eventId: string; correlationId?: string }
  | { kind: 'undo-audit'; leafHash: string }
  | { kind: 'cannot-invert'; reason: string }

// ── Law 22: AI-decision audit (EU AI Act Annex IV) ───────────────────

export interface AiProvenance {
  readonly modelVersion: string                // e.g. 'claude-opus-4-7'
  readonly modelProvider: 'anthropic' | 'cloudflare-workers-ai' | 'self-hosted' | string
  readonly promptHash: string                  // SHA-256 of canonicalized prompt
  readonly parameters: Record<string, unknown> // temperature, max_tokens, …
  readonly seed?: number                       // when model supports deterministic seed
  readonly inputTokens: number
  readonly outputTokens: number
  readonly inferenceLatencyMs: number
  readonly invokedAt: string                   // ISO-8601
  /** Required by EU AI Act Art. 13 — role of the human reviewer (if any). */
  readonly humanReview?: { reviewerId: string; decision: 'approved' | 'overridden'; reason?: string }
}
