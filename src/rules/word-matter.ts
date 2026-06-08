/**
 * rules/word-matter — identifiers and comments must earn their place.
 *
 * Heuristics: long/verbose names · comment/code bloat · duplicate get/getX prefixes ·
 * helper/util/common filenames. Coordinates alphanumeric-name (5df78a5a) and
 * logic-concentration (4f811289) — matter quality on the deployment axis.
 *
 * @see ./index.ts — ../seal/cross-concept
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const SKIP_FILE = /\.(generated|d\.ts)$/i
const SKIP_PATH = /\/(payload-types|skills\.index|catalogue)\.ts$/

export const IDENTIFIER_MAX_LEN = 28
export const IDENTIFIER_MAX_TOKENS = 4
export const COMMENT_RATIO_THRESHOLD = 0.45
export const COMMENT_BLOAT_MIN_LINES = 40
export const DUPLICATE_PREFIX_MIN = 3

export type WordMatterKind =
  | 'long-identifier'
  | 'verbose-name'
  | 'comment-bloat'
  | 'duplicate-prefix'
  | 'utility-filename'

export interface WordMatterViolation {
  readonly atomPath: string
  readonly file: string
  readonly law: 'word-matter'
  readonly kind: WordMatterKind
  readonly reason: string
  readonly line?: number
  readonly identifier?: string
}

const UTILITY_STEM = /^(?:helper|helpers|util|utils|common)$/i
const UTILITY_FILE = /(?:^|\/)(?:helper|helpers|util|utils|common)\./i

const IDENTIFIER_RE =
  /^(?:export\s+)?(?:async\s+)?(?:function|const|let|var|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/gm

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

/** camelCase / PascalCase token count (deriveInvoiceNumber → 3). */
export function camelTokens(name: string): number {
  const stripped = name.replace(/^_+/, '')
  if (!stripped) return 0
  const parts = stripped.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/\s+/)
  return parts.filter(Boolean).length
}

const atomPathOf = (rel: string): string => {
  const norm = rel.replace(/^src\//, '')
  const slash = norm.lastIndexOf('/')
  return slash >= 0 ? norm.slice(0, slash) : 'src'
}

const shouldScanFile = (rel: string): boolean => {
  if (!/\.tsx?$/i.test(rel)) return false
  if (SKIP_FILE.test(rel)) return false
  if (SKIP_PATH.test(rel)) return false
  return true
}

const commentCodeRatio = (content: string): { ratio: number; codeLines: number } => {
  const lines = content.split('\n')
  let code = 0
  let comments = 0
  let block = false
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (block) {
      comments++
      if (line.includes('*/')) block = false
      continue
    }
    if (line.startsWith('/*')) {
      comments++
      if (!line.includes('*/')) block = true
      continue
    }
    if (line.startsWith('*') || line.startsWith('//')) {
      comments++
      continue
    }
    code++
  }
  const ratio = code > 0 ? comments / code : 0
  return { ratio, codeLines: code }
}

const collectIdentifiers = (content: string): Array<{ name: string; line: number }> => {
  const out: Array<{ name: string; line: number }> = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    IDENTIFIER_RE.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = IDENTIFIER_RE.exec(line)) !== null) {
      const name = m[1]!
      if (name.length > 1) out.push({ name, line: i + 1 })
    }
  }
  return out
}

const duplicatePrefixPairs = (names: readonly string[]): Array<{ longer: string; prefix: string }> => {
  const uniq = [...new Set(names)].sort((a, b) => a.length - b.length)
  const out: Array<{ longer: string; prefix: string }> = []
  for (let i = 0; i < uniq.length; i++) {
    const a = uniq[i]!
    for (let j = i + 1; j < uniq.length; j++) {
      const b = uniq[j]!
      if (b.startsWith(a) && b.length - a.length >= DUPLICATE_PREFIX_MIN && a.length >= DUPLICATE_PREFIX_MIN) {
        out.push({ longer: b, prefix: a })
      }
    }
  }
  return out
}

const fileStem = (file: string): string => {
  const base = basename(file)
  return base.replace(/\.(tsx?|test)$/i, '').replace(/\.test$/i, '')
}

const scanFile = (rel: string, content: string, scope: ReadonlySet<string> | null): WordMatterViolation[] => {
  if (scope && !scope.has(atomPathOf(rel)) && !scope.has(rel)) return []
  const atomPath = atomPathOf(rel)
  const out: WordMatterViolation[] = []

  const stem = fileStem(rel)
  if (UTILITY_STEM.test(stem) || UTILITY_FILE.test(rel)) {
    out.push({
      atomPath,
      file: rel,
      law: 'word-matter',
      kind: 'utility-filename',
      reason: `utility stem "${stem}" — nest as one-word atom, not helper/util/common`,
    })
  }

  const { ratio, codeLines } = commentCodeRatio(content)
  if (codeLines >= COMMENT_BLOAT_MIN_LINES && ratio >= COMMENT_RATIO_THRESHOLD) {
    out.push({
      atomPath,
      file: rel,
      law: 'word-matter',
      kind: 'comment-bloat',
      reason: `comment/code ${(ratio * 100).toFixed(0)}% (${codeLines} code lines)`,
    })
  }

  const ids = collectIdentifiers(content)
  const names = ids.map((r) => r.name)
  for (const { name, line } of ids) {
    if (name.length > IDENTIFIER_MAX_LEN) {
      out.push({
        atomPath,
        file: rel,
        law: 'word-matter',
        kind: 'long-identifier',
        reason: `${name} — ${name.length} chars (>${IDENTIFIER_MAX_LEN})`,
        line,
        identifier: name,
      })
    } else if (camelTokens(name) > IDENTIFIER_MAX_TOKENS) {
      out.push({
        atomPath,
        file: rel,
        law: 'word-matter',
        kind: 'verbose-name',
        reason: `${name} — ${camelTokens(name)} tokens (>${IDENTIFIER_MAX_TOKENS})`,
        line,
        identifier: name,
      })
    }
  }

  for (const { longer, prefix } of duplicatePrefixPairs(names)) {
    const row = ids.find((r) => r.name === longer)
    out.push({
      atomPath,
      file: rel,
      law: 'word-matter',
      kind: 'duplicate-prefix',
      reason: `${longer} duplicates prefix ${prefix}`,
      line: row?.line,
      identifier: longer,
    })
  }

  return out
}

/** Session-touched atoms for audit priority. */
export const WORD_MATTER_AUDIT_ATOMS = ['agent', 'readme', 'monitor', 'rules'] as const

export function wordMatterFixSuggestion(v: Pick<WordMatterViolation, 'kind' | 'identifier' | 'file'>): string {
  switch (v.kind) {
    case 'long-identifier':
    case 'verbose-name':
      return `shorten ${v.identifier ?? 'identifier'} in ${v.file}`
    case 'comment-bloat':
      return `trim restating comments in ${v.file}`
    case 'duplicate-prefix':
      return `collapse ${v.identifier ?? 'pair'} — one name, one meaning`
    case 'utility-filename':
      return `relocate ${v.file} to one-word child atom`
    default:
      return `trim ${v.file}`
  }
}

/** Scan src/ for word-matter violations; optional atomPath scope filter. */
export function wordMatterViolations(
  cwd: string = process.cwd(),
  opts?: { readonly scope?: readonly string[] },
): WordMatterViolation[] {
  const scope = opts?.scope ? new Set(opts.scope) : null
  const root = join(cwd, SRC)
  const out: WordMatterViolation[] = []

  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      const childRel = rel ? `${rel}/${e}` : e
      if (isDir(p)) {
        if (!rel && SKIP_TREES.has(e)) continue
        walk(p, childRel)
      } else if (shouldScanFile(childRel)) {
        try {
          const content = readFileSync(p, 'utf8')
          out.push(...scanFile(childRel, content, scope))
        } catch {
          /* unreadable */
        }
      }
    }
  }
  walk(root, '')
  return out.sort(
    (a, b) =>
      a.kind.localeCompare(b.kind) ||
      a.atomPath.localeCompare(b.atomPath) ||
      (a.line ?? 0) - (b.line ?? 0),
  )
}

/** Rank top offenders under audit atoms. */
export function wordMatterAuditTop(
  cwd: string = process.cwd(),
  limit = 20,
): readonly WordMatterViolation[] {
  return wordMatterViolations(cwd, { scope: [...WORD_MATTER_AUDIT_ATOMS] }).slice(0, limit)
}
