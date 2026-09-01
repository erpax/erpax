/**
 * medical/clinic — medical facet; vocabulary pivot to @/clinic.
 */
export const PART = 'clinic' as const
export const CANONICAL = 'clinic' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/clinic' as const

/** @index-cross.foldback child=medical/clinic parent=medical — this cross folds back into its parent. */
