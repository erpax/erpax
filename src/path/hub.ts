/**
 * path/hub — registry hub: one canonical ledger hook for every atom with index.ts.
 *
 * Law: recorded + implemented — atoms need not hand-roll `recordPathVisit`; the hub
 * maps atomPath → append-only ledger row via `recordAtomOnPath`. Domain hubs
 * (readings, quantum/emr, medical/device) may export named wrappers; all others
 * use this factory + `ATOM_LEDGER_PATHS` from the generated registry.
 *
 * @see ./hooks.registry.generated.ts — ./record.ts — ../apply/index.ts
 */
import { type PathCanonicalEntry } from './record'
import { recordOnPathMerged } from './merge'
import { ATOM_LEDGER_PATHS } from './hooks.registry.generated'

export { ATOM_LEDGER_PATHS }

const kindOf = (atomPath: string): string =>
  `atom.${atomPath.replace(/\//g, '.')}.step`

/**
 * Canonical ledger hook for any atom path — content-addressed, append-only.
 * Prefer named domain hooks where they exist; fall back to this hub everywhere else.
 */
export function recordAtomOnPath(
  atomPath: string,
  payload: unknown = { kind: kindOf(atomPath) },
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  const normalized = atomPath.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')
  const entries = recordOnPathMerged(
    normalized,
    { kind: kindOf(normalized), payload },
    at,
    prevEntryUuid,
    seq,
  )
  return entries[entries.length - 1]!
}

/** True when the atom path is registered in the generated index.ts walk. */
export function atomPathHasLedgerHook(atomPath: string): boolean {
  const normalized = atomPath.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')
  return ATOM_LEDGER_PATHS.includes(normalized)
}

/** Build a prev-chained ledger for a batch of atom paths (session apply). */
export function ledgerForAtomPaths(
  paths: readonly string[],
  at?: string,
): readonly PathCanonicalEntry[] {
  const entries: PathCanonicalEntry[] = []
  let prev: string | null = null
  let seq = 0
  const timestamp = at ?? new Date().toISOString()
  for (const p of paths) {
    const entry = recordAtomOnPath(p, { kind: 'session.batch', seq }, timestamp, prev, seq)
    entries.push(entry)
    prev = entry.entryUuid
    seq++
  }
  return entries
}
