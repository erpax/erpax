/**
 * medical/technique — medical facet; vocabulary pivot to @/technique.
 */
export const PART = 'technique' as const
export const CANONICAL = 'technique' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/technique' as const

/** @index-cross.foldback child=medical/technique parent=medical — this cross folds back into its parent. */
