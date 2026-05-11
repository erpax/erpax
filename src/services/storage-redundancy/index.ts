/**
 * Storage redundancy — Law 9 implementation.
 * Slice TTTTT (2026-05-11). Per spec §0d.
 *
 * Same content-uuid across N stores; reconcile divergences by uuid
 * comparison. Pulls a healthy peer when one store has tampered/stale.
 *
 * @standard ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)
 */

import { computeContentUuid, verifyContentUuid } from '@/services/integrity'

export interface StorageBackend {
  readonly id: string                                          // 'd1' | 'r2' | 'kv' | 'do' | 'ipfs' | …
  readonly priority: number                                    // 1 = read first; higher = fallback
  read(collection: string, uuid: string): Promise<Record<string, unknown> | null>
  write(collection: string, row: Record<string, unknown>): Promise<void>
  list?(collection: string, sinceUuid?: string): Promise<ReadonlyArray<{ uuid: string }>>
}

export interface RedundantStoreOptions {
  readonly backends: ReadonlyArray<StorageBackend>
  readonly tenantId: string
  /** Quorum: how many backends must accept a write before it returns. Default = all. */
  readonly writeQuorum?: number
}

export interface ReconcileResult {
  readonly checked: number
  readonly healed: number
  readonly stillDiverged: ReadonlyArray<{ collection: string; uuid: string; backendIds: ReadonlyArray<string> }>
}

/** Read from the highest-priority healthy backend; verify content-uuid. */
export async function redundantRead(
  opts: RedundantStoreOptions,
  collection: string,
  uuid: string,
): Promise<Record<string, unknown> | null> {
  const sorted = [...opts.backends].sort((a, b) => a.priority - b.priority)
  for (const b of sorted) {
    const row = await b.read(collection, uuid)
    if (!row) continue
    if (verifyContentUuid({ ...row, uuid }, opts.tenantId).ok) return row
    // Tampered in this backend; try the next.
  }
  return null
}

/** Write to >= writeQuorum backends; throw if quorum unmet. */
export async function redundantWrite(
  opts: RedundantStoreOptions,
  collection: string,
  row: Record<string, unknown>,
): Promise<{ uuid: string; acceptedBy: ReadonlyArray<string> }> {
  const uuid = computeContentUuid(row, opts.tenantId)
  const stamped = { ...row, uuid }
  const quorum = opts.writeQuorum ?? opts.backends.length
  const accepted: string[] = []
  for (const b of opts.backends) {
    try { await b.write(collection, stamped); accepted.push(b.id) } catch { /* swallow */ }
  }
  if (accepted.length < quorum) {
    throw new Error(`Law 9 violation: write quorum unmet (${accepted.length}/${quorum} backends accepted)`)
  }
  return { uuid, acceptedBy: accepted }
}

/** Sweep + reconcile: for each (collection, uuid), confirm every backend has the same content-uuid. */
export async function reconcileBackends(
  opts: RedundantStoreOptions,
  collections: ReadonlyArray<string>,
): Promise<ReconcileResult> {
  let checked = 0, healed = 0
  const stillDiverged: { collection: string; uuid: string; backendIds: string[] }[] = []
  for (const collection of collections) {
    // Build the uuid universe across every backend's list().
    const seen = new Set<string>()
    for (const b of opts.backends) {
      if (!b.list) continue
      const items = await b.list(collection)
      for (const item of items) seen.add(item.uuid)
    }
    for (const uuid of seen) {
      checked++
      const versions = await Promise.all(opts.backends.map((b) => b.read(collection, uuid).then((r) => ({ b, r }))))
      const present = versions.filter((v) => v.r !== null)
      const verified = present.filter((v) => verifyContentUuid({ ...v.r!, uuid }, opts.tenantId).ok)
      const missing = versions.filter((v) => v.r === null)
      if (verified.length === present.length && missing.length === 0) continue   // all in sync
      // Pick a verified copy and replicate to missing/tampered backends.
      const truth = verified[0]?.r
      if (!truth) {
        stillDiverged.push({ collection, uuid, backendIds: versions.map((v) => v.b.id) })
        continue
      }
      for (const m of missing) await m.b.write(collection, { ...truth, uuid })
      for (const t of versions.filter((v) => v.r !== null && !verifyContentUuid({ ...v.r!, uuid }, opts.tenantId).ok)) {
        await t.b.write(collection, { ...truth, uuid })
      }
      healed++
    }
  }
  return { checked, healed, stillDiverged }
}
