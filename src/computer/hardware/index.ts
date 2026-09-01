/**
 * computer/hardware — physical machine facet; vocabulary pivot to @/hardware.
 */
export const PART = 'hardware' as const
export const CANONICAL = 'hardware' as const
export const PARENT = 'computer' as const
export const atomPath = 'computer/hardware' as const

/** @index-cross.foldback child=computer/hardware parent=computer — this cross folds back into its parent. */
