/**
 * medical/prescription — medical facet; vocabulary pivot to @/prescription.
 */
export const PART = 'prescription' as const
export const CANONICAL = 'prescription' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/prescription' as const

/** @index-cross.foldback child=medical/prescription parent=medical — this cross folds back into its parent. */
