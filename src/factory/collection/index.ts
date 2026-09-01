/**
 * factory/collection — the accounting-collection factory, as a barrel over its four parts.
 *
 * A hub holds no matter ([[rules]]/concentration): the 720-line file this replaces was
 * four concerns in one scroll.
 *
 *   base       createAccountingCollection — the collection every accounting table is
 *   lifecycle  the spine fold: events derived from a `status` select
 *   field      the small field builders (calculated · GL account · line items)
 *   shape      the rosetta — a collection's signature, its ratchet, the corpus audit
 *
 * @see ./SKILL.md
 */
export {
  COLLECTION_DIAMOND_KEY,
  EMITS_WIRED_KEY,
  createAccountingCollection,
} from './base'
export type { StatusOption, EmitWiring, AccountingCollectionOptions } from './base'

export { deriveLifecycleEmits, foldCollectionLifecycle } from './lifecycle'

export { createCalculatedField, createGLAccountFields, createLineItemArray } from './field'

export {
  SHAPE_AXES,
  ROSETTA_BASELINE,
  collectionSignature,
  shapeCatalogue,
  shapeRatchetVerdict,
  auditCorpus,
} from './shape'
export type { ShapeAxis, ShapeCatalogue, CollapseCluster, CorpusAudit } from './shape'
