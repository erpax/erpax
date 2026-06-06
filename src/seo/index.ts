/**
 * seo — the marketing/SEO an agent PROJECTS for an atom, computed from what it OBSERVES (the atom's
 * [[name]], its frontmatter description, its [[links]]). Every atom is an Open Graph object and a
 * schema.org TechArticle: title, a meta description (clipped to 160), keywords, canonical URL, and
 * JSON-LD — all derived, none hand-authored. VitePress already injects this per page (the config's
 * `transformPageData`); this atom is the **testable single source**, and `seoCoverage` is the forcing
 * function: the test fails if ANY atom's SEO is incomplete (a missing description), so the corpus
 * stays marketing-complete by construction.
 *
 *   tsx src/seo/index.ts
 *
 * @audit every field derived from the atom; seoCoverage reads the live tree, the gap is computed not assumed
 * @see ../name -- ../vitepress -- ../marketing -- ../quantum/schema -- ./SKILL.md
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { uuidOfName } from '@/name'

export interface Seo {
  readonly title: string
  readonly description: string
  readonly keywords: readonly string[]
  readonly canonical: string
  readonly jsonLd: Readonly<Record<string, unknown>>
}

const SITE = (process.env.ERPAX_SITE_URL ?? '').replace(/\/$/, '')
const META_MAX = 160
const clip = (s: string, n = META_MAX): string => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…')

/** Compute the marketing/SEO an agent projects for an atom — from its name, description, and links. */
export function seo(atom: string, description: string, links: readonly string[] = []): Seo {
  const route = '/' + atom + '/SKILL'
  const desc = clip(description.trim())
  return {
    title: atom,
    description: desc,
    keywords: [...new Set(links)].slice(0, 12),
    canonical: SITE + route,
    jsonLd: { '@context': 'https://schema.org', '@type': 'TechArticle', name: atom, description: desc, identifier: uuidOfName(atom), url: SITE + route },
  }
}

/** Comprehensive ⟺ a real title, a non-empty description within meta length, a canonical, and valid JSON-LD. */
export function comprehensive(s: Seo): boolean {
  return s.title.length > 0 && s.description.length > 0 && s.description.length <= META_MAX && s.canonical.length > 0 && (s.jsonLd as { '@type'?: string })['@type'] === 'TechArticle'
}

/** The VitePress head tags (meta · OG · JSON-LD) — what is displayed directly on the page. */
export function headTags(s: Seo): Array<[string, Record<string, string>] | [string, Record<string, string>, string]> {
  return [
    ['meta', { name: 'description', content: s.description }],
    ['meta', { name: 'keywords', content: s.keywords.join(', ') }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { property: 'og:title', content: s.title }],
    ['meta', { property: 'og:description', content: s.description }],
    ['link', { rel: 'canonical', href: s.canonical }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(s.jsonLd)],
  ]
}

const descOf = (text: string): string => {
  const m = text.match(/^description:\s*(.+)$/m)
  if (!m) return ''
  return m[1]!.trim().replace(/^["']/, '').replace(/["']$/, '')
}

/** The forcing function: walk every SKILL.md, compute its SEO, and report which atoms are incomplete. */
export function seoCoverage(root = 'src'): { atoms: number; comprehensive: number; coverage: number; incomplete: string[] } {
  const incomplete: string[] = []
  let atoms = 0
  let comp = 0
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      const st = statSync(p)
      if (st.isDirectory()) walk(p)
      else if (e === 'SKILL.md') {
        atoms++
        const atom = basename(dirname(p))
        if (comprehensive(seo(atom, descOf(readFileSync(p, 'utf8'))))) comp++
        else incomplete.push(p)
      }
    }
  }
  walk(root)
  return { atoms, comprehensive: comp, coverage: atoms ? comp / atoms : 0, incomplete }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = seoCoverage()
  console.log('seo — comprehensive marketing/SEO, per atom:')
  console.log('  coverage ' + c.comprehensive + '/' + c.atoms + ' = ' + (100 * c.coverage).toFixed(2) + '%')
  if (c.incomplete.length) console.log('  INCOMPLETE: ' + c.incomplete.slice(0, 5).join(', '))
  console.log('  sample headTags(seo("deploy")): ' + JSON.stringify(headTags(seo('deploy', 'Use when deploying — the gate-green order'))).slice(0, 120) + '…')
}
