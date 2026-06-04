/**
 * schema-org — the type dimension's vocabulary, projected to JSON-LD (#1 of go-all).
 *
 * Strip the prefix and a node's `type` (the sti single-table-inheritance
 * discriminator) is a POSITION in schema.org's `Thing` hierarchy: one node hosts
 * the whole ~800-type graph (parent = `subClassOf`), properties are dimensions, and
 * its structured data is COMPUTED — `toJsonLd` emits `@context`/`@type`/`@id` from
 * the node's type + properties + content-uuid, with no per-type collection ([[all]]:
 * schema.org is the vocabulary of "anything"; [[collapse]]: the hierarchy collapses
 * to a parent-pointer; [[uuid]]: the @id IS the content-address). The SEO-friendly
 * frontend ([[duality]]: VitePress is the frontend matter) renders this as a
 * `<script type="application/ld+json">` — the typed, crawlable, endless surface.
 *
 * A representative CORE of the Thing tree is seeded here ("hold the law, not the
 * list" — the full vocabulary loads from schema.org's published JSON-LD); the
 * mechanism is total either way, and a blank/unknown type resolves to `Thing` (the
 * root, the identity element — every case defined).
 *
 * @standard schema.org (the universal type vocabulary; Thing + subClassOf)
 * @standard JSON-LD 1.1 W3C-REC (the structured-data serialization)
 */

/** A representative core of schema.org's Thing hierarchy: subtype → its direct supertype (subClassOf). */
export const SCHEMA_ORG_PARENT: Readonly<Record<string, string>> = {
  CreativeWork: 'Thing',
  Article: 'CreativeWork',
  WebPage: 'CreativeWork',
  WebSite: 'CreativeWork',
  Organization: 'Thing',
  Corporation: 'Organization',
  LocalBusiness: 'Organization',
  Person: 'Thing',
  Place: 'Thing',
  Event: 'Thing',
  Product: 'Thing',
  Intangible: 'Thing',
  Action: 'Thing',
  Service: 'Intangible',
  Offer: 'Intangible',
  Invoice: 'Intangible',
  Order: 'Intangible',
  MonetaryAmount: 'Intangible',
}

const SCHEMA_ORG_CONTEXT = 'https://schema.org'

/**
 * Walk `subClassOf`: is `t` a (transitive) subtype of `base`? `Thing` is the root,
 * so everything descends from it; an unknown type is treated as a direct `Thing`.
 */
export function isSubTypeOf(t: string, base: string): boolean {
  if (base === 'Thing') return true // the root — every type descends from Thing
  let cur = t || 'Thing'
  const seen = new Set<string>()
  while (!seen.has(cur)) {
    if (cur === base) return true
    seen.add(cur)
    cur = SCHEMA_ORG_PARENT[cur] ?? 'Thing'
  }
  return false
}

export interface TypedNode {
  /** the schema.org @type (the sti discriminator); blank/unknown ⇒ Thing (the identity element). */
  type?: string
  /** the node's properties (dimensions), emitted under the type. */
  props?: Record<string, unknown>
  /** the content-uuid — the @id the JSON-LD resolves to (the address IS the identity). */
  contentUuid?: string
}

export interface JsonLd {
  '@context': string
  '@type': string
  '@id'?: string
  [k: string]: unknown
}

/**
 * Project a typed node to schema.org JSON-LD. Properties are spread FIRST so the
 * reserved keys (`@context`/`@type`/`@id`) always win — a stray `@type` in props
 * can never hijack the node's identity. Pure + total: a blank type ⇒ `Thing`.
 */
export function toJsonLd(node: TypedNode): JsonLd {
  const type = (node.type ?? '').trim() || 'Thing'
  const ld: JsonLd = { ...(node.props ?? {}), '@context': SCHEMA_ORG_CONTEXT, '@type': type }
  if (node.contentUuid) ld['@id'] = node.contentUuid
  return ld
}
