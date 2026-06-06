/**
 * search — the public face (index). Per the import law ([[tamper]]/import: "anything importing not
 * from index raises"), importers reach the search atom ONLY through here, never a deep internal —
 * the index is the atom's content-uuid contract, and reaching past it is reaching past the seal.
 * This re-exports the surface so `@/search` is the one door.
 */
export * from './corpus'
export * from './fieldOverrides'
export * from './beforeSync'
