/**
 * safely — the error-handling / fallback axis as a reusable primitive.
 *
 * The architecture's FALLBACK axis (services/architecture-invariants, AXIS 4) requires
 * every external dependency to degrade gracefully: return a typed `{ ok, error }`
 * envelope, NEVER throw (the same shape callWorkersAi already returns). `safely` wraps
 * ANY op in that contract — on failure it returns a defined fallback (the identity
 * element: "every state defined", the totality law) — so a skill that wires it
 * self-heals: a failing dependency degrades to a known value and the organism keeps
 * flowing instead of crashing. Wire error handling into the skills and they know to handle.
 *
 * Pure control-flow primitive — no IO of its own.
 *
 * @standard ISO/IEC 25010 §5.5 testability + §5.8 fault-tolerance (graceful degradation)
 */

export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string; readonly fallback: T }

const messageOf = (e: unknown): string => (e instanceof Error ? e.message : String(e))

/** Run an async op under the never-throw contract; on throw, return the typed error + fallback. */
export async function safely<T>(
  fn: () => T | Promise<T>,
  fallback: T,
  onError?: (e: unknown) => string,
): Promise<Result<T>> {
  try {
    return { ok: true, value: await fn() }
  } catch (e) {
    return { ok: false, error: onError ? onError(e) : messageOf(e), fallback }
  }
}

/** Synchronous twin of {@link safely}. */
export function safelySync<T>(fn: () => T, fallback: T, onError?: (e: unknown) => string): Result<T> {
  try {
    return { ok: true, value: fn() }
  } catch (e) {
    return { ok: false, error: onError ? onError(e) : messageOf(e), fallback }
  }
}

/** The never-throw read: the value on success, the fallback on failure — every case defined. */
export function valueOf<T>(r: Result<T>): T {
  return r.ok ? r.value : r.fallback
}
