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
import { join, dirname, basename } from 'node:path'

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
