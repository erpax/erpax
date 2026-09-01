/**
 * medical/therapy — medical facet; vocabulary pivot to @/therapy.
 */
export const PART = 'therapy' as const
export const CANONICAL = 'therapy' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/therapy' as const

/** @index-cross.foldback child=medical/therapy parent=medical — this cross folds back into its parent. */
