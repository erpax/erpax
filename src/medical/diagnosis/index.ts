/**
 * medical/diagnosis — medical facet; vocabulary pivot to @/diagnosis.
 */
export const PART = 'diagnosis' as const
export const CANONICAL = 'diagnosis' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/diagnosis' as const

/** @index-cross.foldback child=medical/diagnosis parent=medical — this cross folds back into its parent. */
