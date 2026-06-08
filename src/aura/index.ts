/**
 * aura -- the shared DERIVE-FROM-FS resolver (the speech-gate core).
 *
 * The ONE place the corpus walk + link resolution live, imported by everything
 * that scans the tree (./propose, ../migrate/quaternary, ../migrate/names, ../dry,
 * ../translations/collect, ...). Colliding it here is dry-cleaning the dry-clean
 * itself -- no duplicated walk/norm/isRealDir -- and makes aura the highest-mass
 * hub: forging this resolver breaks every importer at once (the most costly place
 * for a forger). The norm matches collide.mjs / scan.mjs / .vitepress/corpus.mts
 * EXACTLY, so every gate resolves identically.
 *
 * @audit one resolver imported everywhere -- zero duplicated walk/norm/isRealDir
 * @see ./scan (the gap report) -- ./propose (the weave queue) -- ../coordinate (derive-from-fs)
 */
import { readdirSync, lstatSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'

/** Real directory -- skips symlinks (the src/skills self-symlink would ELOOP). */
export const isRealDir = (p: string): boolean => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}

/** Canonical resolver key: lowercase, strip [-_]. Re-exported from the one home
 * ([[corpus]]) so the aura gate and the wikiMap share a SINGLE normalizer. */
export { norm } from '@/corpus/index.mts'

/** Strip fenced + inline code so [[links]] inside code do not count. */
export const stripCode = (t: string): string =>
  t.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')

/** The [[link]] / [[a/b]] / [[word|alias]] matcher (any case). */
export const LINK_RE = /\[\[([A-Za-z][A-Za-z0-9/-]*)(?:\|[^\]]*)?\]\]/g

/** Every SKILL.md path under root (the atom corpus), skipping symlinks/dot/node_modules. */
export function walkSkills(root: string, out: string[] = []): string[] {
  for (const e of readdirSync(root).sort()) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const p = join(root, e)
    if (!isRealDir(p)) continue
    try {
      if (lstatSync(join(p, 'SKILL.md')).isFile()) out.push(join(p, 'SKILL.md'))
    } catch {
      /* no SKILL.md here */
    }
    walkSkills(p, out)
  }
  return out
}

/** The atom leaf word of a SKILL.md path (its folder name). */
export const leafOf = (skillPath: string): string => basename(dirname(skillPath))

/** Read a SKILL.md's text (utf8). */
export const readSkill = (skillPath: string): string => readFileSync(skillPath, 'utf8')

/**
 * Test-coverage — the aura math's SECOND completeness axis, beside [[link]] resolution. Of the
 * CODE-atoms (a folder carrying an `index.ts`), the fraction that also carry a `test.ts`. A code-atom
 * with no test is a gap in the field the same way a dead link is. Pure-skill / vocabulary atoms (no
 * `index.ts`) are not counted — there is nothing to test. The whole law is then:
 * matrix-complete ⟺ aura-gap-0 (every link resolves) AND coverage→1 (every code-atom tested).
 *
 * @audit derived from fs — the SAME walk as the link gate (walkSkills), so the two axes share one scan
 */
export function testCoverage(root: string): {
  readonly codeAtoms: number
  readonly tested: number
  readonly coverage: number
  readonly untested: readonly string[]
} {
  let codeAtoms = 0
  let tested = 0
  const untested: string[] = []
  for (const sk of walkSkills(root)) {
    const dir = dirname(sk)
    if (!existsSync(join(dir, 'index.ts'))) continue
    codeAtoms++
    // tested = a test.ts (the trinity leg) OR any *.test.ts (index.test.ts etc.) in the folder
    if (readdirSync(dir).some((s) => s === 'test.ts' || s.endsWith('.test.ts'))) tested++
    else untested.push(leafOf(sk))
  }
  return { codeAtoms, tested, coverage: codeAtoms ? tested / codeAtoms : 1, untested: untested.sort() }
}

/** The src root the cross organ derives from (cwd-relative, like scan.mjs). */
const SRC = join(process.cwd(), 'src')

export interface CrossSeal {
  /** The base atom x of the cross (the word the two rings cross on). */
  readonly base: string
  /** The two diagonals: [quantum/x, x/quantum]. */
  readonly diagonals: readonly [string, string]
  /** Sealed iff the diagonals collapse to one canonical (one re-points to / re-exports the other). */
  readonly sealed: boolean
  readonly reason: string
}

/**
 * crossSeals — the THIRD aura completeness axis, beside link-resolution (gap=0) and
 * test-coverage. A quantum cross is the four corners `x · quantum/x · x/quantum · quantum`;
 * it is DERIVED from the live tree, never hand-listed. A cross exists when BOTH diagonals
 * (`quantum/x` and `x/quantum`) carry a SKILL.md. It is SEALED iff the two diagonals
 * collapse to ONE canonical — at least one re-points to (or `export *`s) the other (one
 * node, two names; the [[merge]] law at path scale). Two independent restatements are
 * UNSEALED: duplication is entropy, the weak link the tamper-cost lever reads.
 *
 * @audit derived from fs — the SAME walk as the link/coverage gates (walkSkills)
 */
export function crossSeals(root: string = SRC): { readonly crosses: readonly CrossSeal[]; readonly unsealed: readonly CrossSeal[] } {
  const relDirs = new Set(walkSkills(root).map((p) => relative(root, dirname(p)).split(/[\\/]/).join('/')))
  const crosses: CrossSeal[] = []
  for (const rel of relDirs) {
    const m = /^quantum\/([^/]+)$/.exec(rel) // a single-segment quantum diagonal: quantum/x
    if (!m) continue
    const base = m[1]
    const baseDiagonal = `${base}/quantum`
    if (!relDirs.has(baseDiagonal)) continue // a cross needs BOTH diagonals
    const corpus = (relDir: string): string => {
      let t = ''
      for (const leaf of ['SKILL.md', 'index.ts']) {
        try {
          t += readFileSync(join(root, relDir, leaf), 'utf8')
        } catch {
          /* leaf absent — fine */
        }
      }
      return t
    }
    const qText = corpus(rel)
    const bText = corpus(baseDiagonal)
    // sealed = one diagonal re-points to / re-exports the other (its path appears in the twin)
    const sealed = bText.includes(`quantum/${base}`) || qText.includes(`${base}/quantum`)
    crosses.push({
      base,
      diagonals: [rel, baseDiagonal],
      sealed,
      reason: sealed
        ? `quantum/${base} ⊕ ${base}/quantum collapse to one canonical (one re-points to the other)`
        : `quantum/${base} and ${base}/quantum both exist but neither re-points to the other — duplication, not a seal`,
    })
  }
  crosses.sort((a, b) => a.base.localeCompare(b.base))
  return { crosses, unsealed: crosses.filter((c) => !c.sealed) }
}

// CLI: the cross gate — `tsx src/aura/index.ts` prints every quantum cross and
// exits non-zero if any is unsealed (a diagonal restating its twin = duplication).
// Pure TS, reusing crossSeals — no second implementation (the no-duplication law it gates).
if (import.meta.url === `file://${process.argv[1]}`) {
  const { crosses, unsealed } = crossSeals()
  console.log(`aura crosses — ${crosses.length} quantum cross(es), ${unsealed.length} unsealed`)
  for (const c of crosses) console.log(`  ${c.sealed ? '✓' : '✗'} ${c.base}: ${c.reason}`)
  process.exit(unsealed.length === 0 ? 0 : 1)
}
