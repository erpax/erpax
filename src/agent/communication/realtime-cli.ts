/**
 * agent/communication/realtime-cli — `pnpm erpax agent realtime`
 */
import { formatRealtimeChannelsReport } from './realtime'

export function runRealtimeCli(): number {
  console.log(formatRealtimeChannelsReport())
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runRealtimeCli())
}
