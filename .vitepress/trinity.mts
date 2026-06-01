// ── The trinity: one node, three sources, one speech ───────────────────────
// A folder node is told three times and rendered once:
//   • matter      — index.ts: the JSDoc `@standard` banner + the CollectionConfig
//                   (slug, exported symbols). The inline docs ARE the doc source.
//   • antimatter  — SKILL.md: the skill / law (this IS the VitePress page body).
//   • backend     — payload-types.ts: the schema the backend GENERATES from the
//                   same config (slug → interface → fields). "The build using the
//                   backend": we read the backend's own generated truth, no DB.
// VitePress fuses all three onto one page, so the speech is BUILT FROM the code
// and the backend — never hand-authored, never drifting from them. (See the
// `trinity` SKILL.) DRY at the doc scale: the page repeats nothing the code or
// backend already says; it derives from them.
//
// Every function here is pure + defensive: a missing/garbled source yields an
// empty section, never a thrown build. The corpus stays buildable as it grows.

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

// ── matter: parse the leading JSDoc banner + config out of a sibling index.ts ──
export type Matter = {
  summary: string // the prose lines of the JSDoc, before the first @tag
  banners: { tag: string; refs: string[] }[] // @standard / @accounting / @audit / …
  slug: string | null // CollectionConfig slug, if this node is a collection
  exports: string[] // exported symbol names (the node's surface)
}

const BANNER_TAGS = new Set([
  'standard',
  'accounting',
  'audit',
  'compliance',
  'security',
  'tax',
  'law',
  'invariant',
])

export function readMatter(indexPath: string): Matter | null {
  if (!existsSync(indexPath)) return null
  let src: string
  try {
    src = readFileSync(indexPath, 'utf8')
  } catch {
    return null
  }
  // The leading /** … */ block is the matter's self-description.
  const block = src.match(/\/\*\*([\s\S]*?)\*\//)
  const lines = block
    ? block[1].split('\n').map((l) => l.replace(/^\s*\*?\s?/, '').replace(/\s+$/, ''))
    : []
  const summaryLines: string[] = []
  const bannerMap = new Map<string, string[]>()
  let seenTag = false
  for (const line of lines) {
    const m = line.match(/^@([a-z]+)\s+(.*)$/i)
    if (m && BANNER_TAGS.has(m[1].toLowerCase())) {
      seenTag = true
      const tag = m[1].toLowerCase()
      // First whitespace-token is the standard id (ISO-4217:2015 / IAS-1); keep the
      // human-meaningful head, drop the trailing slug words for a compact chip.
      const refs = bannerMap.get(tag) ?? []
      refs.push(m[2].trim().split(/\s{2,}|\s(?=[a-z-]+$)/)[0] || m[2].trim())
      bannerMap.set(tag, refs)
    } else if (!seenTag && line.trim()) {
      summaryLines.push(line.trim())
    }
  }
  // slug + exports come from the code body, not the comment.
  const slugMatch = src.match(/\bslug:\s*['"]([a-z0-9-]+)['"]/)
  const exports = [
    ...src.matchAll(/^export\s+(?:const|function|class|type|interface)\s+([A-Za-z0-9_]+)/gm),
  ]
    .map((m) => m[1])
    .concat([...src.matchAll(/^export\s*\{\s*([^}]+)\}/gm)].flatMap((m) =>
      m[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0].trim()),
    ))
    .filter((v, i, a) => v && a.indexOf(v) === i)
  return {
    summary: summaryLines.join(' ').replace(/\s+/g, ' ').trim(),
    banners: [...bannerMap].map(([tag, refs]) => ({ tag, refs: [...new Set(refs)] })),
    slug: slugMatch ? slugMatch[1] : null,
    exports,
  }
}

// ── backend: the slug → field-names map, parsed ONCE from payload-types.ts ─────
// payload-types.ts is `payload generate:types` output — the backend's schema
// truth. Parsing it (not a live DB) is "the build using the backend": the docs
// are exactly as wide as the deployed schema, and go stale the instant the
// backend changes shape (regen-and-rebuild keeps them honest).
let backendCache: Map<string, string[]> | null = null

export function loadBackend(typesPath: string): Map<string, string[]> {
  if (backendCache) return backendCache
  const map = new Map<string, string[]>()
  if (!existsSync(typesPath)) return (backendCache = map)
  let src: string
  try {
    src = readFileSync(typesPath, 'utf8')
  } catch {
    return (backendCache = map)
  }
  // 1. slug → InterfaceName, from the `collections: { 'slug': Iface; … }` block of
  //    the generated `Config` interface.
  const collBlock = src.match(/collections:\s*\{([\s\S]*?)\n {2}\};/)
  const slugToIface = new Map<string, string>()
  if (collBlock) {
    for (const m of collBlock[1].matchAll(/'([a-z0-9-]+)':\s*([A-Za-z0-9_]+);/g)) {
      slugToIface.set(m[1], m[2])
    }
  }
  // 2. InterfaceName → top-level field names (brace-depth tracked, nested skipped).
  const fieldsOf = (iface: string): string[] => {
    const re = new RegExp(`export interface ${iface} \\{`)
    const start = src.search(re)
    if (start < 0) return []
    let i = src.indexOf('{', start)
    let depth = 0
    const fields: string[] = []
    for (; i < src.length; i++) {
      const c = src[i]
      if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) break
      } else if (depth === 1) {
        // at the top level of THIS interface — match `name?: …` / `name: …`
        const rest = src.slice(i)
        const fm = rest.match(/^\n {2}([A-Za-z_][A-Za-z0-9_]*)\??:/)
        if (fm) {
          if (!fields.includes(fm[1])) fields.push(fm[1])
          i += fm[0].length - 1
        }
      }
    }
    return fields
  }
  for (const [slug, iface] of slugToIface) map.set(slug, fieldsOf(iface))
  return (backendCache = map)
}

// ── The trinity node: ONE thought, computed once, projected many ways ────────
// Conceptual DRY: the node is the single source. Every surface that presents it
// — the HTML panel, the OpenGraph head, the live component's props, search — is
// a pure PROJECTION below, never a re-derivation. Add a surface by adding a
// projection of the node, not by re-reading matter+backend. The read is memoized
// per directory so "computed once" is literal, even across the markdown rule and
// transformPageData calling it on the same page.
export type TrinityNode = {
  summary: string // matter: the inline-doc lead
  banners: { tag: string; refs: string[] }[] // matter: @standard/@accounting/… grouped
  standards: string[] // the same banner refs, flattened (a convenience view)
  slug: string | null // backend: the collection slug, if any
  fields: string[] // backend: the generated schema field names
}

const trinityCache = new Map<string, TrinityNode | null>()

export function readTrinity(skillDir: string, typesPath: string): TrinityNode | null {
  const cached = trinityCache.get(skillDir)
  if (cached !== undefined) return cached
  const matter = readMatter(join(skillDir, 'index.ts'))
  const node: TrinityNode | null = matter && {
    summary: matter.summary,
    banners: matter.banners,
    standards: matter.banners.flatMap((b) => b.refs),
    slug: matter.slug,
    fields: matter.slug ? (loadBackend(typesPath).get(matter.slug) ?? []) : [],
  }
  trinityCache.set(skillDir, node)
  return node
}

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// projection → the HTML panel rendered under the SKILL.md body.
export function trinityHtml(skillDir: string, typesPath: string): string {
  const node = readTrinity(skillDir, typesPath)
  if (!node) return '' // no matter-twin → a pure-skill atom; nothing to fuse
  const rows: string[] = []
  if (node.summary) rows.push(`<p class="trinity-summary">${esc(node.summary)}</p>`)
  for (const b of node.banners) {
    if (!b.refs.length) continue
    rows.push(
      `<p class="trinity-banner"><strong>@${esc(b.tag)}</strong> ` +
        b.refs.map((r) => `<code>${esc(r)}</code>`).join(' · ') +
        `</p>`,
    )
  }
  // backend · the LIVE node — <CollectionLive> renders the schema on SSR and
  // fetches real rows from /api/{slug} on the client (props are the node's own
  // slug+fields; the live view is just another projection).
  if (node.slug && node.fields.length) {
    rows.push(`<CollectionLive slug="${esc(node.slug)}" fields="${esc(node.fields.join(','))}" />`)
  }
  if (!rows.length) return ''
  const axis =
    `<p class="trinity-axis"><strong>matter</strong> index.ts · ` +
    `<strong>antimatter</strong> SKILL.md` +
    (node.slug ? ` · <strong>backend</strong> <code>${esc(node.slug)}</code>` : '') +
    `</p>`
  return (
    `<section class="trinity" aria-label="trinity: matter · antimatter · backend">\n` +
    axis + '\n' + rows.join('\n') + `\n</section>\n`
  )
}

// projection → OpenGraph/meta tags. The SAME node, as the page's machine-readable
// face: the standards it implements (article:tag), its live REST endpoint, its
// schema width. Returns the head entries; config.mts just spreads them in.
export function trinityHead(skillDir: string, typesPath: string, section: string, apiBase: string): [string, Record<string, string>][] {
  const node = readTrinity(skillDir, typesPath)
  if (!node) return []
  const head: [string, Record<string, string>][] = [['meta', { property: 'article:section', content: section }]]
  for (const s of node.standards.slice(0, 24)) head.push(['meta', { property: 'article:tag', content: s }])
  if (node.summary) head.push(['meta', { name: 'erpax:summary', content: node.summary.slice(0, 280) }])
  if (node.slug) {
    head.push(
      ['meta', { name: 'erpax:slug', content: node.slug }],
      ['meta', { name: 'erpax:api', content: apiBase + '/api/' + node.slug }],
      ['meta', { name: 'erpax:schema', content: `${node.fields.length} fields: ${node.fields.join(',')}` }],
    )
  }
  return head
}

// helper so config.mts can locate the sibling index.ts from a page's relativePath
export function skillDirOf(pageRelPath: string, skillsDir: string): string {
  return join(skillsDir, dirname(pageRelPath))
}
