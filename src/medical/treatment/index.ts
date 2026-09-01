/**
 * medical/treatment — medical facet; vocabulary pivot to @/treatment.
 */
export const PART = 'treatment' as const
export const CANONICAL = 'treatment' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/treatment' as const

/** @index-cross.foldback child=medical/treatment parent=medical — this cross folds back into its parent. */
