/**
 * uuid-projection — the uuid singularity: ONE content projection radiates identity,
 * searchable text, per-locale content, and a deterministic colour. Everything that
 * needs to know "what a record is" derives from here, so they cannot disagree (DRY).
 *
 * content → projectContent → { computeContentUuid (identity), searchableText (search),
 *                              localeContent (locale), uuidColor (css) }
 *
 * @standard RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)
 * @standard CSS Color 4 hsl() (the colour facet)
 * @see src/services/integrity/content-uuid.ts — computeContentUuid / stripNonContentFields
 * @see src/services/multi-search/index.ts — should match searchableText, not a hand-listed field map
 */
import { computeContentUuid, stripNonContentFields } from '@/services/integrity'

// ─── the ONE content projection (shared by uuid · search · version · locale) ───

/** The canonical content of a record — storage-managed fields stripped. The single
 *  definition the uuid hashes, search indexes, a version snapshots, a locale varies. */
export function projectContent<T extends Record<string, unknown>>(record: T): Record<string, unknown> {
  return stripNonContentFields(record)
}

/** A Payload localized value: a plain object keyed only by locale codes (`en`, `bg`, `pt-BR`). */
function isLocaleObject(v: unknown): v is Record<string, unknown> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false
  const keys = Object.keys(v as object)
  return keys.length > 0 && keys.every((k) => /^[a-z]{2}(-[A-Za-z]{2,4})?$/.test(k))
}

/** Resolve a localized record to ONE locale — each `{en,bg,…}` field collapses to its locale
 *  value. A per-locale content ⇒ a per-locale uuid (locales kept in sync with the uuid). */
export function localeContent<T extends Record<string, unknown>>(record: T, locale: string): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(projectContent(record))) {
    out[k] = isLocaleObject(v) ? v[locale] : v
  }
  return out
}

// ─── search: derived from the SAME content (so search and identity never disagree) ───

/** Every string leaf of the content — the searchable text. Localized values contribute every
 *  locale, so a search finds a record in any language. This is what `multi-search` should match. */
export function searchableText(record: Record<string, unknown>): string {
  const parts: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') parts.push(v)
    else if (typeof v === 'number') parts.push(String(v))
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v as object).forEach(walk)
  }
  walk(projectContent(record))
  return parts.join(' ')
}

/** Does a record match a free-text query by its derived content? (case-insensitive substring). */
export function contentMatches(record: Record<string, unknown>, query: string): boolean {
  const q = query.trim().toLowerCase()
  return q.length > 0 && searchableText(record).toLowerCase().includes(q)
}

// ─── css: the uuid's visual facet (the multimodal colour) ───

/** Read the uuid's leading bytes as an HSL triple — deterministic, well-distributed, and kept
 *  in a readable band (vivid-not-neon saturation, mid lightness). The uuid's visual identity. */
export function uuidHsl(uuid: string): { h: number; s: number; l: number } {
  const hex = uuid.replace(/[^0-9a-fA-F]/g, '')
  const n = (start: number, len: number): number => parseInt(hex.slice(start, start + len) || '0', 16)
  return {
    h: n(0, 4) % 360, // hue from the first 2 bytes
    s: 55 + (n(4, 2) % 35), // saturation 55..89
    l: 38 + (n(6, 2) % 24), // lightness 38..61
  }
}

/** The uuid as a CSS colour string (`hsl(...)`). Same content ⇒ same colour, everywhere. */
export function uuidColor(uuid: string): string {
  const { h, s, l } = uuidHsl(uuid)
  return `hsl(${h} ${s}% ${l}%)`
}

/** The uuid as CSS custom properties — set on any element so its colour IS its identity. */
export function uuidCssVars(uuid: string): Record<string, string> {
  const { h, s, l } = uuidHsl(uuid)
  return { '--uuid-h': String(h), '--uuid-s': `${s}%`, '--uuid-l': `${l}%`, '--uuid-color': `hsl(${h} ${s}% ${l}%)` }
}

// ─── the singularity: content → uuid → { search, css } in one call ───

export interface UuidProjection {
  /** content-addressed identity ([[uuid]]). */
  readonly uuid: string
  /** the searchable text (multi-search), from the same content. */
  readonly searchText: string
  /** the deterministic colour (CSS), from the same uuid. */
  readonly color: string
  /** the colour as CSS custom properties. */
  readonly cssVars: Record<string, string>
}

/** Project a record through the uuid singularity: identity, searchable text, and visual facet,
 *  all derived from ONE content projection — DRY by construction, they cannot disagree. */
export function project<T extends Record<string, unknown>>(record: T, tenantId: string): UuidProjection {
  const uuid = computeContentUuid(record, tenantId) as string
  return { uuid, searchText: searchableText(record), color: uuidColor(uuid), cssVars: uuidCssVars(uuid) }
}
