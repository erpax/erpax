/**
 * scratch — saved throwaways, content-addressed, quantomising.
 *
 * A throwaway measurement script is not waste to delete — it is a PROTO-TOOL. "Single-use code is entropy" was
 * half the law; the other half: save it, and it quantomises in time. Every ad-hoc `tsx -e` that would have been
 * thrown away is saved here, content-addressed — so identical scripts MERGE (same content ⇒ same address ⇒ the
 * fold), near-identical ones cluster, and a script that has run enough to matter graduates into `src/` as a
 * tested atom (deadAtoms, inversePairs, the seal's per-lane timing all began as throwaways).
 *
 * The primitive is content-addressing: a throwaway has no gate and nothing to refute it, which is exactly where
 * measurements go wrong; addressing it makes it inspectable, dedup-able, and promotable.
 *
 * @invariant same code ⇒ same scriptAddress (a duplicate throwaway is the SAME thought, not a new one)
 * @invariant saving an identical script twice leaves ONE entry — the fold collapses it
 *
 * Composes [[think]] (a script is a thought) · [[merge]] (content-address) · [[cost]] (single-use is entropy) · [[law]].
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const STORE = '.scratch'

/** The content-address of a script — same code (trimmed) ⇒ same address ⇒ the fold merges duplicate throwaways. */
export function scriptAddress(code: string): string {
  return createHash('sha256').update(code.trim()).digest('hex').slice(0, 16)
}

/** Save a throwaway, content-addressed. Identical scripts collapse to one file — the fold, applied to scripts. */
export function saveScript(code: string, cwd: string = process.cwd()): string {
  const addr = scriptAddress(code)
  const dir = join(cwd, STORE)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, addr + '.ts'), code)
  return addr
}

/** Every saved throwaway — the accreting store to mine for the tools they will quantomise into. */
export function savedScripts(cwd: string = process.cwd()): readonly string[] {
  const dir = join(cwd, STORE)
  return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.ts')) : []
}
