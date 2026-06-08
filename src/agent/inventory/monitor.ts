/**
 * agent/inventory/monitor — `pnpm erpax monitor inventory` (push · violations toast).
 */
import {
  bindWatchRealtime,
  emitInventoryStalePush,
  inventoryWatchPath,
  improveDirectionPath,
} from '@/agent/communication/realtime'
import { pushCrossViolationToStream } from '@/monitor/violations/stream'
import { taskInventory, INVENTORY_STALE_AFTER_SEC } from './index'
import { emitInventorySnapshot } from './emit'

const POLL_MS = 5 * 60 * 1000

export function inventoryMonitorTick(cwd: string = process.cwd()): {
  readonly staleCount: number
  readonly emitted: boolean
} {
  const result = taskInventory({ cwd, includeDone: false })
  emitInventorySnapshot(cwd)
  emitInventoryStalePush(result)
  if (result.staleCount > 0) {
    pushCrossViolationToStream({
      id: `inventory-stale-${Date.now()}`,
      atomPath: 'agent/inventory',
      accountCode: 'agent/inventory',
      detail: `${result.staleCount} stale subagent(s) — resume batch commit or publishDirection abort`,
      severity: 'warning',
      scannedAt: result.scannedAt,
      crossDimension: 'trinity',
      crossEducation: 'Inventory is automatic; coordinator reads erpax agent inventory before delegating.',
      uncrossedAxes: ['agent-queue'],
      origin: 'scan',
      gate: 'inventory',
    })
  }
  return { staleCount: result.staleCount, emitted: result.staleCount > 0 }
}

export function runInventoryMonitor(watch = true, cwd: string = process.cwd()): number {
  const tick = (): void => {
    const { staleCount } = inventoryMonitorTick(cwd)
    const msg =
      staleCount > 0
        ? `monitor inventory — ${staleCount} stale (>${INVENTORY_STALE_AFTER_SEC / 60}min idle)`
        : 'monitor inventory — ok'
    console.log(`${new Date().toISOString()} ${msg}`)
  }
  tick()
  if (!watch) return 0
  bindWatchRealtime({
    paths: [inventoryWatchPath(), improveDirectionPath()],
    onSignal: tick,
    pollMs: POLL_MS,
  })
  process.on('SIGINT', () => {
    process.stderr.write('\nmonitor inventory — stopped\n')
    process.exit(0)
  })
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const once = process.argv.includes('--once')
  process.exit(runInventoryMonitor(!once))
}
