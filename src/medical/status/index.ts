/**
 * medical/status — medical facet; vocabulary pivot to @/status.
 */
export const PART = 'status' as const
export const CANONICAL = 'status' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/status' as const

/** Re-export stub — canonical vocabulary at @/status. */
export const reexportFrom = '@/status' as const

/** @index-cross.foldback child=medical/status parent=medical — this cross folds back into its parent. */
