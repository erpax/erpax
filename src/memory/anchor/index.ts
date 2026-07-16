/**
 * anchor — the content-address is what links inside and outside, both ways.
 *
 * An agent's memory lives OUTSIDE the corpus (`~/.claude/projects/<project>/memory/`). The corpus lives
 * INSIDE. They are duals, not copies: inside is the CONTENT (a law that binds, a test that re-runs), outside
 * is the ADDRESS (a belief that only re-reads). Storing the content outside is the corpus's own rule broken —
 * *derivable content is not stored* — and it is how a memory comes to assert, forever, a number that was true
 * once.
 *
 * But a POINTER IS NOT ENOUGH, and that is the whole finding here. A pointer is a NAME, and a name goes stale
 * SILENTLY. That is not a hypothesis — it is what this corpus is made of:
 *
 *   46 dead statutory pointers        a clause→code trace that lands nowhere
 *   `standards/catalogue.ts`          named a generator that had MOVED — and I believed the banner
 *   `APP_COLLECTION_SLUGS`            "the source of truth for which collections the app registers": 8 of 231
 *
 * A name says WHERE. A content-address says WHAT — and it is DERIVED, so it cannot lie about its target:
 *
 *   inside → outside   the content computes its own address; the memory cannot invent one
 *   outside → inside   the memory holds the address; a mismatch PROVES the content moved under it
 *
 * That is the link, both ways, and it is why the fold is the only honest citation: `toUuid` is a theorem
 * (same content, same address — [[merge]]), where a path is a guess about a filesystem.
 *
 * A stale anchor is not an error. It is the memory saying, computably, **"I am out of date"** — the one thing
 * a prose note can never say about itself.
 *
 * Run: `tsx src/memory/anchor/index.ts`
 *
 * @standard RFC 9562 §5.8 — uuidv8 content-uuid
 *
 * Composes [[memory]] · [[merge]] · [[uuid]] · [[law]].
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { toUuid } from '@/uuid/matrix'

/** Canonical atom path. */
export const atomPath = 'anchor' as const

/** A memory's claim about corpus content: WHERE it is, and WHAT it was when the memory was written. */
export interface Anchor {
  /** Repo-relative path — the name, which may rot. */
  readonly path: string
  /** The content-uuid at the time the memory was written — the thing that cannot rot silently. */
  readonly uuid: string
}

export interface AnchorVerdict {
  readonly path: string
  /** `fresh` — the content is what the memory remembers. `moved` — it changed. `gone` — the path rotted. */
  readonly state: 'fresh' | 'moved' | 'gone'
  readonly was: string
  readonly now?: string
}

/**
 * The content-address of a file — the corpus's own primitive, not a new one.
 *
 * @invariant same bytes ⇒ same uuid (the self-address congruence: this is a theorem, not a scan)
 */
export function anchorOf(path: string, cwd: string = process.cwd()): Anchor {
  return { path, uuid: toUuid(readFileSync(join(cwd, path))) }
}

/**
 * Does the corpus still say what a memory remembers it saying?
 *
 * @invariant `gone` and `moved` are DIFFERENT failures — a rotted path is not a changed truth
 */
export function verifyAnchor(a: Anchor, cwd: string = process.cwd()): AnchorVerdict {
  const full = join(cwd, a.path)
  if (!existsSync(full)) return { path: a.path, state: 'gone', was: a.uuid }
  const now = toUuid(readFileSync(full))
  return { path: a.path, state: now === a.uuid ? 'fresh' : 'moved', was: a.uuid, now }
}

/** Every anchor a memory file declares, as `<!-- anchor: <path> <uuid> -->`. */
export function anchorsIn(text: string): Anchor[] {
  return [...text.matchAll(/<!--\s*anchor:\s*(\S+)\s+([0-9a-f-]{36})\s*-->/g)].map((m) => ({
    path: m[1]!,
    uuid: m[2]!,
  }))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const targets = process.argv.slice(2)
  if (targets.length === 0) {
    console.log('usage: tsx src/memory/anchor/index.ts <path…>   — print the content-address to store outside')
    process.exit(0)
  }
  for (const t of targets) {
    const a = anchorOf(t)
    console.log(`<!-- anchor: ${a.path} ${a.uuid} -->`)
  }
}
