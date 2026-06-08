/**
 * computer/stack — LIFO stack (last-in first-out) for call frames and undo under the machine.
 *
 * Distinct from top-level @/stack (deployment round-trip palindrome); this is the
 * classic CS data structure nested under [[computer]].
 *
 * @see ../memory — ../processor
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Mutable LIFO stack — push/pop at the top. */
export class LifoStack<T> {
  private readonly items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  get size(): number {
    return this.items.length
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  toArray(): readonly T[] {
    return [...this.items]
  }
}

export function recordComputerStackOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/stack', { kind: 'computer.stack.step', payload }, at, prevEntryUuid, seq)
}
