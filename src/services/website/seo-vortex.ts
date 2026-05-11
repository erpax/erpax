/**
 * SEO-as-vortices — Slice NNNNNN (2026-05-11).
 *
 * Per user 'erpax seo strategy is microdata og vortices indexed and
 * linked in time interacting with each other'. SEO is not
 * metadata-on-pages; it's a coupled vortex system parallel to the
 * 10 architectural vortices.
 *
 * Each PageSeed becomes an SEO vortex face with:
 *   - Schema.org JSON-LD carrying isPartOf / mentions / cites /
 *     derivedFrom edges to every related page (citation graph)
 *   - Open Graph triples (og:type, og:image, og:updated_time) so
 *     federation peers ingest the right preview card
 *   - Bitemporal indexing — content uuid changes trigger 301
 *     redirects + og:updated_time updates so search engines + peers
 *     see the temporal evolution
 *   - <link rel="alternate" hreflang="<locale>"> for every supported
 *     locale (Law 3 i18n applied to crawlability)
 *   - Sitemap.xml entries derived from the live spec corpus
 *
 * Conservation Law 29 — `checkSeoVortexCoupling`: every published
 * page has >=2 inbound + >=2 outbound Schema.org microdata edges.
 * Isolated pages dilute the SEO vortex; the platform refuses to
 * publish them without explicit override (e.g. a brand-new entity
 * that hasn't accumulated citers yet uses scope:'pending-coupling').
 *
 * @standard Schema.org WebPage + Article + SoftwareApplication +
 *           Organization + Dataset + Action
 * @standard Open Graph protocol (Facebook 2010+) + Twitter Cards
 * @standard W3C JSON-LD 1.1 + Microdata 1.1
 * @standard Sitemap.xml protocol 0.9 (sitemaps.org) + Sitemap-Index
 * @standard RFC 9694 robots.txt + REP (Robots Exclusion Protocol)
 * @standard ISO/IEC 25010:2023 §5.3 usability — discoverability
 * @audit ISO 19011:2018 §6.4.6 (every published SEO artefact audit-trailed)
 */

export type SchemaType =
  | 'WebPage' | 'Article' | 'SoftwareApplication' | 'Organization'
  | 'Dataset' | 'Action' | 'TechArticle' | 'CreativeWork' | 'CollectionPage'

export type OgType = 'website' | 'article' | 'product' | 'profile' | 'video'

export interface SchemaEdge {
  readonly relation: 'isPartOf' | 'mentions' | 'cites' | 'derivedFrom' | 'subjectOf' | 'workExample' | 'hasPart'
  readonly targetUrl: string
  readonly targetType: SchemaType
  readonly targetName: string
}

export interface SeoVortexFace {
  readonly url: string                          // canonical URL
  readonly title: string
  readonly description: string
  readonly schemaType: SchemaType
  readonly ogType: OgType
  readonly ogImage?: string
  readonly ogUpdatedTime: string                // ISO 8601 — bitemporal anchor
  readonly contentUuid: string                  // Law 8 — for bitemporal redirects
  readonly previousContentUuids: ReadonlyArray<string>  // historical uuids → 301
  readonly hreflang: ReadonlyArray<{ locale: string; url: string }>
  readonly outgoing: ReadonlyArray<SchemaEdge>
  readonly incoming: ReadonlyArray<SchemaEdge>  // populated by crossLink()
  readonly axisHint?: 'collection' | 'chain' | 'agent' | 'role' | 'standard' | 'walkthrough'
}

const FACES_BY_URL = new Map<string, SeoVortexFace>()

export function registerFace(face: SeoVortexFace): void {
  FACES_BY_URL.set(face.url, face)
}

export function getFace(url: string): SeoVortexFace | undefined {
  return FACES_BY_URL.get(url)
}

export function listFaces(): ReadonlyArray<SeoVortexFace> {
  return [...FACES_BY_URL.values()]
}

/**
 * Build the citation graph between faces — every outgoing edge
 * automatically becomes the corresponding incoming edge on the
 * target. Run after all faces are registered. Required for Law 29.
 */
export function crossLink(): { facesLinked: number; totalEdges: number } {
  let totalEdges = 0
  // Reset incoming edges to recompute from scratch.
  for (const face of FACES_BY_URL.values()) {
    FACES_BY_URL.set(face.url, { ...face, incoming: [] })
  }
  for (const face of FACES_BY_URL.values()) {
    for (const out of face.outgoing) {
      const target = FACES_BY_URL.get(out.targetUrl)
      if (!target) continue
      FACES_BY_URL.set(target.url, {
        ...target,
        incoming: [
          ...target.incoming,
          { relation: out.relation, targetUrl: face.url, targetType: face.schemaType, targetName: face.title },
        ],
      })
      totalEdges++
    }
  }
  return { facesLinked: FACES_BY_URL.size, totalEdges }
}

/** Render the JSON-LD <script> for a face. */
export function renderJsonLd(face: SeoVortexFace): string {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': face.schemaType,
    name: face.title,
    description: face.description,
    url: face.url,
    dateModified: face.ogUpdatedTime,
    inLanguage: face.hreflang.map((h) => h.locale),
  }
  if (face.ogImage) ld.image = face.ogImage
  // Schema.org cross-links — the SEO vortex coupling.
  for (const out of face.outgoing) {
    const key = out.relation
    const link = { '@id': out.targetUrl, '@type': out.targetType, name: out.targetName }
    const existing = ld[key]
    if (Array.isArray(existing)) (existing as unknown[]).push(link)
    else if (existing) ld[key] = [existing, link]
    else ld[key] = link
  }
  return `<script type="application/ld+json">${JSON.stringify(ld)}</script>`
}

/** Render Open Graph + Twitter + alternate hreflang <meta> tags for a face. */
export function renderOgMeta(face: SeoVortexFace): string {
  const tags: string[] = [
    `<meta property="og:type" content="${face.ogType}" />`,
    `<meta property="og:title" content="${face.title}" />`,
    `<meta property="og:description" content="${face.description}" />`,
    `<meta property="og:url" content="${face.url}" />`,
    `<meta property="og:updated_time" content="${face.ogUpdatedTime}" />`,
    `<meta name="twitter:card" content="${face.ogImage ? 'summary_large_image' : 'summary'}" />`,
  ]
  if (face.ogImage) tags.push(`<meta property="og:image" content="${face.ogImage}" />`)
  for (const h of face.hreflang) {
    tags.push(`<link rel="alternate" hreflang="${h.locale}" href="${h.url}" />`)
  }
  // Bitemporal redirects emitted as <link rel="canonical"> so historical
  // uuids resolve to the current page (also emit 301s at the HTTP layer).
  for (const oldUuid of face.previousContentUuids.slice(0, 5)) {
    tags.push(`<link rel="alternate" type="application/erpax-uuid" href="urn:erpax:content:${oldUuid}" />`)
  }
  return tags.join('\n')
}

/** Render sitemap.xml for every registered face. */
export function generateSitemap(siteOrigin: string): string {
  const urls = [...FACES_BY_URL.values()].map((face) => {
    const alts = face.hreflang.map((h) =>
      `    <xhtml:link rel="alternate" hreflang="${h.locale}" href="${h.url}" />`
    ).join('\n')
    return `  <url>
    <loc>${face.url}</loc>
    <lastmod>${face.ogUpdatedTime.slice(0, 10)}</lastmod>
${alts}
  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

/** Render robots.txt that exposes audit-trail discoverability. */
export function generateRobots(siteOrigin: string): string {
  return `# ERPax robots.txt — transparency strategy (slice MMMMMM)
# Conservation laws are public; audit trail is crawlable.
User-agent: *
Allow: /
Allow: /spec/
Allow: /chains/
Allow: /agents/
Allow: /standards/
Allow: /audit/
Disallow: /admin/
Disallow: /api/internal/
Sitemap: ${siteOrigin}/sitemap.xml

# AI-training crawlers — opt them in to the public surface (CCCCCC standards-as-live-objects).
User-agent: ClaudeBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
`
}

/**
 * Conservation Law 29 — `checkSeoVortexCoupling`. Every published
 * face must have ≥2 inbound + ≥2 outbound microdata edges. Isolated
 * pages dilute the vortex; refuse to publish without explicit
 * override. Run after `crossLink()`.
 */
export interface SeoCouplingResult {
  readonly ok: boolean
  readonly underCoupled: ReadonlyArray<{ url: string; outgoing: number; incoming: number }>
}

export function checkSeoVortexCoupling(minDegree = 2): SeoCouplingResult {
  const underCoupled: { url: string; outgoing: number; incoming: number }[] = []
  for (const face of FACES_BY_URL.values()) {
    if (face.outgoing.length < minDegree || face.incoming.length < minDegree) {
      underCoupled.push({ url: face.url, outgoing: face.outgoing.length, incoming: face.incoming.length })
    }
  }
  return { ok: underCoupled.length === 0, underCoupled }
}

/**
 * When a page's content-uuid changes, register the old uuid so
 * future requests to the old URL emit a 301 to the canonical URL.
 * Bitemporal SEO — search engines see the evolution.
 */
export function bitemporalAnchor(args: { url: string; oldUuid: string; newUuid: string }): SeoVortexFace | null {
  const face = FACES_BY_URL.get(args.url); if (!face) return null
  if (face.contentUuid === args.newUuid && face.previousContentUuids.includes(args.oldUuid)) return face
  const updated: SeoVortexFace = {
    ...face,
    contentUuid: args.newUuid,
    previousContentUuids: [...new Set([...face.previousContentUuids, args.oldUuid])],
    ogUpdatedTime: new Date().toISOString(),
  }
  FACES_BY_URL.set(args.url, updated)
  return updated
}

/**
 * Validate a face's microdata payload — Schema.org-required fields
 * present, no orphan edges, hreflang is BCP-47 valid.
 */
export interface MicrodataValidation {
  readonly ok: boolean
  readonly issues: ReadonlyArray<{ field: string; severity: 'major' | 'minor'; detail: string }>
}

export function validateMicrodata(face: SeoVortexFace): MicrodataValidation {
  const issues: { field: string; severity: 'major' | 'minor'; detail: string }[] = []
  if (!face.title) issues.push({ field: 'title', severity: 'major', detail: 'missing' })
  if (!face.description || face.description.length < 50) issues.push({ field: 'description', severity: 'minor', detail: 'too short for SERP CTR' })
  if (!face.url.startsWith('https://')) issues.push({ field: 'url', severity: 'major', detail: 'must be absolute https://' })
  for (const h of face.hreflang) {
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(h.locale)) issues.push({ field: 'hreflang', severity: 'minor', detail: `'${h.locale}' is not BCP-47` })
  }
  for (const e of face.outgoing) {
    if (!FACES_BY_URL.has(e.targetUrl)) issues.push({ field: 'outgoing', severity: 'minor', detail: `target ${e.targetUrl} not registered` })
  }
  return { ok: issues.filter((i) => i.severity === 'major').length === 0, issues }
}

/** Test-only — never call in prod. */
export function __resetFacesForTests(): void { FACES_BY_URL.clear() }
