/**
 * body/sea — body facet; vocabulary pivot to @/sea.
 */
export const PART = 'sea' as const
export const CANONICAL = 'sea' as const
export const PARENT = 'body' as const
export const atomPath = 'body/sea' as const

/** Re-export stub — canonical vocabulary at @/sea. */
export const reexportFrom = '@/sea' as const

/** @index-cross.foldback child=body/sea parent=body — this cross folds back into its parent. */
