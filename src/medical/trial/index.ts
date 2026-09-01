/**
 * medical/trial — medical facet; vocabulary pivot to @/trial.
 */
export const PART = 'trial' as const
export const CANONICAL = 'trial' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/trial' as const

/** @index-cross.foldback child=medical/trial parent=medical — this cross folds back into its parent. */
