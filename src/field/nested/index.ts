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

/** Set `path`, creating plain-object parents for any segment that is missing or not an object. */
export function writeNested(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!
    const next = cur[k]
    if (next === null || typeof next !== 'object') cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = value
}
