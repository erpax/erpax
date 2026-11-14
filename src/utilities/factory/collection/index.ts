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
} from '@/utilities/factory/collection/base'
export type { StatusOption, EmitWiring, AccountingCollectionOptions } from '@/utilities/factory/collection/base'

export { deriveLifecycleEmits, foldCollectionLifecycle } from '@/utilities/factory/collection/lifecycle'

export { createCalculatedField, createLineItemArray } from '@/utilities/factory/collection/field'

export {
  SHAPE_AXES,
  ROSETTA_BASELINE,
  collectionSignature,
  shapeCatalogue,
  shapeRatchetVerdict,
  auditCorpus,
} from '@/utilities/factory/collection/shape'
export type { ShapeAxis, ShapeCatalogue, CollapseCluster, CorpusAudit } from '@/utilities/factory/collection/shape'

/** @index-cross.foldback child=factory/collection parent=factory — this cross folds back into its parent. */
