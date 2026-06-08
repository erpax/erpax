/**
 * quantum/status — CLI surface for superposition pending paths and bond reciprocity.
 *
 *   pnpm erpax quantum status
 */
import { formatQuantumStatus, quantumStatus } from '@/quantum/context'

export function runQuantumStatus(): number {
  console.log(formatQuantumStatus(quantumStatus()))
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runQuantumStatus())
}
