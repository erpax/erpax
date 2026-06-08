/**
 * agent/inventory/cli — `pnpm erpax agent inventory`
 */
import { inventoryReport } from './index'
import { emitInventorySnapshot } from './emit'

export function runAgentInventory(argv: readonly string[] = process.argv.slice(2)): number {
  const emit = argv.includes('--emit')
  const includeDone = argv.includes('--all')
  console.log(inventoryReport({ includeDone, heading: 'erpax agent inventory — full report' }))
  if (emit) emitInventorySnapshot()
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runAgentInventory())
}
