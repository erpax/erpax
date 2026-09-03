import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
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
