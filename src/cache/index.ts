/**
 * cache — a pure keyed store: get / set / has over a Map. The quantum facet ([[quantum]]/cache)
 * keys by content-uuid — the content IS its own key, so the same content is always a hit (dedup by
 * design, no cache-invalidation bug). Composes [[storage]] · [[key]].
 *
 *   tsx src/cache/index.ts
 *
 * @see ../storage -- ../key -- ../quantum/cache -- ./SKILL.md
 */
export interface Cache<V> {
  get(key: string): V | undefined
  set(key: string, value: V): void
  has(key: string): boolean
  size(): number
}

/** A fresh in-memory cache (pure factory; deterministic given the same calls). */
export const cache = <V>(): Cache<V> => {
  const m = new Map<string, V>()
  return {
    get: (k) => m.get(k),
    set: (k, v) => {
      m.set(k, v)
    },
    has: (k) => m.has(k),
    size: () => m.size,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = cache<number>()
  c.set('a', 1)
  console.log('cache — has("a")=' + c.has('a') + ' get("a")=' + c.get('a') + ' size=' + c.size())
}
