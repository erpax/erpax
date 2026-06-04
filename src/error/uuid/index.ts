/**
 * Errors are first-class uuid entities — Conservation Law 64.
 *
 * Slice AAAAAAAAAA-cut1 (2026-05-11). Per user 'error handling is
 * also part of the uuid'.
 *
 * Errors stop being out-of-band exceptions and become structured
 * uuid entities in the chain. Every error has a deterministic
 * `ErrorUuid` derived from (code, message, contextUuid?, tenantId);
 * the uuid carries `slot=error + CHAINED` capabilities so federation
 * peers + auditors + replay tools see the error as a regular leaf.
 *
 * Why this matters:
 *
 *   - **Replay-safe.** The same logical error (same code, same
 *     context) produces the same ErrorUuid. Replaying a chain leaf
 *     by leaf reproduces the same error-uuids; consensus across
 *     peers (Slice UUUUUU N-of-K) verifies the platform's error
 *     histories agree.
 *   - **Federation-comparable.** "Did peer A see error E?" is a
 *     uuid equality check, not a string-match heuristic.
 *   - **Audit-trail integrable.** An error becomes a chain leaf
 *     (writeAuditEvent with `eventName: 'error:<code>'` + the
 *     ErrorUuid as `subjectId`). Slice PPPPPPPPP's chain-linkage
 *     applies; sealed errors at critical points use SEALED.
 *   - **Self-closure ready.** When an external dependency throws,
 *     the ErrorUuid is captured AND the InternalProvider fallback
 *     runs (Slice JJJJJJJJJ); the chain records both.
 *
 * Composition with prior laws:
 *   - Law 8 + Law 47: contentUuid + type-brand
 *   - Law 53: errors trigger self-closure fallbacks; the chain
 *             records both the error AND the recovery
 *   - Law 55: each sealed error contributes a chain-depth axis to
 *             tamper cost (forging an error history = forging the
 *             chain)
 *   - Law 57: error-uuid → recovery-leaf-uuid is a KvBinding
 *   - Law 59: a tenant can share its error log via the share family
 *   - Law 60: errors are chain leaves
 *   - Law 61: structured uuidv8 with slot=error
 *   - Law 62: error-uuids contribute to feature coverage
 *
 * Conservation Law 64 (errors are first-class uuids): every error
 * in the platform has a deterministic structured uuid; error handling
 * becomes a chain operation rather than an out-of-band exception path.
 *
 * @standard ISO/IEC 25010:2023 §5.6 reliability
 * @standard NIST SP 800-92 §3.4 log integrity (errors as audited events)
 * @standard W3C Problem Details for HTTP APIs (RFC 9457 — type + title + status)
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (errors are evidence)
 * @audit Conservation Law 64 errors-are-first-class-uuids
 * @feature error_uuid
 * @see /src/services/uuid-format/index.ts (Law 61 structured uuidv8)
 * @see /src/services/uuid-chain/index.ts (Law 60 chain leaves)
 * @see /src/services/self-closure/index.ts (Law 53 fallbacks consume errors)
 */

import type { ContentUuid } from '@/integrity/content-uuid'
import {
  encodeStructured, SLOT_TAGS, CAPABILITIES,
} from '@/uuid/format'

/** Type-branded error identifier. Phantom-typed by code for compile-time clarity. */
export type ErrorUuid<Code extends string = string> = ContentUuid<{
  kind: 'error'
  code: Code
}>

/**
 * Canonical error information. The deterministic input to
 * `computeErrorUuid` — only the fields here participate in the
 * uuid derivation; stack traces / volatile fields are excluded so
 * the same logical error produces the same uuid across runs.
 */
export interface ErrorInfo<Code extends string = string> {
  readonly code: Code
  readonly message: string
  /** Optional content-uuid of the operation context (queryUuid, chainLeafUuid, etc.). */
  readonly contextUuid?: string
  /** Optional category — 'transient', 'permanent', 'validation', etc. */
  readonly category?: 'transient' | 'permanent' | 'validation' | 'security' | 'unknown'
}

/**
 * Compute a deterministic content-uuid for an error. Same
 * (code, message, contextUuid, category, tenantId) tuple → same
 * uuid. Federation peers and replay tools verify error histories
 * by uuid equality.
 *
 * `sealed: true` adds the SEALED capability bit — use for critical
 * errors that warrant a chain seal at a stream-pause point (data
 * loss, security violations, regulatory filings failing).
 */
export function computeErrorUuid<Code extends string>(args: {
  info: ErrorInfo<Code>
  tenantId: string
  sealed?: boolean
}): ErrorUuid<Code> {
  let capabilities = CAPABILITIES.CHAINED
  if (args.sealed === true) capabilities |= CAPABILITIES.SEALED
  return encodeStructured({
    slotTag: SLOT_TAGS.error,
    capabilities,
    schemaVersion: 1,
    content: {
      code: args.info.code,
      message: args.info.message,
      contextUuid: args.info.contextUuid,
      category: args.info.category ?? 'unknown',
    },
    tenantId: args.tenantId,
  }) as ErrorUuid<Code>
}

/**
 * Convert a native `Error` (or any thrown value) into structured
 * `ErrorInfo` ready for `computeErrorUuid`. The conversion is
 * lossy by design — stack traces + non-deterministic timestamps
 * are dropped so the resulting uuid is replay-safe. Callers that
 * need the stack should attach it as a separate audit-event payload
 * field (which lives outside the uuid hash).
 */
export function toErrorInfo<Code extends string = string>(args: {
  err: unknown
  code?: Code
  contextUuid?: string
  category?: ErrorInfo['category']
}): ErrorInfo<Code> {
  const code = (args.code ?? (
    args.err instanceof Error && args.err.name && args.err.name !== 'Error'
      ? args.err.name
      : 'UNKNOWN'
  )) as Code
  const message = args.err instanceof Error
    ? args.err.message
    : typeof args.err === 'string' ? args.err : String(args.err)
  return {
    code,
    message,
    contextUuid: args.contextUuid,
    category: args.category,
  }
}

/**
 * High-level helper — convert a raw thrown value into a structured
 * ErrorUuid in one call. Used by self-closure providers + audit
 * helpers to attach error-uuids to chain leaves.
 *
 *   try {
 *     await callExternal()
 *   } catch (err) {
 *     const errorUuid = wrapError({
 *       err, tenantId, code: 'EXTERNAL_TIMEOUT',
 *       contextUuid: queryUuid, sealed: true,
 *     })
 *     // emit a chain leaf with this errorUuid as subjectId
 *   }
 */
export function wrapError<Code extends string = string>(args: {
  err: unknown
  tenantId: string
  code?: Code
  contextUuid?: string
  category?: ErrorInfo['category']
  sealed?: boolean
}): { errorUuid: ErrorUuid<Code>; info: ErrorInfo<Code> } {
  const info = toErrorInfo<Code>({
    err: args.err,
    code: args.code,
    contextUuid: args.contextUuid,
    category: args.category,
  })
  const errorUuid = computeErrorUuid<Code>({
    info,
    tenantId: args.tenantId,
    sealed: args.sealed,
  })
  return { errorUuid, info }
}
