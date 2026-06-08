/**
 * Skill-router core — the deterministic, content-addressed GATE of the catch-all.
 *
 * This is the erpax analogue of a DeepSeek MoE router: a request path is the
 * input, the skills are the experts, and resolution picks the matched expert +
 * the top-k neighbours (the `related` subgraph). Unlike a learned gate, the gate
 * here is the PATH (the address law) with a search fallback — "a command IS a URL
 * IS a query IS a skill-invocation" (see the `sequence` skill). Resolving the path
 * against the index IS executing it.
 *
 * Pure: no Payload / runtime / filesystem deps, so it typechecks standalone and
 * the Payload custom endpoint (the "within-the-limits-of-payload" surface) just
 * wraps it over a build-time-generated index + access control.
 */

/** One expert in the pool — a content-addressed skill node. */
export interface SkillNode {
  /** srcDir-relative docs route, e.g. `/seed/SKILL`, `/self/sufficient/SKILL`. */
  readonly route: string
  /** path segments without the trailing `SKILL`, e.g. `['self','sufficient']`. */
  readonly path: readonly string[]
  readonly name: string
  readonly description: string
  /** raw SKILL.md body (markdown). */
  readonly content: string
  readonly ancestors: readonly string[]
  readonly siblings: readonly string[]
  readonly children: readonly string[]
  readonly related: readonly string[]
  /** ancestor path segments — VitePress `nav` / sidebar group chain. */
  readonly nav: readonly string[]
  /** top-level path segment — Payload `admin.group` bucket. */
  readonly group: string
  /** content-addressed id (sha → uuid of the content); optional until computed. */
  readonly contentUuid?: string
}

export type SkillFormat = 'md' | 'json' | 'svg' | 'png' | 'html'

export interface ParsedRequest {
  /** leading verb atom if recognized (find/read/post/…), else null. */
  readonly verb: string | null
  /** path segments after stripping the verb + the `.format`. */
  readonly segments: readonly string[]
  /** requested format from the trailing `.ext`; defaults to `html`. */
  readonly format: SkillFormat
  /** the target leaf word (last segment) — the "meaning" to route to. */
  readonly target: string | null
}

export interface ResolveResult {
  /** the routed expert, or null when nothing resolves. */
  readonly matched: SkillNode | null
  /** ranked neighbours (the MoE top-k), excluding the match. */
  readonly candidates: readonly SkillNode[]
}

// Verb atoms that head a command-path (see the `sequence` action-surface law).
const VERBS = new Set([
  'find', 'read', 'show', 'get', 'list',
  'post', 'reconcile', 'calculate', 'merge', 'port',
])

// Extension → format (the content-negotiation map).
const FORMATS: Readonly<Record<string, SkillFormat>> = {
  md: 'md', markdown: 'md',
  json: 'json',
  svg: 'svg', qr: 'svg',
  png: 'png',
  html: 'html', htm: 'html',
}

/** Parse a raw catch-all path into verb / segments / format / target. */
export function parseRequest(rawPath: string): ParsedRequest {
  let p = rawPath.replace(/^\/+|\/+$/g, '')
  // split off a trailing `.format` on the LAST segment only
  let format: SkillFormat = 'html'
  const dot = p.lastIndexOf('.')
  const lastSlash = p.lastIndexOf('/')
  if (dot > lastSlash && dot >= 0) {
    const ext = p.slice(dot + 1).toLowerCase()
    if (FORMATS[ext]) {
      format = FORMATS[ext]
      p = p.slice(0, dot)
    }
  }
  const all = p.split('/').filter(Boolean)
  let verb: string | null = null
  let segments = all
  if (all.length > 0 && VERBS.has(all[0].toLowerCase())) {
    verb = all[0].toLowerCase()
    segments = all.slice(1)
  }
  const target = segments.length > 0 ? segments[segments.length - 1].toLowerCase() : null
  return { verb, segments, format, target }
}

/**
 * Route a parsed request to a skill expert + top-k neighbours.
 * Gate order (deterministic first, semantic last):
 *   1. exact path  — the segments match a skill's path (the address law)
 *   2. leaf word   — the target segment matches a skill name (the "meaning")
 *   3. semantic    — rank by term overlap with name/description/related
 */
export function resolveSkill(req: ParsedRequest, index: readonly SkillNode[]): ResolveResult {
  if (index.length === 0) return { matched: null, candidates: [] }

  const segKey = req.segments.map((s) => s.toLowerCase()).join('/')
  let matched: SkillNode | null =
    (segKey ? index.find((s) => s.path.join('/').toLowerCase() === segKey) : undefined) ?? null

  if (!matched && req.target) {
    matched = index.find((s) => s.name.toLowerCase() === req.target) ?? null
  }

  const ranked = rank(req, index)
  if (!matched && ranked.length > 0) matched = ranked[0]

  const candidates = ranked.filter((c) => c !== matched).slice(0, 8)
  return { matched, candidates }
}

/** Semantic fallback: score skills by how many request terms they hit. */
function rank(req: ParsedRequest, index: readonly SkillNode[]): SkillNode[] {
  const terms = req.segments.map((s) => s.toLowerCase()).filter((t) => t.length > 2)
  if (terms.length === 0) return []
  const scored = index.map((s) => {
    const name = s.name.toLowerCase()
    const hay = `${name} ${s.description} ${s.related.join(' ')}`.toLowerCase()
    let score = 0
    for (const t of terms) {
      if (name === t) score += 10
      else if (hay.includes(t)) score += 1
    }
    return { s, score }
  })
  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s)
}
