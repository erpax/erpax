/**
 * body/review — body facet; vocabulary pivot to @/review.
 */
export const PART = 'review' as const
export const CANONICAL = 'review' as const
export const PARENT = 'body' as const
export const atomPath = 'body/review' as const

/** Re-export stub — canonical vocabulary at @/review. */
export const reexportFrom = '@/review' as const

/** @index-cross.foldback child=body/review parent=body — this cross folds back into its parent. */
