import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * run/dev — the developer command surface, as data.
 *
 * @see ./SKILL.md
 */

export interface DevCommand {
  /** The script's file stem, which is the command's name. */
  readonly name: string
  /** Path from the repo root — the thing a reader actually runs. */
  readonly path: string
  /** The first sentence of the script's own header. Read, never restated. */
  readonly purpose: string
}

/**
 * These scripts are RUN, never imported — see ./SKILL.md for why a barrel must not re-export them.
 * Each purpose is read from the script's own header, so it cannot drift from what it describes.
 */
export function devCommands(dir: string = import.meta.dirname): DevCommand[] {
  const out: DevCommand[] = []
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const e of entries.sort()) {
    if (!e.endsWith('.ts')) continue
    // Both spellings of each trinity leg. This folder holds no `.tsx` today, but a filter that
    // selects by name must name every name the thing has ([[rules]]/probe) — what it misses is
    // systematically the case nobody thought to name, and it reports the miss as an absence.
    if (['index.ts', 'index.tsx', 'test.ts', 'test.tsx', 'translations.ts'].includes(e)) continue
    let text = ''
    try {
      text = readFileSync(join(dir, e), 'utf8')
    } catch {
      continue
    }
    const header = /\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? ''
    const purpose = header
      .replace(/\n\s*\*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(/(?<=\.)\s/)[0]
      ?.trim() ?? ''
    out.push({ name: e.slice(0, -3), path: `src/run/dev/${e}`, purpose })
  }
  return out
}

/**
 * Commands whose file is gone — [[rules]]/command's law, scoped to this folder.
 *
 * A step that cannot run reports the same green as a step that passed, so a manifest naming a
 * script that no longer exists is worse than no manifest.
 */
export function missingDevCommands(cwd: string = process.cwd(), dir?: string): string[] {
  return devCommands(dir)
    .filter((c) => {
      try {
        readFileSync(join(cwd, c.path), 'utf8')
        return false
      } catch {
        return true
      }
    })
    .map((c) => c.path)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const c of devCommands()) console.log(`  tsx ${c.path.padEnd(34)} ${c.purpose.slice(0, 90)}`)
}
// Named in the TYPE space, never re-exported: importing one of these RUNS it, and several end in
// process.exit(). The manifest above is what this barrel actually offers.
export type * from './fuse-mcp-key'
export type * from './genesis'
export type * from './genesis-seed'
export type * from './smoke'
export type * from './verify-action-tools'
export type * from './verify-genesis'
export type * from './verify-versioning'

/** @index-cross.foldback child=run/dev parent=run — this cross folds back into its parent. */
