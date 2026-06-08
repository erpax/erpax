/**
 * text — prose decomposes into [[word]] ⊕ [[digit]] tokens; parse and save diamonds.
 *
 * Text is words and digits only at the atomic token layer: walk prose → emit a
 * positioned sequence; each token is a content-addressed [[diamond]]
 * (`uuid(jcs({ kind, value }))`, same math as [[quantum/boundary]]). saveTextDiamonds
 * persists into the computed in-memory index and folds a typography-style root
 * ([[typography]]/indexRoot) over every token uuid — no one-folder-per-English-word sprawl.
 *
 *   tsx src/text/index.ts "hello 42 world"
 *   tsx src/text/index.ts --skill src/text
 *
 * @standard RFC 8785 JCS + RFC 9562 §5.8 content-uuid
 * @see ../word -- ../digit -- ../typography -- ../diamond -- ./SKILL.md
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { indexRoot } from '@/typography'
import { wordTokenUuid } from '@/word'
import { digitTokenUuid } from '@/digit'

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/
const TOKEN_RE = /[A-Za-z]+|[0-9]+/g

export type TextTokenKind = 'word' | 'digit'

export interface ParsedToken {
  readonly kind: TextTokenKind
  readonly value: string
  /** Zero-based position in the parse sequence. */
  readonly index: number
  readonly tokenUuid: string
}

export interface SaveTextOptions {
  /** When false, parse only — skip the in-memory diamond index. Default true. */
  readonly persist?: boolean
}

export interface SavedText {
  readonly tokens: readonly ParsedToken[]
  /** Typography-style fold of all token uuids (sorted merge chain). */
  readonly rootUuid: string
}

const tokenIndex = new Map<string, ParsedToken>()

/** Content-address of one prose token — delegates to @/word or @/digit by kind. */
export const tokenUuidOf = (kind: TextTokenKind, value: string): string =>
  kind === 'word' ? wordTokenUuid(value) : digitTokenUuid(value)

/**
 * Walk text → word/digit sequence with positions. Separators and markup are skipped;
 * only letter-runs (words) and digit-runs (numeric tokens) are emitted.
 */
export function parseText(text: string): ParsedToken[] {
  const tokens: ParsedToken[] = []
  let index = 0
  for (const m of text.matchAll(TOKEN_RE)) {
    const value = m[0]!
    const kind: TextTokenKind = /^\d+$/.test(value) ? 'digit' : 'word'
    tokens.push({ kind, value, index, tokenUuid: tokenUuidOf(kind, value) })
    index++
  }
  return tokens
}

/** The computed in-memory diamond index (content-uuid → token). */
export const savedTokenIndex = (): ReadonlyMap<string, ParsedToken> => tokenIndex

/** Lookup one saved token diamond by its content-uuid. */
export const getSavedToken = (uuid: string): ParsedToken | undefined => tokenIndex.get(uuid)

/** Clear the in-memory index — test isolation only. */
export const clearSavedTokens = (): void => {
  tokenIndex.clear()
}

/**
 * Parse text, optionally persist each token diamond in the computed index, and fold
 * a typography-style root over the token uuid sequence.
 */
export function saveTextDiamonds(text: string, opts: SaveTextOptions = {}): SavedText {
  const tokens = parseText(text)
  if (opts.persist !== false) {
    for (const t of tokens) tokenIndex.set(t.tokenUuid, t)
  }
  return { tokens, rootUuid: indexRoot(tokens.map((t) => t.tokenUuid)) }
}

/** Parse a SKILL.md body (frontmatter stripped) into word/digit diamonds. */
export function parseSkillText(skillPath: string, cwd: string = process.cwd()): ParsedToken[] {
  const rel = skillPath.replace(/^src\//, '').replace(/\/SKILL\.md$/, '')
  const abs = skillPath.endsWith('SKILL.md')
    ? join(cwd, skillPath.replace(/^\/+/, ''))
    : join(cwd, 'src', rel, 'SKILL.md')
  const body = readFileSync(abs, 'utf8').replace(FRONTMATTER, '')
  return parseText(body)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const arg = process.argv[2]
  if (arg === '--skill') {
    const path = process.argv[3] ?? 'text'
    const tokens = parseSkillText(path)
    console.log(`text — parseSkillText(${path}): ${tokens.length} token(s)`)
    console.log('  sample:', tokens.slice(0, 8).map((t) => `${t.kind}:${t.value}`).join(' '))
  } else {
    const sample = arg ?? 'hello 42 world'
    const { tokens, rootUuid } = saveTextDiamonds(sample)
    console.log(`text — parse/save: ${tokens.length} token(s)`)
    for (const t of tokens) console.log(`  [${t.index}] ${t.kind} "${t.value}" → ${t.tokenUuid.slice(0, 18)}…`)
    console.log(`  root: ${rootUuid.slice(0, 18)}…`)
  }
}
