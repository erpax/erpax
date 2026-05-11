/**
 * Polling store for `useSyncExternalStore` — Slice LLLLLLLLLL (2026-05-11).
 *
 * React 19's `react-hooks/set-state-in-effect` rule rejects the
 * setInterval-in-useEffect-with-setState pattern because the effect
 * body indirectly triggers setState. The CANONICAL React 19 approach
 * is to subscribe to an external store via `useSyncExternalStore` —
 * the store IS the external system, setState happens outside any
 * effect graph, and the lint rule is satisfied because there's no
 * setState in any effect.
 *
 * This module ships a small generic polling store factory used by the
 * MCP admin dashboards (`ConsistencyStatus`, `TranslationsEditor`).
 *
 * @standard React 19 useSyncExternalStore contract
 * @standard W3C Server-Sent Events (logical equivalent for polling)
 * @rfc 9110 HTTP/1.1 — for the underlying fetch semantics
 */

export interface PollingSnapshot<T> {
  readonly data: T | null
  readonly error: string | null
  readonly refreshing: boolean
}

export interface PollingStore<T> {
  /** React `useSyncExternalStore`-compatible subscribe. */
  subscribe(listener: () => void): () => void
  /** React `useSyncExternalStore`-compatible getSnapshot — stable identity per state. */
  getSnapshot(): PollingSnapshot<T>
  /** SSR snapshot — always the empty/idle state. */
  getServerSnapshot(): PollingSnapshot<T>
  /** Trigger an out-of-band refetch (e.g. after a manual mutation). */
  refetch(): Promise<void>
}

/**
 * Create an on-demand store keyed by an arbitrary cache key + fetcher.
 * Stores are cached per cache-key so unmount/remount keeps the data
 * until explicit refetch. No interval timer — call `refetch()` to
 * refresh.
 */
const onDemandCache = new Map<string, PollingStore<unknown>>()

export function createOnDemandStore<T>(cacheKey: string, fetcher: () => Promise<T>): PollingStore<T> {
  const existing = onDemandCache.get(cacheKey)
  if (existing) return existing as PollingStore<T>

  const idleSnapshot: PollingSnapshot<T> = { data: null, error: null, refreshing: false }
  let snapshot: PollingSnapshot<T> = idleSnapshot
  const listeners = new Set<() => void>()

  const update = (next: PollingSnapshot<T>): void => {
    snapshot = next
    for (const fn of listeners) fn()
  }

  const tick = async (): Promise<void> => {
    update({ ...snapshot, refreshing: true })
    try {
      const body = await fetcher()
      update({ data: body, error: null, refreshing: false })
    } catch (e) {
      update({
        ...snapshot,
        error: e instanceof Error ? e.message : String(e),
        refreshing: false,
      })
    }
  }

  const store: PollingStore<T> = {
    subscribe(listener) {
      listeners.add(listener)
      if (listeners.size === 1 && snapshot.data === null && snapshot.error === null) {
        void tick()
      }
      return () => { listeners.delete(listener) }
    },
    getSnapshot() { return snapshot },
    getServerSnapshot() { return idleSnapshot },
    refetch() { return tick() },
  }
  onDemandCache.set(cacheKey, store as PollingStore<unknown>)
  return store
}

/**
 * Create a polling store. Polling starts on first subscribe + stops
 * when the listener count drops to zero. Snapshot identity changes
 * only when a state transition occurs, so consumers don't render-loop.
 */
export function createPollingStore<T>(url: string, intervalMs: number): PollingStore<T> {
  const idleSnapshot: PollingSnapshot<T> = { data: null, error: null, refreshing: false }
  let snapshot: PollingSnapshot<T> = idleSnapshot
  const listeners = new Set<() => void>()
  let timer: ReturnType<typeof setInterval> | null = null
  let cancelled = false

  const update = (next: PollingSnapshot<T>): void => {
    snapshot = next
    for (const fn of listeners) fn()
  }

  const tick = async (): Promise<void> => {
    if (cancelled) return
    update({ ...snapshot, refreshing: true })
    try {
      const res = await fetch(url, { credentials: 'include' })
      if (cancelled) return
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const body = (await res.json()) as T
      if (cancelled) return
      update({ data: body, error: null, refreshing: false })
    } catch (e) {
      if (cancelled) return
      update({
        ...snapshot,
        error: e instanceof Error ? e.message : String(e),
        refreshing: false,
      })
    }
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      if (listeners.size === 1) {
        cancelled = false
        void tick()
        timer = setInterval(() => { void tick() }, intervalMs)
      }
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && timer !== null) {
          cancelled = true
          clearInterval(timer)
          timer = null
        }
      }
    },
    getSnapshot() { return snapshot },
    getServerSnapshot() { return idleSnapshot },
    refetch() { return tick() },
  }
}
