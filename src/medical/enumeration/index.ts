/**
 * medical/enumeration — medical facet; vocabulary pivot to @/enumeration.
 */
export const PART = 'enumeration' as const
export const CANONICAL = 'enumeration' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/enumeration' as const

/** Re-export stub — canonical vocabulary at @/enumeration. */
export const reexportFrom = '@/enumeration' as const

/** @index-cross.foldback child=medical/enumeration parent=medical — this cross folds back into its parent. */
