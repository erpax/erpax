/**
 * quaternary — the four-file folder law, computed from the live tree.
 *
 * An atom folder holds ONLY the quaternary: SKILL.md (antimatter) · index.ts
 * (matter) · test.ts (the test) · translations.ts (the ported speech). Any other
 * file is entropy — a violation to be COLLIDED into its own atom ([[collapse]] ·
 * [[merge]] · [[dissolution]]). This module computes the live violation set (the
 * collision queue); the co-located test.ts ratchets it toward zero.
 *
 * Scope = ATOM folders (those that directly carry a SKILL.md) — the dissolution
 * unit. Subdirectories are fine (nesting is how a violation becomes a sub-atom).
 * Derive-from-fs ([[aura]] · [[coordinate]]): the tree is the truth.
 *
 *   tsx src/migrate/quaternary/index.ts          # print the violation queue
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit the folder law is computed, never hand-maintained
 * @see ../ (the migrating skills that collide these) · ../../aura (the link gap)
 */
import { readdirSync, lstatSync } from 'node:fs'
import { join } from 'node:path'

/** The only files an atom folder may directly contain. */
export const QUATERNARY = ['SKILL.md', 'index.ts', 'test.ts', 'translations.ts'] as const
const ALLOWED: ReadonlySet<string> = new Set(QUATERNARY)

export interface Violation {
  /** src-relative atom folder. */
  readonly folder: string
  /** the offending file name. */
  readonly file: string
}

const isRealDir = (p: string): boolean => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}

/**
 * Every file, in an atom folder (one that directly carries SKILL.md), that is
 * not in the quaternary — the collision queue, computed from the live tree.
 */
export function quaternaryViolations(root: string = join(process.cwd(), 'src')): Violation[] {
  const out: Violation[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    const files = entries.filter((e) => !isRealDir(join(dir, e)))
    const isAtom = files.includes('SKILL.md')
    if (isAtom) {
      for (const f of files) {
        if (f.startsWith('.')) continue // dot-files (e.g. .proposals.json) are scratch, not atom files
        if (!ALLOWED.has(f)) out.push({ folder: dir.slice(root.length + 1) || '.', file: f })
      }
    }
    for (const e of entries) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      if (isRealDir(p)) walk(p)
    }
  }
  walk(root)
  return out
}

// CLI: print the live violation queue, grouped by file kind.
if (import.meta.url === `file://${process.argv[1]}`) {
  const v = quaternaryViolations()
  const folders = new Set(v.map((x) => x.folder))
  const byExt = new Map<string, number>()
  const byName = new Map<string, number>()
  for (const { file } of v) {
    const ext = file.includes('.') ? file.slice(file.lastIndexOf('.')) : '(none)'
    byExt.set(ext, (byExt.get(ext) ?? 0) + 1)
    byName.set(file, (byName.get(file) ?? 0) + 1)
  }
  console.log(`quaternary: ${v.length} violating files across ${folders.size} atom folder(s)`)
  console.log('  by ext:', [...byExt.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}:${n}`).join(' '))
  console.log('  by name:', [...byName.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, n]) => `${k}:${n}`).join(' '))
}
