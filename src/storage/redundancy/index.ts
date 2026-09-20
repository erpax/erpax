/**
 * Storage redundancy — Law 9 implementation.
 * Slice TTTTT (2026-05-11). Per spec §0d.
 *
 * Same content-uuid across N stores; reconcile divergences by uuid
 * comparison. Pulls a healthy peer when one store has tampered/stale.
 *
 * @standard ISO/IEC 9075-2:2016 §4.15.10 (when paired with Law 14 bitemporal)
 */

import { computeContentUuid, verifyContentUuid } from '@/integrity'

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
