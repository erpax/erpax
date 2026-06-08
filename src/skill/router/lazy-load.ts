/**
 * lazy-load — fetch one SKILL.md by atomPath without importing skills.index (77MB bundle).
 *
 * Workers and agent dispatches load only the sealed excerpt they need; the full
 * corpus index stays a build-time projection ([[convention/baked]]).
 *
 * @see ./resolve.ts · ../agent/cheap-dispatch · ./SKILL.md
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Default sealed excerpt — frontmatter + first body slice (token guard). */
export const DEFAULT_SKILL_EXCERPT_CHARS = 4096

export interface LazySkillLoadOpts {
  readonly cwd?: string
  readonly maxExcerptChars?: number
}

/** Sealed SKILL excerpt — content-addressed frontmatter + bounded body. */
export interface SealedSkillExcerpt {
  readonly atomPath: string
  readonly name: string
  readonly description: string
  readonly contentUuid?: string
  readonly excerpt: string
  readonly excerptChars: number
  readonly fullChars: number
  readonly sealed: true
}

const fmValue = (fm: string, key: string): string => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return ''
  let v = m[1].trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
  }
  return v
}

/** Filesystem path to one atom's SKILL.md under src/. */
export function skillFileForAtomPath(atomPath: string, cwd = process.cwd()): string {
  const stripped = atomPath.trim().replace(/^src\//, '').replace(/^\/+|\/+$/g, '')
  return join(cwd, 'src', stripped, 'SKILL.md')
}

/** Seal raw SKILL.md — entire excerpt capped at maxExcerptChars (frontmatter preferred). */
export function sealSkillExcerpt(
  atomPath: string,
  raw: string,
  maxExcerptChars = DEFAULT_SKILL_EXCERPT_CHARS,
): SealedSkillExcerpt {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm = fmMatch ? fmMatch[1] : ''
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw
  const header = fmMatch ? fmMatch[0] : ''

  let excerpt: string
  if (header.length >= maxExcerptChars) {
    excerpt = header.slice(0, maxExcerptChars) + (header.length > maxExcerptChars ? '\n…' : '')
  } else {
    const restBudget = maxExcerptChars - header.length
    const truncated = body.length > restBudget
    excerpt = header + body.slice(0, restBudget) + (truncated ? '\n…' : '')
  }

  return {
    atomPath,
    name: fmValue(fm, 'name') || atomPath.split('/').pop() || atomPath,
    description: fmValue(fm, 'description'),
    contentUuid: fmValue(fm, 'contentUuid') || undefined,
    excerpt,
    excerptChars: excerpt.length,
    fullChars: raw.length,
    sealed: true,
  }
}

/** Load one skill by atomPath from disk — null when SKILL.md is absent. */
export function loadSkillByAtomPath(
  atomPath: string,
  opts: LazySkillLoadOpts = {},
): SealedSkillExcerpt | null {
  const file = skillFileForAtomPath(atomPath, opts.cwd)
  if (!existsSync(file)) return null
  const raw = readFileSync(file, 'utf8')
  return sealSkillExcerpt(atomPath, raw, opts.maxExcerptChars ?? DEFAULT_SKILL_EXCERPT_CHARS)
}
