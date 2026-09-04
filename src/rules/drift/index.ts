import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
/**
 * rules/drift — a number typed into prose is a copy of an answer, and copies go stale.
 *
 * The arbiter is the generated matrix: ASKED, never restated, so the corpus grows and the expected
 * value moves by itself. Same-line matching only, and a DATED line is exempt.
 *
 * @see ./SKILL.md — the seven found, the three that were records, and the port the first pass
 *   mistook for a node count.
 */

export interface DriftClaim {
  readonly file: string
  readonly line: number
  readonly text: string
  readonly stated: number
  readonly arbiter: string
  readonly actual: number
}

/** Same-line, corpus-wide phrasings only — `N nodes` / `N matrix nodes` / `N node literals`. */
const NODE_CLAIM = /\b([\d][\d,]{2,})\s+(?:matrix\s+)?node(?:s|\sliterals)?\b/

/** Files whose numbers are a SCOPED illustration, not a claim about the corpus's size. */
const SCOPED = new Set(['src/sparsity/SKILL.md', 'src/vocabulary/SKILL.md'])

/** A DATED line is a RECORD, not a restatement — see ./SKILL.md for why the exemption is a date. */
const DATED = /\b(19|20)\d{2}-\d{2}-\d{2}\b/

const skillFiles = (cwd: string): string[] => {
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'SKILL.md') out.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return out.sort()
}

/**
 * Every hand-maintained `.md` in the repo — including the ROOT files.
 *
 * `skillFiles` walks `src` only, and the worst stale claim this corpus carried was in `AGENTS.md`
 * at the root: the file loaded into every agent's prompt on every turn. A checker whose domain
 * stops at `src` cannot see the most-read prose in the repository ([[rules]]/domain).
 */
const proseFiles = (cwd: string): string[] => {
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name === 'node_modules' || (e.name.startsWith('.') && e.name !== '.claude')) continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.md')) out.push(p)
    }
  }
  walk(cwd)
  return out.sort()
}

/**
 * Every prose line stating a corpus node count that disagrees with the matrix.
 *
 * The arbiter is read, never declared: `UUID_MATRIX_NODES.length` is the expected value, so a
 * corpus that grows moves the gate with it.
 */
export function driftingClaims(cwd: string = process.cwd()): DriftClaim[] {
  const actual = UUID_MATRIX_NODES.length
  const out: DriftClaim[] = []
  for (const f of skillFiles(cwd)) {
    const rel = f.replace(`${cwd}/`, '')
    if (SCOPED.has(rel)) continue
    const lines = readFileSync(f, 'utf8').split('\n')
    for (let i = 0; i < lines.length; i++) {
      const m = NODE_CLAIM.exec(lines[i]!)
      if (!m) continue
      if (DATED.test(lines[i]!)) continue
      const stated = Number(m[1]!.replace(/,/g, ''))
      if (!Number.isFinite(stated) || stated === actual) continue
      out.push({
        file: rel,
        line: i + 1,
        text: lines[i]!.trim().slice(0, 120),
        stated,
        arbiter: 'UUID_MATRIX_NODES.length',
        actual,
      })
    }
  }
  return out
}

/** Fails closed above the ratchet floor. The floor is seeded, never inferred. */
export function assertNoDrift(cwd: string = process.cwd(), ceiling: number): void {
  const found = driftingClaims(cwd)
  if (found.length <= ceiling) return
  throw new Error(
    `✖ drift — ${found.length} prose claim(s) disagree with the matrix (ceiling ${ceiling}):\n` +
      found.map((d) => `  ${d.file}:${d.line} states ${d.stated}, arbiter says ${d.actual}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const found = driftingClaims()
  console.log(`drift — ${found.length} prose claim(s) disagree with ${found[0]?.arbiter ?? 'the matrix'}`)
  for (const d of found) console.log(`  ${d.file}:${d.line}  states ${d.stated} · actual ${d.actual}\n    ${d.text}`)
}

export interface SizeClaim {
  readonly file: string
  readonly line: number
  readonly target: string
  readonly claimed: string
  readonly actualBytes: number
}

/** A size in prose, and the repo file it is about. */
const SIZE = /(\d+(?:\.\d+)?)\s?(MB|KB|GB)\b/i
const TARGET = /(?:src|scripts|packages)\/[A-Za-z0-9_./-]+\.\w+/

/** DECLARED: a size claim within this factor of the file is not drift. Sizes move; orders don't. */
const SIZE_TOLERANCE = 2

/**
 * Prose stating a BYTE SIZE for a file the repo has, where the two disagree by an order of scale.
 *
 * The node-count law's own honest boundary named this as the same class, not yet gated. It was
 * not hypothetical: `AGENTS.md` — the file loaded into every agent's prompt on every turn — said
 * `skills.index.ts` is a **77MB bundle**. The checked-in file is a **269-byte stub with an empty
 * array**, so the claim was wrong by 286,000×, and every agent read it every turn.
 *
 * A DATED line is exempt for the same reason as a node count: a dated record is a measurement,
 * and correcting it to today's number would falsify the thing it exists to report.
 */
export function staleSizeClaims(cwd: string = process.cwd()): SizeClaim[] {
  const out: SizeClaim[] = []
  for (const file of proseFiles(cwd)) {
    const rel = relative(cwd, file)
    // a generated face restates what the tree computes; it is not a hand-maintained claim
    if (/\/(README|LLM)\.md$/.test(rel) && rel.startsWith('src/')) continue
    let text = ''
    try {
      text = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    for (const [i, line] of text.split('\n').entries()) {
      if (DATED.test(line)) continue
      const size = SIZE.exec(line)
      const target = TARGET.exec(line)
      if (size === null || target === null) continue
      let actualBytes = 0
      try {
        actualBytes = statSync(join(cwd, target[0])).size
      } catch {
        continue // a claim about a file the repo does not have is [[rules]]/reference's problem
      }
      const unit = size[2]!.toUpperCase()
      const claimed = Number(size[1]) * (unit === 'GB' ? 1e9 : unit === 'MB' ? 1e6 : 1e3)
      // no host Math ([[algebra]]/host): a guard against divide-by-zero is a comparison
      const ratio = claimed / (actualBytes > 0 ? actualBytes : 1)
      if (ratio > SIZE_TOLERANCE || ratio < 1 / SIZE_TOLERANCE) {
        out.push({ file: rel, line: i + 1, target: target[0], claimed: size[0], actualBytes })
      }
    }
  }
  return out
}

/** Zero is a theorem: there is no acceptable number of sentences an order of scale from the file. */
export function assertNoStaleSizes(cwd: string = process.cwd(), ceiling = 0): void {
  const bad = staleSizeClaims(cwd)
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ rules/drift — ${bad.length} size claim(s) disagree with the file (ceiling ${ceiling}):\n` +
      bad.map((c) => `  ${c.file}:${c.line} claims ${c.claimed} for ${c.target} — actual ${c.actualBytes} bytes`).join('\n'),
  )
}
