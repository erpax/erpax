/**
 * emit-inventory — write inventory.generated.json (emit-only, not gate input).
 *
 *   pnpm erpax agent inventory --emit
 *   tsx src/agent/inventory/emit.ts
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { computeContentUuid } from '@/integrity'
import {
  INVENTORY_JSON_REL,
  taskInventory,
  type InventoryRow,
  type TaskInventoryResult,
} from './index'

const STORE_LAW =
  'coordinator inventory is automatic — snapshot is emit-only; classify from transcripts + terminals'

export interface InventorySnapshot {
  readonly _law: string
  readonly contentUuid: string
  readonly sealedAt: string
  readonly scannedAt: string
  readonly activeCount: number
  readonly staleCount: number
  readonly duplicateCount: number
  readonly warnings: readonly string[]
  readonly rows: readonly InventoryRow[]
}

const snapshotPayload = (result: TaskInventoryResult): Omit<InventorySnapshot, 'contentUuid'> => ({
  _law: STORE_LAW,
  sealedAt: result.scannedAt.slice(0, 10),
  scannedAt: result.scannedAt,
  activeCount: result.activeCount,
  staleCount: result.staleCount,
  duplicateCount: result.duplicateCount,
  warnings: result.warnings,
  rows: result.rows.map((row) => ({
    id: row.id,
    ageSeconds: row.ageSeconds,
    status: row.status,
    title: row.title,
    speedUpHint: row.speedUpHint,
    source: row.source,
    startedAtMs: row.startedAtMs,
    lastActivityMs: row.lastActivityMs,
    ...(row.paths?.length ? { paths: row.paths } : {}),
  })),
})

export function buildInventorySnapshot(
  cwd: string = process.cwd(),
  scanLimit?: number,
): InventorySnapshot {
  const result = taskInventory({ cwd, includeDone: true, scanLimit })
  const body = snapshotPayload(result)
  const contentUuid = computeContentUuid(body, 'erpax/agent/inventory')
  return { ...body, contentUuid }
}

export function emitInventorySnapshot(cwd: string = process.cwd(), scanLimit?: number): InventorySnapshot {
  const snapshot = buildInventorySnapshot(cwd, scanLimit)
  const out = join(cwd, INVENTORY_JSON_REL)
  const dir = dirname(out)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(out, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')
  console.log(
    `agent/inventory — emitted ${relative(cwd, out)} · active ${snapshot.activeCount} · stale ${snapshot.staleCount} · uuid ${snapshot.contentUuid.slice(0, 8)}…`,
  )
  return snapshot
}

if (import.meta.url === `file://${process.argv[1]}`) {
  emitInventorySnapshot()
}
