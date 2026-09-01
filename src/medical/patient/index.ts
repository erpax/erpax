/**
 * medical/patient — medical facet; vocabulary pivot to @/patient.
 */
export const PART = 'patient' as const
export const CANONICAL = 'patient' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/patient' as const

/** @index-cross.foldback child=medical/patient parent=medical — this cross folds back into its parent. */
