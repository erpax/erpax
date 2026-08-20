import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
/**
 * memory/drift — the agent memory index must name every memory, and only real ones.
 *
 * `MEMORY.md` is the LOAD SURFACE: a memory absent from it is written but never read.
 * What that cost, and why zero is a theorem here, is in ./SKILL.md.
 *
 * @see ./SKILL.md · ../../rules/reference
 */

/** One line of the load surface: `- [Title](file.md) — hook`. */
const INDEX_LINK = /\]\(([A-Za-z0-9_.-]+\.md)\)/g

export interface MemoryDrift {
  /** on disk but NOT in the index — written, never loaded, silently inert */
  readonly orphans: readonly string[]
  /** in the index but NOT on disk — a citation leading nowhere */
  readonly dead: readonly string[]
  readonly files: number
  readonly indexed: number
}

/** The agent-memory directory for a project, derived from its path the way the host slugs it. */
export function memoryDirFor(cwd: string = process.cwd(), home: string = homedir()): string {
  return join(home, '.claude', 'projects', cwd.split('/').join('-'), 'memory')
}

/** Compare the index against the files. Pure — reads, never writes. */
export function memoryDrift(dir: string = memoryDirFor()): MemoryDrift {
  const empty: MemoryDrift = { orphans: [], dead: [], files: 0, indexed: 0 }
  const indexPath = join(dir, 'MEMORY.md')
  if (!existsSync(indexPath)) return empty

  const text = readFileSync(indexPath, 'utf8')
  const indexed = new Set([...text.matchAll(INDEX_LINK)].map((m) => m[1]!))
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'MEMORY.md')

  return {
    orphans: files.filter((f) => !indexed.has(f)).sort(),
    dead: [...indexed].filter((f) => !existsSync(join(dir, f))).sort(),
    files: files.length,
    indexed: indexed.size,
  }
}

/**
 * Fail closed on drift — zero is a theorem, not a ratchet (./SKILL.md).
 *
 * @invariant every memory file is indexed ∧ every index entry resolves
 */
export function assertNoMemoryDrift(dir: string = memoryDirFor()): void {
  const d = memoryDrift(dir)
  if (d.orphans.length === 0 && d.dead.length === 0) return
  const parts: string[] = []
  if (d.orphans.length) parts.push(`${d.orphans.length} memory file(s) NOT in MEMORY.md — written but never loaded: ${d.orphans.join(', ')}`)
  if (d.dead.length) parts.push(`${d.dead.length} index entr(y|ies) with no file: ${d.dead.join(', ')}`)
  throw new Error(`✗ memory drift — the index is the load surface:\n  ${parts.join('\n  ')}`)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  void (async () => {
    const d = memoryDrift()
    console.log(`memory — ${d.files} file(s) · ${d.indexed} indexed`)
    try {
      assertNoMemoryDrift()
      console.log('✓ no drift — every memory is on the load surface, every entry resolves')
    } catch (e) {
      console.error((e as Error).message)
      process.exit(1)
    }
  })()
}
