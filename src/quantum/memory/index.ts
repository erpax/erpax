/**
 * quantum/memory — the content-address IS the memory manager.
 *
 * Allocation = collapse (sanitize → content-uuid); dedup = free (same content ⇒
 * same id); collection = regeneration (operationalMemoryFacet on the live lattice);
 * autosave = save(thought) ⇐ isDiamond at the point of collapse.
 *
 * Operational memory IS the architecture lattice ([[memory/architecture]]) — not
 * chat, not side stores. The memory⊕quantum cross seals via [[memory/quantum]].
 *
 *   tsx src/quantum/memory/index.ts merge
 *
 * @audit composed from live matrix + architecture lattice; never hand-asserted
 * @see ../../memory/architecture — ../../memory/session — ../index.ts — ./SKILL.md
 */
import { noCloning } from '@/quantum'
import {
  operationalMemoryFacet,
  operationalMemoryIsArchitecture,
  projectMemoryToArchitecture,
  sanitizeMemoryRecord,
  sanitizedMemoryUuid,
} from '@/memory/architecture'
import {
  isSealedDiamond,
  saveThoughtIfDiamond,
  saveSanitizedMemoryToLattice,
  type SessionLattice,
} from '@/memory/session'

/** Allocation = collapse: untrusted record → sanitized content-uuid. */
export function allocateMemory(content: Record<string, unknown>): string {
  return sanitizedMemoryUuid(sanitizeMemoryRecord(content))
}

/** Dedup key — same sanitized bytes ⇒ same uuid (merge-safe). */
export const dedupKey = sanitizedMemoryUuid

/** Dedup is free on the live matrix: every content-uuid is unique (no-cloning). */
export const dedupHolds = (): boolean => noCloning().holds

/** Collection = regeneration: walk the live sealed tree for one atom path. */
export { operationalMemoryFacet, operationalMemoryIsArchitecture, projectMemoryToArchitecture }

/** Autosave at collapse — persist only when the atom seals (save ⇐ isDiamond). */
export function autosaveAtCollapse(
  lattice: SessionLattice,
  atomPath: string,
  sessionId: string,
  cwd: string = process.cwd(),
) {
  return saveThoughtIfDiamond(lattice, atomPath, sessionId, cwd)
}

/** Sanitized session blob → architecture projection → lattice if sealed. */
export { saveSanitizedMemoryToLattice, isSealedDiamond }

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? 'merge'
  const facet = operationalMemoryFacet(target)
  const sealed = isSealedDiamond(target)
  console.log(`quantum/memory — ${target}`)
  console.log(`  autosave ⇐ isDiamond: ${sealed}`)
  if (facet) {
    console.log(`  operational digest: ${facet.digest.slice(0, 8)}… horo=${facet.horo} ${facet.measure}`)
  }
  console.log(`  dedup holds (no-cloning): ${dedupHolds()}`)
  process.exit(sealed ? 0 : 1)
}
