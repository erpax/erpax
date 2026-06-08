/**
 * computer/memory — holds working state; pivot to canonical @/memory/quantum plus
 * a bounded address-space model for read/write over indexed cells.
 *
 * Allocation/dedup remain content-addressed via quantum/memory; address space is
 * the operational facet agents use for bounded working memory.
 *
 * @see @/memory/quantum — ./SKILL.md
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import { LANDAUER_BIT } from '@/readme/entropy'

export { dedupHolds, allocateMemory } from '@/memory/quantum'

/** Bounded working-memory cells keyed by address index. */
export interface AddressSpace {
  readonly size: number
  readonly cells: ReadonlyMap<number, unknown>
}

export function createAddressSpace(size: number): AddressSpace {
  if (!Number.isInteger(size) || size < 0) throw new RangeError('address space size must be a non-negative integer')
  return { size, cells: new Map() }
}

export function inBounds(address: number, space: AddressSpace): boolean {
  return Number.isInteger(address) && address >= 0 && address < space.size
}

export function read(address: number, space: AddressSpace): unknown {
  if (!inBounds(address, space)) throw new RangeError(`address ${address} out of bounds [0, ${space.size})`)
  return space.cells.get(address)
}

export function write(address: number, value: unknown, space: AddressSpace): AddressSpace {
  if (!inBounds(address, space)) throw new RangeError(`address ${address} out of bounds [0, ${space.size})`)
  const cells = new Map(space.cells)
  cells.set(address, value)
  return { size: space.size, cells }
}

/** Landauer-scaled bit cost for one cell mutation (entropy-aware working set). */
export function writeCostBits(space: AddressSpace): number {
  return space.cells.size * LANDAUER_BIT
}

export function recordComputerMemoryOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/memory', { kind: 'computer.memory.step', payload }, at, prevEntryUuid, seq)
}
