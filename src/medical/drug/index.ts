/**
 * medical/drug — medical facet; vocabulary pivot to @/drug.
 */
export const PART = 'drug' as const
export const CANONICAL = 'drug' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/drug' as const

/** @index-cross.foldback child=medical/drug parent=medical — this cross folds back into its parent. */
