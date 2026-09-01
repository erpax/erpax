/**
 * medical/condition — medical facet; vocabulary pivot to @/condition.
 */
export const PART = 'condition' as const
export const CANONICAL = 'condition' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/condition' as const

/** @index-cross.foldback child=medical/condition parent=medical — this cross folds back into its parent. */
