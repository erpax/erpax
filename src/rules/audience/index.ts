/**
 * audience — a claim is addressed to someone. Stand where they stand, all fourteen at once.
 *
 * Every catastrophe this corpus produced was a lie only ONE reader could see, addressed to a reader nobody
 * asked:
 *
 *   the cash flow statement, hardcoded to -100000/50000, under `@compliance SOX §302`
 *     — §302 is the DIRECTOR's personal certification that the report contains no untrue statement.
 *   the period lock, a commented-out query inside an EMPTY try, under `@standard SOX:2002`
 *     — §404 is the AUDITOR's control: you cannot post to a closed period.
 *   the audit leaf, reversible base64 covering the first 24 bytes, under "tamper detection"
 *     — the AUDITOR and the НАП inspector are the only ones who would ever recompute it.
 *   46 dead statutory pointers
 *     — the COMPLIANCE-OFFICER's clause→code trace, and nobody walks it but them.
 *
 * A developer reading those files sees plausible code. **The defect exists only from the seat of the person
 * the claim is addressed to.** So this asks the question no other gate asks: not "is the code correct" but
 * **"what is each user being told that nothing can contradict?"**
 *
 * It is the law of [[perspective]] — one content, N views, derived never stored; the same invoice row is AR
 * from the seller and AP from the buyer — turned on the CORPUS itself. One corpus, fourteen readers, each
 * told a different story.
 *
 * COMPUTED vs DECLARED, stated plainly, because one is a theorem and the other is judgement:
 *
 *   COMPUTED  the readers  — `UserRole` in the generated types is `User['roles']`: the CONFIG's own answer,
 *                            not a list anyone typed. 14 of them.
 *   COMPUTED  the surface  — a file's own citations, read from its comments via [[syntax]]. The file names
 *                            its audience; this only listens.
 *   COMPUTED  the claims   — `@invariant` with no proof beside it, and the code's own confession that it is
 *                            not what it says ("simplified", "placeholder", "in production …").
 *   DECLARED  role→concern — WHICH standard answers to WHICH reader. SOX §302 answers to a director;
 *                            Наредба Н-18 answers to an НАП inspector. No theorem derives that. It is
 *                            written here, once, reviewable.
 *
 * That split is the honest form, and it is deliberate: a hand-picked list pretending to be a measurement is
 * exactly the frozen rosetta ([[rules]]/cycle) — a basis typed once, blind to whatever grew after. This one
 * is declared IN THE OPEN so it can be argued with, never inferred and never implied.
 *
 * Run: `tsx src/rules/audience/index.ts`
 *
 * @standard ISO-19011:2018 §6.4 audit-evidence — a citation is read by a person
 *
 * Composes [[rules]]/refutable · [[syntax]] · [[perspective]] · [[law]].
 */
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { commentsOf } from '@/syntax'

/**
 * WHO reads WHAT — **declared, not derived**. The only hand-written thing here, and the entry answers one
 * question: when a file cites this, whose signature is on the line?
 */
export const ROLE_CONCERN: Readonly<Record<string, readonly string[]>> = {
  director: ['SOX §302', 'SOX:2002', 'SOX §404', 'IAS-1', 'IAS 1'],
  auditor: ['ISO-19011', 'ISO 19011', 'SAF-T', 'Наредба', 'audit-trail', 'Law 60'],
  'audit-staff': ['ISO-19011', 'SAF-T', 'audit-trail'],
  'compliance-officer': ['Наредба', 'СУПТО', 'ЗДДС', 'ЗСч', 'GDPR', 'EN-16931', 'Peppol'],
  accountant: ['IAS-34', 'IAS 34', 'IAS-7', 'IAS 7', 'IFRS-15', 'ASC-606', 'ASC-230'],
  finance: ['IAS-7', 'IAS 7', 'ASC-230', 'ISO-4217'],
  'payroll-officer': ['IAS 19', 'IAS-19', 'ASC-710', 'Кодекс на труда'],
  hr: ['Кодекс на труда', 'ILO-', 'ISO-30414'],
  // super-admin holds the security posture — the latest ISO/IEC 27000 family. Mapped here (it was the
  // unmapped role the audience boundary named) so [[coverage]] computes which controls are PROVEN and which
  // are the security tools still to build. 27001/27002 are heavily cited (182× A.5.23 tenant-isolation);
  // 27017 · 27018 · 27701 are declared and UNCITED — the computed gap, not an imagined roadmap.
  'super-admin': ['ISO-27001', 'ISO-27002', 'ISO/IEC-27017', 'ISO/IEC-27018', 'ISO/IEC-27701', 'GDPR', 'ISO-27005'],
} as const

/** A claim standing on a reader's surface with nothing able to contradict it. */
export interface FacingClaim {
  readonly role: string
  readonly file: string
  readonly claim: string
  /** `unrefutable` — an `@invariant` with no proof beside it. `stub` — the code confesses it is not real. */
  readonly kind: 'unrefutable' | 'stub'
}

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|catalogue\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$|\.test\.tsx?$/
const CLAIM = /@invariant\s+([^\n*]+)/g
/** The code's own confession — the marker class that surfaced the fabricated cash flow statement. */
/**
 * A confession is PROSE about this code, never a SLUG. IFRS 9 §5.5 names its own
 * measurement model `simplified-approach` and IFRS 17 §53 names PAA
 * `premium-allocation-approach-simplified`; a work order's step code is
 * `in-production`. Matching inside a hyphenated compound reported the standard's
 * own vocabulary as an admission of incompleteness — the domain-collision class
 * that took rules/prose from 1,261 to 15. The guards require a non-hyphen on
 * both sides.
 */
const STUB =
  /(?<![\w-])(?:simplified|placeholder|in production|for now|would parse|would use|not implemented)(?![\w-])/i

const proofBeside = (file: string): boolean =>
  ['test.ts', 'test.tsx', 'index.test.ts'].some((n) => existsSync(join(dirname(file), n)))

const sources = (root: string): string[] => {
  const out: string[] = []
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
      if (/\.tsx?$/.test(e.name) && !GENERATED.test(p) && !IS_TEST.test(p)) out.push(p)
    }
  }
  walk(root)
  return out
}

/**
 * Every unproven claim, projected onto the reader it is addressed to — all perspectives at once.
 *
 * A file is on a reader's surface when it CITES a standard that reader answers to. Only PROSE addresses a
 * reader: a standard's name inside a string literal is data, and reading it as an address is the lie
 * [[rules]]/reference and [[standards]]/emit each paid for. [[syntax]] settles what a comment is.
 */
/**
 * The file that DECLARES this vocabulary cannot be judged by it. ROLE_CONCERN
 * names every standard, and STUB names every confession word, so this atom's own
 * prose matches itself for all eight readers — eight claims that are the law
 * being written down rather than anything asserted about the corpus. The same
 * exemption rules/echo makes for the framework namespace and rules/prose makes
 * for a lexicon atom: declared here, in the open, so it can be argued with.
 */
const DECLARES_THE_VOCABULARY = 'src/rules/audience/index.ts'

export function claimsFacing(cwd: string = process.cwd()): FacingClaim[] {
  const out: FacingClaim[] = []
  for (const f of sources(join(cwd, 'src'))) {
    if (relative(cwd, f).replace(/\\/g, '/') === DECLARES_THE_VOCABULARY) continue
    let text: string
    try {
      text = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    const prose = commentsOf(f, text).join('\n')
    if (!prose) continue

    const readers = Object.entries(ROLE_CONCERN)
      .filter(([, concerns]) => concerns.some((c) => prose.includes(c)))
      .map(([role]) => role)
    if (readers.length === 0) continue

    const rel = relative(cwd, f).replace(/\\/g, '/')
    const proven = proofBeside(f)
    const claims = proven ? [] : [...prose.matchAll(CLAIM)].map((m) => m[1]!.trim())
    const stub = STUB.test(prose)

    for (const role of readers) {
      for (const claim of claims) out.push({ role, file: rel, claim: claim.slice(0, 88), kind: 'unrefutable' })
      if (stub) out.push({ role, file: rel, claim: 'the code states it is not what it claims to be', kind: 'stub' })
    }
  }
  return out
}

/** What ONE reader is being told that nothing can contradict. */
export function facing(role: string, cwd: string = process.cwd()): FacingClaim[] {
  return claimsFacing(cwd).filter((c) => c.role === role)
}

/**
 * Gate: ratchets per reader. A claim addressed to someone who SIGNS, with nothing able to refute it, is the
 * shape every catastrophe here took.
 */
export function assertNothingUnprovenFacing(role: string, cwd: string, ceiling: number): void {
  const found = facing(role, cwd)
  if (found.length <= ceiling) return
  throw new Error(
    `✖ audience — ${found.length} unproven claim(s) face the ${role} (ceiling ${ceiling}):\n${found
      .slice(0, 8)
      .map((c) => `  ${c.file} → ${c.claim}`)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const all = claimsFacing()
  const byRole = new Map<string, FacingClaim[]>()
  for (const c of all) byRole.set(c.role, [...(byRole.get(c.role) ?? []), c])
  console.log(`audience — ${all.length} unproven claim(s) across ${byRole.size} reader(s)\n`)
  for (const [role, cs] of [...byRole].sort((a, b) => b[1].length - a[1].length)) {
    const files = new Set(cs.map((c) => c.file)).size
    const stubs = cs.filter((c) => c.kind === 'stub').length
    console.log(`  ${String(cs.length).padStart(3)}  ${role.padEnd(20)} ${files} file(s) · ${stubs} confessed stub(s)`)
  }
}

/** @index-cross.foldback child=rules/audience parent=rules — this cross folds back into its parent. */
