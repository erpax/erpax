/**
 * tag/list — port of acts_as_taggable_on's `TagList` + `DefaultParser`, the
 * TEXT↔TAGS bridge. A free-text label/category column ("a, b, c") is parsed
 * here into a clean, deduped, normalised name list; `setTagList` reconciles
 * that list into taggings; `toTagListString` renders it back for editing. This
 * is precisely how a text field is REPLACED by computed tags/taggings — the
 * string is the editable face, the taggings are the canonical, content-addressed
 * store ([[identity]]: same name ⇒ same tag id everywhere).
 *
 * Faithful to the gem's `DefaultParser#parse`: quoted tags (`"a,b"` / `'a,b'`)
 * are extracted FIRST so an embedded delimiter survives, then the remainder is
 * split on the delimiter (default `,`). `clean!` rejects blanks, trims, and
 * dedupes; erpax additionally lower-cases (the gem's `force_lowercase`) so each
 * tag's content-uuid is stable and matching is exact (D1 cannot case-fold — see
 * the `tags` collection's `beforeValidate`).
 *
 * Pure (no I/O) ⇒ trivially testable. `reconcileTags` is the pure diff at the
 * heart of `save_tags` — split out so the create/destroy decision is provable
 * without a database.
 *
 * @standard ISO-25964-1:2011 controlled-vocabulary delimited-entry
 * @see ./taggedWith.ts (read by tag) · ./setTagList.ts (write) · ../tags
 */

export interface TagListOptions {
  /** Delimiter(s) that separate tags; default ','. An array means "any of these". */
  readonly delimiter?: string | readonly string[]
  /** Lower-case every name so the content-uuid is stable (default true — the gem's force_lowercase). */
  readonly lowercase?: boolean
}

const DEFAULT_DELIMITER = ','

/** The primary delimiter (the "glue" used when serialising), first of the set. */
const glueOf = (delimiter: TagListOptions['delimiter']): string =>
  (Array.isArray(delimiter) ? delimiter[0] : (delimiter as string | undefined)) ?? DEFAULT_DELIMITER

/** A regex alternation matching any configured delimiter, each metachar-escaped. */
const delimiterPattern = (delimiter: TagListOptions['delimiter']): string => {
  const ds = Array.isArray(delimiter) ? delimiter : [delimiter ?? DEFAULT_DELIMITER]
  return ds.map((d) => String(d).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
}

/**
 * Clean a raw name list (port of `TagList#clean!`): trim, drop blanks,
 * lower-case (unless disabled), and dedupe case-insensitively — preserving
 * first-seen order.
 */
export function cleanTagNames(names: Iterable<string>, opts: TagListOptions = {}): string[] {
  const lower = opts.lowercase !== false
  const out: string[] = []
  const seen = new Set<string>()
  for (const raw of names) {
    if (typeof raw !== 'string') continue
    let n = raw.trim()
    if (!n) continue
    if (lower) n = n.toLowerCase()
    // Dedupe sensitivity tracks the lowercase flag (the gem's strict_case_match):
    // lower-cased names fold A/a together; otherwise they stay distinct.
    const key = n
    if (seen.has(key)) continue
    seen.add(key)
    out.push(n)
  }
  return out
}

/**
 * Parse a delimited, optionally-quoted string (or array) into a clean tag-name
 * list — the port of `DefaultParser#parse`. Quoted segments are lifted out
 * first so an embedded delimiter is kept verbatim; the rest is split on the
 * delimiter.
 */
export function parseTagList(
  input: string | readonly string[] | null | undefined,
  opts: TagListOptions = {},
): string[] {
  if (input == null) return []
  const glue = glueOf(opts.delimiter)
  let str = Array.isArray(input) ? input.join(`${glue} `) : String(input)
  const d = delimiterPattern(opts.delimiter)
  const names: string[] = []
  // Pull quoted tags out first (double then single), keeping embedded delimiters.
  const dq = new RegExp(`(?:^|${d})\\s*"(.*?)"\\s*(?=${d}\\s*|$)`, 'g')
  const sq = new RegExp(`(?:^|${d})\\s*'(.*?)'\\s*(?=${d}\\s*|$)`, 'g')
  str = str.replace(dq, (_m, g1: string) => { names.push(g1); return '' })
  str = str.replace(sq, (_m, g1: string) => { names.push(g1); return '' })
  // Split the remainder on the delimiter.
  for (const part of str.split(new RegExp(d))) names.push(part)
  return cleanTagNames(names, opts)
}

/**
 * Serialise a name list back to an editable string (port of `TagList#to_s`):
 * join with "<delimiter> ", quoting any name that itself contains the delimiter.
 */
export function toTagListString(names: Iterable<string>, opts: TagListOptions = {}): string {
  const glue = glueOf(opts.delimiter)
  const re = new RegExp(delimiterPattern(opts.delimiter))
  return cleanTagNames(names, opts)
    .map((n) => (re.test(n) ? `"${n}"` : n))
    .join(`${glue} `)
}

/**
 * The pure heart of `save_tags`: given the tags a record currently carries and
 * the tags it should carry, return which to ADD and which to REMOVE. Identity
 * by stringified id, so it works for numeric or uuid ids alike.
 */
export function reconcileTags<T extends string | number>(
  current: readonly T[],
  desired: readonly T[],
): { add: T[]; remove: T[] } {
  const cur = new Set(current.map(String))
  const des = new Set(desired.map(String))
  return {
    add: desired.filter((d) => !cur.has(String(d))),
    remove: current.filter((c) => !des.has(String(c))),
  }
}
