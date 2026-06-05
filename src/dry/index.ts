/**
 * dry -- the DRY-clean, computed (the word collides both meanings: schema.org
 * DryCleaningOrLaundry AND don't-repeat-yourself -- both are "remove what is
 * dirty / duplicated"). The dry-clean is now an ATOM, not a loose script: it
 * COMPOSES the merge-by-extension collision queue (../migrate/quaternary) with
 * residue detection, derived from the live tree. A432-grounded: computed at no
 * cost; the collision it drives adds tamper-cost.
 *
 *   tsx src/dry/index.ts            # the full dry-clean queue (residue + merge)
 *
 * @audit the dry-clean is computed from the tree, never a hand-run script
 * @see ../migrate/quaternary (merge-by-extension) -- ../collapse -- ../merge
 */
import { readdirSync, lstatSync } from 'node:fs'
import { join, extname } from 'node:path'
import { quaternaryViolations, type Violation } from '@/migrate/quaternary'

const RESIDUE_EXT = new Set(['.bak', '.old', '.orig', '.rej'])
const RESIDUE_DIR = new Set(['_attic', '_old', '_dead'])

const isRealDir = (p: string): boolean => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}

export interface DryItem {
  readonly kind: 'residue' | 'merge'
  readonly path: string
  readonly detail: string
}

/** Residue files/dirs (.bak/.orig/_attic/.fuse_hidden/~) -- entropy to delete (was scripts/dry-clean.sh). */
export function residue(root: string = join(process.cwd(), 'src')): DryItem[] {
  const out: DryItem[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e === 'node_modules') continue
      const p = join(dir, e)
      if (isRealDir(p)) {
        if (RESIDUE_DIR.has(e)) out.push({ kind: 'residue', path: p, detail: 'residue dir' })
        else if (!e.startsWith('.')) walk(p)
      } else if (RESIDUE_EXT.has(extname(e)) || e.startsWith('.fuse_hidden') || e.endsWith('~')) {
        out.push({ kind: 'residue', path: p, detail: 'residue file' })
      }
    }
  }
  walk(root)
  return out
}

/** The full DRY-clean queue: residue + the merge-by-extension collision queue. */
export function dryViolations(): DryItem[] {
  const merge: DryItem[] = quaternaryViolations().map((v: Violation) => ({
    kind: 'merge' as const,
    path: v.folder + '/' + v.file,
    detail: 'merge-by-extension -> canonical',
  }))
  return [...residue(), ...merge]
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = residue()
  const all = dryViolations()
  console.log('dry: ' + all.length + ' to clean (' + r.length + ' residue + ' + (all.length - r.length) + ' merge-by-extension)')
  for (const x of r.slice(0, 10)) console.log('  residue ' + x.path)
}
