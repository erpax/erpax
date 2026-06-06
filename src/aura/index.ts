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
import { readdirSync, lstatSync, readFileSync } from 'node:fs'
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
