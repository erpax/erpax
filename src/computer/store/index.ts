/**
 * computer/store — computer facet; vocabulary pivot to @/store.
 */
export const PART = 'store' as const
export const CANONICAL = 'store' as const
export const PARENT = 'computer' as const
export const atomPath = 'computer/store' as const

/** Re-export stub — canonical vocabulary at @/store. */
export const reexportFrom = '@/store' as const

/** @index-cross.foldback child=computer/store parent=computer — this cross folds back into its parent. */
