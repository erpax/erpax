/**
 * storage/redundancy — the same content-uuid across N stores, reconciled by comparing uuids.
 *
 * A store that has gone stale or been tampered with disagrees with its peers on the address, so a
 * healthy peer is pulled rather than trusted. The docstring below was deleted by the export purge
 * of 2026-09-20 together with a dead symbol above it, and this atom's own leftover-wave proof went
 * red on the missing marker — the same defect that took BG ЗПУПС and IFRS 1 ([[rules]]/citation).
 *
 * @standard ISO/IEC 9075-2:2016 §4.15.10 — when paired with bitemporal history
 */
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
