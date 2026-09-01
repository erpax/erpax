/**
 * body/signal — body facet; vocabulary pivot to @/signal.
 */
export const PART = 'signal' as const
export const CANONICAL = 'signal' as const
export const PARENT = 'body' as const
export const atomPath = 'body/signal' as const

/** Re-export stub — canonical vocabulary at @/signal. */
export const reexportFrom = '@/signal' as const

/** @index-cross.foldback child=body/signal parent=body — this cross folds back into its parent. */
