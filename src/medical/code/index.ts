/**
 * medical/code — medical facet; vocabulary pivot to @/code.
 */
export const PART = 'code' as const
export const CANONICAL = 'code' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/code' as const

/** Re-export stub — canonical vocabulary at @/code. */
export const reexportFrom = '@/code' as const

/** @index-cross.foldback child=medical/code parent=medical — this cross folds back into its parent. */
