/**
 * cache/fingerprint — REUSE the whole-corpus scan, never re-derive it. The fold behind the AI-bill lever.
 *
 * A dozen derivations each pay the same 8–27s whole-tree scan (the rules snapshot, the readme
 * typography graph, the corpus context). Re-running them is the cost the session named: the machine
 * re-deriving what it already computed and — worse — the AGENT waiting and re-reading, billed in tokens.
 * This is the shared primitive: a cheap corpus fingerprint keying a memo, so the FIRST caller computes
 * and every sibling reuses. The compute-tier of "learn by shared experience" — one scan, shared.
 *
 * The fingerprint had been copied into skill-context and readme/compute; this folds it to one home.
 *
 *   import { corpusFingerprint, memoByFingerprint } from '@/cache/fingerprint'
 *
 * Leaf by design — imports only node builtins, so any atom may depend on it without a cycle.
 *
 * @see ../index — the base keyed store this specialises
 */
import { readdirSync, lstatSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Cheap corpus fingerprint: file count + newest src mtime. An unchanged tree fingerprints identically
 * (cache hit); any edit bumps the mtime and forces a re-derive. The theorem the reuse rests on:
 * same fingerprint ⇒ same tree ⇒ same derivation — so a memo keyed by it can never serve stale data.
 */
export function corpusFingerprint(cwd: string = process.cwd()): string {
  let newest = 0
  let count = 0
  const walk = (dir: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'skills') continue
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(ts|tsx|md)$/.test(e.name)) {
        count++
        const m = lstatSync(p).mtimeMs
        if (m > newest) newest = m
      }
    }
  }
  walk(join(cwd, 'src'))
  return `${count}:${Math.round(newest)}`
}

const memos = new Map<string, { fp: string; value: unknown }>()

/**
 * In-process memo keyed by (name, cwd, corpus fingerprint). The first call computes; later calls over
 * an unchanged tree reuse. Works for any value including non-serializable ones (a resolver closure, a
 * graph). cwd is part of the key, so a fixture tree never collides with the real corpus.
 *
 * @param name a stable key for the derivation (e.g. 'readme-typography-graph')
 * @param cwd the corpus root
 * @param compute the whole-corpus derivation to run at most once per fingerprint
 */
export function memoByFingerprint<T>(name: string, cwd: string, compute: () => T): T {
  const fp = corpusFingerprint(cwd)
  const key = `${name} ${cwd}`
  const hit = memos.get(key)
  if (hit && hit.fp === fp) return hit.value as T
  const value = compute()
  memos.set(key, { fp, value })
  return value
}

/** Drop all memos — a test that mutates a fixture tree calls this to force a fresh derivation. */
export function clearFingerprintMemos(): void {
  memos.clear()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let ran = 0
  const once = (): number => memoByFingerprint('demo', process.cwd(), () => ++ran)
  once()
  once()
  console.log(`cache/fingerprint — fingerprint ${corpusFingerprint()} · compute ran ${ran}× for 2 calls (reuse)`)
}
