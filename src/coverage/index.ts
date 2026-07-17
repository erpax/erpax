/**
 * coverage — the development waves ARE theorems, and this computes which remain.
 *
 * The whole session converges here. [[rules]]/audience projects a claim onto the reader it is addressed to;
 * [[audit]]/agent turns each reader into an auditor; the auditors DEFINE the gates. The last step is the
 * PLAN — and a plan of prose is what this corpus exists to refuse. So the plan is a MATRIX, computed:
 *
 *   participants (the 14 roles, from the config)  ×  standards (their concerns, declared in audience)
 *
 * A CELL is (participant, standard). It is COVERED when a control for that standard exists WITH a proof
 * beside it — a theorem the participant can trace. An UNCOVERED cell is a WAVE: one theorem to establish, a
 * control plus its test, for a named participant under a named standard. 100% coverage = every standard,
 * faced by every participant it concerns, has a proof. The waves are not a roadmap you read; they are the
 * empty cells you fill, and "done" is measurable to the cell.
 *
 * WHY THIS IS NOT A HAND-WRITTEN BACKLOG — a typed roadmap is the frozen rosetta ([[rules]]/cycle): a list
 * someone wrote, blind to what the corpus grew. This DERIVES the cells from the participant→standard map and
 * the proof-legs on disk, so a wave appears the moment a standard gains a concerned reader and disappears
 * the moment a test lands beside its control. The plan recomputes; it is never maintained.
 *
 * HONEST BOUNDARY — a covered cell proves a control EXISTS and is TESTED, never that the test is CORRECT (a
 * test can assert a lie — [[rules]]/refutable's boundary, inherited through the whole chain). 100% coverage
 * is the floor of trust, not its ceiling: it means nothing is unproven, not that everything proven is true.
 * And the participant→standard map is DECLARED (in audience), so a standard concerning a reader nobody
 * mapped is invisible — the map's completeness bounds the matrix's.
 *
 * Run: `tsx src/coverage/index.ts`
 *
 * @standard ISO-19011:2018 §6.4 — audit evidence: coverage is traceable, cell by cell
 *
 * Composes [[rules]]/audience · [[syntax]] · [[law]].
 */
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, dirname } from 'node:path'
import { commentsOf } from '@/syntax'
import { ROLE_CONCERN } from '@/rules/audience'

/** Canonical atom path. */
export const atomPath = 'coverage' as const

/** Who is harmed / who signs first — the order waves are worked, most-exposed participant first. */
const PARTICIPANT_PRIORITY = [
  'director',
  'auditor',
  'compliance-officer',
  'accountant',
  'finance',
  'audit-staff',
  'payroll-officer',
  'hr',
] as const

/** One cell of the plan: a participant's concern, and whether a proven control faces them under it. */
export interface Cell {
  readonly participant: string
  readonly standard: string
  readonly covered: boolean
}

/** A wave: an uncovered cell — one theorem to establish, a control plus its test, for a named reader. */
export interface Wave {
  readonly participant: string
  readonly standard: string
  /** The theorem to prove, stated as an auditor would: this reader can trace this standard to a tested control. */
  readonly theorem: string
}

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|catalogue\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$/
const proofBeside = (file: string): boolean =>
  ['test.ts', 'test.tsx', 'index.test.ts'].some((n) => existsSync(join(dirname(file), n)))

/** Every source file's comment prose, and whether it carries a proof leg — computed once, read per standard. */
function proofSurface(cwd: string): { prose: string; proven: boolean }[] {
  const out: { prose: string; proven: boolean }[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (!/\.tsx?$/.test(e.name) || GENERATED.test(p) || IS_TEST.test(p)) continue
      let text: string
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const prose = commentsOf(p, text).join('\n')
      if (prose) out.push({ prose, proven: proofBeside(p) })
    }
  }
  walk(join(cwd, 'src'))
  return out
}

/**
 * The coverage matrix — every (participant, standard) cell, covered iff a PROVEN control cites that standard.
 *
 * @invariant a cell is covered ⇔ some file cites the standard in a comment AND has a test beside it
 */
export function coverageMatrix(cwd: string = process.cwd()): Cell[] {
  const surface = proofSurface(cwd)
  const cells: Cell[] = []
  for (const [participant, concerns] of Object.entries(ROLE_CONCERN)) {
    for (const standard of concerns) {
      const covered = surface.some((f) => f.proven && f.prose.includes(standard))
      cells.push({ participant, standard, covered })
    }
  }
  return cells
}

/** Covered cells / total — the one number. 1 is the floor of trust: nothing unproven (never: all true). */
export function coverageRatio(cwd: string = process.cwd()): number {
  const cells = coverageMatrix(cwd)
  return cells.length === 0 ? 1 : cells.filter((c) => c.covered).length / cells.length
}

/**
 * The development waves — the uncovered cells, ordered most-exposed participant first. Each IS a theorem:
 * establish a tested control for this standard, facing this reader. The plan, computed, never written.
 */
export function developmentWaves(cwd: string = process.cwd()): Wave[] {
  const rank = (p: string): number => {
    const i = (PARTICIPANT_PRIORITY as readonly string[]).indexOf(p)
    return i === -1 ? PARTICIPANT_PRIORITY.length : i
  }
  return coverageMatrix(cwd)
    .filter((c) => !c.covered)
    .sort((a, b) => rank(a.participant) - rank(b.participant))
    .map((c) => ({
      participant: c.participant,
      standard: c.standard,
      theorem: `the ${c.participant} can trace ${c.standard} to a control with a test beside it`,
    }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const cells = coverageMatrix()
  const waves = developmentWaves()
  const pct = (100 * coverageRatio()).toFixed(1)
  console.log(`coverage — ${cells.filter((c) => c.covered).length}/${cells.length} cells proven (${pct}%)\n`)
  console.log(`${waves.length} development wave(s) — each a theorem to prove, most-exposed reader first:\n`)
  let last = ''
  for (const w of waves.slice(0, 20)) {
    if (w.participant !== last) {
      console.log(`  ${w.participant}`)
      last = w.participant
    }
    console.log(`    ⬚ ${w.standard}`)
  }
}
