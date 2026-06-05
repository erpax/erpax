/**
 * memory — an in-memory `PayloadLike` for executing the research-society wiring WITHOUT
 * booting Payload. It satisfies the same narrow contract the real Local API does
 * (find({ where:{ field:{ equals }}}) + create), so the unit test and the `--demo`
 * runner share one fake (DRY) and the production path swaps in the real `payload`
 * unchanged. The store is content-naive on purpose — idempotency lives in the wiring
 * (find-by-email/domain), not here.
 */
import type { PayloadCreateArgs, PayloadFindArgs, PayloadLike } from '@/agent/research'

interface Row {
  id: string
  [key: string]: unknown
}

/** Match a row against a Payload `where` of the shape `{ field: { equals: value } }`. */
const matchEquals = (row: Row, where: unknown): boolean => {
  if (!where || typeof where !== 'object') return true
  for (const [field, cond] of Object.entries(where as Record<string, unknown>)) {
    const equals = (cond as { equals?: unknown } | null)?.equals
    if (equals !== undefined && row[field] !== equals) return false
  }
  return true
}

export interface MemoryPayload extends PayloadLike {
  /** Inspect the whole store (test/demo only). */
  dump(): Record<string, Row[]>
}

/** Build a fresh in-memory PayloadLike with monotonic ids per collection. */
export function createMemoryPayload(): MemoryPayload {
  const store = new Map<string, Row[]>()
  let seq = 0
  const col = (collection: string): Row[] => {
    const existing = store.get(collection)
    if (existing) return existing
    const fresh: Row[] = []
    store.set(collection, fresh)
    return fresh
  }
  return {
    find(args: PayloadFindArgs) {
      const all = col(args.collection).filter((r) => matchEquals(r, args.where))
      const docs = args.limit ? all.slice(0, args.limit) : all
      return Promise.resolve({ docs, totalDocs: all.length })
    },
    create(args: PayloadCreateArgs) {
      seq += 1
      const row: Row = { id: `${args.collection}_${seq}`, ...args.data }
      col(args.collection).push(row)
      return Promise.resolve({ id: row.id })
    },
    dump() {
      return Object.fromEntries(store)
    },
  }
}
