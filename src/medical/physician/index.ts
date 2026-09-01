/**
 * medical/physician — medical facet; vocabulary pivot to @/physician.
 */
export const PART = 'physician' as const
export const CANONICAL = 'physician' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/physician' as const

/** @index-cross.foldback child=medical/physician parent=medical — this cross folds back into its parent. */
