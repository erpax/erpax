/**
 * medical/hospital — medical facet; vocabulary pivot to @/hospital.
 */
export const PART = 'hospital' as const
export const CANONICAL = 'hospital' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/hospital' as const

/** @index-cross.foldback child=medical/hospital parent=medical — this cross folds back into its parent. */
