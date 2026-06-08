/**
 * computed — writing metrics derived from sealed coordinates (not prose templates).
 *
 * Reads live SKILL · README · LLM faces and folds:
 *   - debit/credit statement (readme deriveFolderAccounting)
 *   - law lines (paper.ts LAW_RE)
 *   - wikilink density (proseEntropy)
 *   - eb per word (pathComparableUnits + balance variance · LANDAUER_BIT)
 *
 * @see ../readme/paper — ../readme — ../skill/router/prose-entropy — ./SKILL.md
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { deriveFolderAccounting } from '@/readme'
import { LANDAUER_BIT } from '@/readme/entropy'
import { scientificPaperOf } from '@/readme/paper'
import { proseEntropy } from '@/skill/router/prose-entropy'
import { pathComparableUnits } from '@/wave/load'
import { nodeOf } from '@/uuid/matrix'

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/
const LAW_RE = /\*\*Law\s+—\s*\[\[law\]\]:\s*(.+?)\*\*/g

export interface ComputedWriting {
  readonly atomPath: string
  readonly contentUuid: string | null
  readonly horo: number | null
  readonly wordCount: number
  readonly lawLines: number
  readonly wikilinkCount: number
  /** [[links]] per 100 prose words — reference density. */
  readonly wikilinkDensity: number
  /** Plain-text fraction — entropy to drive down. */
  readonly proseRatio: number
  readonly debitTotal: number
  readonly creditTotal: number
  readonly balanced: boolean
  readonly variance: number
  readonly ebTotal: number
  readonly ebPerWord: number
  readonly trinity: { readonly form: 0 | 1; readonly code: 0 | 1; readonly proof: 0 | 1 }
  /** Composite skill score 0–100 — higher is better craft. */
  readonly score: number
}

export interface ComputedWritingOpts {
  readonly cwd?: string
}

const stripBody = (text: string): string =>
  text
    .replace(FRONTMATTER, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')

const wordCountOf = (text: string): number => {
  const body = stripBody(text)
  const words = body.match(/[a-zA-Z][a-zA-Z0-9'-]*/g)
  return words?.length ?? 0
}

const lawLinesOf = (text: string): number => {
  let n = 0
  for (const _ of text.matchAll(LAW_RE)) n++
  return n
}

const readFace = (dir: string, name: string): string | null => {
  const p = join(dir, name)
  if (!existsSync(p)) return null
  return readFileSync(p, 'utf8')
}

const trinityOf = (dir: string): { form: 0 | 1; code: 0 | 1; proof: 0 | 1 } => {
  const form = (existsSync(join(dir, 'SKILL.md')) ? 1 : 0) as 0 | 1
  const code = (existsSync(join(dir, 'index.ts')) || existsSync(join(dir, 'index.tsx')) ? 1 : 0) as 0 | 1
  const proof = (code && existsSync(join(dir, 'test.ts')) ? 1 : 0) as 0 | 1
  return { form, code, proof }
}

const sumAmounts = (lines: ReadonlyArray<{ readonly amount: number }>): number =>
  lines.reduce((s, l) => s + l.amount, 0)

/** Composite writing skill score — variance · prose · trinity · balance · reference density. */
export function writingScore(w: Pick<
  ComputedWriting,
  'variance' | 'proseRatio' | 'balanced' | 'wikilinkDensity' | 'lawLines' | 'trinity'
>): number {
  let score = 100
  score -= Math.min(40, w.variance * 20)
  score -= Math.min(30, w.proseRatio * 40)
  if (!w.balanced) score -= 15
  if (w.trinity.form + w.trinity.code + w.trinity.proof < 3) score -= 10
  if (w.lawLines === 0) score -= 10
  score += Math.min(15, w.wikilinkDensity * 2)
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Derive writing metrics for one atom path — pure given file contents on disk.
 * Same path ⇒ same score (merge-safe, tamper-evident).
 */
export function computedWritingForPath(
  atomPath: string,
  opts: ComputedWritingOpts = {},
): ComputedWriting {
  const cwd = opts.cwd ?? process.cwd()
  const dir = join(cwd, 'src', atomPath)
  const skillText = readFace(dir, 'SKILL.md') ?? ''
  const readmeText = readFace(dir, 'README.md') ?? ''
  const llmText = readFace(dir, 'LLM.md') ?? ''
  const combined = [skillText, readmeText, llmText].filter(Boolean).join('\n\n')
  const bodyForEntropy = skillText || combined
  const entropy = proseEntropy(bodyForEntropy)
  const words = wordCountOf(combined || skillText)
  const laws = lawLinesOf(combined || skillText)
  const statement = deriveFolderAccounting(atomPath, cwd)
  const debitTotal = sumAmounts(statement.debits)
  const creditTotal = sumAmounts(statement.credits)
  const node = nodeOf(atomPath) ?? nodeOf(atomPath.split('/').pop() ?? atomPath)
  const paper = skillText
    ? scientificPaperOf(skillText, `src/${atomPath}/SKILL.md`, statement.balanced)
    : null
  const trinity = trinityOf(dir)
  const ebTotal =
    Math.round((pathComparableUnits(atomPath) + statement.variance * LANDAUER_BIT) * 1000) / 1000
  const ebPerWord = words > 0 ? Math.round((ebTotal / words) * 10000) / 10000 : ebTotal
  const wikilinkDensity = words > 0 ? Math.round((entropy.links / words) * 10000) / 100 : 0

  const partial = {
    variance: statement.variance,
    proseRatio: entropy.proseRatio,
    balanced: statement.balanced,
    wikilinkDensity,
    lawLines: laws,
    trinity,
  }

  return {
    atomPath,
    contentUuid: paper?.uuid ?? node?.uuid ?? null,
    horo: node?.horo ?? null,
    wordCount: words,
    lawLines: laws,
    wikilinkCount: entropy.links,
    wikilinkDensity,
    proseRatio: entropy.proseRatio,
    debitTotal,
    creditTotal,
    balanced: statement.balanced,
    variance: statement.variance,
    ebTotal,
    ebPerWord,
    trinity,
    score: writingScore(partial),
  }
}
