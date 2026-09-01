/**
 * medical/evidence — medical facet; vocabulary pivot to @/evidence.
 */
export const PART = 'evidence' as const
export const CANONICAL = 'evidence' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/evidence' as const

/** Re-export stub — canonical vocabulary at @/evidence. */
export const reexportFrom = '@/evidence' as const

/** @index-cross.foldback child=medical/evidence parent=medical — this cross folds back into its parent. */
