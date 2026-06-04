/**
 * memory-writer — persist agent in-memory state to the `memories`
 * collection (Slice RRRRRRRR) so it survives restarts and is queryable.
 *
 * Slice XXXXXXXX (2026-05-11) — closes the loop on "anything mcp needs
 * needs a collection". Before this slice the meta-automation
 * `PROPOSALS_LOG` lived only in module-scope memory (flagged by the
 * `checkMcpMutationsHaveCollection` invariant); drift-cycle snapshots
 * were recomputed each sweep with no historical record; emerging gap
 * findings were forgotten after the stub was scaffolded.
 *
 * Writers in this module are called from ConsistencyAgent's hourly
 * cron (and from the pre-push auto-heal when CI runs there). All
 * writes are best-effort: a transient Payload error never blocks the
 * sweep; the next cycle re-records.
 *
 * Each row carries:
 *   - ownerType + ownerId (the agent / cycle that produced it)
 *   - kind (fix_proposal | drift_snapshot | emerging_gap | …)
 *   - key (sluggable; reusing the same key supersedes the prior row)
 *   - payload (JSON; structured per kind)
 *   - contentUuid (sha-256 of canonical payload — Conservation Law 8)
 *   - relatedTo[] (graph edges to anchor rows — Conservation Law 10)
 *   - cycleUuid (joinable across this slice's writes)
 *
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (per-cycle history)
 * @audit Conservation Law 8 content-uuid
 * @audit Conservation Law 10 referential-harmony
 */
import { createHash } from 'node:crypto'

export interface MemoryWriteable {
  readonly ownerType: 'agent' | 'tool' | 'tenant' | 'platform' | 'cycle'
  readonly ownerId: string
  readonly kind:
    | 'fix_proposal' | 'strategy_decision' | 'drift_snapshot'
    | 'emerging_gap' | 'agent_observation' | 'tool_cache'
    | 'feedback' | 'fact' | 'reference'
  readonly key: string
  readonly title: string
  readonly payload: Record<string, unknown>
  readonly rationale?: string
  readonly cycleUuid?: string
  readonly emittedFromEvent?: string
  readonly relatedTo?: ReadonlyArray<{ collection: string; docId: string; edgeKind?: 'about' | 'caused_by' | 'supersedes' | 'refers' }>
}

function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(canonicalJson).join(',') + ']'
  const obj = value as Record<string, unknown>
  const keys = Object.keys(obj).sort()
  return '{' + keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(obj[k])}`).join(',') + '}'
}

function contentUuidFor(input: MemoryWriteable): string {
  return createHash('sha256')
    .update(`${input.ownerType}|${input.ownerId}|${input.kind}|${input.key}|${canonicalJson(input.payload)}`)
    .digest('hex')
}

/** Payload-shaped client (typed loosely so the writer can be unit-tested with a stub). */
export interface MemoryPayloadClient {
  create(args: { collection: string; data: Record<string, unknown> }): Promise<unknown>
  find(args: {
    collection: string
    where?: Record<string, unknown>
    limit?: number
  }): Promise<{ docs: Array<Record<string, unknown>> }>
  update?(args: { collection: string; id: string; data: Record<string, unknown> }): Promise<unknown>
}

/**
 * Persist a memory. Idempotent on (ownerType, ownerId, kind, key):
 * if a row already exists, marks it as superseded and inserts the new
 * one — preserves the supersession trail per Law 28.
 */
export async function writeMemory(
  client: MemoryPayloadClient,
  tenantId: string,
  mem: MemoryWriteable,
): Promise<{ ok: boolean; contentUuid: string; error?: string }> {
  const contentUuid = contentUuidFor(mem)
  const recordedAt = new Date().toISOString()
  try {
    // Supersede any active row at the same (ownerType, ownerId, kind, key).
    const existing = await client.find({
      collection: 'memories',
      where: {
        ownerType: { equals: mem.ownerType },
        ownerId: { equals: mem.ownerId },
        kind: { equals: mem.kind },
        key: { equals: mem.key },
        status: { equals: 'active' },
      },
      limit: 5,
    })
    for (const doc of existing.docs ?? []) {
      const id = (doc as { id?: string }).id
      if (id && client.update) {
        await client.update({
          collection: 'memories',
          id,
          data: { status: 'superseded' },
        }).catch(() => { /* best-effort */ })
      }
    }
    await client.create({
      collection: 'memories',
      data: {
        memoryRef: `MEM-${recordedAt.slice(0, 10)}-${contentUuid.slice(0, 8)}`,
        title: mem.title,
        ownerType: mem.ownerType,
        ownerId: mem.ownerId,
        kind: mem.kind,
        key: mem.key,
        payload: mem.payload,
        rationale: mem.rationale,
        recordedAt,
        contentUuid,
        tenant: tenantId,
        cycleUuid: mem.cycleUuid,
        emittedFromEvent: mem.emittedFromEvent,
        relatedTo: mem.relatedTo,
      },
    })
    return { ok: true, contentUuid }
  } catch (err) {
    return { ok: false, contentUuid, error: err instanceof Error ? err.message : String(err) }
  }
}

/**
 * Persist a batch of memories — used by ConsistencyAgent's hourly
 * sweep to dump (proposals, drift snapshot, emerging gaps) in one
 * pass.
 */
export async function writeMemoryBatch(
  client: MemoryPayloadClient,
  tenantId: string,
  batch: ReadonlyArray<MemoryWriteable>,
): Promise<{ written: number; failed: number }> {
  let written = 0
  let failed = 0
  for (const m of batch) {
    const r = await writeMemory(client, tenantId, m)
    if (r.ok) written++; else failed++
  }
  return { written, failed }
}

/** Convenience builders so callers don't reconstruct payload shapes. */

export function asFixProposalMemory(args: {
  cycleUuid: string
  invariantId: string
  proposedTool: string
  proposedArgs: Record<string, unknown>
  autoApply: boolean
  rationale: string
  severity: 'warn' | 'fail'
}): MemoryWriteable {
  return {
    ownerType: 'agent',
    ownerId: 'consistency',
    kind: 'fix_proposal',
    key: `${args.invariantId}:${args.cycleUuid}`,
    title: `${args.invariantId} → ${args.proposedTool}`,
    payload: { ...args },
    rationale: args.rationale,
    cycleUuid: args.cycleUuid,
    emittedFromEvent: 'invariant:warned',
  }
}

export function asDriftSnapshotMemory(args: {
  cycleUuid: string
  entropy: number
  stableDriftCeiling: number
  realDriftFloor: number
  toolsScanned: number
  strategiesDistribution: Record<string, number>
}): MemoryWriteable {
  return {
    ownerType: 'cycle',
    ownerId: args.cycleUuid,
    kind: 'drift_snapshot',
    key: `dry-clean:${args.cycleUuid}`,
    title: `Drift cycle ${args.cycleUuid.slice(0, 8)} — entropy ${args.entropy}`,
    payload: { ...args },
    rationale: `Snapshot of drift metrics at the end of one harmonic cycle. entropy=${args.entropy}, stableCeiling=${args.stableDriftCeiling}, gate=${args.realDriftFloor}.`,
    cycleUuid: args.cycleUuid,
    emittedFromEvent: 'consistency:scan:complete',
  }
}

export function asEmergingGapMemory(args: {
  cycleUuid: string
  suggestedTool: string
  area: string
  evidence: ReadonlyArray<string>
  anchorPair: readonly [string, string]
  anchorScore: number
}): MemoryWriteable {
  return {
    ownerType: 'cycle',
    ownerId: args.cycleUuid,
    kind: 'emerging_gap',
    key: `gap:${args.suggestedTool}`,
    title: `Emerging gap — ${args.suggestedTool}`,
    payload: { ...args },
    rationale: `Disambiguation of ${args.anchorPair[0]} ↔ ${args.anchorPair[1]} (overlap ${args.anchorScore}) surfaced unclaimed concept tokens: ${args.evidence.slice(0, 6).join(', ')}.`,
    cycleUuid: args.cycleUuid,
    emittedFromEvent: 'consistency:scan:complete',
  }
}
