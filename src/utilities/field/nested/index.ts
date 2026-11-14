/**
 * Read and write a dotted field path on a Payload document — see ./SKILL.md.
 *
 * @standard ISO/IEC 25010:2023 §5.6 maintainability (one truth, one address)
 */

/**
 * The value at `path`, or undefined if any segment is missing or not an object.
 * An EMPTY path is the document itself — `validate/address` relies on that, and
 * `''.split('.')` would otherwise look up a field literally named ''.
 */
export function readNested(obj: Record<string, unknown>, path: string): unknown {
  if (path === '') return obj
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[key]
  }
  return cur
}

/** The segments that reach the prototype instead of a field. A path carrying one is refused, never written. */
const PROTOTYPE_KEYS: ReadonlySet<string> = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Set `path`. By default a missing or non-object parent is created as a plain object; with
 * `create: false` the write stops there instead (an array parent counts as "not an object" too), so a
 * caller coercing an existing document never invents structure. Three atoms carried this body — the
 * factory's aggregates, the media importer and this one — and all three let `__proto__` through
 * (CodeQL `js/prototype-pollution-utility`); one body, one refusal.
 */
export function writeNested(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
  opts: { readonly create?: boolean } = {},
): void {
  const create = opts.create ?? true
  const parts = path.split('.')
  for (const k of parts) {
    if (PROTOTYPE_KEYS.has(k)) throw new Error(`field/nested: refusing to write through \`${k}\` in path "${path}"`)
  }
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!
    const next = cur[k]
    if (next === null || typeof next !== 'object' || (!create && Array.isArray(next))) {
      if (!create) return
      cur[k] = {}
    }
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = value
}
