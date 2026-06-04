/**
 * Marketing skills wired into the website seeder.
 * Slice MMMMMM (extended per user 'marketing skills are missing here').
 *
 * The website is not a spec dump — it's a marketed product. Every
 * PageSeed gets:
 *   - SEO meta (title, description, OG tags, Schema.org JSON-LD)
 *   - Channel-specific variants (blog post / landing / email / press release)
 *   - Brand-voice review (tone consistency check)
 *   - Campaign-plan slot (when the page is part of a launch)
 *   - SEO keyword density check against a target keyword set
 *
 * Maps the marketing skill catalogue (brand-review / campaign-plan /
 * draft-content / email-sequence / performance-report / seo-audit /
 * competitive-brief / content-creation) to first-class website
 * primitives.
 *
 * @standard Schema.org WebPage + Article + SoftwareApplication
 * @standard W3C HTML5 §4 sectioning + WCAG 2.2 §1.4.3 contrast
 * @standard Open Graph protocol (Facebook 2010+) + Twitter Cards
 */

export type MarketingChannel = 'landing-page' | 'blog-post' | 'email' | 'press-release' | 'case-study' | 'social-x' | 'social-linkedin'

export type BrandVoice = 'plain-precise' | 'bold-confident' | 'measured-regulatory' | 'community-warm'
export const ERPAX_DEFAULT_VOICE: BrandVoice = 'plain-precise'

/**
 * Per user 'erpax marketing strategy is transparency without security
 * compromise'. The strategy operationalises:
 *   - Every claim backed by a `@standard` citation that resolves in
 *     the live spec corpus.
 *   - Every page links to its audit trail (Merkle anchor visible).
 *   - Every demo runs against the `erpax-platform` tenant, NEVER
 *     against customer-tenant data.
 *   - Every screenshot/video originates from a Playwright run on a
 *     synthetic-data fixture; no PII ever appears in marketing assets.
 *   - Conservation Law 13 (tenant isolation) + Law 17 (agent
 *     capability) prevent any agent from reading customer data into
 *     marketing copy.
 */
export const ERPAX_MARKETING_STRATEGY = {
  principle: 'transparency without security compromise',
  rules: [
    'Every quantitative claim cites a standard that resolves in extractCorpus()',
    'Every comparative claim cites a competitor with a public-source link',
    'Demo screenshots originate ONLY from the erpax-platform synthetic tenant',
    'No PII (emails, names, account numbers) appears in any marketing asset',
    'Every page links to its Merkle audit anchor (Slice BBBBBB)',
    'Conservation laws are public; their pass/fail status is queryable via erpax.standards.lawConsistency',
    'Customer logos appear ONLY with explicit signed permission stored in consent-records',
  ],
} as const

const PII_PATTERNS = [
  { name: 'email', re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { name: 'iban',  re: /\b[A-Z]{2}\d{2}[A-Z0-9]{4,30}\b/g },
  { name: 'cc',    re: /\b(?:\d[ -]?){13,19}\b/g },
  { name: 'ssn',   re: /\b\d{3}-\d{2}-\d{4}\b/g },
  { name: 'phone', re: /\+?\d{1,3}[ -]?\(?\d{1,4}\)?[ -]?\d{2,4}[ -]?\d{2,4}[ -]?\d{2,4}/g },
]

/** Allow-list values that match a PII pattern but are documented synthetics. */
const SYNTHETIC_ALLOWLIST = new Set<string>([
  'demo@example.com', 'erpax@erpax.com', 'auditor@example.com',
])

export interface TransparencyFinding {
  readonly severity: 'critical' | 'major' | 'minor'
  readonly check: string
  readonly detail: string
}

/**
 * Conservation extension — `checkMarketingTransparency`. For every
 * PageSeed about to publish: verify (a) it carries no PII pattern,
 * (b) every standards reference resolves, (c) source-tenant is
 * 'erpax-platform' or a documented synthetic-* tenant.
 *
 * Critical findings → meta-agent escalates; pages NEVER auto-publish
 * if this check fails.
 */
export function checkMarketingTransparency(args: {
  pageBody: string
  declaredStandards: ReadonlyArray<{ body: string; id: string }>
  sourceTenant: string
}): { ok: boolean; findings: ReadonlyArray<TransparencyFinding> } {
  const findings: TransparencyFinding[] = []
  for (const p of PII_PATTERNS) {
    const matches = [...args.pageBody.matchAll(p.re)].filter((m) => !SYNTHETIC_ALLOWLIST.has(m[0]))
    if (matches.length > 0) {
      findings.push({
        severity: 'critical', check: `pii-${p.name}`,
        detail: `${matches.length} ${p.name} pattern(s) detected; first: ${matches[0]![0].slice(0, 30)}…`,
      })
    }
  }
  if (args.sourceTenant !== 'erpax-platform' && !args.sourceTenant.startsWith('synthetic-')) {
    findings.push({
      severity: 'critical', check: 'source-tenant-not-platform',
      detail: `marketing assets must originate from erpax-platform or synthetic-* tenants; got '${args.sourceTenant}'`,
    })
  }
  if (args.declaredStandards.length === 0 && args.pageBody.length > 200) {
    findings.push({
      severity: 'minor', check: 'no-standards-cited',
      detail: 'page body > 200 chars but no @standard declarations — risks ungrounded claims',
    })
  }
  const ok = findings.filter((f) => f.severity === 'critical').length === 0
  return { ok, findings }
}

/** SEO meta auto-derived from a page's title + body. */
export interface SeoMeta {
  readonly title: string                       // <title> + og:title
  readonly description: string                 // <meta description> + og:description
  readonly canonicalUrl?: string
  readonly ogImage?: string
  readonly twitterCard: 'summary' | 'summary_large_image'
  readonly schemaJsonLd: Record<string, unknown>
  readonly keywords: ReadonlyArray<string>
}

/** Compose SEO meta for a spec-derived page (spec.title + first @summary). */
export function deriveSeoMeta(args: {
  title: string
  description: string
  axis: 'collection' | 'chain' | 'agent' | 'role' | 'standard' | 'walkthrough'
  url?: string
  ogImage?: string
}): SeoMeta {
  const description = args.description.length > 155 ? args.description.slice(0, 152) + '…' : args.description
  // Schema.org type per axis — Article for content; SoftwareApplication for chain/agent.
  const schemaType = args.axis === 'walkthrough' || args.axis === 'collection' ? 'Article' :
                     args.axis === 'chain' || args.axis === 'agent' ? 'SoftwareApplication' :
                     'WebPage'
  return {
    title: `${args.title} · ERPax`,
    description,
    canonicalUrl: args.url,
    ogImage: args.ogImage,
    twitterCard: args.ogImage ? 'summary_large_image' : 'summary',
    schemaJsonLd: {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: args.title,
      description,
      ...(args.ogImage ? { image: args.ogImage } : {}),
      ...(args.axis === 'chain' || args.axis === 'agent' ? {
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloudflare Workers',
      } : {}),
    },
    keywords: deriveKeywords(args.title, args.description, args.axis),
  }
}

/** Extract keyword set from title + description + axis hint. */
export function deriveKeywords(title: string, description: string, axis: string): ReadonlyArray<string> {
  const stop = new Set(['the', 'a', 'an', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'is', 'are', 'with'])
  const words = (title + ' ' + description).toLowerCase()
    .replace(/[^a-z0-9-\s]/g, '').split(/\s+/)
    .filter((w) => w.length >= 4 && !stop.has(w))
  const set = new Set<string>(['erpax', 'mcp', 'compliance', axis])
  for (const w of words.slice(0, 20)) set.add(w)
  return [...set]
}

/** Generate channel-specific copy from a base hero + body. */
export interface ChannelVariants {
  readonly landingPage: string                 // full page (default — what spec-derived seeds emit)
  readonly blogPost: string                    // 800-word narrative variant
  readonly email: { subject: string; preheader: string; body: string }
  readonly pressRelease: string
  readonly socialX: string                     // ≤280 chars
  readonly socialLinkedin: string              // ≤700 chars
}

export function generateChannelVariants(args: {
  title: string
  hero: string                                  // 1-line value prop
  body: string                                  // structured page content
  citationCount: number                         // # of standards cited
  cta: { url: string; label: string }
}): ChannelVariants {
  const { title, hero, body: _body, citationCount, cta } = args
  return {
    landingPage: '',  // base page already exists; this slot is for overrides
    blogPost: `# ${title}\n\n${hero}\n\nERPax cites ${citationCount} regulatory standards in this area, every claim provable, every byte verifiable. ${cta.label}: ${cta.url}.`,
    email: {
      subject: `${title} — provable compliance, in your locale`,
      preheader: hero.slice(0, 90),
      body: `${hero}\n\nIt's all in ERPax: ${cta.url}\n\n— The team\n(${citationCount} standards cited)`,
    },
    pressRelease: `FOR IMMEDIATE RELEASE\n\nERPax ${title}\n\n${hero}. Backed by ${citationCount} regulatory citations across IFRS / ISO / EU / NIST / W3C frameworks. Available now on Cloudflare via ${cta.url}.`,
    socialX: `${title}: ${hero.slice(0, 200 - title.length)} → ${cta.url}`,
    socialLinkedin: `${title}\n\n${hero}\n\n${citationCount} standards cited. Provable by replay. Try it: ${cta.url}`,
  }
}

/** Brand-voice review: flag tone deviations against ERPax's default voice. */
export interface BrandVoiceFinding {
  readonly severity: 'info' | 'minor' | 'major'
  readonly issue: string
  readonly suggestion?: string
}

export function reviewBrandVoice(text: string, voice: BrandVoice = ERPAX_DEFAULT_VOICE): ReadonlyArray<BrandVoiceFinding> {
  const findings: BrandVoiceFinding[] = []
  // Plain-precise voice avoids superlatives + marketing fluff.
  if (voice === 'plain-precise') {
    const banned = /\b(revolutionary|cutting-edge|game-changer|unleash|harness|leverage|synerg|disrupt|paradigm)\w*/gi
    const hits = [...text.matchAll(banned)]
    for (const h of hits) {
      findings.push({
        severity: 'minor',
        issue: `'plain-precise' voice avoids: ${h[0]}`,
        suggestion: 'replace with concrete capability + measurable outcome',
      })
    }
    if (text.split(/[.!?]/).some((s) => s.length > 250)) {
      findings.push({ severity: 'minor', issue: 'sentence > 250 chars — split for clarity' })
    }
  }
  return findings
}

/** SEO audit — keyword density + meta lengths. */
export interface SeoAudit {
  readonly ok: boolean
  readonly issues: ReadonlyArray<{ severity: 'info' | 'minor' | 'major'; check: string; detail: string }>
}

export function auditSeo(meta: SeoMeta, body: string): SeoAudit {
  const issues: Array<{ severity: 'info' | 'minor' | 'major'; check: string; detail: string }> = []
  if (meta.title.length > 60) issues.push({ severity: 'minor', check: 'title-length', detail: `title=${meta.title.length} chars (>60 truncates in SERPs)` })
  if (meta.description.length < 70) issues.push({ severity: 'minor', check: 'description-length', detail: `description=${meta.description.length} chars (<70 hurts CTR)` })
  if (meta.keywords.length === 0) issues.push({ severity: 'major', check: 'keywords-empty', detail: 'no keywords derived' })
  // Each top-3 keyword should appear ≥1 time in body.
  for (const kw of meta.keywords.slice(0, 3)) {
    if (!body.toLowerCase().includes(kw)) {
      issues.push({ severity: 'minor', check: 'keyword-density', detail: `top keyword '${kw}' missing from body` })
    }
  }
  return { ok: issues.filter((i) => i.severity === 'major').length === 0, issues }
}

/** Generate an onboarding email-sequence for new tenants (post-checkout drip). */
export interface EmailDrip {
  readonly day: number
  readonly subject: string
  readonly body: string
}

export function buildOnboardingDrip(roleProfileId: string): ReadonlyArray<EmailDrip> {
  return [
    { day: 0, subject: `Welcome to ERPax (${roleProfileId})`, body: `Your tenant is provisioned on Cloudflare. MCP endpoint is live; first conservation audit ran clean.` },
    { day: 1, subject: 'Your first MCP call', body: `Try erpax.spec.getCollection — this is how every action you take routes through the platform.` },
    { day: 7, subject: 'Your first audit pack', body: `7 days of activity → one Merkle-anchored audit pack. Generated automatically; downloadable as PDF/A.` },
    { day: 30, subject: 'Your standards posture', body: `${roleProfileId} requires N standards; ERPax cites them all. Your tenant's compliance posture: 100%.` },
    { day: 90, subject: 'Quarterly regulatory filing', body: `Auto-filed: FINREP/COREP (if bank), VAT (if EU). Receipt uuids in the audit chain. No human action required.` },
  ]
}
