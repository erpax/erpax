/**
 * rules/citation — a refactor may drop a symbol; it may not drop a statute. See SKILL.md.
 *
 * @standard ISO-19011:2018 §6.4 audit-evidence — the citation must lead to the evidence
 * @quality ISO-25010:2023 §5.6 maintainability — evidence survives the refactor that moves it
 */
import { execSync } from 'node:child_process'
import { baseRef } from '@/rules/face'
import { commentsOf } from '@/syntax'
import { corpusFiles, textOf } from '@/syntax/cache'

/** Canonical atom path. */
export const atomPath = 'rules/citation' as const

/** The tags that name an EXTERNAL authority. `@invariant` and `@audit` assert; these cite. */
const CITATION_TAGS = ['standard', 'accounting', 'compliance', 'quality', 'security'] as const

/** DECLARED — words that namespace a standard instead of naming one (`BG` alone cites nothing). */
export const NAMESPACE_WORDS: ReadonlySet<string> = new Set([
  'BG', 'EU', 'US', 'UK', 'DE', 'NL', 'IFRS', 'IAS', 'GAAP', 'US-GAAP', 'FATF', 'UN', 'UN/CEFACT',
  'ISO', 'ISO/IEC', 'IEC', // a body, not a standard — and the most-cited words in the corpus
])

/** One standard, one identity: `ISO-19011` and `ISO-19011:2018` are one, or a rewording reads as a loss. */
function bareIdentifier(word: string): string {
  return word.replace(/[^\p{L}\p{N}\u00A7]+$/u, '').replace(/:\d{4}$/, '')
}

/** An identifier, not a word of prose: the sigil also appears in sentences ABOUT citations. */
/** The part AFTER a namespace may be pure number — `ISO/IEC 9075-2`, `IFRS 1`, `EU 2015/849`. */
function isInstrumentNumber(word: string): boolean {
  return /\d/.test(word) || /^\p{Lu}/u.test(word)
}

function namesAStandard(word: string): boolean {
  // \p{L}, never [A-Za-z]: ЗДДС · ЗПУПС · Наредба Н-18 are dropped by an ASCII class — from BOTH
  // sides of a comparison, so the loss reads as balance. SKILL.md § the filter that could not see.
  if (!/\p{L}/u.test(word)) return false
  return /\d/.test(word) || /^\p{Lu}/u.test(word)
}

const TAG = new RegExp(String.raw`@(${CITATION_TAGS.join('|')})\s+(.+)`, 'g')

/** The standard a citation names, normalised: everything past the identifier is a human's gloss. */
export function citationToken(rest: string): string | undefined {
  const words = rest.trim().split(/\s+/).filter(Boolean).map(bareIdentifier)
  const head = words[0]
  if (head === undefined || !namesAStandard(head)) return undefined
  if (!NAMESPACE_WORDS.has(head)) return head
  // A namespace with nothing usable after it still cites its body; undefined would DROP it.
  const next = words[1]
  return next !== undefined && isInstrumentNumber(next) ? `${head} ${next}` : head
}

/** Every standard one file cites, read from its COMMENTS — a marker in a string literal is data. */
export function citationsIn(file: string, text: string = textOf(file)): ReadonlySet<string> {
  const out = new Set<string>()
  for (const comment of commentsOf(file, text)) {
    for (const line of comment.split('\n')) {
      TAG.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = TAG.exec(line)) !== null) {
        const token = citationToken(m[2] ?? '')
        if (token !== undefined) out.add(token)
      }
    }
  }
  return out
}

/**
 * Does this comment text cite a real standard? The one question another gate needs to ask.
 *
 * [[matrix]] asks it of a constant's own docstring: a statutory threshold is as underivable as a
 * physical one, and the citation beside it is the evidence that it IS statutory.
 */
export function citesStandard(comment: string): boolean {
  for (const line of comment.split('\n')) {
    TAG.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = TAG.exec(line)) !== null) {
      if (citationToken(m[2] ?? '') !== undefined) return true
    }
  }
  return false
}

/** standard → the atoms that cite it. The corpus's evidence surface, in one pass. */
export type CitationSurface = Record<string, readonly string[]>

export function corpusCitations(cwd: string = process.cwd()): CitationSurface {
  const byToken = new Map<string, Set<string>>()
  for (const file of corpusFiles(cwd, 'source')) {
    const rel = file.slice(file.indexOf('/src/') + 5)
    for (const token of citationsIn(file)) {
      const hit = byToken.get(token) ?? new Set<string>()
      hit.add(rel)
      byToken.set(token, hit)
    }
  }
  const out: CitationSurface = {}
  for (const [token, files] of [...byToken].sort(([a], [b]) => a.localeCompare(b))) {
    out[token] = [...files].sort()
  }
  return out
}

export interface CitationLoss {
  readonly standard: string
  /** Where it was cited before — the files a reader would have to restore it to. */
  readonly was: readonly string[]
}

/** Cited BEFORE, cited nowhere AFTER. A citation that MOVED is not a loss — evidence stays reachable. */
export function citationLosses(before: CitationSurface, after: CitationSurface): readonly CitationLoss[] {
  return Object.keys(before)
    .filter((standard) => after[standard] === undefined)
    .map((standard) => ({ standard, was: before[standard] ?? [] }))
}

/** Fail closed on any standard the corpus stopped citing. Zero is a theorem, not a ratchet. */
export function assertCitationsPreserved(before: CitationSurface, after: CitationSurface): void {
  const losses = citationLosses(before, after)
  if (losses.length === 0) return
  const detail = losses.map((l) => `  ${l.standard}  was cited in ${l.was.join(', ')}`).join('\n')
  throw new Error(`✖ citation law: ${losses.length} standard(s) left the evidence surface:\n${detail}`)
}

/** The surface at a git ref, through a throwaway worktree — history is the baseline, nothing is stored. */
export function citationsAtRef(ref: string, cwd: string = process.cwd()): CitationSurface {
  const at = execSync('mktemp -d', { encoding: 'utf8' }).trim()
  try {
    execSync(`git worktree add -q --detach ${at} ${ref}`, { cwd, stdio: 'pipe' })
    return corpusCitations(at)
  } finally {
    try {
      execSync(`git worktree remove --force ${at}`, { cwd, stdio: 'pipe' })
    } catch {
      execSync(`rm -rf ${at}`, { stdio: 'pipe' })
    }
  }
}

/** What the working tree no longer cites, versus a ref. */
export function citationRing(ref: string, cwd: string = process.cwd()): readonly CitationLoss[] {
  return citationLosses(citationsAtRef(ref, cwd), corpusCitations(cwd))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--census')) {
    const surface = corpusCitations()
    const tokens = Object.keys(surface)
    console.log(`citation surface — ${tokens.length} standard(s) cited across the corpus`)
    for (const t of tokens) console.log(`  ${t}  ×${surface[t]?.length ?? 0}`)
  } else {
    // The fork point, never HEAD — on a committed tree HEAD is trivially empty ([[rules]]/face).
    const ref = process.argv.find((a) => !a.startsWith('-') && a !== process.argv[0] && a !== process.argv[1]) ?? baseRef()
    const losses = citationRing(ref)
    console.log(`citation ring vs ${ref} — ${losses.length} standard(s) left the evidence surface`)
    for (const l of losses) console.log(`  ${l.standard}  was cited in ${l.was.slice(0, 3).join(', ')}`)
    if (losses.length > 0) process.exitCode = 1
  }
}
