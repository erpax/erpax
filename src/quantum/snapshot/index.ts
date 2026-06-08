/**
 * quantum/snapshot — measurement collapse + append-only superposition chain.
 *
 * Each captured state is content-uuid'd, immutable, append-only — identical states
 * merge; any past layer is reconstructible from the chain (the gate).
 *
 *   tsx src/quantum/snapshot/index.ts
 *
 * @audit chain verify via uuid-linked leaves; never hand-asserted history
 * @see ../../snapshot — ../fs — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import { verifyUuidLinkedChain, type UuidLinkedLeaf, buildNextLeaf } from '@/integrity'

/** Content-address one moment's collapsed state. */
export const snapshotUuid = (state: unknown): string => uuid(state)

/** Identical states merge to one snapshot id. */
export const mergeIdentical = (a: unknown, b: unknown): boolean => snapshotUuid(a) === snapshotUuid(b)

/** Reconstructibility gate — chain verifies end-to-end. */
export async function chainReconstructible(leaves: readonly UuidLinkedLeaf[]): Promise<boolean> {
  const v = await verifyUuidLinkedChain({ leaves })
  return v.ok
}

/** Build the next nested layer — snapshots nest layer after layer. */
export function nestSnapshot(
  prev: UuidLinkedLeaf | null,
  payload: unknown,
  timestampIso: string,
): UuidLinkedLeaf {
  return buildNextLeaf({ head: prev, payload, timestampIso })
}

/** Canonical ledger hook — record quantum/snapshot path step (append-only). */
export function recordSnapshotOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/snapshot', { kind: 'snapshot.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = { v: 1 }
  console.log('quantum/snapshot — uuid=' + snapshotUuid(s))
}
