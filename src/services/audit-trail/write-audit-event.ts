/**
 * writeAuditEvent — uuid-linked audit-events writes.
 *
 * Slice PPPPPPPPP-cut1 (2026-05-11). Closes Finding 2 of the
 * tamper-surface review: bulk audit-events `payload.create` writes
 * bypassed the uuid-linked DO chain from Slice TTTTTTTT, leaving
 * the majority of audit history tamperable via direct DB write.
 *
 * This helper is the single chokepoint for audit-events creation.
 * It does two things atomically (best-effort coordinated):
 *
 *   1. Append the audit leaf to the per-tenant uuid-linked DO chain
 *      (`auditChainAppendLinked` from Slice TTTTTTTT). The DO chain
 *      enforces `leafUuid = sha256(prev || payload || ts)`; tamper
 *      on any prior leaf invalidates the whole chain from that
 *      point. This step is the tamper-evidence guarantee.
 *
 *   2. Persist the matching `audit-events` Payload row carrying the
 *      DO leaf's `leafUuid` as its `chainLeafUuid` reference. The
 *      Payload row is the QUERYABLE form (joins, filters, admin UI);
 *      the DO chain is the TAMPER-EVIDENT form. Each row points at
 *      its chain leaf; verifying tamper means recomputing the chain
 *      and checking the chainLeafUuid matches.
 *
 * Failure modes:
 *
 *   - If the DO chain append fails (network blip, DO storage full),
 *     the Payload row is STILL written but with `chainLeafUuid: null`
 *     and `chainLinkStatus: 'pending'`. A future reconciliation
 *     sweep replays pending leaves into the chain when it recovers.
 *     This is the same self-closure pattern as Law 53: the local
 *     answer is correct, the chain catches up.
 *
 *   - If the Payload row write fails, we MUST NOT silently swallow
 *     (that was Finding 4 of the review). The caller decides whether
 *     the operation reverts. We re-throw with a clear error and let
 *     the caller's transaction policy handle it.
 *
 * Migration path: the 11 sites that currently call
 * `payload.create({collection:'audit-events', ...})` directly are
 * migrated to `writeAuditEvent(ctx, leaf)` in a follow-up cut. Each
 * site's call shape is preserved; only the path through the chain
 * changes. The new invariant `checkAuditEventsAreChainLinked` warns
 * on any remaining direct callers until coverage hits 100%.
 *
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (every write tamper-evident)
 * @standard SOX §404 internal controls (tamper-evidence + queryable form)
 * @standard ISO 27001 Annex A.12.4 logging + monitoring
 * @standard NIST SP 800-92 §3.4 log integrity
 * @audit Conservation Law 8 content-addressable integrity
 * @audit Conservation Law 53 self-referential-closure (pending-leaf reconciliation)
 * @feature audit_trail
 * @see /src/services/integrity/uuid-linked-chain.ts (UuidLinkedLeaf shape)
 * @see /src/services/cloudflare/index.ts (auditChainAppendLinked mediator wrapper)
 */

import type { Payload } from 'payload'
import type { UuidLinkedLeaf } from '@/services/integrity/uuid-linked-chain'

/**
 * Input shape — uniform across every caller. Free-form `payload`
 * field carries the event-specific detail; the rest is normalised
 * audit metadata.
 */
export interface AuditEventInput {
  readonly tenantId: string
  readonly eventName: string
  readonly subjectCollection: string
  readonly subjectId: string
  readonly action: string
  readonly userId?: string
  readonly payload?: Record<string, unknown>
  /** Optional pre-existing correlation id (e.g. chain step id). */
  readonly correlationId?: string
  /**
   * Slice PPPPPPPPP-cont (2026-05-11) — per user 'the streams pause
   * when signatures are required. the pausing points in spacetime
   * are the meeting points of merged unity in all dimensions'.
   *
   * When `true`, the leaf is a stream-pause / merged-unity barrier.
   * After the DO chain append, the helper requests
   * `mediator.signUuid(leafUuid)`; on success the row's status
   * becomes `'sealed'` (federation peers reconcile to here). On
   * signature failure the row lands at `'pending-signature'` and a
   * reconciliation sweep retries.
   *
   * Use for: period-close events, regulatory filings, eIDAS-anchored
   * invoices, federation outbound exports, key rotations. Don't use
   * for routine row creates — every event then becomes a sync barrier
   * and the stream stalls.
   */
  readonly signatureRequired?: boolean
}

export interface AuditEventCtx {
  readonly payload: Payload
  /**
   * Optional Mediator handle from `@/services/cloudflare`. When
   * present, `auditChainAppendLinked` is used to write the DO leaf;
   * `signUuid` is used when `signatureRequired: true`. When absent,
   * the Payload row is written with `chainLinkStatus: 'unbound'`.
   */
  readonly mediator?: {
    auditChainAppendLinked(payload: Record<string, unknown>): Promise<UuidLinkedLeaf | null>
    signUuid?: <T>(uuid: string, kid?: string) => Promise<unknown>
  }
}

export type ChainLinkStatus =
  | 'linked'              // chain-appended, no signature required
  | 'pending'             // chain append failed (transient); reconciliation will replay
  | 'unbound'             // no mediator at write time
  | 'sealed'              // chain-appended AND signed — merged-unity meeting point
  | 'pending-signature'   // chain-appended; signature required but not yet produced

export interface WriteAuditEventResult {
  readonly id: string
  readonly chainLeafUuid: string | null
  readonly chainLinkStatus: ChainLinkStatus
  /** Set when `signatureRequired:true` AND signing succeeded. */
  readonly signedUuid?: unknown
}

/**
 * Write one audit event. Tamper-evident via the DO chain; queryable
 * via the Payload row. Never silently swallows write failures.
 *
 * Idempotency: callers that need idempotency should supply a
 * `correlationId` and check whether a row with that correlationId
 * already exists before calling — this helper does NOT dedupe.
 */
export async function writeAuditEvent(
  ctx: AuditEventCtx,
  input: AuditEventInput,
): Promise<WriteAuditEventResult> {
  const occurredAt = new Date().toISOString()

  // ── Step 1: append to the uuid-linked DO chain (best-effort) ────
  let chainLeaf: UuidLinkedLeaf | null = null
  let chainLinkStatus: ChainLinkStatus = 'unbound'
  let signedUuid: unknown
  if (ctx.mediator) {
    try {
      chainLeaf = await ctx.mediator.auditChainAppendLinked({
        tenantId: input.tenantId,
        eventName: input.eventName,
        subjectCollection: input.subjectCollection,
        subjectId: input.subjectId,
        action: input.action,
        userId: input.userId,
        correlationId: input.correlationId,
        payload: input.payload,
        signatureRequired: input.signatureRequired === true,
        occurredAt,
      })
      chainLinkStatus = chainLeaf ? 'linked' : 'pending'
    } catch {
      // Chain append failed — flag the row for later reconciliation.
      // We MUST NOT silently swallow this state at the row level;
      // `chainLinkStatus: 'pending'` makes the gap discoverable.
      chainLinkStatus = 'pending'
    }

    // ── Step 1b: if signature required, attempt to seal the leaf ──
    // Slice PPPPPPPPP-cont — streams pause at signature points. The
    // sealed status is the merged-unity meeting point; federation
    // peers reconcile up to the latest sealed leaf.
    if (input.signatureRequired === true && chainLeaf && ctx.mediator.signUuid) {
      try {
        signedUuid = await ctx.mediator.signUuid(chainLeaf.leafUuid)
        chainLinkStatus = 'sealed'
      } catch {
        // Signature pending — reconciliation sweep retries when the
        // signer (internal Ed25519 / external QTSP) is reachable.
        chainLinkStatus = 'pending-signature'
      }
    } else if (input.signatureRequired === true && chainLeaf) {
      // Mediator present but no signUuid wrapper — still required.
      chainLinkStatus = 'pending-signature'
    }
  }

  // ── Step 2: persist the queryable Payload row (REQUIRED) ────────
  // This MUST succeed — auditing tamper-sensitive operations is not
  // optional. Re-throw on failure so the caller's transaction policy
  // can revert the originating operation.
  const row = await ctx.payload.create({
    collection: 'audit-events' as never,
    data: {
      tenant: input.tenantId,
      eventName: input.eventName,
      subjectCollection: input.subjectCollection,
      subjectId: input.subjectId,
      action: input.action,
      userId: input.userId,
      correlationId: input.correlationId,
      payload: input.payload,
      occurredAt,
      // Slice PPPPPPPPP-cut1 — DO-chain backreference. Verifiable
      // post-hoc by recomputing the per-tenant chain and confirming
      // a leaf at `chainLeafUuid` exists with byte-equal payload.
      chainLeafUuid: chainLeaf?.leafUuid ?? null,
      chainLinkStatus,
      // Slice PPPPPPPPP-cont — signature payload at the stream
      // pause point. Present when chainLinkStatus === 'sealed'.
      signatureRequired: input.signatureRequired === true,
      sealedAt: chainLinkStatus === 'sealed' ? occurredAt : null,
    } as never,
  }) as { id: string }

  return {
    id: row.id,
    chainLeafUuid: chainLeaf?.leafUuid ?? null,
    chainLinkStatus,
    signedUuid,
  }
}
