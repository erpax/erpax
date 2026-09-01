/**
 * computer/language — computer facet; vocabulary pivot to @/language.
 */
export const PART = 'language' as const
export const CANONICAL = 'language' as const
export const PARENT = 'computer' as const
export const atomPath = 'computer/language' as const

/** Re-export stub — canonical vocabulary at @/language. */
export const reexportFrom = '@/language' as const

/** @index-cross.foldback child=computer/language parent=computer — this cross folds back into its parent. */
