/**
 * medical/recommendation — medical facet; vocabulary pivot to @/recommendation.
 */
export const PART = 'recommendation' as const
export const CANONICAL = 'recommendation' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/recommendation' as const

/** Re-export stub — canonical vocabulary at @/recommendation. */
export const reexportFrom = '@/recommendation' as const

/** @index-cross.foldback child=medical/recommendation parent=medical — this cross folds back into its parent. */
