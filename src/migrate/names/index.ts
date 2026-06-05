/**
 * migrate/names -- collide each atom test file to the canonical test.ts.
 *
 * The four-file law (quaternary) names the test slot test.ts. Most folders carry
 * a single <Name>.test.ts / index.test.ts; this renames it to test.ts
 * (computable, idempotent, no content change -- imports are unaffected). The
 * vitest glob already includes src-slash-test.ts, so renamed tests keep running.
 *
 * A folder with MULTIPLE test files (or a .tsx test) is NOT auto-renamed -- each
 * tested unit must collide into its own sub-atom; those are flagged for the next
 * migration, never silently dropped.
 *
 *   tsx src/migrate/names/index.ts            dry: print the plan
 *   tsx src/migrate/names/index.ts --apply    rename single-test folders to test.ts
 *
 * Links: quaternary (the law), test, collapse, merge.
 */
import { readdirSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { isRealDir } from '@/aura'

const ROOT = join(process.cwd(), 'src')
const TEST_RE = /\.test\.tsx?$/

export interface Move {
  readonly from: string
  readonly to: string
}
export interface Flag {
  readonly folder: string
  readonly files: readonly string[]
  readonly reason: string
}

/** Plan the canonical-test-name collision over every atom folder (no mutation). */
export function planNameMigration(root: string = ROOT): { moves: Move[]; flags: Flag[] } {
  const moves: Move[] = []
  const flags: Flag[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    const files = entries.filter((e) => !isRealDir(join(dir, e)))
    if (files.includes('SKILL.md')) {
      const rel = dir.slice(root.length + 1) || '.'
      const tests = files.filter((f) => TEST_RE.test(f) && f !== 'test.ts' && f !== 'test.tsx')
      const hasCanonical = files.includes('test.ts') || files.includes('test.tsx')
      if (tests.length === 1 && !hasCanonical && tests[0]!.endsWith('.test.ts')) {
        moves.push({ from: rel + '/' + tests[0]!, to: rel + '/test.ts' })
      } else if (tests.length > 0) {
        const reason = hasCanonical
          ? 'already has test.ts; extra tests -> sub-atoms'
          : tests.length === 1
            ? '.tsx test - test.tsx not in allowed set'
            : tests.length + ' test files -> collide each to its own sub-atom'
        flags.push({ folder: rel, files: tests, reason })
      }
    }
    for (const e of entries) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      if (isRealDir(p)) walk(p)
    }
  }
  walk(root)
  return { moves, flags }
}

const RUN_DIRECTLY = import.meta.url === 'file://' + process.argv[1]
if (RUN_DIRECTLY) {
  const apply = process.argv.includes('--apply')
  const { moves, flags } = planNameMigration()
  if (apply) for (const m of moves) renameSync(join(ROOT, m.from), join(ROOT, m.to))
  const mode = apply ? '(APPLIED)' : '(dry; --apply to run)'
  console.log('migrate/names: ' + moves.length + ' single-test -> test.ts ' + mode + ' | ' + flags.length + ' flagged for sub-atom collision')
  if (!apply) for (const m of moves.slice(0, 12)) console.log('    ' + m.from + ' -> ' + m.to)
  for (const f of flags.slice(0, 12)) console.log('    FLAG ' + f.folder + ': ' + f.reason)
}
