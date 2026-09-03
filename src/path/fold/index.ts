/**
 * path/fold — the ADDRESS fold: every surface peeled to the one canonical atom path.
 *
 * Pure string work — peel · canonicalise · alias — and nothing else. It lived in `../index`,
 * whose barrel imports `@/uuid/matrix` for the ring-walking half, and that table is
 * **4.2 MB**: every consumer of `toAtomPath` was loading the entire 3,411-node corpus matrix
 * to fold a string.
 *
 * Measured on the published Worker package, which reaches it through cloudflare/bindings:
 *
 *     @erpax/cloudflare   4,701 KB → 508 KB
 *
 * `../index` re-exports everything here, so no caller anywhere loses a name ([[rules]]/face);
 * the ones that need only the fold now say so, and stop paying for navigation they never use.
 *
 * @see ../index — the full path face, including the matrix ring walk
 */
import { vocabularyFoldAlias } from '@/navigation/github-folded.generated'
import { uuid, jcsCanonicalize } from '@/integrity/content'

/** Every address surface that folds into the one canonical atom path. */
export type PathSurface = 'fs' | 'url' | 'github' | 'mcp' | 'api' | 'http' | 'cloudflare'

/** All surfaces — the merged API face list. */
export const PATH_SURFACES: readonly PathSurface[] = [
  'fs',
  'url',
  'github',
  'mcp',
  'api',
  'http',
  'cloudflare',
] as const

const LEAF_FILE =
  /^(?:index|SKILL)(?:\.(?:ts|tsx|md|mts|mjs|cjs))?$|\.(?:tsx?|md|mts|mjs|cjs|json|pdf|png|webp)$/i

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

/** Pull the segment relative to the source root from a repo or fs path. */
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

/** Folder-shape law — one generic word per segment ([[law/folder]]). */
/** Read by ../index for the folder-shape check on a revealed path. */
export const ONE_WORD = /^[a-z][a-z0-9]*$/

const isFrameworkSegment = (name: string): boolean =>
  /^\([^)]*\)$/.test(name) ||
  /^\[.*\]$/.test(name) ||
  name.startsWith('@') ||
  /^[0-9]+$/.test(name)

/** Every segment in a revealed path must be one word (structural segments exempt). */
export function isValidAtomPath(atomPath: string): boolean {
  if (!atomPath) return false
  return atomPath.split('/').every((s) => isFrameworkSegment(s) || ONE_WORD.test(s))
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
  const path = stripCorpusPrefix(normSlashes(raw))
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

/** Cloudflare Worker routes, R2/D1 keys, workers.dev URLs, wrangler bindings → atom path. */
function peelCloudflare(input: string): string {
  const raw = stripQuery(input)
  let path: string
  if (/^r2:(\/\/)?/i.test(raw)) {
    path = normSlashes(raw.replace(/^r2:(\/\/)?/i, ''))
    const parts = path.split('/').filter(Boolean)
    if (parts.length > 1) path = parts.slice(1).join('/')
  } else if (/^d1:(\/\/)?/i.test(raw)) {
    path = normSlashes(raw.replace(/^d1:(\/\/)?/i, ''))
    const parts = path.split('/').filter(Boolean)
    if (parts.length > 1) path = parts.slice(1).join('/')
  } else if (/^ai:(\/\/)?/i.test(raw)) {
    path = normSlashes(raw.replace(/^ai:(\/\/)?/i, ''))
    if (path.startsWith('@cf/')) path = path.slice(4)
    if (path.startsWith('models/')) path = path.slice('models/'.length)
  } else if (/^wrangler:\/\/binding\//i.test(raw)) {
    path = normSlashes(raw.replace(/^wrangler:\/\/binding\//i, ''))
  } else if (/^https?:\/\//i.test(raw) && /\.workers\.dev\b/i.test(raw)) {
    try {
      path = new URL(raw).pathname.replace(/^\/+/, '')
      if (path.startsWith('api/')) path = path.slice(4)
      path = stripCorpusPrefix(path)
    } catch {
      path = normSlashes(raw)
    }
  } else if (/^(?:cf|cloudflare):\/\//i.test(raw)) {
    path = normSlashes(raw.replace(/^(?:cf|cloudflare):\/\//i, ''))
    if (path.startsWith('worker/')) path = path.slice('worker/'.length)
    if (path.startsWith('routes/')) path = path.slice('routes/'.length)
    if (path.startsWith('binding/')) path = path.slice('binding/'.length)
    if (path.startsWith('api/')) path = path.slice(4)
    path = stripCorpusPrefix(path)
  } else {
    path = normSlashes(raw)
  }
  if (/^t:[^/]+\//.test(path)) path = path.replace(/^t:[^/]+\//, '')
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
    case 'cloudflare':
      return peelCloudflare(input)
    default:
      path = normSlashes(raw)
  }
  return path.replace(/^\/+|\/+$/g, '')
}

/**
 * Normalize any address to the canonical atom path (`atom/subatom`).
 * Pure, deterministic — same atom on every surface ⇒ same output.
 * When `surroundings` is provided, revelation from parent chain + matrix bonds
 * disambiguates leaf-only addresses (`invariant` → `architecture/invariant`).
 */
export function toAtomPath(
  input: string,
  surface: PathSurface = 'fs',
): string {
  const peeled = peel(input, surface)
  if (!peeled) return ''
  return vocabularyFoldAlias(canonicalSegments(peeled.split('/')).join('/'))
}

/** Content-uuid identity of the canonical atom path — merge = entanglement at uuid scale. */
export function atomPathUuid(input: string, surface: PathSurface = 'fs'): string {
  return uuid(jcsCanonicalize({ atomPath: toAtomPath(input, surface) }))
}
