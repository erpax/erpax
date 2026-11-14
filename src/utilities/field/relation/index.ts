/**
 * The id inside a Payload relationship value — see ./SKILL.md.
 *
 * A relationship arrives as the raw id when unpopulated and as the whole document when populated;
 * a POLYMORPHIC one arrives as `{ relationTo, value }` instead. Six call sites each wrote this,
 * in three variants with three different answers for the same input.
 */

/** The id of a monomorphic relationship — the raw scalar, or the `id` of a populated document. */
export function relationId(v: unknown): string | number | undefined {
  if (typeof v === 'string' || typeof v === 'number') return v
  if (v && typeof v === 'object' && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }
  return undefined
}

/** The same id rendered as a string — for callers keying a Map or comparing to a stored string. */
export const relationIdString = (v: unknown): string | undefined => {
  const id = relationId(v)
  return id === undefined ? undefined : String(id)
}

/**
 * The id of a POLYMORPHIC relationship — `{ relationTo, value }`. Falls back to `id` so a value
 * that arrives populated still resolves, and returns null rather than undefined because the
 * callers that need this shape store the absence.
 */
export function polymorphicId(v: unknown): string | number | null {
  if (v == null) return null
  if (typeof v === 'object') {
    const o = v as { value?: string | number; id?: string | number }
    return o.value ?? o.id ?? null
  }
  return v as string | number
}
