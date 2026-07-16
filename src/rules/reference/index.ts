/**
 * reference — the statute→code trace must resolve, or the ERP is not legally auditable.
 *
 * The corpus already fails closed on a dead atom link ([[confirm]]), but a dead **file-path** reference was
 * ungated — and it rotted: the Наредба Н-18 law in [[supto]] pointed at a `standards/` path for however long
 * after the matter moved to [[naredba]]/n/18. Ten files carried the stale pointer, and an auditor tracing the
 * statute to its implementation followed a 404. (The literal stale paths live in this atom's TEST, on
 * hermetic fixtures — quoting a dead path in prose would make this file fail its own gate.)
 *
 * That is a LEGAL defect, not a cosmetic one: Наредба Н-18 requires the software to be documented and
 * inspectable, and ISO-19011 §6.4 audit-evidence requires the citation to lead to the evidence. A law whose
 * pointer is broken cannot be reviewed, so it cannot be relied on.
 *
 * `deadReferences()` scans every `src/…` path written in prose or comments and asserts it exists on disk.
 * Fail closed: a moved file must carry its references with it, in the same diff.
 *
 * HONEST BOUNDARY: this proves the reference RESOLVES, never that it is the *right* reference — a pointer to
 * the wrong existing file still passes. It closes rot, not misattribution.
 *
 * @standard ISO-19011:2018 §6.4 audit-evidence — the citation must lead to the evidence
 * @standard BG Наредба-Н-18 §СУПТО — the software must be documented and inspectable
 *
 * Composes [[rules]] · [[confirm]] · [[law]].
 */
import { readFileSync, existsSync, readdirSync, type Dirent } from 'node:fs'
import { commentsOf } from '@/syntax'
import { join, relative } from 'node:path'

/** A `src/…` path written in prose/comments that does not exist on disk. */
export interface DeadReference {
  /** The file carrying the stale pointer (repo-relative). */
  readonly from: string
  /** The referenced path that does not resolve. */
  readonly target: string
}

/** Files whose references are scanned — prose and code comments alike. */
const SCANNED = /\.(ts|tsx|md|mdx)$/
/**
 * Not the audit surface. Generated faces regenerate from the tree (their refs are not hand-maintained), and a
 * TEST names paths that do not exist BY NATURE — hermetic fixture keys, and the comments explaining them.
 * Flagging a test's own fixtures is how a gate earns being switched off. An auditor reads the SKILL and the
 * code; a stale pointer in a test comment is the accepted cost of a gate that survives.
 */
const GENERATED =
  /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|(?:^|[/.])test\.tsx?$|LLM\.md$|README\.md$|diamond\.json$/
/** A `src/...` path reference: stops at whitespace, quote, backtick, paren, or a trailing sentence dot. */
const REF_RE = /src\/[A-Za-z0-9_./-]*[A-Za-z0-9_/-]/g

/**
 * The surface of a file where PROSE lives: its comments, or — for markdown — the whole document.
 *
 * A string literal is DATA, not prose: a path inside one is a fixture key, a glob or a config value, and it
 * states nothing about the corpus. Counting them flagged live code as rotten — this atom reported 97
 * statutory / 754 tree-wide dead pointers until strings were excluded; the honest numbers were 48 / 504.
 * (An example path cannot be written even here: this comment IS the scanned surface, so illustrating a dead
 * pointer would BE one. The literals live in this atom's test, on fixtures.) [[standards]]/emit had not
 * learned it and
 * filed a citation for any banner sigil in raw text — including inside a string, and including prose ABOUT
 * banners; measured across the live tree, 24 of its 5,881 hits were not prose at all. It is exported rather
 * than restated there, because the same lie written in two places is fixed in neither ([[merge]]/chainLeaf,
 * where one audit-leaf stub was hand-rolled eight times).
 */
export const proseOf = (file: string, text: string): string =>
  /\.(md|mdx)$/.test(file) ? text : commentsOf(file, text).join('\n')

/**
 * Resolve a reference the way a reader would: the literal path, or the module/face spellings a bare name
 * stands for (a bare atom name → its folder; a component name → its `.tsx`). A reference resolves if ANY
 * spelling exists — anything less would flag live pointers as dead.
 */
const resolves = (cwd: string, target: string): boolean =>
  existsSync(join(cwd, target)) ||
  ['.ts', '.tsx', '.md', '.mdx', '.json', '/index.ts', '/index.tsx', '/SKILL.md'].some((ext) =>
    existsSync(join(cwd, target + ext)),
  )

/**
 * Every dead `src/…` reference in the tree — the statute→code traces that no longer resolve. Skips
 * generated faces (regenerated, not hand-maintained) and resolves bare module spellings before flagging.
 */
/**
 * Dead references in the GIVEN files only — the EDIT-TIME check ([[confirm]]'s scope). The whole-tree scan
 * finds rot after it happened; this catches the stale pointer at the write, before it can rot at all. Same
 * resolver, so the hook and the gate can never disagree.
 */
export function deadReferencesIn(files: readonly string[], cwd: string = process.cwd()): DeadReference[] {
  const dead: DeadReference[] = []
  for (const p of files) {
    if (!SCANNED.test(p) || GENERATED.test(p)) continue
    let text: string
    try {
      text = readFileSync(p, 'utf8')
    } catch {
      continue
    }
    for (const target of new Set(proseOf(p, text).match(REF_RE) ?? [])) {
      if (!resolves(cwd, target)) {
        dead.push({ from: relative(cwd, p).replace(/\\/g, '/'), target })
      }
    }
  }
  return dead.sort((a, b) => (a.from + a.target < b.from + b.target ? -1 : 1))
}

export function deadReferences(cwd: string = process.cwd()): DeadReference[] {
  const root = join(cwd, 'src')
  const files: string[] = []
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
      files.push(p)
    }
  }
  walk(root)
  return deadReferencesIn(files, cwd)
}

/** A file carrying a Bulgarian statutory citation — the legally-auditable surface an inspector reads. */
const isStatutory = (text: string): boolean => /@standard BG |Наредба|СУПТО|ЗДДС|ЗСч/.test(text)

/**
 * Dead references FROM the statutory surface — the traces an НАП inspector or auditor would follow from a
 * cited clause to its implementation. This is the subset that must be **zero**: legal auditability cannot
 * ratchet down over time, it either holds today or the citation is unreviewable.
 */
export function deadStatutoryReferences(cwd: string = process.cwd()): DeadReference[] {
  return deadReferences(cwd).filter((d) => {
    try {
      return isStatutory(readFileSync(join(cwd, d.from), 'utf8'))
    } catch {
      return false
    }
  })
}

/**
 * THE LEGAL GATE. Every reference from a file citing Bulgarian statute must resolve, so the clause →
 * implementation trace an inspector follows always lands. The LAW is `ceiling = 0`: legal auditability is not
 * a thing you ratchet toward — a citation either leads to its evidence (ISO-19011 §6.4) or it is unreviewable.
 *
 * MEASURED DEBT (2026-07-16): **97** statutory pointers are dead — the [[audit]] submission log points at a
 * since-moved jobs path (the Приложение-38 monthly audit file), [[bg]]/identifier at a dissolved services
 * path (ЕГН), and nearly all aim at the `services/` · `standards/` structure whose references never followed
 * the code. Run the CLI face for the live list — it is computed, never transcribed here (a literal dead path
 * in prose fails this gate, as it should). **erpax is therefore NOT legally auditable today**, and saying
 * otherwise would be the claim this gate exists to prevent. Pass the current ceiling to block regression
 * while the 97 are repaired to zero; each repair needs the *right* target, not a blind rewrite.
 */
export function assertStatutoryTraceResolves(cwd: string = process.cwd(), ceiling = 0): void {
  const dead = deadStatutoryReferences(cwd)
  if (dead.length <= ceiling) return
  const lines = dead.slice(0, 20).map((d) => `  ${d.from} → ${d.target} (does not exist)`)
  throw new Error(
    `✖ reference — ${dead.length} dead STATUTORY pointer(s) (ceiling ${ceiling}); the clause→code trace an auditor follows is broken:\n${lines.join('\n')}`,
  )
}

/**
 * The whole-tree ratchet — the corpus carries **754** dead pointers (measured 2026-07-16), nearly all aimed at
 * the dissolved `src/services/*` structure whose references never followed the code. It cannot fail closed at
 * zero today, so it fails closed on GETTING WORSE, and the ceiling ratchets DOWN as refs are repaired.
 *
 * ENFORCEMENT DEBT: the ceiling is passed in rather than read from the emitted `RATCHET_GENERATED` snapshot —
 * wiring `reference` in as a real axis (`pnpm rules:ratchet`) is the remaining step ([[rules]]).
 */
export function assertReferencesResolve(cwd: string = process.cwd(), ceiling: number): void {
  const dead = deadReferences(cwd)
  if (dead.length <= ceiling) return
  throw new Error(
    `✖ reference — ${dead.length} dead pointer(s) exceeds the ratchet ceiling ${ceiling}. A moved file must carry its references in the same diff.`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const dead = deadReferences()
  console.log(`reference — ${dead.length} dead src/… pointer(s)`)
  for (const d of dead.slice(0, 20)) console.log(`  ${d.from} → ${d.target}`)
}
