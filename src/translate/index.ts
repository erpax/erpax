/**
 * translate — compute i18n keys and HUMANIZE them into default labels, and
 * enforce the strict singular-model / plural-collection matrix.
 *
 * Keys come from the `translation` MODEL (Translation.key — `name`, `description`,
 * `label.singular`, `scope:event`) harvested across the corpus (@/i18n/harvest);
 * `humanize` turns each computed key into a human-readable default label. These
 * defaults populate the `translations` COLLECTION dropdown, where a per-locale
 * value OVERWRITES the humanized default. Resolution order: DB override >
 * humanized default > raw key. Computed, not hardcoded — a new field or message
 * yields a new key + label at zero cost, no rebuild.
 *
 * The same naming transform enforces the STRICT singular/plural matrix: a model is
 * singular, its collection the plural (`translation` ↔ `translations`). That matrix
 * is itself a tamper-cost dimension — every model/collection pair wired by the rule
 * is one more computed binding a forgery must re-harmonise with (the one law).
 *
 * Pure string transforms, zero dependencies — green by construction.
 *
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags
 * @see @/translation (model) · @/translations (collection) · @/i18n/harvest · ./SKILL.md
 */

/** Split a key into its words: scope/dot/slash/kebab/snake delimiters + camelCase boundaries. */
function wordsOf(key: string): string[] {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s:._\-/]+/)
    .filter(Boolean)
}

/** Humanize a computed key into a default label — Title Case, e.g. `label.singular` → "Label Singular". */
export function humanize(key: string): string {
  return wordsOf(key)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** One dropdown entry: the raw key (the value stored) + its humanized default label. */
export interface KeyLabel {
  readonly key: string
  readonly label: string
}

/** Compute the dropdown entries from a set of keys — deduped, each with its humanized default. */
export function computeKeyLabels(keys: readonly string[]): KeyLabel[] {
  return [...new Set(keys)].map((key) => ({ key, label: humanize(key) }))
}

/** Payload select options for the translations dropdown: { label: humanized, value: key }. */
export function dropdownOptions(keys: readonly string[]): ReadonlyArray<{ label: string; value: string }> {
  return computeKeyLabels(keys).map(({ key, label }) => ({ label, value: key }))
}

/** Resolve the displayed value: the DB override wins, else the humanized default (never the raw key). */
export function resolveLabel(key: string, override?: string | null): string {
  return override != null && override.trim() !== '' ? override : humanize(key)
}

// ── the strict singular-model / plural-collection matrix ──

/** Pluralize a singular model name (English: consonant+y→ies, s/x/z/ch/sh→es, else +s). */
export function pluralOf(singular: string): string {
  if (/[^aeiou]y$/i.test(singular)) return singular.slice(0, -1) + 'ies'
  if (/(s|x|z|ch|sh)$/i.test(singular)) return singular + 'es'
  return singular + 's'
}

/** Singularize a plural collection slug (best-effort inverse of pluralOf). */
export function singularOf(plural: string): string {
  if (/ies$/i.test(plural)) return plural.slice(0, -3) + 'y'
  if (/(ses|xes|zes|ches|shes)$/i.test(plural)) return plural.slice(0, -2)
  if (/s$/i.test(plural)) return plural.slice(0, -1)
  return plural
}

/** The strict matrix law: a collection slug is exactly the plural of its model name. */
export function isStrictPair(model: string, collection: string): boolean {
  return pluralOf(model) === collection
}
