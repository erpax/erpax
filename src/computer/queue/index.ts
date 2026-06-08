/**
 * computer/queue — FIFO queue (first-in first-out) for ordered work under the machine model.
 *
 * Distinct from the top-level @/queue vocabulary atom (support tickets); this is
 * executable CS matter nested under [[computer]].
 *
 * @see ../processor — ../algorithm
 */
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Mutable FIFO queue — enqueue at tail, dequeue from head. */
export class FifoQueue<T> {
  private readonly items: T[] = []

  enqueue(item: T): void {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  peek(): T | undefined {
    return this.items[0]
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

export function recordComputerQueueOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('computer/queue', { kind: 'computer.queue.step', payload }, at, prevEntryUuid, seq)
}
