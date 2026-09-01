/**
 * medical/indication — medical facet; vocabulary pivot to @/indication.
 */
export const PART = 'indication' as const
export const CANONICAL = 'indication' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/indication' as const

/** @index-cross.foldback child=medical/indication parent=medical — this cross folds back into its parent. */
