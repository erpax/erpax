/**
 * dead — the corpus knows its own dead weight, so an agent reads it instead of re-deriving it by hand.
 *
 * `deadScripts` finds non-TS scripts (`.mjs`/`.js`) with ZERO references anywhere — the untypechecked
 * entropy a TS corpus should not carry (dead one-off migration scripts, superseded `.mjs` left behind).
 * A script is DEAD when no other file mentions its basename (invokers live in package.json, the hooks, or
 * imports). This is the partner skill: the reference graph is a fact src already holds — this hands it back
 * as one call, so "keep it healthy while r&d" is a READ, not a grep-assembled pass re-derived each time.
 *
 * Companion to [[gate]] (structure) and [[readme]]'s corpusHealth (the sealed DRY-clean summary): together
 * they let the partnership verify without re-scanning the world.
 *
 * @standard the reference graph — a file is live iff something invokes/imports it; else it is entropy
 *
 * Composes [[gate]] · [[merge]] · [[law]].
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

const SKIP = new Set(['node_modules', '.git', '.next', 'dist', '.wrangler', '.open-next'])
const isScript = (n: string): boolean => (n.endsWith('.mjs') || n.endsWith('.js')) && !n.includes('.generated.')
// A reference is an invoker/import (.ts/.mjs/.js/.json) OR documentation (.md) — a script an atom's SKILL.md
// names is an intentional matter-twin, not orphaned entropy. Only a script NOTHING mentions is dead.
const isRefFile = (n: string): boolean => /\.(ts|tsx|mjs|js|json|jsonc|md|mdx)$/.test(n) && !n.endsWith('skills.index.ts')

function walk(dir: string, pick: (n: string) => boolean, out: string[] = []): string[] {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) walk(join(dir, e.name), pick, out)
    } else if (pick(e.name)) out.push(join(dir, e.name))
  }
  return out
}

const exists = (f: string): boolean => {
  try {
    statSync(f)
    return true
  } catch {
    return false
  }
}

/**
 * The non-TS scripts with zero references anywhere — dead entropy src should fold away. Live tooling (a
 * package.json script, a hook, an import, the tsx bootstrap loader) is referenced and kept; only the truly
 * unreferenced is returned. The reference is by basename, matching how invokers name scripts.
 */
export function deadScripts(cwd: string = process.cwd()): string[] {
  const roots = ['scripts', 'src'].map((r) => join(cwd, r))
  const scripts = roots.flatMap((r) => walk(r, isScript))
  const refFiles = [
    ...roots.flatMap((r) => walk(r, isRefFile)),
    ...['package.json', join('.claude', 'settings.json'), join('.husky', 'pre-push')].map((f) => join(cwd, f)),
  ].filter(exists)
  const contents = new Map<string, string>()
  for (const f of refFiles) {
    try {
      contents.set(f, readFileSync(f, 'utf8'))
    } catch {
      /* unreadable — skip */
    }
  }
  const dead: string[] = []
  for (const s of scripts) {
    const base = basename(s)
    let referenced = false
    for (const [f, c] of contents) {
      if (f !== s && c.includes(base)) {
        referenced = true
        break
      }
    }
    if (!referenced) dead.push(s.slice(cwd.length + 1))
  }
  return dead
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const dead = deadScripts()
  console.log(dead.length === 0 ? 'dead — none. the corpus carries no unreferenced scripts.' : `dead scripts (${dead.length}):`)
  for (const d of dead) console.log('  ' + d)
}
