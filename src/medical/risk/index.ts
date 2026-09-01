/**
 * medical/risk — medical facet; vocabulary pivot to @/risk.
 */
export const PART = 'risk' as const
export const CANONICAL = 'risk' as const
export const PARENT = 'medical' as const
export const atomPath = 'medical/risk' as const

/** Re-export stub — canonical vocabulary at @/risk. */
export const reexportFrom = '@/risk' as const

/** @index-cross.foldback child=medical/risk parent=medical — this cross folds back into its parent. */
