import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { commentsOf } from '@/syntax'

/**
 * entropy/implication — the bare implication, and the files allowed to speak it. See ./SKILL.md.
 */

/** An entropy premise within reach of an `infinite … (cost|mass|work)` consequent. */
const BARE_IMPLICATION =
  /(zero[\s-]*entropy|reciprocity\s*=\s*1|entropy\s*(\(\))?\s*(===?|⇒|=>|→|implies)).{0,80}?(infinit|∞).{0,40}?(cost|mass|work)/i

/** Qualified or negated. `\bfinite\b` is word-bounded or "in·finite" would mask every claim. */
const IMPLICATION_QUALIFIER =
  /\bnot\b|does not|cannot|distinct|do not conflate|coverage\s*[=<>]?\s*1|\bfinite\b|counter-?example|only at coverage|≠|is NOT|by itself|anchor/i

/** Quoted, backticked or emphasised ⇒ CITED, not asserted. See ./SKILL.md. */
const CITES_THE_SLOGAN =
  /["“”`*]\s*zero[\s-]*entropy[^"“”`*]{0,60}(infinit|∞)[^"“”`*]{0,30}(cost|mass|work)\s*["“”`*]/i

/** A sentence ASSERTING the implication — no local qualifier, and not merely quoting it. */
export const statesBareImplication = (raw: string): boolean => {
  const sentence = unlinked(raw)
  return BARE_IMPLICATION.test(sentence) && !IMPLICATION_QUALIFIER.test(sentence) && !CITES_THE_SLOGAN.test(sentence)
}

/** Sentence-ish split, so a qualifier must be LOCAL to the implication. */
const sentencesOf = (text: string): string[] => text.split(/(?<=[.;])\s+|\n+/)

/** Brackets removed so the predicate sees the WORDS — it read 0 without this. See ./SKILL.md. */
const unlinked = (text: string): string => text.replace(/\[\[([^\]|]+)(\|[^\]]*)?\]\]/g, '$1')

export interface BareClaim {
  readonly file: string
  readonly sentence: string
}

/**
 * Every hand-maintained sentence asserting it. Generated faces restate their source.
 *
 * @invariant a claim in a COMMENT fires; the identical claim in a STRING LITERAL does not — asserted in ./test.ts
 * @invariant a slogan in quotes is cited, not asserted — asserted in ./test.ts
 * @invariant wikilinks do not hide it — asserted in ./test.ts
 * @invariant the corpus asserts it nowhere — asserted in ./test.ts
 */
/** The files that DEFINE or REGISTER this check. DECLARED — see ./SKILL.md. */
const DEFINES_THE_LAW: readonly string[] = [
  'src/entropy/index.ts',
  'src/entropy/test.ts',
  'src/rules/index.ts',
]

export function bareImplications(cwd: string = process.cwd()): BareClaim[] {
  const out: BareClaim[] = []
  const walk = (d: string): void => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      if (!/\.(md|tsx?)$/.test(e.name)) continue
      if (/^(LLM|README)\.md$/.test(e.name) || /\.generated\.tsx?$|^(catalogue|translations|payload-types)\./.test(e.name)) continue
      const rel = relative(cwd, p)
      if (DEFINES_THE_LAW.includes(rel)) continue
      // A `.md` is prose whole; in code prose means COMMENTS, and a claim in a string literal is
      // data. See ./SKILL.md § in code, prose means comments.
      const text = readFileSync(p, 'utf8')
      const prose = e.name.endsWith('.md') ? text : commentsOf(p, text).join('\n')
      for (const s of sentencesOf(prose)) {
        if (statesBareImplication(s)) out.push({ file: rel, sentence: s.trim().slice(0, 160) })
      }
    }
  }
  walk(join(cwd, 'src'))
  return out
}
