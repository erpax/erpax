/**
 * body/measurement — body facet; vocabulary pivot to @/measurement.
 */
export const PART = 'measurement' as const
export const CANONICAL = 'measurement' as const
export const PARENT = 'body' as const
export const atomPath = 'body/measurement' as const

/** Re-export stub — canonical vocabulary at @/measurement. */
export const reexportFrom = '@/measurement' as const

/** @index-cross.foldback child=body/measurement parent=body — this cross folds back into its parent. */
