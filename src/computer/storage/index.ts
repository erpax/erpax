/**
 * computer/storage — persists bytes; vocabulary pivot to @/storage.
 */
export const PART = 'storage' as const
export const CANONICAL = 'storage' as const
export const PARENT = 'computer' as const
export const atomPath = 'computer/storage' as const

/** @index-cross.foldback child=computer/storage parent=computer — this cross folds back into its parent. */
