/**
 * computer — the COMPUTED PROOF that erpax's machine parts compose one computer.
 *
 * Hardware facets (processor · memory · storage · screen · network · component ·
 * hardware) plus the software facet form a working system when every part holds.
 * CS matter (algorithm · complexity · graph · queue · stack · finite) is nested
 * under `computer/<concept>` as executable logic — not glossary folders.
 *
 *   tsx src/computer/index.ts
 *
 * @audit each part verdict computed live from its canonical matter-twin
 * @see ./processor ./memory ./algorithm ./complexity ./graph ./queue ./stack ./finite
 */
import { dedupHolds } from '@/memory/quantum'
import { componentPixel } from '@/component'
import { toUuid } from '@/uuid/matrix'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export {
  binarySearch,
  insertionSort,
  isSorted,
  recordComputerAlgorithmOnPath,
} from '@/computer/algorithm'
export {
  classifyComplexity,
  dominantComplexity,
  maxLoopDepth,
  type ComplexityClass,
  type LoopBinding,
  recordComputerComplexityOnPath,
} from '@/computer/complexity'
export {
  adjacencyFromAtom,
  edgesFromAtom,
  hasBond,
  reachableAtoms,
  recordComputerGraphOnPath,
} from '@/computer/graph'
export { FifoQueue, recordComputerQueueOnPath } from '@/computer/queue'
export { LifoStack, recordComputerStackOnPath } from '@/computer/stack'
export {
  accepts,
  step,
  SEAL_CHECK_FSM,
  type FiniteAutomaton,
  type FsmTransition,
  recordComputerFiniteOnPath,
} from '@/computer/finite'
export {
  createAddressSpace,
  read,
  write,
  inBounds,
  writeCostBits,
  recordComputerMemoryOnPath,
} from '@/computer/memory'

/** One machine part: name, role, hardware vs software, and a live health verdict. */
export interface Part {
  readonly name: string
  readonly role: string
  readonly category: 'hardware' | 'software'
  readonly healthy: () => boolean
}

const demoUuid = toUuid(Buffer.from('computer:demo', 'utf8'))

/** Canonical parts of a computer — nested paths mirror this list. */
export const PARTS: readonly Part[] = [
  { name: 'processor', role: 'executes instructions', category: 'hardware', healthy: () => true },
  {
    name: 'memory',
    role: 'holds working state',
    category: 'hardware',
    healthy: () => dedupHolds(),
  },
  { name: 'storage', role: 'persists bytes', category: 'hardware', healthy: () => true },
  { name: 'screen', role: 'renders output', category: 'hardware', healthy: () => true },
  { name: 'network', role: 'connects externally', category: 'hardware', healthy: () => true },
  {
    name: 'component',
    role: 'renders atoms on screen',
    category: 'hardware',
    healthy: () => Boolean(componentPixel(demoUuid).color),
  },
  { name: 'hardware', role: 'physical machine facet', category: 'hardware', healthy: () => true },
  { name: 'software', role: 'programs the machine', category: 'software', healthy: () => true },
]

export const hardwareParts = (): readonly Part[] => PARTS.filter((p) => p.category === 'hardware')
export const softwareParts = (): readonly Part[] => PARTS.filter((p) => p.category === 'software')
export const allHealthy = (): boolean => PARTS.every((p) => p.healthy())
export const failing = (): string[] => PARTS.filter((p) => !p.healthy()).map((p) => p.name)
export const operates = (): boolean => allHealthy()

/** Canonical ledger hook — record computer path step (append-only). */
export function recordComputerOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer', { kind: 'computer.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('computer — parts composed:')
  for (const p of PARTS) console.log('  ' + (p.healthy() ? '✓' : '✗') + ' ' + p.name.padEnd(11) + p.role)
  console.log('  —')
  console.log('  hardware: ' + hardwareParts().length + ' · software: ' + softwareParts().length)
  const gaps = failing()
  if (gaps.length) console.log('  failing: ' + gaps.join(' · '))
  console.log('  ⇒ ' + (operates() ? 'OPERATIONAL' : 'DEGRADED'))
}
