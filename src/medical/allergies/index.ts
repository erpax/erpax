/**
 * medical/allergies — medical facet; vocabulary pivot to @/allergies.
 */
export const PART = 'allergies' as const
export const CANONICAL = 'allergies' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/allergies' as const

/** @index-cross.foldback child=medical/allergies parent=medical — this cross folds back into its parent. */
