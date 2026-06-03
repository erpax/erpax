/**
 * cross — the versioning cross: every entity change mints ONE content-addressed
 * leaf, read THREE ways.
 *
 * "All is versioned as another cross of tampering costs and analytics." The
 * version IS the content-uuid (each change ⇒ a new leaf); the SAME leaf is
 * simultaneously a TAMPER-COST increment (the chain a forger must rewrite) and
 * an ANALYTICS data-point (a timestamped change event). Three readings, one
 * primitive — so versioning is not a per-collection Payload flag (the narrow
 * view, Pages/Posts) but a universal property of every content-uuid'd entity.
 *
 * Mirrors `src/access/cross`: where access crosses role × capability on the
 * content-uuid (forge ≫ verify, Law 59), versioning crosses tamper-cost ×
 * analytics on the content-uuid. Both are ONE agnostic factory over every
 * entity; the asymmetry IS the property.
 *
 * Composes the three EXISTING primitives — NO new storage, NO duplication:
 *   VERSION     ← computeContentUuid   (@/services/integrity — Law 8, the leaf)
 *   TAMPER-COST ← crackVerdict          (@/services/tamper-cost — the forge cost)
 *   ANALYTICS   ← the DomainEvent tuple (@/types/events — the change-stream)
 *
 * @standard RFC 9562 §5.8 uuidv8 (the content-addressed version id)
 * @standard RFC 8785 JCS (deterministic content canonicalization)
 * @audit ISO 19011:2018 §6.4.6 audit-evidence (the version chain IS the trail)
 * @compliance SOX §404 internal-controls record-retention
 * @see src/access/cross/index.ts   the sibling cross (role × capability)
 * @see src/versions/SKILL.md        the law + the three faces
 */
import { computeContentUuid } from '@/services/integrity'
import { crackVerdict, type CrackVerdict } from '@/services/tamper-cost'
import type { DomainEvent } from '@/types/events'

/** The analytics face — a DomainEvent-shaped data-point for the change-stream. */
export type VersionEvent = Pick<
  DomainEvent,
  'aggregateId' | 'aggregateType' | 'eventType' | 'tenantId' | 'timestamp'
> & {
  /** the version leaf this event records (the content-uuid). */
  readonly versionUuid: string
}

/** One content-addressed leaf, read three ways — the cross point. */
export interface VersionLeaf {
  /** VERSION — the content-uuid = the version id (changes iff the content changes). */
  readonly uuid: string
  /** the predecessor leaf — the chain (null = genesis). */
  readonly prevUuid: string | null
  /** 1-based depth in the chain (genesis = 1) — the analytics ordinal AND a tamper-cost gate. */
  readonly seq: number
  /** true iff this leaf changed the content (uuid !== prevUuid) — a no-op write is not a new version. */
  readonly changed: boolean
  /** TAMPER-COST — the forge cost of the leaf, amplified by chain depth + coverage. */
  readonly tamper: CrackVerdict
  /** ANALYTICS — the change-event tuple. */
  readonly event: VersionEvent
}

export interface VersionCrossInput<T extends Record<string, unknown>> {
  /** the entity's content (storage-managed fields are stripped by computeContentUuid). */
  readonly content: T
  readonly tenantId: string
  /** the stable entity identity the analytics event references (the row id / business key). */
  readonly aggregateId: string
  readonly aggregateType: DomainEvent['aggregateType']
  readonly eventType: string
  /** caller-supplied (deterministic; not Date.now) — the analytics timestamp. */
  readonly timestamp: Date
  /** the predecessor leaf's content-uuid (null/omitted = genesis or unknown). */
  readonly prevUuid?: string | null
  /** 1-based chain depth; defaults to 1 (genesis). */
  readonly seq?: number
  /** fraction of the entity graph wired into the uuid-cross (1 ⇒ ∞ tamper-cost). */
  readonly coverage?: number
  /** independently-anchored replicas (3FS/CRAQ) — multiplies the check set under strong consistency. */
  readonly replicas?: number
  readonly strongConsistency?: boolean
  /** machine-checked invariants the audit runs (adds gates). */
  readonly invariants?: number
}

/**
 * The number of independent uuid-checks a coherent tamper of version `seq` must
 * evade together: the leaf itself plus every prior version it would have to
 * rewrite to keep the chain consistent. This is precisely why "versioning IS
 * tamper-cost" — a deeper history is a more expensive forgery.
 */
export const chainChecks = (seq: number): number => Math.max(1, Math.floor(seq))

/**
 * Mint the version leaf for one entity change — the cross point that joins the
 * three faces. Pure + deterministic (same content + tenant ⇒ same uuid), so it
 * is fully testable and mergeable (two replicas computing it agree).
 */
export const versionCross = <T extends Record<string, unknown>>(
  input: VersionCrossInput<T>,
): VersionLeaf => {
  const uuid = computeContentUuid(input.content, input.tenantId)
  const prevUuid = input.prevUuid ?? null
  const seq = chainChecks(input.seq ?? 1)
  const changed = uuid !== prevUuid

  // The chain depth folds into the independent-check count: forging version N
  // means rewriting the N prior leaves too (the all-directions cascade). With
  // full coverage this drives the cost to ∞ (the localize-fusion law).
  const tamper = crackVerdict({
    checks: seq,
    coverage: input.coverage,
    replicas: input.replicas,
    strongConsistency: input.strongConsistency,
    invariants: input.invariants,
  })

  return {
    uuid,
    prevUuid,
    seq,
    changed,
    tamper,
    event: {
      versionUuid: uuid,
      aggregateId: input.aggregateId,
      aggregateType: input.aggregateType,
      eventType: input.eventType,
      tenantId: input.tenantId,
      timestamp: input.timestamp,
    },
  }
}
