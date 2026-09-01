/** computer/quantum — the double-wire reciprocal of [[quantum]]/computer: from the computer atom, the quantum machine is one hop. */
export {
  quantumComputerCensus,
  type QuantumComputerCensus,
  meshOf,
  wavesOf,
  reduce,
  timeoutOf,
  failureRoots,
  costRoots,
  planScalpel,
  auditWaves,
} from '@/quantum/computer'
export const atomPath = 'computer/quantum' as const

/** @index-cross.foldback child=computer/quantum parent=computer — this cross folds back into its parent. */
