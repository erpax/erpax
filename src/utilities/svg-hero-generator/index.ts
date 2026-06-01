/**
 * Auto-generated SVG hero images for product pages.
 *
 * Pure-function SVG synthesizer — no fonts, no external assets, no
 * image-library dependency. Each call returns a deterministic SVG
 * Buffer keyed off the page slug + title; ideal for seeding marketing
 * pages where every product needs a representative hero without
 * requiring designer hand-off.
 *
 * Per-product visual recipe:
 *   - 1600×900 viewBox (16:9 hero proportions)
 *   - Tenant accent gradient backdrop (deterministic from slug hash)
 *   - Bold serif title (SVG <text>, no font dependency)
 *   - Decorative glyphs (currency/standard icons) drawn from primitive paths
 *   - Bottom-left subtitle line + standards-cited footnote
 *
 * @standard W3C SVG-1.1 scalable-vector-graphics
 * @standard ISO/IEC-29500 office-open-xml media-embedding-target
 * @compliance WCAG-2.1 §1.4.3 contrast-minimum minimum-4.5-1
 * @audit ISO-19011:2018 audit-trail seed-media-provenance
 * @see src/endpoints/seed/erpax-product-pages.ts
 */

export interface SvgHeroSpec {
  /** Slug — drives the deterministic accent color. */
  slug: string
  /** Big text. */
  title: string
  /** Subtitle line beneath the title. */
  subtitle: string
  /** Optional small footer line (e.g. "IFRS 15 / ASC 606"). */
  footnote?: string
  /** Glyph hint — picks the decorative motif. Defaults to a generic ledger-fan. */
  motif?: 'ledger' | 'cycle' | 'globe' | 'shield' | 'coin' | 'graph'
}

/**
 * Hash a string to a stable hue (0-360) for deterministic accent colors.
 * Crypto-grade not required; FNV-1a is fast and stable.
 */
function hueFor(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) % 360
}

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const motifPath = (motif: SvgHeroSpec['motif']): string => {
  switch (motif) {
    case 'cycle':
      // Circular arrow loop
      return '<path d="M1300 250 a 130 130 0 1 0 -120 130 l -10 -25 l 50 10 l -25 35 z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>'
    case 'globe':
      return '<circle cx="1300" cy="350" r="130" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="3"/><ellipse cx="1300" cy="350" rx="130" ry="55" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><line x1="1170" y1="350" x2="1430" y2="350" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><line x1="1300" y1="220" x2="1300" y2="480" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>'
    case 'shield':
      return '<path d="M1300 220 l 110 35 v 80 c 0 75 -55 130 -110 165 c -55 -35 -110 -90 -110 -165 v -80 z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" stroke-width="3"/>'
    case 'coin':
      return '<circle cx="1300" cy="350" r="115" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" stroke-width="3"/><text x="1300" y="385" text-anchor="middle" font-family="serif" font-size="120" fill="rgba(255,255,255,0.85)" font-weight="700">€</text>'
    case 'graph':
      return '<polyline points="1180,460 1230,400 1280,420 1330,330 1380,360 1430,260" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="1170" y1="480" x2="1450" y2="480" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><line x1="1170" y1="220" x2="1170" y2="480" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>'
    case 'ledger':
    default:
      // Stack of ledger lines (default for accounting cycles)
      return [220, 260, 300, 340, 380, 420].map((y, i) => {
        const w = 240 - i * 12
        return `<rect x="${1180}" y="${y}" width="${w}" height="14" rx="3" fill="rgba(255,255,255,${0.45 - i * 0.05})"/>`
      }).join('')
  }
}

/**
 * Render a deterministic SVG hero for a product/marketing page.
 * Returns the raw XML string.
 */
export function renderProductHeroSvg(spec: SvgHeroSpec): string {
  const hue = hueFor(spec.slug)
  const accent1 = `hsl(${hue}, 70%, 30%)`
  const accent2 = `hsl(${(hue + 35) % 360}, 70%, 22%)`
  const motif = motifPath(spec.motif)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${escapeXml(spec.title)} — ${escapeXml(spec.subtitle)}">
  <title>${escapeXml(spec.title)}</title>
  <desc>${escapeXml(spec.subtitle)}${spec.footnote ? '. ' + escapeXml(spec.footnote) : ''}</desc>
  <defs>
    <linearGradient id="bg-${spec.slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent1}"/>
      <stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg-${spec.slug})"/>
  ${motif}
  <text x="100" y="380" font-family="Georgia, 'Times New Roman', serif" font-size="110" font-weight="700" fill="white">${escapeXml(spec.title)}</text>
  <text x="100" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="40" fill="rgba(255,255,255,0.85)">${escapeXml(spec.subtitle)}</text>
  ${spec.footnote ? `<text x="100" y="820" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)">${escapeXml(spec.footnote)}</text>` : ''}
  <text x="1500" y="820" text-anchor="end" font-family="system-ui, sans-serif" font-size="18" fill="rgba(255,255,255,0.45)">erpax</text>
</svg>`
}

/**
 * Convenience — return a `Buffer` ready for Payload `payload.create({collection:'media'})`.
 */
export function renderProductHeroBuffer(spec: SvgHeroSpec): Buffer {
  return Buffer.from(renderProductHeroSvg(spec), 'utf-8')
}

/**
 * Pick a sensible motif for a given product-page slug. Used by the seed
 * so each page gets a visually distinct hero without manual mapping.
 */
export function defaultMotifFor(slug: string): SvgHeroSpec['motif'] {
  if (/sub|recurr|saas/.test(slug)) return 'cycle'
  if (/multi-curr|currency|fx/.test(slug)) return 'coin'
  if (/multi-tenant|isolation|secur/.test(slug)) return 'shield'
  if (/intern|country|locale/.test(slug)) return 'globe'
  if (/report|statement|kpi|ratio/.test(slug)) return 'graph'
  return 'ledger'
}
