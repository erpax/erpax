/**
 * path — THE merge point: every external surface collapses to one canonical atom path.
 * fs ⊕ url ⊕ github ⊕ mcp ⊕ api ⊕ http — all follow THE path, entangle at
 * content-uuid ([[integrity]]), and merge with erpax in every [[dimension]].
 *
 * Canonical form: `atom/subatom` — forward slashes, no `src/` prefix, no leading
 * slash, no trailing slash, folder chain only (leaf files stripped).
 *
 *   tsx src/path/index.ts law/folder
 *
 * @audit paths computed deterministically; never hand-mapped per surface
 * @see ../fs -- ../github -- ../mcp -- ../api -- ../quantum -- ../integrity -- ./SKILL.md
 */
import { uuid, jcsCanonicalize } from '@/integrity'

/** Every address surface that folds into the one canonical atom path. */
export type PathSurface = 'fs' | 'url' | 'github' | 'mcp' | 'api' | 'http'

/** All surfaces — the merged API face list. */
export const PATH_SURFACES: readonly PathSurface[] = [
  'fs',
  'url',
  'github',
  'mcp',
  'api',
  'http',
] as const

const LEAF_FILE =
  /^(?:index|SKILL)(?:\.(?:ts|tsx|md|mts|mjs|cjs))?$|\.(?:tsx?|md|mts|mjs|cjs|json)$/i

const GITHUB_HOSTS = new Set(['github.com', 'raw.githubusercontent.com'])

const stripQuery = (input: string): string => input.trim().replace(/[?#].*$/, '')

/** Normalize slashes on a path segment (never fed a full URL — protocols stripped first). */
const normSlashes = (input: string): string =>
  input.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\.\//, '')

/** GitHub https URL → repo-relative path (after ref). */
function githubUrlPath(input: string): string {
  try {
    const u = new URL(input)
    const host = u.hostname.replace(/^www\./, '')
    const parts = u.pathname.split('/').filter(Boolean)
    if (host === 'raw.githubusercontent.com' && parts.length > 3) return parts.slice(3).join('/')
    if (host === 'github.com' && parts.length >= 5 && (parts[2] === 'blob' || parts[2] === 'tree'))
      return parts.slice(4).join('/')
    if (host === 'github.com' && parts.length > 2) return parts.slice(2).join('/')
    return u.pathname.replace(/^\//, '')
  } catch {
    return input
  }
}

/** Pull the src/-relative segment from a repo or fs path. */
function afterSrc(path: string): string {
  const marker = '/src/'
  const idx = path.indexOf(marker)
  if (idx >= 0) return path.slice(idx + marker.length)
  if (path.startsWith('src/')) return path.slice(4)
  return path
}

/** Strip corpus routing prefixes shared by mcp/api/http. */
function stripCorpusPrefix(path: string): string {
  if (path.startsWith('corpus/')) return path.slice(7)
  if (path.startsWith('atoms/')) return path.slice(6)
  return path
}

/** Drop vitepress `/SKILL` page suffix and leaf files from segment tail. */
function canonicalSegments(segments: readonly string[]): string[] {
  const segs = [...segments].filter(Boolean)
  while (segs.length > 0) {
    const last = segs[segs.length - 1]!
    if (last === 'SKILL') {
      segs.pop()
      continue
    }
    if (LEAF_FILE.test(last)) {
      segs.pop()
      continue
    }
    break
  }
  return segs
}

function peelMcp(input: string): string {
  const raw = stripQuery(input)
  if (/^erpax:\/\//i.test(raw)) {
    let path = normSlashes(raw.replace(/^erpax:\/\//i, ''))
    path = stripCorpusPrefix(path)
    return path.replace(/^\/+|\/+$/g, '')
  }
  if (/^mcp:\/\//i.test(raw)) {
    try {
      const u = new URL(raw)
      let path = u.pathname.replace(/^\/+/, '')
      if (path.startsWith('resources/')) path = path.slice('resources/'.length)
      else if (path.startsWith('tools/')) path = path.slice('tools/'.length)
      path = stripCorpusPrefix(path)
      return path.replace(/^\/+|\/+$/g, '')
    } catch {
      return normSlashes(raw.replace(/^mcp:\/\/[^/]+\/?/i, '')).replace(/^\/+|\/+$/g, '')
    }
  }
  let path = stripCorpusPrefix(normSlashes(raw))
  return path.replace(/^\/+|\/+$/g, '')
}

function peelApi(input: string): string {
  const raw = stripQuery(input)
  let path = /^https?:\/\//i.test(raw)
    ? (() => {
        try {
          return new URL(raw).pathname
        } catch {
          return raw
        }
      })()
    : raw
  path = normSlashes(path).replace(/^\/+/, '')
  if (path.startsWith('api/')) path = path.slice(4)
  if (path === 'mcp') return ''
  if (path.startsWith('mcp/')) {
    path = path.slice(4)
    if (path.startsWith('resources/')) path = path.slice('resources/'.length)
    else if (path.startsWith('tools/')) path = path.slice('tools/'.length)
    else return ''
  }
  path = stripCorpusPrefix(path)
  return path.replace(/^\/+|\/+$/g, '')
}

function peelHttp(input: string): string {
  const raw = stripQuery(input)
  if (!/^https?:\/\//i.test(raw)) return normSlashes(raw).replace(/^\/+|\/+$/g, '')
  try {
    const u = new URL(raw)
    const host = u.hostname.replace(/^www\./, '')
    if (GITHUB_HOSTS.has(host)) return afterSrc(githubUrlPath(raw)).replace(/^\/+|\/+$/g, '')
    const pathname = u.pathname
    if (pathname.startsWith('/api/') || pathname === '/api') return peelApi(pathname)
    return normSlashes(pathname).replace(/^\/+/, '').replace(/^src\//, '').replace(/^\/+|\/+$/g, '')
  } catch {
    return normSlashes(raw).replace(/^\/+|\/+$/g, '')
  }
}

/** Surface-specific peel before the shared canonical fold. */
function peel(input: string, surface: PathSurface): string {
  const raw = stripQuery(input)
  let path: string
  switch (surface) {
    case 'github':
      path = /^https?:\/\//i.test(raw) ? githubUrlPath(raw) : normSlashes(raw)
      path = afterSrc(path)
      break
    case 'url':
      path = normSlashes(raw).replace(/^\/+/, '')
      if (path.startsWith('src/')) path = path.slice(4)
      break
    case 'fs':
      path = afterSrc(normSlashes(raw))
      break
    case 'mcp':
      return peelMcp(input)
    case 'api':
      return peelApi(input)
    case 'http':
      return peelHttp(input)
    default:
      path = normSlashes(raw)
  }
  return path.replace(/^\/+|\/+$/g, '')
}

/**
 * Normalize any address to the canonical atom path (`atom/subatom`).
 * Pure, deterministic — same atom on every surface ⇒ same output.
 */
export function toAtomPath(input: string, surface: PathSurface): string {
  const peeled = peel(input, surface)
  if (!peeled) return ''
  return canonicalSegments(peeled.split('/')).join('/')
}

/** Two paths meet when they normalize to the same canonical atom path. */
export function pathsMeet(
  a: string,
  b: string,
  surfaceA: PathSurface = 'fs',
  surfaceB: PathSurface = 'fs',
): boolean {
  return toAtomPath(a, surfaceA) === toAtomPath(b, surfaceB)
}

/** N-way merge — every path must meet at the same atom (entanglement gate). */
export function pathsMeetAll(...entries: readonly (readonly [string, PathSurface])[]): boolean {
  if (entries.length < 2) return true
  const head = toAtomPath(entries[0]![0], entries[0]![1])
  return entries.every(([p, s]) => toAtomPath(p, s) === head)
}

/** Content-uuid identity of the canonical atom path — merge = entanglement at uuid scale. */
export function atomPathUuid(input: string, surface: PathSurface = 'fs'): string {
  return uuid(jcsCanonicalize({ atomPath: toAtomPath(input, surface) }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const sample = process.argv[2] ?? 'law/folder'
  console.log('path — all surfaces merge:')
  for (const s of PATH_SURFACES) {
    const examples: Record<PathSurface, string> = {
      fs: `src/${sample}/index.ts`,
      url: `/${sample}/SKILL`,
      github: `https://github.com/erpax/erpax/blob/main/src/${sample}/SKILL.md`,
      mcp: `erpax://${sample}`,
      api: `/api/corpus/${sample}`,
      http: `https://docs.erpax.dev/${sample}/SKILL`,
    }
    console.log(`  ${s.padEnd(7)}`, toAtomPath(examples[s], s))
  }
  console.log('  uuid:   ', atomPathUuid(sample, 'fs'))
}
