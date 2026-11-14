/**
 * relation — a Payload relationship is a value OR the row it points at. This reads its id, once.
 *
 * Payload resolves a relationship field to one of three shapes depending on `depth`: the raw id (`string` |
 * `number`), or the populated document (`{ id, … }`). Every consumer that wants the id has to collapse those
 * three into one, and in erpax every consumer did — the same eight lines, hand-written, in five hook files:
 * payroll-disbursement · payroll-run · period-end-adjustment · inventory-movement · lease-period-posting.
 *
 * They were byte-identical, which is how they were found: content-addressing every function body in `src`
 * collapses copies by construction — same content, same address ([[merge]]). That is the fold pointed at the
 * corpus itself, and it is the only duplication evidence that cannot be argued with.
 *
 * HONEST BOUNDARY — this folds the five the fold PROVED identical, and no more. At least six near-variants
 * exist (sale/validate-fiscal-refs · sale/receipt-subscriber · sale/submit-audit-file · sale/operator-code ·
 * journal/entry/service · nist/incits/359/predicates) and they are NOT interchangeable: some return
 * `String(v ?? '')`, an empty string where this returns `undefined`. Same idea, different answer on the empty
 * case, and a caller branching on falsy vs undefined behaves differently. Sweeping them together would be a
 * behaviour change wearing a refactor's clothes. Content-addressing finds COPIES; it does not find CONCEPTS,
 * and the concept here is duplicated about eleven times.
 *
 * Composes [[merge]] · [[law]].
 */

/** Canonical atom path. */
export const atomPath = 'relation' as const

/**
 * The id a relationship points at, whatever depth Payload resolved it to.
 *
 * @invariant a populated doc and its raw id yield the SAME id — depth must not change identity
 * @invariant absent ⇒ undefined, never a falsy id — a caller cannot tell '' from "no relation"
 */
export function idOf(v: unknown): string | undefined {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (id !== undefined) return String(id)
  }
  return undefined
}
